import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";
import firebaseAppConfig from "../util/firebase-config";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import EditProfile from "./EditProfile";

const auth = getAuth(firebaseAppConfig);
const db   = getFirestore(firebaseAppConfig);

function Profile() {
  const navigate  = useNavigate();
  const user      = auth.currentUser;
  const [profile,  setProfile]  = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    const snap = await getDoc(doc(db, "users", user.uid));
    if (snap.exists()) setProfile(snap.data());
    setLoading(false);
  };

  // Edit save hone ke baad — fresh data load karo + view mode
  const handleSaved = () => {
    setIsEditing(false);
    loadProfile();
  };

  if (loading) return (
    <Layout>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    </Layout>
  );

  // Edit mode — EditProfile component render karo
  if (isEditing) return (
    <EditProfile
      profile={profile}
      onSaved={handleSaved}
      onCancel={() => setIsEditing(false)}
    />
  );

  // View mode
  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">

          {/* Header */}
          <div className="p-8 border-b">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
                <p className="text-gray-500 mt-1">Your personal information</p>
              </div>

              {/* Avatar */}
              <div className="flex flex-col items-center">
                <img
                  src={profile?.photoURL || "/images/avatar.png"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover shadow-lg bg-black/10"
                  onError={(e) => (e.target.src = "/images/avatar.png")}
                />
                <p className="mt-2 font-semibold text-gray-800">
                  {profile?.fullName || "—"}
                </p>
                <p className="text-sm text-gray-500">{profile?.email || "—"}</p>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { label: "Full Name",          value: profile?.fullName },
                { label: "Email",              value: profile?.email    },
                { label: "Mobile",             value: profile?.mobile   },
                { label: "Pincode",            value: profile?.pincode  },
                { label: "City",               value: profile?.city     },
                { label: "State",              value: profile?.state    },
                { label: "Country",            value: profile?.country  },
              ].map(item => (
                <div key={item.label}
                  className="bg-gray-50 rounded-xl px-5 py-4 border border-gray-100">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">
                    {item.label}
                  </p>
                  <p className="text-gray-800 font-medium">
                    {item.value || "—"}
                  </p>
                </div>
              ))}

              <div className="md:col-span-2 bg-gray-50 rounded-xl px-5 py-4 border border-gray-100">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">
                  Area / Street / Village
                </p>
                <p className="text-gray-800 font-medium">
                  {profile?.address || "—"}
                </p>
              </div>
            </div>

            {/* Edit Button */}
            <div className="flex justify-end mt-8">
              <button
                onClick={() => setIsEditing(true)}
                className="px-8 py-3 rounded-xl bg-black text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <i className="ri-edit-line mr-2"></i>
                Edit Profile
              </button>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}

export default Profile;