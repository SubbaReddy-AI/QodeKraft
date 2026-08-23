import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DataTable from "../components/DataTable";
import { getAdminList } from "../api/adminApi";

export default function Contacts() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getAdminList("/contacts")
      .then((data) => setItems(data.items || data));
  }, []);

  return (
    <div className="admin-layout">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="admin-main">
        <Header title="Contact Messages" subtitle="Messages submitted through the website." onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="admin-page-content">
          <DataTable
            data={items}
            columns={[
              { key: "full_name", label: "Name" },
              { key: "email", label: "Email" },
              { key: "phone", label: "Phone" },
              { key: "subject", label: "Subject" },
              { key: "message", label: "Message" },
              { key: "created_at", label: "Received" },
            ]}
          />
        </div>
      </main>
    </div>
  );
}