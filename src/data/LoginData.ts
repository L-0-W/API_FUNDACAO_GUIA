import { connection } from "../dbConnection";
import { admin } from "../types/entidades";

export class LoginData {
  procurarAdminPorNome = (email: string): Promise<admin[]> => {
    try {
      const admin_user = connection
        .select("id", "nome", "email", "senha")
        .from("admins")
        .where("email", email);

      return admin_user;
    } catch (err: any) {
      throw new Error(err);
    }
  };
}
