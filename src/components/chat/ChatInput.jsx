import { useState } from "react";
import { Send } from "lucide-react";
import { useSendMessageMutation } from "../../api/chat/chatApi";

export default function ChatInput({ receiverId }) {
  const [message, setMessage] = useState("");
  const [sendMessage] = useSendMessageMutation();

  const handleSend = async () => {
    if (!message.trim()) return;
    try {
      await sendMessage({ receiverId, content: message }).unwrap();
      setMessage("");
    } catch (err) {
      console.error("Erreur envoi message :", err);
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <div className="flex items-center border rounded-full shadow-sm overflow-hidden">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Écrivez votre message..."
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 py-2 px-4 outline-none"
        />
        <button onClick={handleSend} className="bg-blue-500 hover:bg-blue-600 text-white p-3">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
