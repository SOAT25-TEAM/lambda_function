import { APIGatewayProxyHandler } from "aws-lambda";
import jwt from "jsonwebtoken";
import axios from "axios";

const SECRET = process.env.JWT_SECRET ?? "";
const BASE_URL = process.env.BASE_URL ?? "";

export const handler: APIGatewayProxyHandler = async (event) => {
  const cpf = event.pathParameters?.cpf;

  if (!cpf) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "CPF é obrigatório" }),
    };
  }

  const token = jwt.sign({ cpf }, SECRET, { expiresIn: "5m" });

  try {
    const response = await axios.get(`http://${BASE_URL}/user/${cpf}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      statusCode: response.status,
      body: JSON.stringify({
        message: "Usuário encontrado",
        CPF: cpf,
        response: response.data,
      }),
    };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const errorMessage =
        status === 404 ? "Usuário não encontrado" : "Erro na requisição";

      return {
        statusCode: status,
        body: JSON.stringify({
          message: errorMessage,
          CPF: cpf,
          error: error.response?.data ?? error.message,
        }),
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Erro interno inesperado",
        error: error?.message || "Erro desconhecido",
      }),
    };
  }
};
