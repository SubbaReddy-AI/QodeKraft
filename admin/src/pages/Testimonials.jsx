import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";
import { createAdminItem, deleteAdminItem, getAdminList, updateAdminItem } from "../api/adminApi";

const emptyTestimonial = {
  name: "", role: "", company: "", content: "",
  rating: 5, is_active: true,
};

export default function Testimonials() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyTestimonial);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);

  const loadItems = async () => {
    const data = await getAdminList("/testimonials");
    setItems(data.items || data);
  };

  useEffect(() => { loadItems(); }, []);

  const save = async (event) => {
    event.preventDefault();
    const data = { ...form, rating: Number(form.rating) || 5 };
    if (editing) await updateAdminItem("/testimonials", editing.id, data);
    else await createAdminItem("/testimonials", data);

    setOpen(false);
    setEditing(null);
    setForm(emptyTestimonial);
    loadItems();
  };

  const remove = async (item) => {
    if (!window.confirm(`Delete testimonial from "${item.name}"?`)) return;
    await deleteAdminItem("/testimonials", item.id);
    loadItems();
  };

  return (
    <div className="admin-layout">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="admin-main">
        <Header title="Testimonials" subtitle="Manage client and student testimonials." onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="admin-page-content">
          <button className="admin-primary-button admin-add-button" onClick={() => { setEditing(null); setForm(emptyTestimonial); setOpen(true); }}><Plus size={18} /> Add Testimonial</button>
          <DataTable
            data={items}
            onEdit={(item) => { setEditing(item); setForm({ ...emptyTestimonial, ...item }); setOpen(true); }}
            onDelete={remove}
            columns={[
              { key: "name", label: "Name" },
              { key: "role", label: "Role" },
              { key: "company", label: "Company" },
              { key: "rating", label: "Rating", render: (row) => `${row.rating || 0}/5` },
            ]}
          />
        </div>
      </main>

      <Modal open={open} title={editing ? "Edit Testimonial" : "Add Testimonial"} onClose={() => setOpen(false)}>
        <form className="admin-form" onSubmit={save}>
          <label>Name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
          <label>Role<input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} /></label>
          <label>Company<input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} /></label>
          <label>Rating<input type="number" min="1" max="5" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} /></label>
          <label>Testimonial<textarea required value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} /></label>
          <button className="admin-primary-button" type="submit">Save Testimonial</button>
        </form>
      </Modal>
    </div>
  );
}