import React from "react";
import {
  FaSearch,
  // FaBell,
  // FaBars,
  FaMapMarkerAlt,
  FaPlus,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const products = [
  {
    id: 1,
    name: "Gazelle Shoes",
    image: "/download.jpg",
    postedBy: "Krishna Kumar Gautam",
    location: "Mathura, Uttar Pradesh, India",
    price: 9999,
    oldPrice: 1800,
    discount: "-455.5%",
    dealsRemaining: 201,
    timeLeft: "87:03:41:54",
  },
  {
    id: 2,
    name: "Gazelle Shoes Shadow Red",
    image: "/feet-1840619_640.jpg",
    postedBy: "Krishna Kumar Gautam",
    location: "Mathura, Uttar Pradesh, India",
    price: 10999,
    oldPrice: 1800,
    discount: "-511.06%",
    dealsRemaining: 516,
    timeLeft: "96:03:44:54",
  },
  {
    id: 3,
    name: "Ultra Boost Shoes",
    image: "/shopping.webp",
    postedBy: "Krishna Kumar Gautam",
    location: "Delhi, India",
    price: 8999,
    oldPrice: 2000,
    discount: "-349.95%",
    dealsRemaining: 150,
    timeLeft: "72:06:30:00",
  },
  {
    id: 4,
    name: "Air Max 270",
    image: "/download.jpg",
    postedBy: "Krishna Kumar Gautam",
    location: "Mumbai, Maharashtra, India",
    price: 11999,
    oldPrice: 2500,
    discount: "-379.96%",
    dealsRemaining: 99,
    timeLeft: "50:08:20:15",
  },
  {
    id: 5,
    name: "Nike ZoomX",
    image: "shopping.webp",
    postedBy: "Krishna Kumar Gautam",
    location: "Bangalore, India",
    price: 12999,
    oldPrice: 3000,
    discount: "-333.3%",
    dealsRemaining: 75,
    timeLeft: "60:12:45:30",
  },
  {
    id: 6,
    name: "Puma RS-X",
    image: "feet-1840619_640.jpg",
    postedBy: "Krishna Kumar Gautam",
    location: "Pune, India",
    price: 7999,
    oldPrice: 1500,
    discount: "-433.3%",
    dealsRemaining: 230,
    timeLeft: "80:05:20:10",
  },
  {
    id: 7,
    name: "Yeezy Boost 350",
    image: "/feet-1840619_640.jpg",
    postedBy: "Krishna Kumar Gautam",
    location: "Chennai, India",
    price: 15999,
    oldPrice: 4000,
    discount: "-299.9%",
    dealsRemaining: 50,
    timeLeft: "45:15:30:25",
  },
  {
    id: 8,
    name: "Reebok Classic Leather",
    image: "/download.jpg",
    postedBy: "Krishna Kumar Gautam",
    location: "Hyderabad, India",
    price: 6999,
    oldPrice: 1300,
    discount: "-438.4%",
    dealsRemaining: 180,
    timeLeft: "90:10:15:40",
  },
  {
    id: 9,
    name: "New Balance 574",
    image: "shopping.webp",
    postedBy: "Krishna Kumar Gautam",
    location: "Kolkata, India",
    price: 8499,
    oldPrice: 1700,
    discount: "-399.9%",
    dealsRemaining: 120,
    timeLeft: "55:22:10:05",
  },
  {
    id: 10,
    name: "Converse Chuck Taylor",
    image: "feet-1840619_640.jpg",
    postedBy: "Krishna Kumar Gautam",
    location: "Ahmedabad, India",
    price: 5999,
    oldPrice: 1400,
    discount: "-328.5%",
    dealsRemaining: 210,
    timeLeft: "68:14:25:50",
  },
  {
    id: 11,
    name: "Adidas Superstar",
    image: "/download.jpg",
    postedBy: "Krishna Kumar Gautam",
    location: "Jaipur, India",
    price: 7499,
    oldPrice: 1600,
    discount: "-368.7%",
    dealsRemaining: 95,
    timeLeft: "73:08:50:20",
  },
  {
    id: 12,
    name: "Vans Old Skool",
    image: "/download.jpg",
    postedBy: "Krishna Kumar Gautam",
    location: "Lucknow, India",
    price: 6799,
    oldPrice: 1250,
    discount: "-443.9%",
    dealsRemaining: 175,
    timeLeft: "85:12:40:30",
  },
];

const DealsPage = () => {
  const navigate = useNavigate(); // useNavigate hook ka use karein
  return (
    <div className="bg-gray-100 min-h-screen ">
      {/* Tabs */}
      <div className="flex justify-around bg-white py-2">
        <button className="text-[#FE7A3A] border-b-2 border-[#FE7A3A] px-4 py-2">
          Deals
        </button>
        <button
          className="text-gray-400 px-4 py-2"
          onClick={() => navigate("/Activities")}
        >
          Activities
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-4 flex gap-2">
        <div className="flex-1 bg-white p-2 rounded-lg flex items-center gap-2 shadow">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search title, category, vendor..."
            className="w-full outline-none"
          />
        </div>
        <button className="bg-white p-2 rounded-lg shadow">
          <FaMapMarkerAlt className="text-orange-500" />
        </button>
      </div>

      {/* Deals List */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow p-4 items-center justify-center flex flex-col"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-48 h-40 object-cover rounded-lg"
            />
            <div className="mt-2">
              <h2 className="text-lg font-bold">{product.name}</h2>
              <p className="text-sm text-gray-500">
                Posted by:{" "}
                <span className="text-orange-500 font-medium">
                  {product.postedBy}
                </span>
              </p>
              <p className="text-sm text-gray-400">{product.location}</p>
              <p className="text-lg font-bold">
                ₹ {product.price.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 line-through">
                ₹ {product.oldPrice.toLocaleString()} {product.discount}
              </p>
              <p className="text-xs bg-orange-500 text-white px-2 py-1 inline-block rounded">
                Deal Valid Till: {product.timeLeft}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Add Button */}
      <button className="fixed bottom-20 right-5 bg-orange-500 text-white p-2 rounded-full shadow-lg">
        <FaPlus className="text-xl" />
      </button>
    </div>
  );
};

export default DealsPage;

// import React from "react";

// const deals = [
//   {
//     id: 1,
//     title: "Relaxo Slipper",
//     price: 526,
//     oldPrice: 135,
//     discount: "-289.63%",
//     status: "Live",
//     views: 3,
//     image: "https://via.placeholder.com/150", // Replace with actual image
//   },
//   {
//     id: 2,
//     title: "Hhhhnnjnin",
//     price: 10000,
//     oldPrice: 1800,
//     discount: "-455.56%",
//     status: "History",
//     views: 1,
//     image: "https://via.placeholder.com/150",
//   },
//   {
//     id: 3,
//     title: "Adidas Shoes",
//     price: 9000,
//     oldPrice: 1800,
//     discount: "-400.00%",
//     status: "Live",
//     views: 1,
//     image: "https://via.placeholder.com/150",
//   },
// ];

// const MyDeals = () => {
//   return (
//     <div className="p-4 bg-gradient-to-b from-orange-500 to-orange-300 min-h-screen">
//       <h1 className="text-white text-2xl font-bold">My Deals</h1>

//       <input
//         type="text"
//         placeholder="Search for deals"
//         className="w-full mt-3 p-2 rounded-md shadow-sm"
//       />

//       {/* Tabs */}
//       <div className="flex mt-4 space-x-2">
//         <button className="bg-white px-4 py-2 rounded-full text-orange-500 font-bold">
//           All (19)
//         </button>
//         <button className="bg-gray-200 px-4 py-2 rounded-full text-gray-700">
//           Live (15)
//         </button>
//         <button className="bg-gray-200 px-4 py-2 rounded-full text-gray-700">
//           Scheduled (0)
//         </button>
//       </div>

//       {/* Deals List */}
//       <div className="mt-4 space-y-4">
//         {deals.map((deal) => (
//           <div key={deal.id} className="bg-white p-4 rounded-lg shadow-md flex">
//             <img
//               src={deal.image}
//               alt={deal.title}
//               className="w-20 h-20 rounded-lg object-cover"
//             />
//             <div className="ml-4 flex-1">
//               <h2 className="text-lg font-semibold">{deal.title}</h2>
//               <p className="text-gray-500 text-sm">₹{deal.oldPrice} <del className="text-red-500">₹{deal.price}</del></p>
//               <p className="text-green-500 font-bold">({deal.discount} off)</p>
//               <p className="text-gray-500 text-sm">👁 {deal.views}</p>
//             </div>
//             <button
//               className={`px-4 py-2 rounded-md text-white ${deal.status === "Live" ? "bg-red-500" : "bg-blue-500"}`}
//             >
//               {deal.status === "Live" ? "Deactivate" : "Repost Deal"}
//             </button>
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// };

// export default MyDeals;
