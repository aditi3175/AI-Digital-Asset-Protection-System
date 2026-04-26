import { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Home from './pages/Home.jsx';
import Header from './components/Header.jsx';
import Landing from './pages/Landing.jsx';

const STORAGE_KEY = 'ai-asset-analysis-results';

const loadStoredAssets = () => {
  try {
    const storedAssets = localStorage.getItem(STORAGE_KEY);
    return storedAssets ? JSON.parse(storedAssets) : [];
  } catch {
    return [];
  }
};

function AppRoutes() {
  const [assets, setAssets] = useState(loadStoredAssets);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(assets));
  }, [assets]);

  const handleAssetAnalyzed = (asset) => {
    setAssets((currentAssets) => [asset, ...currentAssets]);
    navigate('/dashboard');
  };

  const handleDeleteAsset = (assetId) => {
    setAssets((currentAssets) => {
      const updatedAssets = currentAssets.filter((asset) => asset.id !== assetId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAssets));
      return updatedAssets;
    });
  };

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/analyze"
        element={
          <div className="min-h-screen bg-gradient-to-br from-lilac-100 via-blush-50 to-white">
            <Header />
            <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
              <Home onAssetAnalyzed={handleAssetAnalyzed} />
            </main>
          </div>
        }
      />
      <Route
        path="/dashboard"
        element={
          <div className="min-h-screen bg-gradient-to-br from-lilac-100 via-blush-50 to-white">
            <Header />
            <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
              <Dashboard assets={assets} onDeleteAsset={handleDeleteAsset} />
            </main>
          </div>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
