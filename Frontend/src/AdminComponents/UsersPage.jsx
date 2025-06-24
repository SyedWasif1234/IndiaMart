import React from 'react'
import { Link } from 'react-router-dom'
import { Pencil, Trash2 } from "lucide-react";
import { useAdminStore } from '../store/useAdminStore';
import { useState , useEffect , useMemo} from 'react';
import { Loader } from 'lucide-react';



const UsersPage = () => {

   const {listUser , usersList , isUsersListLoading , DeleteUser } = useAdminStore();
   useEffect(() => {
      listUser();
   },[listUser])

  console.log("list of users:",usersList);


  const [currentPage, setCurrentPage] = useState(1);

  //pagination logic
  const userPerPage = 5 ;
  const totalPages = Math.ceil(usersList?.length / userPerPage);
  const PaginatedUser = useMemo(() => {
    return usersList.slice((currentPage - 1) * userPerPage, currentPage * userPerPage);
  },[currentPage , usersList])

  console.log("paginated user :", PaginatedUser)

  if(isUsersListLoading){
    return(
        <div className="flex items-center justify-center h-screen text-gray-900">
            <Loader className="size-10 animate-spin"/>
        </div>
    )
  }

  return (
    <div className="p-6 text-white bg-gradient-to-r from-gray-300 to-gray-100" >
      <h2 className="text-xl font-bold text-gray-900 mb-4">Users</h2>

       <div className="overflow-x-auto rounded-xl shadow-md text-white bg-gray-700">
        <table className="table  table-lg bg-gray-100 text-gray-800 ">
          <thead className=" text-gray-900  border-b border-gray-800">
            <tr className="border-b border-gray-800">
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>

            {/* Render paginated problems */}

            {PaginatedUser?.length > 0 ? (
              PaginatedUser.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>
                      {user.id}
                    </td>
                    <td>
                      {user.name}
                    </td>
                    <td>
                     {user.email}
                    </td>
                    <td>
                      {user.role}
                    </td>
                    <td>
                      <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                        
                          <div className="flex gap-2">
                            <button
                              onClick={() => DeleteUser(user.id)}
                              className="btn btn-sm btn-error"
                            >
                              <Trash2 className="w-4 h-4 text-white" />
                            </button>
                            <button disabled className="btn btn-sm btn-warning">
                              <Pencil className="w-4 h-4 text-gray-900 " />
                            </button>
                          </div>
                        
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No user found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          className="btn btn-sm bg-gray-800 text-teal-800 border border-teal-800"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <span className="btn btn-ghost btn-sm border-gray-800 text-teal-800">
          {currentPage} / {totalPages}
        </span>
        <button
          className="btn btn-sm text-teal-800 border border-gray-800"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default UsersPage
