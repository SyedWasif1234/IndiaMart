import React, { use } from 'react'
import { useAdminStore } from '../store/useAdminStore'
import { useState , useEffect , useMemo} from 'react'
import { Loader , Trash2 , Pencil } from 'lucide-react'

const AdminProductsPage = () => {
  const {listProducts , isproductsListLoading , productsList} = useAdminStore()
  
  useEffect(() => {
      listProducts();
  },[listProducts])

  console.log("products list from admin",productsList);
  const [currentPage, setCurrentPage] = useState(1);
  
    //pagination logic
    const ProductPerPage = 5 ;
    const totalPages = Math.ceil(productsList?.length / ProductPerPage);
    const PaginatedProuct = useMemo(() => {
      return productsList.slice((currentPage - 1) * ProductPerPage, currentPage * ProductPerPage);
    },[currentPage , productsList])
  

  if(isproductsListLoading){
      return (
          <div className="flex items-center justify-center h-screen">
              <Loader className="size-10 animate-spin"/>
          </div>
      )
  }

  

  return (
     <div className="p-6 text-white bg-gradient-to-r from-gray-300 to-gray-100" >
      <h2 className="text-xl font-bold mb-4 text-gray-900">Products</h2>

       <div className="overflow-x-auto rounded-xl shadow-md text-white bg-gray-700">
        <table className="table  table-lg bg-gray-100 text-gray-800 ">
          <thead className=" text-gray-900 border-b border-gray-800">
            <tr className="border-b border-gray-800">
              <th>Product Id</th>
              <th> Title</th>
              <th>Created_at</th>
              <th>Image URL</th>
              <th>Price</th>
              <th>Seller Id</th>
              <th>Category Id</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>

            {/* Render paginated problems */}

            {PaginatedProuct?.length > 0 ? (
              PaginatedProuct.map((product) => {
                return (
                  <tr key={product.id}>
                    <td>
                      {product.id}
                    </td>
                    <td>
                      {product.title}
                    </td>
                    <td>
                     {product.created_at}
                    </td>
                    <td>
                      {product.image}
                    </td>
                    <td>
                      {product.price}
                    </td>
                    <td>
                      {product.seller_id}
                    </td>
                    <td>
                      {product.category_id}
                    </td>
                    <td>
                      <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                        
                          <div className="flex gap-2">
                            <button
                              
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

export default AdminProductsPage
