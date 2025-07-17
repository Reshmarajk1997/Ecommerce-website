// import { useState,useEffect } from "react";
// import {fetchProducts} from '../../services/user/productsServices';

// const useProducts = ({ initialPage = 1, initialLimit = 10,refreshFlag  } = {})=>{
//     const [products,setProducts] = useState([]);
//     const [totalPages,setTotalPages] = useState(1);
//     const [total,setTotal] = useState(0);
//     const [page,setPage] = useState(initialPage);
//     const [limit] = useState(initialLimit);
//     const [sortBy,setSortBy] = useState("createdAt");
//     const [order,setOrder] = useState("asc");
//     const [search,setSearch] = useState("");
//     const [category,setCategory] = useState("");
//     const [loading,setLoading] = useState(false);
//     const [error,setError] = useState(null);

//     useEffect(() => {
//         setPage(1);
//       }, [search, category, sortBy, order]);

//       useEffect(() => {
//         if (page > totalPages) {
//           setPage(totalPages || 1);
//         }
//       }, [totalPages]);
      

//     useEffect(()=>{
//         const getProducts = async()=>{
//             setLoading(true);
//             setError(null);

//             console.log("📦 Fetching products with:");
//             console.log("👉 Page:", page);
//             console.log("👉 Limit:", limit);
//             console.log("👉 Sort By:", sortBy);
//             console.log("👉 Order:", order);
//             console.log("👉 Search:", search);
//             console.log("👉 Category:", category);

//             try {
//                 const data = await fetchProducts({
//                     page,
//                     limit,
//                     sortBy,
//                     order,
//                     search,
//                     category
//                 });

//                 console.log("Fetched products:", data);

//                 if(data.success){
//                     console.log("✅ Fetched products for page", page, ":", data.products);
//         console.log("📄 Total Pages:", data.totalPages, "| 🧮 Total Items:", data.total);
//                     setProducts(data.products);
//                     setTotalPages(data.totalPages);
//                     setTotal(data.total);
//                 }else{
//                     setError("Failed to fetch products");
//                 }
//             } catch (err) {
//                 setError(err.message || "Failed to fetch products");
//             }finally{
//                 setLoading(false);
//             }
//         }

//         getProducts();
//     },[page,limit,sortBy,order,search,category,refreshFlag]);

//     return{
//         products,
//     totalPages,
//     total,
//     page,
//     setPage,
//     limit,
//     sortBy,
//     setSortBy,
//     order,
//     setOrder,
//     search,
//     setSearch,
//     category,
//     setCategory,
//     loading,
//     error,
//     }

// };


// export default useProducts;



import { useState, useEffect } from "react";
import { fetchProducts } from "../../services/user/productsServices";

const useProducts = ({ initialPage = 1, initialLimit = 10, refreshFlag } = {}) => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(initialLimit);
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Reset to page 1 when filters/sorting change
  useEffect(() => {
    setPage(1);
  }, [search, category, sortBy, order]);

  // If current page is greater than totalPages (e.g., after filtering), reset page
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages || 1);
    }
  }, [totalPages, page]);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      setError(null);

      console.log("📦 Fetching products with:", {
        page,
        limit,
        sortBy,
        order,
        search,
        category,
      });

      try {
        const data = await fetchProducts({
          page,
          limit,
          sortBy,
          order,
          search,
          category,
        });

        console.log("Fetched products:", data);

        if (data.success) {
          setProducts(data.products);
          setTotalPages(data.totalPages);
          setTotal(data.total);
        } else {
          setError("Failed to fetch products");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [page, limit, sortBy, order, search, category, refreshFlag]);

  return {
    products,
    totalPages,
    total,
    page,
    setPage,
    limit,
    sortBy,
    setSortBy,
    order,
    setOrder,
    search,
    setSearch,
    category,
    setCategory,
    loading,
    error,
  };
};

export default useProducts;
