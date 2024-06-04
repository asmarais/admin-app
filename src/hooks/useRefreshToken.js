import api from "../api/api";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const refreshToken = localStorage.getItem("RefreshToken");
    console.log("refresh Token ", refreshToken);

    try {
      const response = await api.post("/auth/refresh", refreshToken);
      console.log(response.data.accessToken);
      const newAccessToken = JSON.stringify(response.data.accessToken);
      localStorage.setItem("Token", newAccessToken);

      return { accessToken: newAccessToken };
    } catch (error) {
      console.error("Error refreshing token:", error);
      return null;
    }
  };

  return refresh;
};

export default useRefreshToken;
