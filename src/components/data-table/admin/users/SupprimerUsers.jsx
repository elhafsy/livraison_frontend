import React, { useState } from "react";
import { ArrowUpDown, Loader, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeleteUsersMutation, useGetAllUsersQuery } from "../../../../api/admin/adminApi";




export default function SupprimerUsers({ids}) {
    const [open, setOpen] = useState(false);
    const [deleteUsers,{isLoading, isError}] = useDeleteUsersMutation()
    const {data:users, refetch} = useGetAllUsersQuery()

    const handleDelete = async () => {
        const deletingLoader = toast.loading("Suppression en cours...");
        const previousUsers = users; // Sauvegarde de l'état précédent
    
        try {
          // Mise à jour optimiste : Suppression de l'utilisateur avant la réponse du serveur
          const newUsers = users.filter((user) => !ids.includes(user.id));
          refetch({ force: true, users: newUsers }); // Mise à jour du cache
    
          // Appel API
          await deleteUsers(ids).unwrap();
          toast.success("Utilisateurs supprimés avec succès", {
            className: "!bg-red-500 !text-white",
          });
        } catch (error) {
          toast.error("Erreur lors de la suppression", {
            className: "!bg-red-500 !text-white",
          });
    
          // Restauration des données en cas d'erreur
          refetch({ force: true, users: previousUsers });
        } finally {
          toast.dismiss(deletingLoader);
          setOpen(false);
        }
      };
  return (
    <>
    <AlertDialog>
      <AlertDialogTrigger
        onClick={() => {
          setOpen(true);
        }}
      >
        <Button variant="destructive" className="ms-4 ">
          <Trash2 className="sm:mr-2" />
          <span className="max-md:hidden">Delete Selections</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px] max-sm:w-[350px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
          Are you sure you want to delete this entry? This action is irreversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className={"bg-red-500 hover:bg-red-600"}
            onClick={handleDelete}
          >
            {isLoading ? (
              <Loader className={"mx-2 my-2 animate-spin"} />
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </>
  )
}

