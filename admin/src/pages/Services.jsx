import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";
import {
  createAdminItem,
  deleteAdminItem,
  getAdminList,
  updateAdminItem,
} from "../api/adminApi";

const emptyService = {
  title: "",
  slug: "",
  short_description: "",
  description: "",
  is_active: true,
};

export default function Services() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyService);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);

  const loadItems = async () => {
    const data = await getAdminList("/services");
    setItems(data.items || data);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const saveItem = async (event) => {
    event.preventDefault();

    if (editing) {
      await updateAdminItem("/services", editing.id, form);
    } else {
      await createAdminItem("/services", form);
    }

    setOpen(false);
    setEditing(null);
    setForm(emptyService);
    loadItems();
  };

  const editItem = (item) => {
    setEditing(item);
    setForm({ ...emptyService, ...item });
    setOpen(true);
  };

  const removeItem = async (item) => {
    if (!window.confirm(`Delete "${item.title}"?`)) return;

    await deleteAdminItem("/services", item.id);
    loadItems();
  };

  return (
    <div className="admin-layout">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="admin-main">
        <Header title="Services" subtitle="Manage services displayed on the website." onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="admin-page-content">
          <button type="button" className="admin-primary-button admin-add-button" onClick={() => { setEditing(null); setForm(emptyService); setOpen(true); }}>
            <Plus size={18} /> Add Service
          </button>

          <DataTable
            data={items}
            onEdit={editItem}
            onDelete={removeItem}
            columns={[
              { key: "title", label: "Title" },
              { key: "slug", label: "Slug" },
              { key: "short_description", label: "Description" },
              { key: "is_active", label: "Status", render: (row) => row.is_active ? "Active" : "Inactive" },
            ]}
          />
        </div>
      </main>

      <Modal open={open} title={editing ? "Edit Service" : "Add Service"} onClose={() => setOpen(false)}>
        <form className="admin-form" onSubmit={saveItem}>
          <label>Title<input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
          <label>Slug<input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></label>
          <label>Short Description<textarea value={form.short_description} onChange={(e) => setForm({ ...form, short_description: e.target.value })} /></label>
          <label>Full Description<textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
          <label className="checkbox-label"><input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} /> Active</label>
          <button className="admin-primary-button" type="submit">Save Service</button>
        </form>
      </Modal>
    </div>
  );
}