import { APIGatewayProxyHandler } from "aws-lambda";
import jwt from "jsonwebtoken";
import axios from "axios";

const SECRET = process.env.JWT_SECRET ?? "";
const BASE_URL = process.env.BASE_URL ?? "";
export const handler: APIGatewayProxyHandler = async (event) => {
  console.log(event.pathParameters?.cpf);

  // try {
  const cpf = event.pathParameters?.cpf;

  if (!cpf) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "CPF é obrigatório" }),
    };
  }

  const token = jwt.sign({ cpf }, SECRET, { expiresIn: "5m" });

  // const response = await axios.get(`http://${BASE_URL}/user/${cpf}`, {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello from Douglas to Lambda!",
      CPF: cpf ?? "Nenhum CPF enviado",
      baseurl: `http://${BASE_URL}/user/${cpf}`,
      // response: response.data,
    }),
  };
  // } catch (error) {
  //   return {
  //     statusCode: 500,
  //     body: JSON.stringify({
  //       message: "Erro!",
  //       error: `Erro => ${error}`,
  //       base_url: `http://${BASE_URL}/user`,
  //     }),
  //   };
  // }
};
