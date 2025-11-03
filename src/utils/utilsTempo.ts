export const criarDataNoFuturo = (diasFuturo: number) => {
  try {
    const hoje = Date.now();
    const dataFuturaDias = hoje + diasFuturo * 24 * 60 * 60 * 1000;

    console.log(dataFuturaDias);

    return dataFuturaDias;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const criarDataNoPassado = (diasPassado: number) => {
  try {
    const hoje = Date.now();
    const dataPassadoDias = hoje - diasPassado * 24 * 60 * 60 * 1000;

    console.log(dataPassadoDias);

    return dataPassadoDias;
  } catch (err: any) {
    throw new Error(err);
  }
};
