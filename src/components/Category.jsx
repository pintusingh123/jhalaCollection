import React, { useState } from "react";
import Layout from "./Layout";

function Category() {
  const [category] = useState([
    { title: "Electronics" },
    { title: "Fashion" },
    { title: "Smart Phone's" },
    { title: "Men's Clothes" },
    { title: "Bed Sheet's" },
  ]);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
              Explore <span className="text-yellow-500">Categories</span>
            </h2>
            <div className="w-20 h-1.5 bg-yellow-500 mx-auto mt-4 rounded-full"></div>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
              Find exactly what you are looking for by browsing through our collection categories.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {category.map((item, index) => (
              <div
                key={index}
                className="group bg-white hover:bg-black rounded-2xl p-6 text-center border border-gray-200/60 hover:border-transparent
                shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center min-h-[140px]"
              >
                <h3 className="font-bold text-gray-800 group-hover:text-white text-xl sm:text-2xl transition duration-200">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Category;
