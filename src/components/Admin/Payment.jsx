import React, { useState } from "react";
import Layout from "./Layout";

function Payment() {
  const [payments] = useState([
    {
      name: "John Doe",
      email: "john@gmail.com",
      mobile: "9876543210",
      amount: "25,000",
      paymentDate: "12-10-2025",
      image: "https://i.pravatar.cc/150?img=1",
    },
    {
      name: "Emma Watson",
      email: "emma@gmail.com",
      mobile: "9876543211",
      amount: "18,500",
      paymentDate: "15-10-2025",
      image: "https://i.pravatar.cc/150?img=2",
    },
    {
      name: "Michael Smith",
      email: "michael@gmail.com",
      mobile: "9876543212",
      amount: "32,000",
      paymentDate: "18-10-2025",
      image: "https://i.pravatar.cc/150?img=3",
    },
    {
      name: "Sophia Lee",
      email: "sophia@gmail.com",
      mobile: "9876543213",
      amount: "12,750",
      paymentDate: "20-10-2025",
      image: "https://i.pravatar.cc/150?img=4",
    },
    {
      name: "David Miller",
      email: "david@gmail.com",
      mobile: "9876543214",
      amount: "45,000",
      paymentDate: "22-10-2025",
      image: "https://i.pravatar.cc/150?img=5",
    },
    {
      name: "Olivia Brown",
      email: "olivia@gmail.com",
      mobile: "9876543215",
      amount: "29,999",
      paymentDate: "25-10-2025",
      image: "https://i.pravatar.cc/150?img=6",
    },
  ]);

  return (
    <Layout>
      <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Payments
          </h1>

          <p className="text-slate-500 mt-2">
            Manage and track customer payments
          </p>
        </div>

        {/* Payment Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {payments.map((payment, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 hover:shadow-xl transition-all duration-300"
            >
              {/* Customer Image */}
              <div className="flex justify-center">
                <img
                  src={payment.image}
                  alt={payment.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-sky-100"
                />
              </div>

              {/* Name & Email */}
              <div className="mt-5 text-center">
                <h2 className="text-xl font-bold text-slate-800">
                  {payment.name}
                </h2>

                <p className="text-slate-500 text-sm mt-1 break-all">
                  {payment.email}
                </p>
              </div>

              {/* Details */}
              <div className="mt-5 space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium text-slate-600">
                    Mobile
                  </span>

                  <span className="text-slate-800">
                    {payment.mobile}
                  </span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium text-slate-600">
                    Amount
                  </span>

                  <span className="font-bold text-green-600">
                    ₹{payment.amount}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium text-slate-600">
                    Payment Date
                  </span>

                  <span className="text-slate-800">
                    {payment.paymentDate}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full mt-6 bg-sky-700 hover:bg-sky-800 text-white py-2.5 rounded-xl font-medium transition">
                View Payment
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {payments.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-slate-600">
              No Payments Found
            </h3>

            <p className="text-slate-500 mt-2">
              Payment records will appear here.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Payment;