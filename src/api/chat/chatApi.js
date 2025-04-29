import { createWebSocketConnection } from "../../services/socketService";
import apiSlice from "../apiSlice";

export const chatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserConversations: builder.query({
      query: () => "/chat/conversations",
      providesTags: ["Conversations"],
    }),
    getUserById : builder.query({
      query: (idUser) => `/chat/getUser/${idUser}`,
    }),

    getConversationWithUser: builder.query({
      query: ({otherUserId}) => `/chat/conversation/${otherUserId}`,
      providesTags: (result, error, {otherUserId}) => [{ type: "Messages", id: otherUserId }],
      async onCacheEntryAdded(
        { otherUserId, userId },
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData, dispatch }
      ) {
        let stompClient;
        try {
          await cacheDataLoaded;
          
          
          stompClient = createWebSocketConnection("http://localhost:8080/ws", () => {
            stompClient.subscribe(`/queue/messages-${userId}`, (message) => {
              
              const newMessage = JSON.parse(message.body);
              console.log("message recu via websocket : ", newMessage);
              
              // if (newMessage.senderId === otherUserId || newMessage.receiverId === otherUserId) {
                updateCachedData((draft) => {
                  if (Array.isArray(draft)) {
                    draft.push(newMessage); // Ajoute le message à la fin
                  }
                });
              // }
            });
          });
        } catch (err) {
          console.error("Erreur WebSocket (messages) :", err);
        }

        await cacheEntryRemoved;
        closeWebSocketConnection(stompClient);
        console.log("Déconnexion WebSocket pour la conversation");
      },
    }),

    sendMessage: builder.mutation({
      query: (newMessage) => ({
        url: "/chat/messages",
        method: "POST",
        body: newMessage,
      }),
      invalidatesTags: (result, error, { receiverId }) => [
        { type: "Messages", id: receiverId },
        "Conversations",
      ],
    }),

  }),
});

export const {
  
  useGetUserConversationsQuery,
  useGetConversationWithUserQuery,
  useSendMessageMutation,
  useGetUserByIdQuery,
  
} = chatApi;
