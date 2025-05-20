import { APIGatewayProxyHandler } from "aws-lambda";

export const handler: APIGatewayProxyHandler = async (event) => {
  const cpf = event.pathParameters?.cpf;

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello from Douglas to Lambda!",
      CPF: cpf ?? "Nenhum CPF enviado",
    }),
  };
};
