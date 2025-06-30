import axios from "axios";
import { getToken } from "../../../../shared/utils/tokenUtils";



const API = axios.create({
    baseURL:"http://localhost:5000/api/admin/products/",
})


export const fetchProducts = async({ page,limit,sortBy,order,search,category})=>{
  const token = getToken();
  if (!token) throw new Error("Unauthorized: No token found");

  const response = await API.get('/',{
    params:{page,limit,order,sortBy,search,category},
    headers:{
      Authorization:`Bearer ${token}`,
    }
  })
  console.log("Fetching with order:", order, "and sortBy:", sortBy);

  return response.data;
}


export const addProduct = async(productData)=>{
    const token = getToken();
      console.log('token is', token)
    if(!token) throw new Error('Unauthorized: No token found')

        const respone = await API.post('/',productData,{
            headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type":'multipart/form-data'
            }
        });
      console.log('response.data  is ',respone.data)
        return respone.data;
}



// export const checkProductExists = async(name,brand,id=null)=>{
//   try {

//     const token = getToken();
//     if (!token) throw new Error("Unauthorized: No token found");  

//      const params = { name, brand };
//     if (id) params.id = id;

//     const respone =  await API.get('/check',{
//       params:{name,brand},
//       headers: {
//         Authorization:`Bearer ${token}`
//       }
//     })

//     return respone.data.exists;
//   } catch (err) {
//     console.error("Check product exists error:", err);
//     throw err;
//   }
// }



export const checkProductExists = async (name, brand) => {
  try {
    const token = getToken();
    if (!token) throw new Error("Unauthorized: No token found");

    const response = await API.get('/check', {
      params:{name,brand},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;  // { exists: true/false, productId }
  } catch (err) {
    console.error("Check product exists error:", err);
    throw err;
  }
};




export const deleteProductById = async(productId)=>{
  const token = getToken();

  if (!token) throw new Error("Unauthorized: No token found");

  const respone = await API.delete(`/${productId}`,{
    headers:{
      Authorization: `Bearer ${token}`,
    }
  });

  return respone.data;
}


export const updateProductById = async(productId,updatedData)=>{

  const token = getToken();
  if (!token) throw new Error("Unauthorized: No token found");

  const response = await API.put(`/${productId}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;

}


export const fetchProductById = async (productId) => {
  const token = getToken();
  if (!token) throw new Error("Unauthorized: No token found");

  const response = await API.get(`/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
