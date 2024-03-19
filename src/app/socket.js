import { io } from "socket.io-client";
import { API_BASE } from "../util/apiUrl";
const URL = process.env.NODE_ENV === "production" ? undefined : API_BASE;

export const socket = io(URL);
