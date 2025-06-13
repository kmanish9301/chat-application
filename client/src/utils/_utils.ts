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

export const formatTime = (isoString: string): string => {
  const date = new Date(isoString);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();

  const timeString = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isToday) {
    return timeString; // e.g. "1:30 PM"
  } else {
    return date.toLocaleDateString(); // e.g. "6/10/2025"
  }
};
