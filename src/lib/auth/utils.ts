import { User } from "@/redux/features/slices/userSlice";

export const setRedirectUrl = (url: string) => {
  localStorage.setItem("redirectUrl", url);
};

export const getRedirectUrl = () => {
  const url = localStorage.getItem("redirectUrl");
  if (url) {
    return url;
  } else {
    return null;
  }
};

export const clearRedirectUrl = () => {
  localStorage.removeItem("redirectUrl");
};

export const getLanguage = () => {
  return localStorage.getItem("language")?.toLowerCase() || "en";
};

// localStorage.setItem("user", JSON.stringify(user));
export const saveUserToLocalStorage = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// Retrieve user data from localStorage
export const retrieveUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user) as User;
  }
  return null;
};

// Remove user data from localStorage
export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("redirectUrl");
};
