import {useEffect,useState} from 'react'



import {getAllUsers} from '../../services/admin/productServices';

const useUsersTable = () =>{
    const [users,setUsers] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const limit = 8;

    useEffect(()=>{
        const fetUsers = async()=>{
            try {
                const data = await getAllUsers({page,limit});
                setUsers(data.users);
                setTotalPages(data.totalPages);
            } catch (error) {
                setError("Failed to fetch users");
            }finally{
                setLoading(false)
            }
        };

        fetUsers();
    },[page])

    return { users, loading, error, page, setPage, totalPages };
}

export default useUsersTable;