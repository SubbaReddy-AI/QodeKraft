import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";
import { createAdminItem, deleteAdminItem, getAdminList, updateAdminItem } from "../api/adminApi";

const emptyCourse = {
  title: "", slug: "", description: "", category: "",
  level: "Beginner", duration: "", price: 0, is_active: true,
};

export default function Courses() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyCourse);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);

  const loadItems = async () => {
    const data = await getAdminList("/courses");
    setItems(data.items || data);
  };

  useEffect(() => { loadItems(); }, []);

  const save = async (event) => {
    event.preventDefault();
    const data = { ...form, price: Number(form.price) || 0 };

    if (editing) await updateAdminItem("/courses", editing.id, data);
    else await createAdminItem("/courses", data);

    setOpen(false);
    setEditing(null);
    setForm(emptyCourse);
    loadItems();
  };

  const remove = async (item) => {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    await deleteAdminItem("/courses", item.id);
    loadItems();
  };

  return (
    <div className="admin-layout">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="admin-main">
        <Header title="Courses" subtitle="Manage academy courses." onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="admin-page-content">
          <button className="admin-primary-button admin-add-button" onClick={() => { setEditing(null); setForm(emptyCourse); setOpen(true); }}><Plus size={18} /> Add Course</button>
          <DataTable
            data={items}
            onEdit={(item) => { setEditing(item); setForm({ ...emptyCourse, ...item }); setOpen(true); }}
            onDelete={remove}
            columns={[
              { key: "title", label: "Course" },
              { key: "category", label: "Category" },
              { key: "level", label: "Level" },
              { key: "duration", label: "Duration" },
              { key: "price", label: "Price", render: (row) => `₹${row.price || 0}` },
            ]}
          />
        </div>
      </main>

      <Modal open={open} title={editing ? "Edit Course" : "Add Course"} onClose={() => setOpen(false)}>
        <form className="admin-form" onSubmit={save}>
          <label>Title<input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
          <label>Slug<input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></label>
          <label>Category<input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></label>
          <label>Level<select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></label>
          <label>Duration<input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} /></label>
          <label>Price<input type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></label>
          <label>Description<textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
          <button className="admin-primary-button" type="submit">Save Course</button>
        </form>
      </Modal>
    </div>
  );
}