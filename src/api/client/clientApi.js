import apiSlice from "../apiSlice";

export const clientApi = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        registerInfoClient : builder.mutation({
            query : (informations)=>({
                url:"/clients",
                method : "POST",
                body: informations,
            }),
        }),
        getInfoClient: builder.query({
            query: () => "/clients/info",
        })
    })
})

export const { useRegisterInfoClientMutation, useGetInfoClientQuery } = clientApi;