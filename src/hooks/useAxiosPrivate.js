import { privateApi } from "../api/api";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestInterceptor = privateApi.interceptors.request.use(
      (config) => {
        // Add Authorization header if not already present
        if (!config.headers["Authorization"]) {
          const token = JSON.parse(localStorage.getItem("Token"));
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = privateApi.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          try {
            // Attempt token refresh
            const result = await refresh();
            console.log("fetch result from useAxios", result.accessToken);
            const newAccessToken = JSON.parse(result.accessToken);

            // Update Authorization header with new access token
            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            // Retry the original request with the updated token
            return privateApi(prevRequest);
          } catch (refreshError) {
            // Handle refresh error, e.g., redirect to login page or display error message
            console.error("Error refreshing token:", refreshError);
            // Optionally, you can redirect to the login page or log out the user
            // Example: window.location.href = "/login";
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    // Clean up interceptors when component unmounts
    return () => {
      privateApi.interceptors.request.eject(requestInterceptor);
      privateApi.interceptors.response.eject(responseInterceptor);
    };
  }, [refresh]);

  return privateApi;
};

export default useAxiosPrivate;
