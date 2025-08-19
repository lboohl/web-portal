import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAssets } from '../context/AssetContext';
import { useAuth } from '../context/AuthContext';
import { QrCodeIcon, PencilSquareIcon, TrashIcon, PlusCircleIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const statusOptions = ['Available', 'In Use', 'Retired'];

export default function AssetInventory() {
  const { assets, deleteAsset } = useAssets();
  const { role } = useAuth();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const handleSort = field => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const filtered = assets
    .filter(a =>
      [a.name, a.id, a.status].some(v =>
        v.toLowerCase().includes(search.toLowerCase())
      )
    )
    .filter(a => (status ? a.status === status : true))
    .sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortAsc ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortAsc ? 1 : -1;
      return 0;
    });

  const exportExcel = () => {
    if (!window.XLSX) return;
    const ws = window.XLSX.utils.json_to_sheet(assets);
    const wb = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(wb, ws, 'Assets');
    window.XLSX.writeFile(wb, 'assets.xlsx');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        <input
          className="border rounded p-2 col-span-2"
          placeholder="Search"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="border rounded p-2"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          {statusOptions.map(s => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <div className="flex gap-2 justify-end">
          <button
            onClick={exportExcel}
            className="flex items-center px-3 py-2 bg-indigo-500 text-white rounded"
          >
            <ArrowUpTrayIcon className="h-5 w-5 mr-1" /> Export
          </button>
          {role === 'admin' && (
            <Link
              to="/admin/add"
              className="flex items-center px-3 py-2 bg-green-500 text-white rounded"
            >
              <PlusCircleIcon className="h-5 w-5 mr-1" /> Add
            </Link>
          )}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr>
              <th className="p-2 cursor-pointer" onClick={() => handleSort('name')}>Name</th>
              <th className="p-2 cursor-pointer" onClick={() => handleSort('id')}>ID</th>
              <th className="p-2 cursor-pointer" onClick={() => handleSort('status')}>Status</th>
              {role === 'admin' && <th className="p-2">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a.id} className="border-t">
                <td className="p-2">
                  <Link to={`/assets/${a.id}`} className="text-blue-600 hover:underline">
                    {a.name}
                  </Link>
                </td>
                <td className="p-2">{a.id}</td>
                <td className="p-2">{a.status}</td>
                {role === 'admin' && (
                  <td className="p-2 flex gap-2">
                    <Link to={`/assets/${a.id}`} className="text-gray-700 hover:text-black">
                      <QrCodeIcon className="h-5 w-5" />
                    </Link>
                    <Link to={`/admin/edit/${a.id}`} className="text-green-600 hover:text-green-800">
                      <PencilSquareIcon className="h-5 w-5" />
                    </Link>
                    <button onClick={() => deleteAsset(a.id)} className="text-red-600 hover:text-red-800">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
