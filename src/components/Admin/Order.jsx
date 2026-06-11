 import React, { useState } from "react";
import Layout from "./Layout";

export default function Order() {
  const [orders] = useState([
    {
      orderID: "#123ABC",
      customer: "John Doe",
      email: "john@gmail.com",
      mobile: "9876543210",
      product: "Laptop",
      amount: "25000",
      date: "12-10-2025 10:12 AM",
      status: "pending",
    },
    {
      orderID: "#456DEF",
      customer: "Aman Sharma",
      email: "aman@gmail.com",
      mobile: "9876543211",
      product: "Smartphone",
      amount: "18000",
      date: "13-10-2025 11:30 AM",
      status: "completed",
    },
    {
      orderID: "#789GHI",
      customer: "Priya Singh",
      email: "priya@gmail.com",
      mobile: "9876543212",
      product: "Headphones",
      amount: "3500",
      date: "14-10-2025 02:45 PM",
      status: "cancelled",
    },
    {
      orderID: "#789GHI",
      customer: "Priya Singh",
      email: "priya@gmail.com",
      mobile: "9876543212",
      product: "Headphones",
      amount: "3500",
      date: "14-10-2025 02:45 PM",
      status: "cancelled",
    },
    {
      orderID: "#789GHI",
      customer: "Priya Singh",
      email: "priya@gmail.com",
      mobile: "9876543212",
      product: "Headphones",
      amount: "3500",
      date: "14-10-2025 02:45 PM",
      status: "cancelled",
    },
  ]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200";
      case "completed":
        return "bg-green-100 text-green-700 border border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border border-red-200";
      default:
        return "bg-slate-100 text-slate-700 border border-slate-200";
    }
  };

  return (
    <Layout>
      <div>
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Orders
          </h1>

          <p className="text-slate-500 mt-1 text-sm md:text-base">
            Manage and track customer orders
          </p>
        </div>

        {/* MOBILE + TABLET CARDS */}
        <div className="grid gap-4 lg:hidden">
          {orders.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow border border-slate-200 p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sky-700">
                  {item.orderID}
                </h3>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusStyle(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold text-slate-700">
                    Customer
                  </p>
                  <p>{item.customer}</p>
                </div>

                <div>
                  <p className="font-semibold text-slate-700">
                    Email
                  </p>
                  <p className="break-all">{item.email}</p>
                </div>

                <div>
                  <p className="font-semibold text-slate-700">
                    Mobile
                  </p>
                  <p>{item.mobile}</p>
                </div>

                <div>
                  <p className="font-semibold text-slate-700">
                    Product
                  </p>

                  <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                    {item.product}
                  </span>
                </div>

                <div>
                  <p className="font-semibold text-slate-700">
                    Amount
                  </p>

                  <p className="font-bold text-green-600">
                    ₹
                    {Number(item.amount).toLocaleString("en-IN")}
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-slate-700">
                    Date
                  </p>

                  <p>{item.date}</p>
                </div>

                <div className="pt-2">
                  <select className="w-full border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-sky-500">
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Dispatched</option>
                    <option>Returned</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px]">
              <thead className="bg-gradient-to-r from-sky-950 via-sky-800 to-sky-600 text-white">
                <tr>
                  <th className="px-5 py-4 text-left font-semibold">
                    Order ID
                  </th>
                  <th className="px-5 py-4 text-left font-semibold">
                    Customer
                  </th>
                  <th className="px-5 py-4 text-left font-semibold">
                    Email
                  </th>
                  <th className="px-5 py-4 text-left font-semibold">
                    Mobile
                  </th>
                  <th className="px-5 py-4 text-left font-semibold">
                    Product
                  </th>
                  <th className="px-5 py-4 text-left font-semibold">
                    Amount
                  </th>
                  <th className="px-5 py-4 text-left font-semibold">
                    Date
                  </th>
                  <th className="px-5 py-4 text-left font-semibold">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-200 hover:bg-slate-50 transition"
                  >
                    <td className="px-5 py-4 font-semibold text-sky-700">
                      {item.orderID}
                    </td>

                    <td className="px-5 py-4 font-medium text-slate-700">
                      {item.customer}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {item.email}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {item.mobile}
                    </td>

                    <td className="px-5 py-4">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {item.product}
                      </span>
                    </td>

                    <td className="px-5 py-4 font-bold text-green-600">
                      ₹
                      {Number(item.amount).toLocaleString(
                        "en-IN"
                      )}
                    </td>

                    <td className="px-5 py-4 text-slate-600 whitespace-nowrap">
                      {item.date}
                    </td>

                    <td className="px-5 py-4">
                      <select className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Dispatched</option>
                        <option>Returned</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {orders.length === 0 && (
              <div className="text-center py-10">
                <h3 className="text-xl font-semibold text-slate-600">
                  No Orders Found
                </h3>

                <p className="text-slate-500 mt-2">
                  Orders will appear here once customers place
                  them.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}