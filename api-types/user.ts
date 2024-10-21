export type User = {
  /**
   * Id is generated by the database
   */
  _id: string;

  /**
   * Name of the user
   */
  firstName: string;

  /**
   * Surname of the user
   */
  lastName: string;

  /**
   * Email of the user
   */
  email: string;

  /**
   * Hashed password of the user
   */
  password: string;

  /**
   * Date of user creation
   */
  created_at: string;

  /**
   * Date of user update
   */
  updated_at: string;

  /**
   * Role can be:
   * - admin
   * - teacher
   * - student
   */
  role: Role;

  /**
   * Optional, image of the user
   */
  image?: string;

  /**
   * Rappresent the subjects that only a user with role 'teacher' can teach
   */
  subjects?: string[];

  /**
   * Rappresent the classes that only a user with role 'teacher' can teach
   */
  classes?: string[];

  /**
   * Rappresent the class that only a user with role 'student' is attending
   */
  student_class?: string;
};

export type Role = "admin" | "teacher" | "student";
