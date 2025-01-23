import { Role, User, Class } from "../../api-types";
import { SessionUser } from "../types/session";
import DB from "./db";


const classSchema = new DB.Schema<Class>({
        // _id: String,
        name: String,
    }
);

export const ClassModel = DB.model("class", classSchema);

//READ
export const getAllClasses = async () => {
  return ClassModel.find({});
};

export const getNameOfClass = async (classId: String) => { 
    return ClassModel.findById(classId)
};

//create
export const createClass = async (newClass: Partial<Class>) => {
    const classDocument = new ClassModel(newClass);
    return classDocument.save();
};

//TODO FIX THE SUCCESIVE FUNCTIONS ⇂
// export const getStudentsOfClass = async (studentClass: string) => {
//   return await UserModel.find(
//     { role: "student", student_class: studentClass },
//     { first_name: 1, last_name: 1, _id: 1 },
//   );
// };

// export const getUsersWithoutClass = async () => {
//   return UserModel.find({ role: "student", student_class: null });
// };

// export const getMyStudents = async (teacher_classes: string[]) => {
//   return UserModel.find({ student_class: { $in: teacher_classes } });
// };
