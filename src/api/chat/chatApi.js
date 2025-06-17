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
              
              const senderId = Number(newMessage.sender.id);
              const receiverId = Number(newMessage.receiver.id);
              const isCurrentConversation =
                  (senderId === Number(otherUserId) && receiverId === Number(userId)) ||
                  (senderId === Number(userId) && receiverId === Number(otherUserId));

                if (isCurrentConversation) {
                  updateCachedData((draft) => {
                    draft.push(newMessage);
                  });
                }

            });
            stompClient.subscribe(`/queue/message-read-${userId}`, (message) => {
              const readInfo = JSON.parse(message.body);
              const { messageId, readerId } = readInfo;
              console.log("Message read info:", readInfo);
              
              console.log(readInfo);
              
              updateCachedData((draft) => {
                console.log("draft avant mise à jour :", draft);
                
                const msg = draft.find(m => m.id === readInfo);
                if (msg) {
                  msg.read = true;
                }
              });
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

    markMessageAsRead: builder.mutation({
      query: (messageId) => ({
        url: `/chat/markAsRead/${messageId}`,
        method: "POST",
      }),
      // Pas besoin d'invalidateTags ici
    }),

  }),
});

export const {
  
  useGetUserConversationsQuery,
  useGetConversationWithUserQuery,
  useSendMessageMutation,
  useGetUserByIdQuery,
  useMarkMessageAsReadMutation,
} = chatApi;
