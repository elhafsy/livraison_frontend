import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api`,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    } else {
      headers.delete("Authorization");
    }
    
    return headers;
  },
});

const enhancedBaseQuery = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    // Suppression du token en cas de non-authentification
    localStorage.removeItem("token");
    localStorage.setItem("AUTHENTICATED", "false");

    // Redirection vers la page de connexion
    // window.location.assign("/login");

    return {
      error: { status: 401, data: "Token expiré ou non valide. Veuillez vous reconnecter." },
    };
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: enhancedBaseQuery,
  tagTypes: ["Users","Notifications"],
    endpoints: () => ({}),
});

export default apiSlice


