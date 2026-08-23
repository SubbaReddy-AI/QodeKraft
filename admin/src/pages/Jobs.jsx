import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";
import { createAdminItem, deleteAdminItem, getAdminList, updateAdminItem } from "../api/adminApi";

const emptyJob = {
  title: "", slug: "", department: "", location: "",
  employment_type: "Full Time", experience: "",
  description: "", is_active: true,
};

export default function Jobs() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyJob);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);

  const loadItems = async () => {
    const data = await getAdminList("/careers");
    setItems(data.items || data);
  };

  useEffect(() => { loadItems(); }, []);

  const save = async (event) => {
    event.preventDefault();
    if (editing) await updateAdminItem("/careers", editing.id, form);
    else await createAdminItem("/careers", form);

    setOpen(false);
    setEditing(null);
    setForm(emptyJob);
    loadItems();
  };

  const remove = async (item) => {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    await deleteAdminItem("/careers", item.id);
    loadItems();
  };

  return (
    <div className="admin-layout">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="admin-main">
        <Header title="Jobs" subtitle="Manage career opportunities." onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="admin-page-content">
          <button className="admin-primary-button admin-add-button" onClick={() => { setEditing(null); setForm(emptyJob); setOpen(true); }}><Plus size={18} /> Add Job</button>
          <DataTable
            data={items}
            onEdit={(item) => { setEditing(item); setForm({ ...emptyJob, ...item }); setOpen(true); }}
            onDelete={remove}
            columns={[
              { key: "title", label: "Position" },
              { key: "department", label: "Department" },
              { key: "location", label: "Location" },
              { key: "employment_type", label: "Type" },
              { key: "experience", label: "Experience" },
            ]}
          />
        </div>
      </main>

      <Modal open={open} title={editing ? "Edit Job" : "Add Job"} onClose={() => setOpen(false)}>
        <form className="admin-form" onSubmit={save}>
          <label>Title<input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
          <label>Slug<input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></label>
          <label>Department<input value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} /></label>
          <label>Location<input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></label>
          <label>Employment Type<select value={form.employment_type} onChange={(e) => setForm({ ...form, employment_type: e.target.value })}><option>Full Time</option><option>Part Time</option><option>Contract</option><option>Internship</option></select></label>
          <label>Experience<input value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} /></label>
          <label>Description<textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
          <button className="admin-primary-button" type="submit">Save Job</button>
        </form>
      </Modal>
    </div>
  );
}