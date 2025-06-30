// import React, {useEffect,useState} from "react";
// import { fetchShoes } from "../services/productServices";
// import { Link } from "react-router-dom";
  
//   export default function ProductCard() {

//     const [shoes,setShoes] = useState([]);
//     const [loading,setLoading] = useState(true);

//     useEffect(()=>{
//       const getShoes = async()=>{
//         try {
//           const data = await fetchShoes();
//           setShoes(data)
//         } catch (error) {
//           console.error("Error fetching shoes:", error);
//         } finally{
//           setLoading(false)
//         }
//       }
//       getShoes()
//     },[]);

//     if(loading){
//       return <div>Loading...</div>
//     }
//     return (
//       <div className="bg-white">
//         <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
//           <h2 className="sr-only">Products</h2>
  
//           <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
//             {shoes.map((shoe) => (
//               <Link key={shoe.id} to={`/product/${shoe.id}`} className="group">
//                 <img
//                 //for rapidi name
//                   alt={shoe.title}
//                   src={shoe.image}
//                   className="aspect-square w-full rounded-lg object-contain bg-gray-200  group-hover:opacity-75 xl:aspect-7/8"
//                 />
//                 <h3 className="mt-4 text-sm text-gray-700">{shoe.title}</h3>
//                 <p className="mt-1 text-lg font-medium text-gray-900">${shoe.price}</p>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     )
//   }
  