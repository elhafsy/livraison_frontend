import { apiSlice } from "./apiSlice";



export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response) => {
        localStorage.setItem("token", response.access);
        return response;
      },
    }),
    register: builder.mutation({
      query:(userData)=>({
        url:"/register",
        method:"POST",
        body:userData
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags:['Users'],
      async onQueryStarted(args, {dispatch, queryFulfilled}){
        try{
          await queryFulfilled;
          localStorage.removeItem("token");
          dispatch(api.util.resetApiState());
        }catch(err){
          console.log(err);
          
        }
      }
    }),
    getUser: builder.query({
      query: () => "/user",
      providesTags: ["User"],
    })
  }),
});

export const { useLoginMutation, useLogoutMutation, useGetUserQuery, useRegisterMutation } = authApi;
