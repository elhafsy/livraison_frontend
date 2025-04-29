
// import { subscribeToTopic } from "../../services/socketService";
import SockJS from "sockjs-client";
import { Client } from '@stomp/stompjs';
import apiSlice from "../apiSlice";
import { closeWebSocketConnection, createWebSocketConnection } from "../../services/socketService";

export const notificationApi = apiSlice.injectEndpoints({
    endpoints : (builder)=>({
        getAllNotifications: builder.query({
            query: () => "/notifications",
            providesTags: ["Notifications"],
        
            async onCacheEntryAdded(
                arg, 
                { cacheDataLoaded, cacheEntryRemoved, updateCachedData, dispatch }
            ) {
                let stompClient
                try{
                    await cacheDataLoaded
                    const userId = arg
                    stompClient = createWebSocketConnection("http://localhost:8080/ws",()=>{
                        stompClient.subscribe(`/queue/notifications-${userId}`,(message)=>{
                            const newNotification = JSON.parse(message.body)
                            updateCachedData((draft)=>{
                                if(Array.isArray(draft)){
                                    draft.unshift(newNotification)
                                }
                            })
                            if (Notification.permission === 'granted') {
                                new Notification(newNotification.title, {
                                    body: newNotification.content,
                                    icon: '/liv1.jpg',
                                });
                            } else {
                                console.warn('Les notifications système ne sont pas autorisées.');
                            }
                        })
                    })
                }catch(err){
                    console.error("Erreur Websocket : ", err);
                }

                await cacheEntryRemoved;
                closeWebSocketConnection(stompClient)
                console.log("Déconnexion WebSocket pour les notifications");
                    
            
            }
        }),
        markAsRead: builder.mutation({
            query: (id)=>({
                url: `/notifications/${id}/read`,
                method: "PUT",
            }),
            invalidatesTags: ["Notifications"]
        }),
        markAllAsRead : builder.mutation({
            query: () => ({
                url: "/notifications/read-all",
                method: "PUT",
            }),
            invalidatesTags: ["Notifications"],
        }),

        
    }),
});

export const {useGetAllNotificationsQuery,useMarkAllAsReadMutation,useMarkAsReadMutation} = notificationApi;