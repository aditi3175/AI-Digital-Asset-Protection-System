import { useState } from 'react';
import AnalyzePanel from '../components/AnalyzePanel.jsx';
import ImageUpload from '../components/ImageUpload.jsx';

function Home({ onAssetAnalyzed }) {
  const [uploadedImage, setUploadedImage] = useState(null);

  return (
    <div className="grid gap-8 lg:grid-cols-[3fr_2fr]">
      <ImageUpload onImageSelected={setUploadedImage} />
      <AnalyzePanel
        onAssetAnalyzed={onAssetAnalyzed}
        uploadedImage={uploadedImage}
      />
    </div>
  );
}

export default Home;
