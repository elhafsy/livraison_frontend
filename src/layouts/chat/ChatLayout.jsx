import React from 'react'

import { useGetUserQuery } from "@/api/authApi";
import { useGetUserConversationsQuery } from "@/api/chat/chatApi";
import { useParams, useNavigate } from "react-router-dom";

import ConversationList from "@/components/chat/ConversationList";
import { ArrowLeft } from "lucide-react";
import useWindowWidth from "@/hooks/useWindowWidth";
import Chat from '../../pages/chat/Chat';
export default function ChatLayout() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: user } = useGetUserQuery();
    const { data: conversations } = useGetUserConversationsQuery(user?.id);
    const width = useWindowWidth();
    const isMobile = width < 768;
    return (
        <div className="flex h-screen overflow-hidden">
            <aside className={`${id && isMobile ? "hidden" : "block"} md:block w-full md:w-[300px] border-r bg-white`}>
                <ConversationList conversations={conversations} activeId={id} />
            </aside>

            <main className={`flex-1 ${!id && isMobile ? "hidden" : "block"} bg-gray-100 relative`}>
                {isMobile && id && (
                <button
                    onClick={() => navigate("/chat")}
                    className="absolute top-2 left-2 z-10 bg-white border rounded-full p-2 shadow-md"
                >
                    <ArrowLeft size={18} />
                </button>
                )}
                {id ? (
                <Chat />
                ) : (
                <div className="h-full flex items-center justify-center text-gray-500">Sélectionnez un utilisateur</div>
                )}
            </main>
        </div>
    )
}
