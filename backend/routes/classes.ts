import Router from "@koa/router";
import { getAllClasses, getStudentsOfClass } from "../services/user";
import { getNameOfClass, createClass } from "../services/class";
import { Class } from "../../api-types";
import { AuthenticatedContext } from "../types/session";
import { authMiddleware } from "./auth";

const router = new Router<unknown, AuthenticatedContext>({
  prefix: "/classes",
});

router.get("/getName/:id", async (ctx) => {
  ctx.body = await getNameOfClass(ctx.params.id);
});

// aggiunge una nuova classe ---> funziona!!
router.post("/newClass", async (ctx) =>{
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

// questo middleware serve a controllare che tu sia loggato prima di mostrarti la pagina
//se lo tolgo, mostra la pagina ancje se non sono loggato
router.use(authMiddleware());

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
router.get("/:class", async (ctx) => {
  const currentUser = ctx.session.user;
  console.log("User role:", currentUser.role);

  switch (currentUser.role) {
    case "admin":
    case "teacher":
      ctx.body = await getStudentsOfClass(ctx.params.class);
      break;
    case "student":
      if(ctx.params.class == currentUser.student_class){
        ctx.body = await getStudentsOfClass(ctx.params.class);
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

//TODO: api per aggiungere classe a Teacher (PUT)

export default router;