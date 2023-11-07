import { log } from "console";
import { Ingregient, OrderDetails, User } from "../types/types";

export const BASE_URL = 'https://norma.nomoreparties.space/api/';


// interface IExtendedResponse extends Response {
//   success: boolean;
//   data?: Array<Ingregient>;
//   message?: string;
//   accessToken?: string;
//   refreshToken?: string;
//   user?: User;
//   name?: string;
//   order?: OrderDetails
// }
type ExtendedResponse = Response & {
  success: boolean;
  data?: Array<Ingregient>;
  message?: string;
  accessToken?: string;
  refreshToken?: string;
  user?: User;
  name?: string;
  order?: OrderDetails
}

const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const checkSuccess = (res: ExtendedResponse) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ответ не success: ${res}`);
};

export const request = (endpoint: string, options?: object) => {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess)
};

export const refreshToken = () => {
  return fetch(`${BASE_URL}auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse);
};
export const fetchWithRefresh = async (endpoint: string, options: any) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, options);
    return await checkResponse(res);

  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(`${BASE_URL}${endpoint}`, options);//повторяем запрос
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};




