import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DataTable from "../components/DataTable";
import { getAdminList } from "../api/adminApi";

export default function Users() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminList("/users")
      .then((data) => setUsers(data.items || data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="admin-layout">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="admin-main">
        <Header title="Users" subtitle="Manage registered users." onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="admin-page-content">
          <DataTable
            loading={loading}
            data={users}
            columns={[
              { key: "id", label: "ID" },
              { key: "full_name", label: "Name" },
              { key: "email", label: "Email" },
              { key: "role", label: "Role" },
              { key: "is_active", label: "Status", render: (row) => row.is_active ? "Active" : "Inactive" },
            ]}
          />
        </div>
      </main>
    </div>
  );
}