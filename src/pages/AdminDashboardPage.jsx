import React, { useEffect } from "react";
import AdminDashboard from "../assets/components/AdminDashboard/Admindashboard";

export default function AdminDashboardPage() {
  useEffect(() => {
    document.title = "Admin Console";
  }, []);

  return (
    <main>
      <AdminDashboard />
    </main>
  );
}
