import { APIGatewayProxyHandler } from "aws-lambda";
import jwt from "jsonwebtoken";
import axios from "axios";

const SECRET = process.env.JWT_SECRET ?? "";
const BASE_URL = process.env.BASE_URL ?? "";
export const handler: APIGatewayProxyHandler = async (event) => {
  const cpf = event.pathParameters?.cpf;
  let message;

  if (!cpf) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "CPF é obrigatório" }),
    };
  }

  const token = jwt.sign({ cpf }, SECRET, { expiresIn: "5m" });

  const response = await axios.get(`http://${BASE_URL}/user/${cpf}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 404) {
    message = "Usuário não encontrado";
  }

  return {
    statusCode: response.status,
    body: JSON.stringify({
      message,
      CPF: cpf ?? "Nenhum CPF enviado",
      baseurl: `http://${BASE_URL}/user/${cpf}`,
      response: response.data,
    }),
  };
};
