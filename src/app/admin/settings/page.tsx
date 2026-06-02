"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
  Settings,
  Search,
} from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

interface Setting {
  id: string;
  key: string;
  value: string;
}

const emptyForm = { key: "", value: "" };

const IMAGE_KEYS = ["logo_url", "image", "avatar", "logo", "hero_image"];

export default function SettingsPage() {
  const [items, setItems] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch("/api/settings");
      if (res.ok) setItems(await res.json());
    } catch {
      showToast("error", "Failed to fetch settings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const openAdd = () => {
    setFormData(emptyForm);
    setIsEditing(false);
    setSelectedId(null);
    setShowModal(true);
  };

  const openEdit = (item: Setting) => {
    setFormData({ key: item.key, value: item.value });
    setSelectedId(item.id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = isEditing ? `/api/settings/${selectedId}` : "/api/settings";
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        showToast("success", `Setting ${isEditing ? "updated" : "created"}`);
        setShowModal(false);
        fetchItems();
      } else {
        const err = await res.json();
        showToast("error", err.error || "Operation failed");
      }
    } catch {
      showToast("error", "Network error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/settings/${id}`, { method: "DELETE" });
      if (res.ok) { showToast("success", "Setting deleted"); fetchItems(); }
      else showToast("error", "Delete failed");
    } catch { showToast("error", "Network error"); }
    setDeleteConfirm(null);
  };

  const filtered = items.filter(
    (i) => i.key.toLowerCase().includes(search.toLowerCase()) || i.value.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {toast && (
        <div className={`fixed top-4 right-4 z-[60] px-4 py-3 rounded-lg shadow-lg text-sm font-medium ${toast.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
          {toast.message}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Manage site configuration</p>
        </div>
        <button onClick={openAdd} className="bg-gray-900 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Add Setting
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search settings..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full sm:w-80 pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none" />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12"><Loader2 className="w-6 h-6 text-gray-900 animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400"><Settings className="w-12 h-12 mx-auto mb-3 opacity-50" /><p>No settings found</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-3">Key</th>
                  <th className="px-6 py-3">Value</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-gray-50 text-gray-700 rounded-full text-xs font-mono font-medium">
                        {item.key}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm max-w-md truncate">{item.value}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(item)} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition"><Pencil className="w-4 h-4" /></button>
                        <button onClick={() => setDeleteConfirm(item.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Setting</h3>
            <p className="text-gray-500 text-sm mb-6">Are you sure? This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition">Delete</button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-10 px-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-lg w-full shadow-xl mb-10">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">{isEditing ? "Edit Setting" : "Add Setting"}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Key</label>
                <input
                  type="text"
                  value={formData.key}
                  onChange={(e) => setFormData((p) => ({ ...p, key: e.target.value }))}
                  required
                  disabled={isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none disabled:bg-gray-50 disabled:text-gray-400 font-mono"
                  placeholder="e.g. site_name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Value</label>
                {IMAGE_KEYS.includes(formData.key) ? (
                  <ImageUpload
                    value={formData.value}
                    onChange={(url) => setFormData((p) => ({ ...p, value: url }))}
                  />
                ) : (
                  <textarea
                    value={formData.value}
                    onChange={(e) => setFormData((p) => ({ ...p, value: e.target.value }))}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none resize-none"
                  />
                )}
              </div>
              <div className="flex gap-3 justify-end pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition">Cancel</button>
                <button type="submit" disabled={saving} className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition disabled:opacity-50 flex items-center gap-2">
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {saving ? "Saving..." : isEditing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
