import Layout from "./Layout";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination, A11y } from "swiper/modules";
import { useState } from "react";

function Products() {
  const [prod, setProd] = useState([
    {
      id: 1,
      title: "Wireless Headphone",
      description: "Premium sound quality with noise cancellation.",
      price: 1999,
      discount: 20,
      image: "../images/a.jpeg",
    },
    {
      id: 2,
      title: "Smart Watch",
      description: "Track your fitness and daily activities.walking time",
      price: 2499,
      discount: 15,
      image: "../images/b.jpeg",
    },
    {
      id: 3,
      title: "Gaming Mouse",
      description: "Ergonomic design with RGB lighting.",
      price: 999,
      discount: 20,
      image: "../images/c.jpeg",
    },
    {
      id: 4,
      title: "Bluetooth Speaker",
      description: "Powerful bass and crystal-clear sound.",
      price: 1499,
      discount: 20,
      image: "../images/d.jpeg",
    },
    {
      id: 5,
      title: "Laptop Backpack",
      description: "Waterproof and spacious design.",
      price: 1299,
      discount: 20,
      image: "../images/e.jpeg",
    },
    {
      id: 6,
      title: "Mechanical Keyboard",
      description: "Fast response with tactile switches.",
      price: 2999,
      discount: 20,
      image: "../images/f.jpeg",
    },
    {
      id: 7,
      title: "Power Bank",
      description: "10000mAh fast charging support.",
      price: 899,
      discount: 20,
      image: "../images/g.jpeg",
    },
    {
      id: 8,
      title: "USB Hub",
      description: "Expand your connectivity options.",
      price: 699,
      discount: 20,
      image: "../images/h.jpeg",
    },
    {
      id: 9,
      title: "Webcam HD",
      description: "1080p video quality for meetings.",
      price: 1599,
      discount: 20,
      image: "../images/i.png",
    },
    {
      id: 10,
      title: "Wireless Charger",
      description: "Fast and secure wireless charging.",
      price: 1199,
      discount: 20,
      image: "../images/j.png",
    },
    {
      id: 11,
      title: "Portable SSD",
      description: "High-speed storage on the go.",
      price: 4999,
      discount: 20,
      image: "../images/k.jpeg",
    },
    {
      id: 12,
      title: "Monitor Stand",
      description: "Adjustable and sturdy build quality.",
      price: 799,
      discount: 20,
      image: "../images/l.png",
    },
  ]);

  const imgs = [
    { src: "../images/heroa.png" },
    { src: "../images/herob.png" },
    { src: "../images/heroc.png" },
    { src: "../images/herod.png" },
  ];

  return (
    <Layout>

        {/* products */}
        <div className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
              All <span className="text-yellow-500">Products</span>
            </h2>
            <div className="w-20 h-1.5 bg-yellow-500 mx-auto mt-4 rounded-full"></div>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
              Explore our wide range of high-quality electronics, gadgets, clothing, and accessories designed for your needs.
            </p>
          </div>

          <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {prod.map((item) => {
              const discountedPrice = Math.round(
                item.price - (item.price * item.discount) / 100,
              );

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
                >
                  {/* Product Image */}
                  <div className="h-64 bg-gray-50 overflow-hidden relative flex items-center justify-center">
                    {item.discount > 0 && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider z-10 shadow-sm">
                        {item.discount}% OFF
                      </span>
                    )}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-all duration-500"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-800 group-hover:text-yellow-600 transition line-clamp-1">
                        {item.title}
                      </h3>

                      <p className="text-sm text-gray-500 mt-2 line-clamp-2 h-10 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div>
                      {/* Price */}
                      <div className="flex items-baseline gap-2 mt-4">
                        <span className="text-xl font-black text-gray-900">
                          ₹{discountedPrice}
                        </span>

                        <span className="text-gray-400 line-through text-xs sm:text-sm">
                          ₹{item.price}
                        </span>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-2.5 mt-5">
                        <button 
                          name="add-card"
                          className="flex-1 bg-black text-white py-2.5 rounded-xl font-bold hover:bg-yellow-500 hover:text-black transition-all duration-300 flex items-center justify-center gap-1.5 text-xs sm:text-sm shadow-md hover:shadow-yellow-500/10 cursor-pointer"
                        >
                          Add To Cart
                        </button>

                        <button 
                          name="buy-now"
                          className="px-4 py-2.5 border border-gray-200 rounded-xl text-xs sm:text-sm font-bold hover:bg-gray-50 hover:border-black transition duration-300 flex items-center justify-center cursor-pointer"
                        >
                          Buy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
    
    </Layout>
  );
}

export default Products;
