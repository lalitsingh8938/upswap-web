import React from "react";

const deals = [
  {
    id: 1,
    title: "Relaxo Slipper",
    price: 526,
    oldPrice: 135,
    discount: "-289.63%",
    status: "Live",
    views: 3,
    image: "product_image.png", // Replace with actual image
  },
  {
    id: 2,
    title: "Hhhhnnjnin",
    price: 10000,
    oldPrice: 1800,
    discount: "-455.56%",
    status: "History",
    views: 1,
    image: "product_image.png",
  },
  {
    id: 3,
    title: "Adidas Shoes",
    price: 9000,
    oldPrice: 1800,
    discount: "-400.00%",
    status: "Live",
    views: 1,
    image: "product_image.png",
  },
];

const MyDeals = () => {
  return (
    <div className="p-4 bg-gradient-to-b from-orange-500 to-orange-300 min-h-screen">
      <h1 className="text-white text-2xl font-bold">My Deals</h1>

      <input
        type="text"
        placeholder="Search for deals"
        className="w-full mt-3 p-2 rounded-md shadow-sm"
      />

      {/* Tabs */}
      <div className="flex mt-4 space-x-2">
        <button className="bg-white px-4 py-2 rounded-full text-orange-500 font-bold">
          All (19)
        </button>
        <button className="bg-gray-200 px-4 py-2 rounded-full text-gray-700">
          Live (15)
        </button>
        <button className="bg-gray-200 px-4 py-2 rounded-full text-gray-700">
          Scheduled (0)
        </button>
      </div>

      {/* Deals List */}
      <div className="mt-4 space-y-4">
        {deals.map((deal) => (
          <div key={deal.id} className="bg-white p-4 rounded-lg shadow-md flex">
            <img
              src={deal.image}
              alt={deal.title}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="ml-4 flex-1">
              <h2 className="text-lg font-semibold">{deal.title}</h2>
              <p className="text-gray-500 text-sm">₹{deal.oldPrice} <del className="text-red-500">₹{deal.price}</del></p>
              <p className="text-green-500 font-bold">({deal.discount} off)</p>
              <p className="text-gray-500 text-sm">👁 {deal.views}</p>
            </div>
            <button
              className={`px-4 py-2 rounded-md text-white ${deal.status === "Live" ? "bg-red-500" : "bg-blue-500"}`}
            >
              {deal.status === "Live" ? "Deactivate" : "Repost Deal"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyDeals;
