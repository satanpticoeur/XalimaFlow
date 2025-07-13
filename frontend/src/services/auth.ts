import api from "./api";

interface AuthResponse {
  access_token: string;
  token_type: string;
}

interface RegisterResponse {
  id: string;
  email: string;
}
interface User {
  email: string;
  id: number;
}

export const register = async (
  email: string,
  password: string
): Promise<RegisterResponse> => {
  const response = await api.post("/auth/register", { email, password });
  return response.data as RegisterResponse;
};

export const login = async (
  username: string,
  password: string
): Promise<AuthResponse> => {
  const form_data = new URLSearchParams();
  form_data.append("username", username);
  form_data.append("password", password);

  const response = await api.post("/auth/login", form_data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("access_token");
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get("/users/me/");
  return response.data as User;
};
