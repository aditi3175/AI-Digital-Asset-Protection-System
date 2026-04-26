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
        ? {
            file: selectedFile,
            name: selectedFile.name,
            previewUrl,
          }
        : null,
    );
  }, [onImageSelected, previewUrl, selectedFile]);

  return (
    <section className="rounded-2xl border border-lilac-100/60 bg-white p-7 shadow-lg shadow-lilac-200/25">
      {/* Section header with icon */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blush-100 to-lilac-100 text-blush-600 shadow-sm">
          <Upload size={20} strokeWidth={2.2} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-lilac-900">Upload Image</h2>
          <p className="text-sm font-medium text-lilac-600">
            Select an image to preview before running analysis
          </p>
        </div>
      </div>

      <label className="group flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-lilac-300 bg-gradient-to-br from-lilac-50 to-blush-50/60 px-6 text-center transition-all duration-300 hover:border-blush-400 hover:bg-gradient-to-br hover:from-blush-50 hover:to-lilac-100 hover:shadow-lg hover:shadow-blush-100/40">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blush-100 to-lilac-200 text-blush-500 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:shadow-blush-200/50">
          <ImagePlus size={26} strokeWidth={1.8} />
        </div>
        <span className="mt-4 text-base font-semibold text-lilac-900">
          Click to choose image
        </span>
        <span className="mt-1.5 text-sm text-lilac-500">
          PNG, JPG, or WEBP — max 10 MB
        </span>
        <input
          accept="image/*"
          className="sr-only"
          onChange={handleFileChange}
          type="file"
        />
      </label>

      <div className="mt-5 overflow-hidden rounded-xl border border-lilac-100/50 bg-lilac-50/40">
        {previewUrl ? (
          <img
            alt={selectedFile?.name || 'Selected upload preview'}
            className="h-72 w-full object-contain"
            src={previewUrl}
          />
        ) : (
          <div className="flex h-32 items-center justify-center p-4 text-sm font-medium text-lilac-400">
            Image preview will appear here
          </div>
        )}
      </div>

      {selectedFile ? (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-lilac-50 px-3 py-2">
          <div className="h-2 w-2 rounded-full bg-green-400" />
          <p className="truncate text-sm text-lilac-700">
            Selected: <span className="font-semibold text-lilac-900">{selectedFile.name}</span>
          </p>
        </div>
      ) : null}
    </section>
  );
}

export default ImageUpload;
