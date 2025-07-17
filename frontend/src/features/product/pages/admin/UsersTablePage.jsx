import React from 'react'
import useUsersTable from "../../hooks/admin/useUsersTable";
import UsersTable from "../../components/admin/UsersTable";


const UsersTablePage = () => {
    const usersData = useUsersTable();
  return (
    
    <div className="p-4">
      <h2 className="text-3xl font-extrabold mb-6 text-indigo-700 tracking-wide drop-shadow-md text-center">User Details</h2>
      <UsersTable {...usersData} />
    </div>

  )
}

export default UsersTablePage