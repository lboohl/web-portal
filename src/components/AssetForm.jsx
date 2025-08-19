import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAssets } from '../context/AssetContext';
import { motion } from 'framer-motion';

const statusOptions = ['Available', 'In Use', 'Retired'];

export default function AssetForm() {
  const { addAsset, assets, updateAsset } = useAssets();
  const navigate = useNavigate();
  const { id } = useParams();
  const editing = Boolean(id);
  const existing = assets.find(a => a.id === id);
  const [form, setForm] = useState({ name: '', status: statusOptions[0] });

  useEffect(() => {
    if (editing && existing) {
      setForm({ name: existing.name, status: existing.status });
    }
  }, [editing, existing]);

  const handleSubmit = e => {
    e.preventDefault();
    if (editing) {
      updateAsset(id, form);
    } else {
      addAsset(form);
    }
    navigate('/assets');
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="grid gap-4 max-w-md mx-auto p-4"
    >
      <input
        className="border p-2 rounded"
        placeholder="Asset Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        required
      />
      <select
        className="border p-2 rounded"
        value={form.status}
        onChange={e => setForm({ ...form, status: e.target.value })}
      >
        {statusOptions.map(s => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-4 py-2"
      >
        {editing ? 'Update Asset' : 'Add Asset'}
      </button>
    </motion.form>
  );
}
