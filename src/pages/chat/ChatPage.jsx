// pages/ChatPage.tsx
import { useState, useEffect } from "react";

import useWebSocket from "@/hooks/useWebSocket";

import { useGetConversationWithUserQuery, useGetUserConversationsQuery, useSendMessageMutation } from "../../api/chat/chatApi";
import ChatLayout from "./ChatLayout";

const currentUser = { id: 1, name: "Ali" };

export default function ChatPage() {
  const { data: userConversations, isLoading, error } = useGetUserConversationsQuery(currentUser.id);
  const [selectedUser, setSelectedUser] = useState(null);
  const { data: conversation, refetch } = useGetConversationWithUserQuery(
    { userId: currentUser.id, otherUserId: selectedUser?.id },
    { skip: !selectedUser }
  );
  const [sendMessage] = useSendMessageMutation();

  // Utiliser le WebSocket pour écouter les messages en temps réel
  useWebSocket(currentUser.id);

  const handleSendMessage = async (content) => {
    const message = {
      senderId: currentUser.id,
      receiverId: selectedUser.id,
      content,
    };

    try {
      await sendMessage(message).unwrap();
      refetch(); // Recharger la conversation après envoi du message
    } catch (err) {
      console.error("Erreur lors de l'envoi du message", err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Erreur de chargement</div>;

  return (
    <ChatLayout
      currentUser={currentUser}
      userConversations={userConversations}
      getConversation={conversation || []}
      onSendMessage={handleSendMessage}
    />
  );
}
