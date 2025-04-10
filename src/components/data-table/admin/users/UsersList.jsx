import React, { useEffect, useState } from 'react'
import { useDeleteUsersMutation, useGetAllUsersQuery, useValidateUserMutation } from '../../../../api/admin/adminApi'
import { DataTable } from '../../DataTable'
import { UsersListColumn } from './UsersListColumn'
import { LoaderCircle } from 'lucide-react'
import SupprimerUsers from './SupprimerUsers'
import { useGetAllNotificationsQuery } from '../../../../api/notifications/notificationApi'

export default function UsersList() {
    const {data: users, isLoading} = useGetAllUsersQuery()
    const {data:notifications} = useGetAllNotificationsQuery("1")
    const [ids, setId] = useState([]);
    if(isLoading) return <p>Chargement des utlisateur ....</p>

    const handleCallback = (idFromChild) => {
      setId(idFromChild);
    };

  return (
    <>
    {
      isLoading ? (
        <div
            style={{ height: "70vh" }}
            className="flex flex-col justify-center items-center"
        >
            <LoaderCircle className={"animate-spin"} />  <p>s'il vous plaîs, attendez ...</p>
        </div>
      ) : (
      <>
        <div className={"flex mb-3 flex-wrap"}>
                <div>{ids.length >= 1 && <SupprimerUsers ids={ids} />}</div>
        </div>
        <DataTable columns={UsersListColumn} data={users} paparentCallback={handleCallback} />
      </>)
    }
    </>
  )
}
