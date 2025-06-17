import { useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "../../api/chat/chatApi";

export default function ChatHeader() {
  const { id } = useParams();
  const { data: receiver } = useGetUserByIdQuery(id);

  return (
    <div className="bg-white shadow p-4 border-b flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
        {receiver?.name.charAt(0).toUpperCase()}
      </div>
      <div>
        <p className="font-medium">{receiver?.email}</p>
        <p className="text-xs text-gray-500">{receiver?.role}</p>
      </div>
    </div>
  );
}
