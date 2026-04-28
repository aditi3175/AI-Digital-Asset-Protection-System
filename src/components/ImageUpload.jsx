import { useEffect, useState } from 'react';
import { Upload, ImagePlus } from 'lucide-react';

function ImageUpload({ onImageSelected }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl('');
      return undefined;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    setSelectedFile(file ?? null);
  };

  useEffect(() => {
    onImageSelected?.(
      selectedFile && previewUrl
        ? { file: selectedFile, name: selectedFile.name, previewUrl }
        : null,
    );
  }, [onImageSelected, previewUrl, selectedFile]);

  return (
    <section className="rounded-2xl border border-coal-700/60 bg-coal-800/80 p-7 shadow-lg shadow-coal-950/30 backdrop-blur-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-tea-600/20 text-tea-400">
          <Upload size={20} strokeWidth={2.2} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-coal-50">Upload Image</h2>
          <p className="text-sm font-medium text-coal-400">Select an image to preview before running analysis</p>
        </div>
      </div>

      <label className="group flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-coal-600 bg-coal-900/50 px-6 text-center transition-all duration-300 hover:border-tea-500/60 hover:bg-coal-800 hover:shadow-lg hover:shadow-tea-500/10">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-tea-600/20 text-tea-400 transition-transform duration-300 group-hover:scale-110 group-hover:text-tea-300">
          <ImagePlus size={26} strokeWidth={1.8} />
        </div>
        <span className="mt-4 text-base font-semibold text-coal-200">Click to choose image</span>
        <span className="mt-1.5 text-sm text-coal-500">PNG, JPG, or WEBP — max 10 MB</span>
        <input accept="image/*" className="sr-only" onChange={handleFileChange} type="file" />
      </label>

      <div className="mt-5 overflow-hidden rounded-xl border border-coal-700/40 bg-coal-900/40">
        {previewUrl ? (
          <img alt={selectedFile?.name || 'Preview'} className="h-72 w-full object-contain" src={previewUrl} />
        ) : (
          <div className="flex h-32 items-center justify-center p-4 text-sm font-medium text-coal-500">Image preview will appear here</div>
        )}
      </div>

      {selectedFile ? (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-tea-900/30 px-3 py-2">
          <div className="h-2 w-2 rounded-full bg-tea-400" />
          <p className="truncate text-sm text-coal-300">Selected: <span className="font-semibold text-coal-100">{selectedFile.name}</span></p>
        </div>
      ) : null}
    </section>
  );
}

export default ImageUpload;
