export const getErrorMessage = (error: unknown) => {
  // Verifica se o erro tem a propriedade `message` antes de acessar
  const errorMessage =
    error instanceof Error ? error.message : "Erro desconhecido";
  return errorMessage;
};
