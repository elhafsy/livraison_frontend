import apiSlice from "../apiSlice";
import { closeWebSocketConnection, createWebSocketConnection } from "../../services/socketService";

export const adminApi = apiSlice.injectEndpoints({
    endpoints : (builder)=>({
        getAllUsers: builder.query({
            query: ()=> "/admin/users",
            providesTags: ["Users"],
            async onCacheEntryAdded(_, { cacheDataLoaded, cacheEntryRemoved, dispatch }) {
                let stompClient;
                try {
                    await cacheDataLoaded;

                    stompClient = createWebSocketConnection("http://localhost:8080/ws", () => {
                        console.log("Connexion WebSocket établie pour la liste des utilisateurs");

                        stompClient.subscribe("/topic/users", () => {
                            console.log("Mise à jour de la liste des utilisateurs !");
                            dispatch(apiSlice.util.invalidateTags(["Users"]));
                        });
                    });
                } catch (error) {
                    console.error("Erreur WebSocket:", error);
                }

                await cacheEntryRemoved;
                closeWebSocketConnection(stompClient);
                // }
            },






        }),
        validateUser: builder.mutation({
            query: ({ userId, status }) => ({
                url: `/admin/validate/${userId}?status=${status}`,
                method: "PUT",
                responseHandler: (response) => response.text(),
            }),
            transformErrorResponse: (responseText)=>{
                return {message : responseText}
            },
            invalidatesTags: ["Users"], // Rafraîchir la liste après modification
        }),
        deleteUsers: builder.mutation({
            query: (ids)=>({
                url: '/admin/deleteUsers',
                method: 'DELETE',
                body: ids,
            }),
            invalidatesTags: ["Users"], 

        })
    }),
});

export const {useGetAllUsersQuery, useValidateUserMutation, useDeleteUsersMutation} = adminApi;