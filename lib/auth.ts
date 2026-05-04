import { getMe } from "./api";

export const fetchCurrentUser = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  try {
    const user = await getMe(token);
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};