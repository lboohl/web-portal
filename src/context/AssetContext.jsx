import { createContext, useContext, useEffect, useState } from 'react';

const AssetContext = createContext();

export const AssetProvider = ({ children }) => {
  const [assets, setAssets] = useState(() => {
    const stored = localStorage.getItem('assets');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('assets', JSON.stringify(assets));
  }, [assets]);

  const generateId = () => (
    Date.now().toString(36) + Math.random().toString(36).substring(2, 9)
  );

  const addAsset = ({ name, status }) => {
    const id = generateId();
    setAssets([...assets, { id, name, status }]);
  };

  const updateAsset = (id, updates) => {
    setAssets(assets.map(a => (a.id === id ? { ...a, ...updates } : a)));
  };

  const deleteAsset = id => {
    setAssets(assets.filter(a => a.id !== id));
  };

  return (
    <AssetContext.Provider value={{ assets, addAsset, updateAsset, deleteAsset }}>
      {children}
    </AssetContext.Provider>
  );
};

export const useAssets = () => useContext(AssetContext);
