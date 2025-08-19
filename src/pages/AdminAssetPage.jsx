import AssetForm from '../components/AssetForm';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function AdminAssetPage() {
  const { role } = useAuth();
  if (role !== 'admin') {
    return <Navigate to="/assets" replace />;
  }
  return <AssetForm />;
}
