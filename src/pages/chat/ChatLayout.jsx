// import React from "react";
// import { useGetUserQuery } from "../../api/authApi";
// import { useGetUserConversationsQuery } from "../../api/chat/chatApi";
// import { Link, Outlet, useParams } from "react-router-dom";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Badge } from "@/components/ui/badge";
// import Chat from "./Chat";

// export default function ChatLayout() {
//   const { data: user } = useGetUserQuery();
//   const { data: conversations, isLoading } = useGetUserConversationsQuery(user?.id);
//   const { id } = useParams();

//   const formatTime = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//   };

//   return (
//     <div className="flex h-screen overflow-hidden">
//       {/* Sidebar gauche */}
//       <div className="w-[300px] border-r bg-white p-2">
//         <ScrollArea className="h-full">
//           <h2 className="text-lg font-bold mb-4 px-2">Utilisateurs</h2>
//           {isLoading && <div>Chargement...</div>}
//           {conversations?.map(({ otherUser, lastMessage, unreadCount }) => (
//             <Link
//               to={`/chat/${otherUser.id}`}
//               key={otherUser.id}
//               className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition ${
//                 id == otherUser.id ? "bg-gray-100" : ""
//               }`}
//             >
//               <Avatar>
//                 <AvatarFallback>{otherUser.name.charAt(0).toUpperCase()}</AvatarFallback>
//               </Avatar>
//               <div className="flex-1">
//                 <div className="text-sm font-medium">{otherUser.name}</div>
//                 <div className="text-xs text-gray-500 truncate max-w-[180px]">
//                   {lastMessage?.content}
//                 </div>
//               </div>
//               <div className="flex flex-col items-end gap-1">
//                 <span className="text-xs text-gray-400">{formatTime(lastMessage?.sentAt)}</span>
//                 {unreadCount > 0 && (
//                   <Badge variant="secondary" className="text-xs">{unreadCount}</Badge>
//                 )}
//               </div>
//             </Link>
//           ))}
//         </ScrollArea>
//       </div>

//       {/* Zone de conversation */}
//       <div className="flex-1 bg-gray-100">
//         {id ? <Chat/> :  <div className="flex items-center justify-center h-full text-gray-500">Sélectionnez un utilisateur</div>}
//       </div>
//     </div>
//   );
// }
import React from "react";
import { useGetUserQuery } from "../../api/authApi";
import { useGetUserConversationsQuery } from "../../api/chat/chatApi";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Chat from "./Chat";

export default function ChatLayout() {
  const { data: user } = useGetUserQuery();
  const { data: conversations } = useGetUserConversationsQuery(user?.id);
  const { id } = useParams();
  const navigate = useNavigate();

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const isMobile = window.innerWidth < 768;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar gauche */}
      <div
        className={`${
          id && isMobile ? "hidden" : "block"
        } md:block w-full md:w-[300px] border-r bg-white p-2`}
      >
        <ScrollArea className="h-full">
          <h2 className="text-lg font-bold mb-4 px-2">Utilisateurs</h2>
          {conversations?.map(({ otherUser, lastMessage, unreadCount }) => (
            <Link
              to={`/chat/${otherUser.id}`}
              key={otherUser.id}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition ${
                id == otherUser.id ? "bg-gray-100" : ""
              }`}
            >
              <Avatar>
                <AvatarFallback>{otherUser.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="text-sm font-medium">{otherUser.name}</div>
                <div className="text-xs text-gray-500 truncate max-w-[180px]">
                  {lastMessage?.content}
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs text-gray-400">
                  {formatTime(lastMessage?.sentAt)}
                </span>
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </div>
            </Link>
          ))}
        </ScrollArea>
      </div>

      {/* Zone de conversation */}
      <div
        className={`flex-1 bg-gray-100 relative ${
          !id && isMobile ? "hidden" : "block"
        }`}
      >
        {/* Back button on mobile */}
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
          <div className="flex items-center justify-center h-full text-gray-500">
            Sélectionnez un utilisateur
          </div>
        )}
      </div>
    </div>
  );
}
