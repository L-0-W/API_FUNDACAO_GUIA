import jwt from "jsonwebtoken";

export const verificarToken = (token: string) => {
  let eValido = false;
  const jwt_check_retorno = jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (err: any, req: any) => {
      if (err) return (eValido = false);
      return (eValido = true);
    },
  );

  return eValido;
};
