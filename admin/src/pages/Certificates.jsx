import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DataTable from "../components/DataTable";

import { getAdminList } from "../api/adminApi";


export default function Certificates() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getAdminList("/certificates")
      .then((data) => {
        setItems(Array.isArray(data) ? data : data.items || []);
      })
      .catch((err) => {
        console.error(err);
        setError("Certificates could not be loaded.");
      });
  }, []);

  return (
    <div className="admin-layout">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="admin-main">
        <Header
          title="Certificates"
          subtitle="View and manage issued certificates."
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />

        <div className="admin-page-content">
          {error && (
            <div className="admin-error">
              {error}
            </div>
          )}

          <DataTable
            data={items}
            columns={[
              {
                key: "certificate_id",
                label: "Certificate ID",
              },
              {
                key: "student_name",
                label: "Student",
              },
              {
                key: "course_name",
                label: "Course",
              },
              {
                key: "issued_at",
                label: "Issued",
              },
              {
                key: "status",
                label: "Status",
              },
            ]}
          />
        </div>
      </main>
    </div>
  );
}