import { connection } from "../dbConnection";
import { admin } from "../types/entidades";

export class LoginData {
  procurarAdminPorNome = async (email: string): Promise<admin[]> => {
    try {
      console.log(email);

      const admin_user = await connection("admins")
        .select("*")
        .where("email", email);

      console.log(admin_user);
      return admin_user;
    } catch (err: any) {
      throw new Error(err);
    }
  };
}
