import { Send } from 'lucide-react'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useGetConversationWithUserQuery, useGetUserByIdQuery, useSendMessageMutation } from '../../api/chat/chatApi';
import { useGetUserQuery } from '../../api/authApi';
import { skipToken } from '@reduxjs/toolkit/query';

export default function Chat() {
    const {id} = useParams()
    const { data: user, isError: isUserError, isLoading: isUserLoading } = useGetUserQuery();
    const { data: userConversations, isLoading, error } = useGetConversationWithUserQuery(
        user ? { otherUserId: id, userId: user.id } : skipToken
    );
    const { data: receiver } = useGetUserByIdQuery(id)

    const [sendMessage] = useSendMessageMutation();
    const [message, setMessage] = useState('');
    const handleSendMessage = async () => {
        if (!message.trim()) return; 
        try {
            await sendMessage({
                receiverId : id,
                content: message,
            }).unwrap();
            setMessage('');
        } catch (err) {
            console.error("Erreur lors de l'envoi du message", err);
        }
    }

    // Gérer l'affichage selon les états
    if (isUserLoading) return <div>Chargement utilisateur...</div>;
    if (isUserError) return <div>Erreur utilisateur</div>;

    if (isLoading) return <div>Chargement conversation...</div>;
    if (error) return <div>Erreur de conversation</div>;
    
    return (
        <div className='flex flex-col  h-screen bg-gray-100'>
            {/* Header */}
            <div className="bg-white shadow p-4 border-b">
                <div className="max-w-3xl mx-auto flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    {receiver?.name.charAt(0).toUpperCase()}
                </div>
                <div className="ml-3">
                    <p className="font-medium">
                    {receiver?.email} 
                    </p>
                    <p className="text-xs text-gray-500">
                    {receiver?.role}
                    </p>
                </div>
                </div>
            </div>
            {/* Zone des messages */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="max-w-3xl mx-auto space-y-4">
                {userConversations?.map((msg) => {
                    console.log(msg);
                    
                    const isCurrentUser = msg.sender.id === user?.id;
                    return(
                    <div 
                    key={msg.id} 
                    className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                    >
                    <div 
                        className={`max-w-md rounded-lg p-3 ${
                            isCurrentUser 
                            ? 'bg-blue-500 text-white rounded-br-none' 
                            : 'bg-white text-gray-800 rounded-bl-none shadow'
                        }`}
                    >
                        {msg.content} 
                    </div>
                    </div>
                    )}   )}
                </div>
            </div>
           {/* Zone de saisie */}
        <div className="border-t border-gray-200 bg-white">
            <div className="max-w-3xl mx-auto p-4">
            <div className="flex items-center bg-white border rounded-full shadow-sm overflow-hidden">
                <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Écrivez votre message..."
                className="flex-1 py-2 px-4 outline-none"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button 
                onClick={handleSendMessage}
                className="bg-blue-500 hover:bg-blue-600 text-white p-3 focus:outline-none"
                >
                <Send size={20} />
                </button>
            </div>
            </div>
        </div>
        </div>
    )
}
