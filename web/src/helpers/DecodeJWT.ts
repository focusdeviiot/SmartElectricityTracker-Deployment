import { jwtDecode } from "jwt-decode";
import { DecodeToken } from "../models/decode_token";

interface tokenResponse {
    access_token: string;
    refresh_token: string;
}

export const DecodeTokenAndSetLocalStorage  = async (response: tokenResponse): Promise<void> => {
    const decoded: DecodeToken = await jwtDecode(response.access_token);
    await localStorage.setItem('access_token', response.access_token);
    await localStorage.setItem('refresh_token', response.refresh_token);
    await localStorage.setItem('user_role', decoded.role);
    await localStorage.setItem('user_username', decoded.username);
    await localStorage.setItem('user_name', decoded.name);
    await localStorage.setItem('user_exp', decoded.exp.toString());
}