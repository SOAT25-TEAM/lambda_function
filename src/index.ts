import { APIGatewayProxyHandler } from "aws-lambda";
import jwt from "jsonwebtoken";
import axios from "axios";

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const cpf = event.pathParameters?.cpf;
    const SECRET = process.env.JWT_SECRET ?? "";
    const BASE_URL = process.env.BASE_URL ?? "";

    if (!cpf) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "CPF é obrigatório" }),
      };
    }

    const token = jwt.sign({ cpf }, SECRET, { expiresIn: "5m" });

    const response = await axios.get(`http://${BASE_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Hello from Douglas to Lambda!",
        CPF: cpf ?? "Nenhum CPF enviado",
        baseurl: `http://${BASE_URL}/user`,
        response: response.data,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Erro!",
        error: `Erro => ${error}`,
      }),
    };
  }
};
