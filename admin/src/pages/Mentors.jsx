import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";
import { createAdminItem, deleteAdminItem, getAdminList, updateAdminItem } from "../api/adminApi";

const emptyMentor = {
  name: "", designation: "", expertise: "", bio: "",
  linkedin_url: "", is_active: true,
};

export default function Mentors() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyMentor);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);

  const loadItems = async () => {
    const data = await getAdminList("/mentors");
    setItems(data.items || data);
  };

  useEffect(() => { loadItems(); }, []);

  const save = async (event) => {
    event.preventDefault();
    if (editing) await updateAdminItem("/mentors", editing.id, form);
    else await createAdminItem("/mentors", form);

    setOpen(false);
    setEditing(null);
    setForm(emptyMentor);
    loadItems();
  };

  const remove = async (item) => {
    if (!window.confirm(`Delete "${item.name}"?`)) return;
    await deleteAdminItem("/mentors", item.id);
    loadItems();
  };

  return (
    <div className="admin-layout">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="admin-main">
        <Header title="Mentors" subtitle="Manage academy mentors." onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="admin-page-content">
          <button className="admin-primary-button admin-add-button" onClick={() => { setEditing(null); setForm(emptyMentor); setOpen(true); }}><Plus size={18} /> Add Mentor</button>
          <DataTable
            data={items}
            onEdit={(item) => { setEditing(item); setForm({ ...emptyMentor, ...item }); setOpen(true); }}
            onDelete={remove}
            columns={[
              { key: "name", label: "Name" },
              { key: "designation", label: "Designation" },
              { key: "expertise", label: "Expertise" },
              { key: "is_active", label: "Status", render: (row) => row.is_active ? "Active" : "Inactive" },
            ]}
          />
        </div>
      </main>

      <Modal open={open} title={editing ? "Edit Mentor" : "Add Mentor"} onClose={() => setOpen(false)}>
        <form className="admin-form" onSubmit={save}>
          <label>Name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
          <label>Designation<input value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} /></label>
          <label>Expertise<input value={form.expertise} onChange={(e) => setForm({ ...form, expertise: e.target.value })} /></label>
          <label>LinkedIn URL<input value={form.linkedin_url} onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })} /></label>
          <label>Bio<textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} /></label>
          <button className="admin-primary-button" type="submit">Save Mentor</button>
        </form>
      </Modal>
    </div>
  );
}