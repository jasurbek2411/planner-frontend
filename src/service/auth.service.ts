import { axiosDefault } from "@/api/interceptors";
import { IAuthForm, IAuthResponse } from "./../types/user.types";
import { removeFromStorage, saveAccessToken } from "./auth-token.service";

export const authService = {
  async main(type: "login" | "register", data: IAuthForm) {
    const response = await axiosDefault.post<IAuthResponse>(`/auth/${type}`, data);
    if (response.data.accessToken) saveAccessToken(response.data.accessToken);
    return response;
  },

  async getNewTokens() {
    const response = await axiosDefault.post<IAuthResponse>(`/auth/login/access-token`);
    if (response.data.accessToken) saveAccessToken(response.data.accessToken);
    return response;
  },

  async logOut() {
    const response = await axiosDefault.post<boolean>(`/auth/logout`);
    if (response.data === true) removeFromStorage();
    return response;
  },
};
