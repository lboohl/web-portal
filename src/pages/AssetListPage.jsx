import AssetInventory from '../components/AssetInventory';
import { motion } from 'framer-motion';

export default function AssetListPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <AssetInventory />
    </motion.div>
  );
}
