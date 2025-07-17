



import { useState,useEffect } from "react";
import {fetchProducts} from '../../services/admin/productServices';

export function useProducts( refreshFlag,initialLimit = 10) {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(initialLimit);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("asc");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts({ page, limit, sortBy, order, search, category });
      setProducts(data.products);
      setTotalPages(data.totalPages);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
   
  }, [page, search, category, sortBy, order,refreshFlag]);

  return {
    products,
    page,
    setPage,
    totalPages,
    limit,
    search,
    setSearch,
    category,
    setCategory,
    sortBy,
    setSortBy,
    order,
    setOrder,
    loading,
    error,
  };
}
