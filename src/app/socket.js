import { io } from "socket.io-client";
import { API_BASE } from "../util/apiUrl";
const URL =
  process.env.NODE_ENV === "production" ? API_BASE : `http://localhost:3001`;

console.log("socket on url", URL);
export const socket = io(URL);
