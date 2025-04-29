// components/ChatLayout.tsx
import { useState } from "react";
import ConversationsList from "./ConversationsList";
import ChatBox from "./ChatBox";
import useWebSocket from "@/hooks/useWebSocket";

export default function ChatLayout({ userConversations, getConversation, currentUser }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  //const { sendMessage } = useWebSocket(currentUser.id, handleIncomingMessage);

  function handleIncomingMessage(message) {
    setMessages((prev) => [...prev, message]);
  }

  function handleSendMessage(content) {
    const newMsg = {
      senderId: currentUser.id,
      receiverId: selectedUser.id,
      content,
    };
    sendMessage(newMsg);
    // Optimistic UI update
    setMessages((prev) => [...prev, {
      ...newMsg,
      id: Date.now(),
      sender: { id: currentUser.id },
      sentAt: new Date().toISOString()
    }]);
  }

  function handleSelectUser(user) {
    setSelectedUser(user);
    const filtered = getConversation.filter(
      (msg) =>
        (msg.sender.id === currentUser.id && msg.receiver.id === user.id) ||
        (msg.sender.id === user.id && msg.receiver.id === currentUser.id)
    );
    setMessages(filtered);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 h-screen">
      <div className="md:col-span-1 border-r overflow-y-auto">
        <ConversationsList
          conversations={userConversations}
          onSelectUser={handleSelectUser}
        />
      </div>

      <div className="md:col-span-2 h-full">
        {selectedUser ? (
          <ChatBox
            user={selectedUser}
            messages={messages}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Sélectionnez une conversation
          </div>
        )}
      </div>
    </div>
  );
}
