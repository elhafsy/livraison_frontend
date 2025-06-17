// import { CheckCheck, CheckIcon, Send } from 'lucide-react'
// import React, { useEffect, useRef, useState } from 'react'
// import { useParams } from 'react-router-dom';
// import { useGetConversationWithUserQuery, useGetUserByIdQuery, useGetUserConversationsQuery, useMarkMessageAsReadMutation, useSendMessageMutation } from '../../api/chat/chatApi';
// import { useGetUserQuery } from '../../api/authApi';
// import { skipToken } from '@reduxjs/toolkit/query';

// export default function Chat() {
//     const {id} = useParams()
//     const bottomRef = useRef(null);
//     const [markMessageAsRead] = useMarkMessageAsReadMutation();
//     const {data:getUserConversations, isLoadingConversation} = useGetUserConversationsQuery();
    


//     const { data: user, isError: isUserError, isLoading: isUserLoading } = useGetUserQuery();
//     const { data: userConversations, isLoading, error } = useGetConversationWithUserQuery(
//         user ? { otherUserId: id, userId: user.id } : skipToken
//     );
//     const { data: receiver } = useGetUserByIdQuery(id)
//     const formatTime = (dateString) => {
//         const date = new Date(dateString);
//         return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     };
//     const [sendMessage] = useSendMessageMutation();
//     const [message, setMessage] = useState('');
//     const handleSendMessage = async () => {
//         if (!message.trim()) return; 
//         try {
//             await sendMessage({
//                 receiverId : id,
//                 content: message,
//             }).unwrap();
//             setMessage('');
//         } catch (err) {
//             console.error("Erreur lors de l'envoi du message", err);
//         }
//     }
//     useEffect(() => {
//         if (bottomRef.current) {
//             bottomRef.current.scrollIntoView({ behavior: 'smooth' });
//         }
//     },[userConversations]);
//     useEffect(() => {
//         if (!userConversations) return;

//         userConversations.forEach(msg => {
//         if (!msg.read && msg.receiver.id === user.id) {
//             markMessageAsRead(msg.id)
//             .unwrap()
//             .then(() => console.log(`Message ${msg.id} marked as read`))
//             .catch(err => console.error('Erreur mark as read:', err));
//         }
//         });
//     }, [userConversations, user, markMessageAsRead]);
//     // Gérer l'affichage selon les états
//     if (isUserLoading) return <div>Chargement utilisateur...</div>;
//     if (isUserError) return <div>Erreur utilisateur</div>;

//     if (isLoading) return <div>Chargement conversation...</div>;
//     if (error) return <div>Erreur de conversation</div>;
    
//     return (
//         <div className='flex flex-col  h-screen bg-gray-100'>
//             {/* Header */}
//             <div className="bg-white shadow p-4 border-b">
//                 <div className="max-w-3xl mx-auto flex items-center">
//                 <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
//                     {receiver?.name.charAt(0).toUpperCase()}
//                 </div>
//                 <div className="ml-3">
//                     <p className="font-medium">
//                     {receiver?.email} 
//                     </p>
//                     <p className="text-xs text-gray-500">
//                     {receiver?.role}
//                     </p>
//                 </div>
//                 </div>
//             </div>
//             {/* Zone des messages */}
//             <div className="flex-1 overflow-y-auto p-4">
//                 <div className="max-w-3xl mx-auto space-y-4">
//                 {userConversations?.map((msg) => {
//                     console.log(msg);
                    
//                     const isCurrentUser = msg.sender.id === user?.id;
//                     return(
//                     <div 
//                     key={msg.id} 
//                     className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
//                     >
//                     <div 
//                         className={`max-w-xs sm:max-w-md rounded-2xl py-2 px-3 ${
//                             isCurrentUser 
//                             ? 'bg-blue-600 text-white rounded-br-none' 
//                             : 'bg-white text-gray-800 rounded-bl-none shadow-md border border-gray-100'
//                         }`}
//                     >
//                         <div className='text-sm'>{msg.content} </div>
//                         <div className={`text-xs flex items-center justify-end mt-1 gap-1 ${isCurrentUser ? 'text-blue-100' : 'text-gray-400'}`}>
//                             <span className="whitespace-nowrap">{formatTime(msg.sentAt)}</span>
//                             {isCurrentUser && (msg.read ? (
//                                 <span title={msg.read ? "Lu" : "Envoyé"} className="text-green-300">
//                                     <CheckCheck size={14} className='text-gray-400' />
//                                 </span>
//                             ) : <CheckIcon size={14}/>)}

//                         </div>
//                     </div>
//                     </div>
//                     )}   )}
//                     <div ref={bottomRef} />
//                 </div>
//             </div>
//            {/* Zone de saisie */}
//         <div className="border-t border-gray-200 bg-white">
//             <div className="max-w-3xl mx-auto p-4">
//             <div className="flex items-center bg-white border rounded-full shadow-sm overflow-hidden">
//                 <input
//                 type="text"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 placeholder="Écrivez votre message..."
//                 className="flex-1 py-2 px-4 outline-none"
//                 onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//                 />
//                 <button 
//                 onClick={handleSendMessage}
//                 className="bg-blue-500 hover:bg-blue-600 text-white p-3 focus:outline-none"
//                 >
//                 <Send size={20} />
//                 </button>
//             </div>
//             </div>
//         </div>
//         </div>
//     )
// }


import { useParams } from "react-router-dom";
import { useGetConversationWithUserQuery, useMarkMessageAsReadMutation } from "@/api/chat/chatApi";
import { useGetUserQuery } from "@/api/authApi";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInput from "@/components/chat/ChatInput";
import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect } from "react";

export default function Chat() {
    const { id } = useParams();
    const { data: user } = useGetUserQuery();
    const { data: messages } = useGetConversationWithUserQuery(
        user ? { userId: user.id, otherUserId: id } : skipToken
    );
    const [markAsRead] = useMarkMessageAsReadMutation();

    useEffect(() => {
        if (messages) {
        messages.forEach((msg) => {
            if (!msg.read && msg.receiver.id === user?.id) {
            markAsRead(msg.id).catch(console.error);
            }
        });
        }
    }, [messages, markAsRead, user]);

    if (!messages) return <div>Chargement...</div>;

    return (
        <div className="flex flex-col h-screen">
            <ChatHeader />
            <ChatMessages messages={messages} userId={user?.id} />
            <ChatInput receiverId={id} />
        </div>
    );
}
