import { CheckCheck, CheckIcon } from "lucide-react";
import { useRef, useEffect } from "react";

export default function ChatMessages({ messages, userId }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTime = (dateString) =>
    new Date(dateString).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg) => {
        const isMine = msg.sender.id === userId;
        return (
          <div key={msg.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs sm:max-w-md rounded-2xl py-2 px-3 ${
                isMine
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-white text-gray-800 border rounded-bl-none shadow-sm"
              }`}
            >
              <div className="text-sm">{msg.content}</div>
              <div className="text-xs flex justify-end items-center gap-1 mt-1">
                <span>{formatTime(msg.sentAt)}</span>
                {isMine && (msg.read ? <CheckCheck size={14} /> : <CheckIcon size={14} />)}
              </div>
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
