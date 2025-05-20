import { APIGatewayProxyHandler } from "aws-lambda";
import jwt from "jsonwebtoken";
import axios from "axios";

export const handler: APIGatewayProxyHandler = async (event) => {
  const cpf = event.pathParameters?.cpf;
  const SECRET = process.env.JWT_SECRET ?? "";

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello from Douglas to Lambda!",
      CPF: cpf ?? "Nenhum CPF enviado",
      secret: SECRET,
    }),
  };
};
