// 'use client'

// import { useEffect, useState } from 'react'
// import { StarIcon } from '@heroicons/react/20/solid'
// import { useParams } from 'react-router-dom'
// import { fetchShoes } from '../services/productServices'

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

// export default function ProductOverview() {
//   const { id } = useParams()
//   const [product, setProduct] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const getProduct = async () => {
//       try {
//         const data = await fetchShoes()
//         const found = data.find((item) => item.id.toString() === id)
//         setProduct(found)
//       } catch (err) {
//         console.error('Error loading product:', err)
//       } finally {
//         setLoading(false)
//       }
//     }
//     getProduct()
//   }, [id])

//   return (
//     <div className="bg-white ">
//       {loading ? (
//         <div className="text-center py-20 text-gray-600">Loading product...</div>
//       ) : !product ? (
//         <div className="text-center py-20 text-gray-600">Product not found...</div>
//       ) : (
//         <div >
//           {/* Breadcrumb */}
//           {/* <nav aria-label="Breadcrumb">
//             <ol
//               role="list"
//               className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
//             >
//               <li key={product.id}>
//                 <div className="flex items-center">
//                   <a href={product.image} className="mr-2 text-sm font-medium text-gray-900">
//                     {product.title}
//                   </a>
//                   <svg
//                     fill="currentColor"
//                     width={16}
//                     height={20}
//                     viewBox="0 0 16 20"
//                     aria-hidden="true"
//                     className="h-5 w-4 text-gray-300"
//                   >
//                     <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
//                   </svg>
//                 </div>
//               </li>
//               <li className="text-sm">
//                 <a
//                   href={product.image}
//                   aria-current="page"
//                   className="font-medium text-gray-500 hover:text-gray-600"
//                 >
//                   {product.name}
//                 </a>
//               </li>
//             </ol>
//           </nav> */}

//           {/* Main Content */}
//           <div className="mx-auto max-w-2xl px-4  pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:pt-6 lg:pb-24">
//             {/* Left Column: Image, Reviews, Add to Bag */}
//             <div className="lg:col-span-1">
//               {/* Image */}
//               <div className="mt-6">
//                 <img
//                   alt={product.title}
//                   src={product.image}
//                   className="mx-auto max-w-sm w-full rounded-lg object-contain"
//                 />
//               </div>

//               {/* Reviews */}
//               <div className="mt-6">
//                 <h3 className="sr-only">Reviews</h3>
//                 <div className="flex items-center">
//                   <div className="flex items-center">
//                     {[...Array(5)].map((_, i) => (
//                       <StarIcon
//                         key={i}
//                         aria-hidden="true"
//                         className={classNames(
//                           product?.rating?.rate > i ? 'text-gray-900' : 'text-gray-200',
//                           'size-5 shrink-0'
//                         )}
//                       />
//                     ))}
//                   </div>
//                   <p className="sr-only">{product?.rating?.rate} out of 5 stars</p>
//                   <span className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
//                     {product?.rating?.count} reviews
//                   </span>
//                 </div>
//               </div>

//               {/* Add to Bag */}
//               <form className="mt-10">
//                 <button
//                   type="submit"
//                   className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
//                 >
//                   Add to bag
//                 </button>
//               </form>
//             </div>

//             {/* Right Column: Product Info */}
//             <div className="lg:col-span-1 lg:pr-8">
//               <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
//                 {product.title.toUpperCase()}
//               </h1>
//               <p className="mt-4 text-3xl tracking-tight text-gray-900">${product.price}</p>

//               {/* Description */}
//               <div className="mt-4">
//                 <h3 className="">Description</h3>
//                 <div className="space-y-6">
//                   <p className="text-base text-gray-600 mt-2">{product.description}</p>
//                 </div>
//               </div>

//               {/* Details */}
//               <div className="mt-10">
//                 <h2 className="text-sm font-medium text-gray-900">Details</h2>
//                 <div className="mt-4 space-y-6">
//                   <p className="text-sm text-gray-600">{product.details}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }