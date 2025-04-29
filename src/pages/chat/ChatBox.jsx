// components/ChatBox.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatBox({ user, messages, onSendMessage }) {
  const [message, setMessage] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b font-semibold text-lg">{user.name}</div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-2 p-4 flex flex-col">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`max-w-xs p-2 rounded-xl text-sm ${
                msg.sender.id === user.id
                  ? "bg-muted"
                  : "bg-primary text-primary-foreground self-end"
              }`}
            >
              {msg.content}
              <div className="text-xs text-muted-foreground text-right mt-1">
                {new Date(msg.sentAt).toLocaleTimeString()}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Champ d'entrée */}
      <div className="p-4 border-t">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full border rounded-lg p-2"
          placeholder="Écrire un message..."
        />
      </div>
    </div>
  );
}
