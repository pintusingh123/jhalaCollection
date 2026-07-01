import React from "react";
import Layout from "./Layout";

function Product() {
  const products = [
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
  ];

  return (
    <Layout>
      <section className="max-w-7xl mx-auto px-4 py-5">
        <h2 className="text-3xl font-bold text-center mb-8">
          Our Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const originalPrice = Math.round(
              product.price / (1 - product.discount / 100)
            );

            return (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col relative"
              >
                {/* Discount Badge */}
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
                  {product.discount}% OFF
                </span>

                {/* Product Image */}
                <div className="h-56 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-fit object-cover hover:scale-105 transition duration-300"
                  />
                </div>

                {/* Product Content */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-lg line-clamp-1">
                    {product.title}
                  </h3>

                  <p className="text-gray-600 text-sm mt-2 flex-1">
                    {product.description}
                  </p>

                  <div className="mt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-green-600 font-bold text-lg">
                        ₹{product.price}
                      </span>

                      <span className="text-gray-400 line-through text-sm">
                        ₹{originalPrice}
                      </span>
                    </div>

                    <button className="w-full mt-3 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
                      Add Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}

export default Product;