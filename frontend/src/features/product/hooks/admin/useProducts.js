import { useState,useEffect } from "react";
import {fetchProducts} from '../../services/admin/productServices';

const useProducts = ({ initialPage = 1, initialLimit = 10,refreshFlag  } = {})=>{
    const [products,setProducts] = useState([]);
    const [totalPages,setTotalPages] = useState(1);
    const [total,setTotal] = useState(0);
    const [page,setPage] = useState(initialPage);
    const [limit] = useState(initialLimit);
    const [sortBy,setSortBy] = useState("createdAt");
    const [order,setOrder] = useState("asc");
    const [search,setSearch] = useState("");
    const [category,setCategory] = useState("");
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    

    useEffect(()=>{
        const getProducts = async()=>{
            setLoading(true);
            setError(null);

            try {
                const data = await fetchProducts({
                    page,
                    limit,
                    sortBy,
                    order,
                    search,
                    category
                });

                console.log("Fetched products:", data);

                if(data.success){
                    setProducts(data.products);
                    setTotalPages(data.totalPages);
                    setTotal(data.total);
                }else{
                    setError("Failed to fetch products");
                }
            } catch (err) {
                setError(err.message || "Failed to fetch products");
            }finally{
                setLoading(false);
            }
        }

        getProducts();
    },[page,limit,sortBy,order,search,category,refreshFlag]);

    return{
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
    }

};

export default useProducts;