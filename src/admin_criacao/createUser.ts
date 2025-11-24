import { hash } from "argon2";
import input from "input";
import { connection } from "../dbConnection";

const criarNovoAdmin = async () => {
  const name: string = await input.text("Qual e o seu nome?");

  if (!name || name.trim().length <= 0) {
    console.log("Erro, nome esta faltando");
  }

  const senha: string = await input.password("Qual sera sua senha?");

  if (!senha || senha.trim().length <= 0) {
    console.log("Erro, senha esta faltando");
    return;
  }

  console.log(senha);

  const senha_validar: string = await input.password("Repita sua senha..");

  if (senha != senha_validar) {
    console.log("Erro, senha de validacão esta incorreta.");
    return;
  }

  const email: string = await input.text("Digite seu email:");

  if (!email || email.trim().length <= 0) {
    console.log("Erro, email faltando");
    return;
  }

  const existe_email = await connection
    .select("email")
    .from("admins")
    .where("email", email)
    .first();

  if (existe_email) {
    console.log("Email ja existe!");
    return;
  }

  const hash_str = await hash(senha);
  console.log(`Senha Hash: ${hash_str}`);

  const admin_criado = await connection("admins")
    .insert({ nome: name, email: email, senha: hash_str })
    .returning(["*"]);

  console.log(`Sua conta admin foi criado: ${JSON.stringify(admin_criado)}`);
};

criarNovoAdmin();
