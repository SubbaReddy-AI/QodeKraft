import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";
import { createAdminItem, deleteAdminItem, getAdminList, updateAdminItem } from "../api/adminApi";

const emptyProject = {
  title: "", slug: "", category: "", client: "",
  description: "", project_url: "", featured: false,
  is_active: true,
};

export default function Projects() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyProject);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);

  const loadItems = async () => {
    const data = await getAdminList("/projects");
    setItems(data.items || data);
  };

  useEffect(() => { loadItems(); }, []);

  const save = async (event) => {
    event.preventDefault();
    if (editing) await updateAdminItem("/projects", editing.id, form);
    else await createAdminItem("/projects", form);

    setOpen(false);
    setEditing(null);
    setForm(emptyProject);
    loadItems();
  };

  const remove = async (item) => {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    await deleteAdminItem("/projects", item.id);
    loadItems();
  };

  return (
    <div className="admin-layout">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="admin-main">
        <Header title="Projects" subtitle="Manage portfolio projects and case studies." onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="admin-page-content">
          <button className="admin-primary-button admin-add-button" onClick={() => { setEditing(null); setForm(emptyProject); setOpen(true); }}><Plus size={18} /> Add Project</button>
          <DataTable
            data={items}
            onEdit={(item) => { setEditing(item); setForm({ ...emptyProject, ...item }); setOpen(true); }}
            onDelete={remove}
            columns={[
              { key: "title", label: "Project" },
              { key: "category", label: "Category" },
              { key: "client", label: "Client" },
              { key: "featured", label: "Featured", render: (row) => row.featured ? "Yes" : "No" },
            ]}
          />
        </div>
      </main>

      <Modal open={open} title={editing ? "Edit Project" : "Add Project"} onClose={() => setOpen(false)}>
        <form className="admin-form" onSubmit={save}>
          <label>Title<input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
          <label>Slug<input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></label>
          <label>Category<input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></label>
          <label>Client<input value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} /></label>
          <label>Project URL<input value={form.project_url} onChange={(e) => setForm({ ...form, project_url: e.target.value })} /></label>
          <label>Description<textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
          <label className="checkbox-label"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured project</label>
          <button className="admin-primary-button" type="submit">Save Project</button>
        </form>
      </Modal>
    </div>
  );
}