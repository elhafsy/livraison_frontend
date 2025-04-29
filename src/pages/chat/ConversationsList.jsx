// components/ConversationsList.tsx
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function ConversationsList({ conversations, onSelectUser }) {
  return (
    <div className="p-4 space-y-2">
      {conversations.map((conv, idx) => {
        const { otherUser, lastMassage, unreadCount } = conv;
        return (
          <div
            key={idx}
            className="flex items-center justify-between p-2 rounded-xl hover:bg-muted cursor-pointer"
            onClick={() => onSelectUser(otherUser)}
          >
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarFallback>{otherUser.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{otherUser.name}</div>
                <div className="text-sm text-muted-foreground truncate w-40">
                  {lastMassage?.content || "Pas de message"}
                </div>
              </div>
            </div>
            {unreadCount > 0 && <Badge>{unreadCount}</Badge>}
          </div>
        );
      })}
    </div>
  );
}
