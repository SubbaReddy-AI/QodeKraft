import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DataTable from "../components/DataTable";
import { deleteAdminItem, getAdminList } from "../api/adminApi";

export default function Newsletter() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [items, setItems] = useState([]);

  const loadItems = async () => {
    const data = await getAdminList("/newsletter");
    setItems(data.items || data);
  };

  useEffect(() => { loadItems(); }, []);

  const remove = async (item) => {
    if (!window.confirm(`Remove ${item.email}?`)) return;
    await deleteAdminItem("/newsletter", item.id);
    loadItems();
  };

  return (
    <div className="admin-layout">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="admin-main">
        <Header title="Newsletter" subtitle="Manage newsletter subscribers." onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="admin-page-content">
          <DataTable
            data={items}
            onDelete={remove}
            columns={[
              { key: "email", label: "Email Address" },
              { key: "is_active", label: "Status", render: (row) => row.is_active ? "Subscribed" : "Unsubscribed" },
              { key: "created_at", label: "Subscribed On" },
            ]}
          />
        </div>
      </main>
    </div>
  );
}