 import React, { useState } from "react";
import Layout from "./Layout";

function Customers() {
  const [customers] = useState([
    {
      name: "John Doe",
      email: "john@gmail.com",
      mobile: "9876543210",
      joinedDate: "12-10-2025",
      image: "https://i.pravatar.cc/150?img=1",
    },
    {
      name: "Emma Watson",
      email: "emma@gmail.com",
      mobile: "9876543211",
      joinedDate: "15-10-2025",
      image: "https://i.pravatar.cc/150?img=2",
    },
    {
      name: "Michael Smith",
      email: "michael@gmail.com",
      mobile: "9876543212",
      joinedDate: "18-10-2025",
      image: "https://i.pravatar.cc/150?img=3",
    },
    {
      name: "Sophia Lee",
      email: "sophia@gmail.com",
      mobile: "9876543213",
      joinedDate: "20-10-2025",
      image: "https://i.pravatar.cc/150?img=4",
    },
    {
      name: "David Miller",
      email: "david@gmail.com",
      mobile: "9876543214",
      joinedDate: "22-10-2025",
      image: "https://i.pravatar.cc/150?img=5",
    },
    {
      name: "Olivia Brown",
      email: "olivia@gmail.com",
      mobile: "9876543215",
      joinedDate: "25-10-2025",
      image: "https://i.pravatar.cc/150?img=6",
    },
  ]);

  return (
    <Layout>
      <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Customers
          </h1>

          <p className="text-slate-500 mt-2">
            Manage and track customer information
          </p>
        </div>

        {/* Customer Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {customers.map((customer, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="flex justify-center">
                <img
                  src={customer.image}
                  alt={customer.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-sky-100"
                />
              </div>

              {/* Details */}
              <div className="mt-5 text-center">
                <h2 className="text-xl font-bold text-slate-800">
                  {customer.name}
                </h2>

                <p className="text-slate-500 text-sm mt-1 break-all">
                  {customer.email}
                </p>
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium text-slate-600">
                    Mobile
                  </span>

                  <span className="text-slate-800">
                    {customer.mobile}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium text-slate-600">
                    Joined
                  </span>

                  <span className="text-slate-800">
                    {customer.joinedDate}
                  </span>
                </div>
              </div>

              {/* Button */}
              <button className="w-full mt-6 bg-sky-700 hover:bg-sky-800 text-white py-2.5 rounded-xl font-medium transition">
                View Profile
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {customers.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-slate-600">
              No Customers Found
            </h3>

            <p className="text-slate-500 mt-2">
              Customers will appear here after registration.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Customers;