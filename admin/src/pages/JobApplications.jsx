import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DataTable from "../components/DataTable";
import { getAdminList, updateAdminItem } from "../api/adminApi";

export default function JobApplications() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [items, setItems] = useState([]);

  const loadItems = async () => {
    const data = await getAdminList("/careers/applications");
    setItems(data.items || data);
  };

  useEffect(() => { loadItems(); }, []);

  const updateStatus = async (item) => {
    const status = window.prompt(
      "Enter status: pending, reviewing, shortlisted, rejected, selected",
      item.status || "pending"
    );

    if (!status) return;

    await updateAdminItem(
      "/careers/applications",
      item.id,
      { status }
    );

    loadItems();
  };

  return (
    <div className="admin-layout">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="admin-main">
        <Header title="Job Applications" subtitle="Review job candidate applications." onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="admin-page-content">
          <DataTable
            data={items}
            onEdit={updateStatus}
            columns={[
              { key: "full_name", label: "Applicant" },
              { key: "email", label: "Email" },
              { key: "phone", label: "Phone" },
              { key: "job_title", label: "Position" },
              { key: "status", label: "Status" },
              { key: "created_at", label: "Applied On" },
            ]}
          />
        </div>
      </main>
    </div>
  );
}