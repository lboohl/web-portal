import { useParams } from 'react-router-dom';
import { useAssets } from '../context/AssetContext';
import { motion } from 'framer-motion';

export default function AssetDetailPage() {
  const { id } = useParams();
  const { assets } = useAssets();
  const asset = assets.find(a => a.id === id);

  if (!asset) return <p className="p-4">Asset not found.</p>;

  const url = `${window.location.origin}/web-portal/assets/${asset.id}`;
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 text-center space-y-4">
      <h2 className="text-2xl font-bold">{asset.name}</h2>
      <p>ID: {asset.id}</p>
      <p>Status: {asset.status}</p>
      <div className="flex justify-center">
        <img src={qrSrc} alt="QR code" className="border" />
      </div>
      <a href={qrSrc} download={`${asset.id}.png`} className="inline-block px-4 py-2 bg-indigo-600 text-white rounded">
        Download QR
      </a>
    </motion.div>
  );
}
