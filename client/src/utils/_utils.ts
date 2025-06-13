import { jwtDecode } from "jwt-decode";

interface ITokenPayload {
  exp: number;
  [key: string]: any;
}

export const isAuthenticated = (): boolean => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) return false;

  try {
    const tokenPayload = jwtDecode<ITokenPayload>(accessToken);
    const isTokenExpired = tokenPayload.exp * 1000 < Date.now();

    if (isTokenExpired) {
      localStorage.removeItem("accessToken");
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    localStorage.removeItem("accessToken");
    return false;
  }
};

export const roles = [
  { value: "admin", label: "Admin" },
  { value: "user", label: "User" },
];
