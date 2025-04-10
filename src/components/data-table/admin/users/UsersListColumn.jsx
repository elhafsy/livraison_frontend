import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ArrowUpDown, Trash2, Loader } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useValidateUserMutation } from "../../../../api/admin/adminApi";
import { useToast } from "../../../../hooks/use-toast";

export const UsersListColumn = [
    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
    
      {
        accessorKey: "id",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              #ID
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "role",
        header: "Role",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const user = row.original;
          const [editing, setEditing] = useState(false);
          //const [status, setStatus] = useState(user.status);
          const [validateUser]= useValidateUserMutation()
          const { toast } = useToast();
          
      
          const handleChange = async (newStatus) => {
            //setStatus(newStatus);
            setEditing(false);
            try{
              await validateUser({ userId: user.id, status: newStatus }).unwrap();
              toast({
                className: "bg-blue-500 text-white",
                title: "Succès",
                description: "Client update avec succès !",
              });
            } catch (error){
              console.log("Error lros de la validation:",error);
              
            }

            
          };
          const statusColors = {
            ACTIVE: "bg-green-500 text-white",
            REJECTED: "bg-red-500 text-white",
            PENDING: "bg-yellow-500 text-black",
          };
          return (
            <div onClick={() => setEditing(true)} className="cursor-pointer">
              {/* <span>{user.status}</span> */}
                <Select onValueChange={handleChange} value={user.status}>
                  <SelectTrigger className={`w-[120px] ${statusColors[user.status] || "bg-gray-300"}`}>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">✅ Active</SelectItem>
                    <SelectItem value="REJECTED">❌ Rejected</SelectItem>
                    <SelectItem value="PENDING">⏳ Pending</SelectItem>
                  </SelectContent>
                </Select>
            </div>
          );
        },
      },
    
      {
        accessorKey: "createdAt",
        header: "Created At",
      },
]