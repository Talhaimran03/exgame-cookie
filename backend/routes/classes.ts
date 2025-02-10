import Router from "@koa/router";
import { getStudentsOfClass } from "../services/user";
import { getNameOfClass, createClass, getAllClasses, deleteClass, editClass } from "../services/class";
import { Class } from "../../api-types";
import { AuthenticatedContext } from "../types/session";
import { authMiddleware, isAdminMiddleware, isAdminOrTeacherMiddleware} from "./auth";

const router = new Router<unknown, AuthenticatedContext>({
  prefix: "/classes",
});

// questo middleware serve a controllare che tu sia loggato prima di mostrarti la pagina
//se lo tolgo, mostra la pagina ancje se non sono loggato
router.use(authMiddleware());

router.get("/getName/:id", async (ctx) => {
  ctx.body = await getNameOfClass(ctx.params.id);
});

// aggiunge una nuova classe ---> funziona!!
router.post("/", isAdminOrTeacherMiddleware(), async (ctx) =>{
  ctx.accepts("json");
  const newClass = ctx.request.body as Class;

  try {
    const response = await createClass(newClass);
    ctx.status = 201;
    ctx.body = response;
    
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "An error occurred while creating the class" };
    console.error(error);
  }
});

router.put("/:id", isAdminOrTeacherMiddleware(), async (ctx) =>{
  ctx.accepts("json");

  const response = await editClass(ctx.params.id, ctx.request.body as Class);
  ctx.response.body = response;
});

router.delete("/:id", isAdminOrTeacherMiddleware(), async (ctx) =>{
  console.log("Siamo dentro la DELETE")
  ctx.body = await deleteClass(ctx.params.id);
});

//get all classes with id and name of the class
router.get("/get-all", async (ctx) => {
  ctx.body = await getAllClasses();
});

//get all classes / if teacher get your classes
router.get("/", async (ctx) => {
  const currentUser = ctx.session.user;

  switch (currentUser.role) {
    case "admin":
      ctx.body = await getAllClasses();
      break;
    case "teacher":
      ctx.body = currentUser.teacher_classes;
      break;
    case "student":
    default:
      ctx.status = 403;
      ctx.response.body = "forbidden";
      break;
  }
});

//view all student of a class
router.get("/:id", async (ctx) => {
  const currentUser = ctx.session.user;
  console.log("User role:", currentUser.role);

  switch (currentUser.role) {
    case "admin":
    case "teacher":
      ctx.body = await getStudentsOfClass(ctx.params.id);
      break;
    case "student":
      if(ctx.params.id == currentUser.student_class){
        ctx.body = await getStudentsOfClass(ctx.params.id);
      }else{
        ctx.status = 403;
        ctx.response.body = "forbidden";
      }
      break;
      
    default:
      ctx.status = 403;
      ctx.response.body = "forbidden";
      break;
  }
});

export default router;