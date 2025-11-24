import { v7 as uuidv7 } from "uuid";

export const gerarUUID7v = () => {
  try {
    const uuid = uuidv7();
    return uuid;
  } catch (err: any) {
    throw new Error(err);
  }
};
