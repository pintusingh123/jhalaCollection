import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import firebaseAppConfig from "../util/firebase-config";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

import axios from "axios";

const auth = getAuth(firebaseAppConfig);
const db = getFirestore(firebaseAppConfig);

function EditProfile({ profile, onSaved, onCancel }) {
  const [authUser, setAuthUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) =>
      setAuthUser(currentUser),
    );
    return () => unsubscribe();
  }, []);

  const user = authUser;

  const [formData, setFormData] = useState({
    fullName: profile?.fullName || "",
    email: profile?.email || "",
    mobile: profile?.mobile || "",
    pincode: profile?.pincode || "",
    address: profile?.address || "",
    city: profile?.city || "",
    state: profile?.state || "",
    country: profile?.country || "",
  });

  const [photoURL, setPhotoURL] = useState(
    profile?.photoURL || user?.photoURL || "/images/avatar.png",
  );
  const [loading, setLoading] = useState(false);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [msg, setMsg] = useState({ text: "", type: "" });

  useEffect(() => {
    setPhotoURL(profile?.photoURL || user?.photoURL || "/images/avatar.png");
  }, [profile?.photoURL, user?.photoURL]);

  const showMsg = (text, type) => {
    setMsg({ text, type });
    setTimeout(() => setMsg({ text: "", type: "" }), 3000);
  };

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];

    if (!file || !user?.uid) {
      showMsg("Please login again.", "error");
      return;
    }

    setPhotoLoading(true);

    try {
      const formData = new FormData();

      formData.append("file", file);

      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
      );

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        formData,
      );

      const imageUrl = response.data.secure_url;
      // console.log("Cloudinary Response:", response.data);
      // console.log("Image URL:", imageUrl);

      await updateProfile(user, {
        photoURL: imageUrl,
      });

      await setDoc(
        doc(db, "users", user.uid),
        {
          photoURL: imageUrl,
          updatedAt: new Date(),
        },
        { merge: true },
      );

      setPhotoURL(imageUrl);

      showMsg("Photo updated successfully.", "success");
    } catch (error) {
      console.log(error);

      showMsg("Image upload failed", "error");
    }

    setPhotoLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.uid) {
      showMsg("Please log in again and try saving your profile.", "error");
      return;
    }

    setLoading(true);
    try {
      await setDoc(
        doc(db, "users", user.uid),
        { ...formData, updatedAt: new Date() },
        { merge: true },
      );
      await updateProfile(user, { displayName: formData.fullName });
      showMsg("✓ Profile save Successfully!", "success");
      setLoading(false);
      onSaved();
    } catch (err) {
      showMsg("Save Not Saving : " + err.message, "error");
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
          {msg.text && (
            <div
              className={`mx-8 mt-6 px-4 py-3 rounded-xl text-sm font-medium
              ${
                msg.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {msg.text}
            </div>
          )}

          <div className="p-8 border-b">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Edit Profile
                </h1>
                <p className="text-gray-500 mt-1">
                  Update your personal information
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img
                    src={photoURL}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover bg-black/10 shadow-lg"
                    onError={(e) => (e.target.src = "/images/avatar.png")}
                  />
                  {photoLoading && (
                    <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center">
                      <span className="text-white text-xs">Uploading...</span>
                    </div>
                  )}
                  <label className="absolute bottom-1 right-1 bg-black text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition">
                    <i className="ri-camera-line"></i>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoChange}
                      disabled={photoLoading}
                    />
                  </label>
                </div>
                <p className="mt-3 text-sm text-gray-500">
                  Click camera icon to change photo
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-8 grid md:grid-cols-2 gap-6"
          >
            {[
              { label: "Full Name", name: "fullName", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Mobile", name: "mobile", type: "text" },
              { label: "Pincode", name: "pincode", type: "text" },
              { label: "City", name: "city", type: "text" },
              { label: "State", name: "state", type: "text" },
              { label: "Country", name: "country", type: "text" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block mb-2 font-medium text-gray-700">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            ))}

            <div className="md:col-span-2">
              <label className="block mb-2 font-medium text-gray-700">
                Area / Street / Village
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="md:col-span-2 flex justify-end gap-3 pt-2">
              {/* ✅ Cancel button — onCancel prop se */}
              <button
                type="button"
                onClick={onCancel}
                className="px-8 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 rounded-xl bg-black text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50"
              >
                <i className="ri-save-line mr-2"></i>
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default EditProfile;
