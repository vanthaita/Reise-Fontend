// 'use client'
// import React, { useState } from 'react';
// import Map from '@/components/Index';
// import axios from 'axios'
// const Page = () => {
//     const [formData, setFormData] = useState({
//         localName: '',
//         lat: '',
//         lng: '',
//         image: '',
//         description: '',
//         creator: '',
//         address: '',
//         category: ''
//     });

//     const handleChange = (e: any) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };
//     const handleImageChange = (e: any) => {
//         // const file = e.target.files[0];
//         // setFormData(prevState => ({
//         //     ...prevState,
//         //     image: file
//         // }));
//     };
//     const handleSubmit = async (e: any) => {
//         e.preventDefault();
//         try {
//         console.log("running")
//             const response = await axios.post('http://localhost:3000/api/location', {
//                 localName: formData.localName,
//                 lat: formData.lat,
//                 lng: formData.lng,
//                 image: formData.image,
//                 description: formData.description,
//                 creator: formData.creator,
//                 address: formData.address,
//                 category: formData.category
//             })
//             console.log("running")
//             console.log(response);
//         } catch(err) {
//             console.log(err);
//         }
//     };

//     return (
//         <div className='lg:flex w-full h-full items-center justify-center'>
//             <div className='lg:w-1/2 h-full p-[1.5rem]'>
//                 <div className=' border-gray-300 border bg-gray-100 shadow-lg rounded-lg p-6'>
//                     <h2 className="text-lg font-semibold mb-4">Add Location</h2>
//                     <form onSubmit={handleSubmit}>
//                         <div className="mb-4">
//                             <label htmlFor="localName" className="block text-sm font-medium text-gray-700">Name</label>
//                             <input type="text" id="localName" name="localName" value={formData.localName} onChange={handleChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
//                             <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="creator" className="block text-sm font-medium text-gray-700">Creator</label>
//                             <input type="text" id="creator" name="creator" value={formData.creator} onChange={handleChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
//                         </div>

//                         <div className="mb-4">
//                             <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
//                             <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
//                             <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="lat" className="block text-sm font-medium text-gray-700">Latitude</label>
//                             <input type="number" id="lat" name="lat" value={formData.lat} onChange={handleChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="lng" className="block text-sm font-medium text-gray-700">Longitude</label>
//                             <input type="number" id="lng" name="lng" value={formData.lng} onChange={handleChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Image</label>
//                             <input type="text" id="image" name="image" onChange={handleChange} accept="image/*" className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
//                         </div>
//                         <button type="submit" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md" onClick={handleSubmit}>Create</button>
//                     </form>
//                 </div>
//             </div>

//             <div className='lg:w-1/2 h-[115.5vh] p-[1.5rem]'>
//                     <Map />
//             </div>

//         </div>
//     );
// };

// export default Page;
