import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [accMenu, setAccMenu] = useState(false);

  const location = useLocation();

  const menu = [
    {
      to: "/admin/dashboard",
      label: "Dashboard",
      icon: <i className="ri-dashboard-3-line"></i>,
    },
    {
      to: "/admin/product",
      label: "Product",
      icon: <i className="ri-shopping-cart-line"></i>,
    },
    {
      to: "/admin/order",
      label: "Orders",
      icon: <i className="ri-shape-line"></i>,
    },
    {
      to: "/admin/payment",
      label: "Payments",
      icon: <i className="ri-money-dollar-circle-line"></i>,
    },
    {
      to: "/admin/setting",
      label: "Settings",
      icon: <i className="ri-settings-3-line"></i>,
    },
    {
      to: "/admin/logout",
      label: "Logout",
      icon: <i className="ri-logout-circle-r-line"></i>,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex overflow-hidden">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen bg-sky-900 text-white
          transition-all duration-300
          ${collapsed ? "lg:w-20" : "lg:w-72"}
          w-72
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sky-700">
          {!collapsed && <h1 className="text-xl font-bold">JhalaCollection</h1>}

          <button
            className="hidden lg:block"
            onClick={() => setCollapsed(!collapsed)}
          >
            <i className="ri-menu-fold-line text-2xl"></i>
          </button>
        </div>

        {/* Menu */}
        <div className="flex flex-col py-4">
          {menu.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className={`flex items-center gap-3 px-5 py-3 hover:bg-sky-800 transition
                ${location.pathname === item.to ? "bg-sky-700" : ""}`}
            >
              <span className="text-xl">{item.icon}</span>

              {!collapsed && <span className="text-base">{item.label}</span>}
            </Link>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1  min-w-0 transition-all duration-300
        ${collapsed ? "lg:ml-20" : "lg:ml-72"}
      `}
      >
        {/* Navbar */}
        <nav className="sticky top-0 z-30 h-16 bg-white shadow flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            {/* Mobile Menu */}
            <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <i className="ri-menu-line text-2xl"></i>
            </button>

            <h1 className="text-xl md:text-2xl font-semibold">
              JhalaCollection
            </h1>
          </div>

          {/* Profile */}
          <div className="relative">
            <img
              src="/images/avatar.png"
              alt="profile"
              onClick={() => setAccMenu(!accMenu)}
              className="h-12 w-12 rounded-full cursor-pointer object-cover"
            />

            {accMenu && (
              <div className="absolute right-0 top-14 bg-white shadow-lg rounded-lg p-4 w-60">
                <h2 className="font-semibold">Admin</h2>
                <p className="text-sm text-gray-500">admin@gmail.com</p>

                <hr className="my-3" />

                <button className="flex items-center gap-2 text-red-600">
                  <i className="ri-logout-circle-r-line"></i>
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Page Content */}
        <main
           className="
  p-3
  sm:p-4
  md:p-5
  lg:p-6
  w-full
  min-w-0
  overflow-x-auto
"
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
