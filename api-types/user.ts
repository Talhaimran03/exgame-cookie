export type User = {
  /**
   * Id is generated by the database
   */
  _id: string;

  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;

  /**
   * Role can be:
   * - admin
   * - teacher
   * - student
   */
  role: "admin" | "teacher" | "student";

  image?: string;

  /**
   * Rappresent the subjects that a user with role 'teacher' can teach
   */
  subjects?: string[];

  /**
   * Rappresent the classes that a user with role 'teacher' can teach
   */
  classes?: string[];

  /**
   * Rappresent the class that a user with role 'student' is attending
   */
  student_class: string;
};
