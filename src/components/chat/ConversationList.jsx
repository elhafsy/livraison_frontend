import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export default function ConversationList({ conversations, activeId }) {
  const formatTime = (dateString) =>
    new Date(dateString).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <ScrollArea className="h-full p-2">
      <h2 className="text-lg font-bold mb-4">Utilisateurs</h2>
      {conversations?.map(({ otherUser, lastMessage, unreadCount }) => (
        <Link
          to={`/chat/${otherUser.id}`}
          key={otherUser.id}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition ${
            activeId == otherUser.id ? "bg-gray-100" : ""
          }`}
        >
          <Avatar>
            <AvatarFallback>{otherUser.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="text-sm font-medium">{otherUser.name}</div>
            <div className="text-xs text-gray-500 truncate max-w-[180px]">{lastMessage?.content}</div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-xs text-gray-400">{formatTime(lastMessage?.sentAt)}</span>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
        </Link>
      ))}
    </ScrollArea>
  );
}
