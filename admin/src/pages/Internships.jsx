import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";
import { createAdminItem, deleteAdminItem, getAdminList, updateAdminItem } from "../api/adminApi";

const emptyInternship = {
  title: "", slug: "", domain: "", description: "",
  location: "Remote", duration: "", openings: 1,
  mode: "Remote", is_active: true,
};

export default function Internships() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyInternship);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);

  const loadItems = async () => {
    const data = await getAdminList("/internships");
    setItems(data.items || data);
  };

  useEffect(() => { loadItems(); }, []);

  const save = async (event) => {
    event.preventDefault();
    const data = { ...form, openings: Number(form.openings) || 1 };
    if (editing) await updateAdminItem("/internships", editing.id, data);
    else await createAdminItem("/internships", data);

    setOpen(false);
    setEditing(null);
    setForm(emptyInternship);
    loadItems();
  };

  const remove = async (item) => {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    await deleteAdminItem("/internships", item.id);
    loadItems();
  };

  return (
    <div className="admin-layout">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="admin-main">
        <Header title="Internships" subtitle="Manage internship opportunities." onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="admin-page-content">
          <button className="admin-primary-button admin-add-button" onClick={() => { setEditing(null); setForm(emptyInternship); setOpen(true); }}><Plus size={18} /> Add Internship</button>
          <DataTable
            data={items}
            onEdit={(item) => { setEditing(item); setForm({ ...emptyInternship, ...item }); setOpen(true); }}
            onDelete={remove}
            columns={[
              { key: "title", label: "Title" },
              { key: "domain", label: "Domain" },
              { key: "location", label: "Location" },
              { key: "duration", label: "Duration" },
              { key: "openings", label: "Openings" },
            ]}
          />
        </div>
      </main>

      <Modal open={open} title={editing ? "Edit Internship" : "Add Internship"} onClose={() => setOpen(false)}>
        <form className="admin-form" onSubmit={save}>
          <label>Title<input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
          <label>Slug<input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></label>
          <label>Domain<input value={form.domain} onChange={(e) => setForm({ ...form, domain: e.target.value })} /></label>
          <label>Location<input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></label>
          <label>Duration<input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} /></label>
          <label>Openings<input type="number" min="1" value={form.openings} onChange={(e) => setForm({ ...form, openings: e.target.value })} /></label>
          <label>Mode<select value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value })}><option>Remote</option><option>Hybrid</option><option>On-site</option></select></label>
          <label>Description<textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
          <button className="admin-primary-button" type="submit">Save Internship</button>
        </form>
      </Modal>
    </div>
  );
}