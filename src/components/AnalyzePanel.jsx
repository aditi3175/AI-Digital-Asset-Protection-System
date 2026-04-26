import { useEffect, useState } from 'react';
import { ScanSearch, Fingerprint, ShieldCheck, Info } from 'lucide-react';

const getSimilarityLabel = (value) => {
  if (value >= 80) return { text: 'High', color: 'text-blush-700 bg-blush-100' };
  if (value >= 70) return { text: 'Medium', color: 'text-amber-700 bg-amber-50' };
  return { text: 'Low', color: 'text-emerald-700 bg-emerald-50' };
};

function AnalyzePanel({ onAssetAnalyzed, uploadedImage }) {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    setAnalysisResult(null);
    setIsScanning(false);
  }, [uploadedImage]);

  const createFingerprint = () => {
    const segment = () => Math.random().toString(36).slice(2, 6).toUpperCase();
    return `FP-${segment()}-${segment()}-${segment()}`;
  };

  const readFileAsDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });

  const handleAnalyze = () => {
    if (!uploadedImage || isScanning) {
      return;
    }

    setAnalysisResult(null);
    setIsScanning(true);

    window.setTimeout(async () => {
      let imageUrl = '';

      try {
        imageUrl = uploadedImage.file
          ? await readFileAsDataUrl(uploadedImage.file)
          : '';
      } catch {
        imageUrl = uploadedImage.previewUrl ?? '';
      }

      const similarity = Math.floor(Math.random() * 36) + 60;
      const result = {
        fingerprint: createFingerprint(),
        similarity,
        source: 'AI content registry',
        type: similarity >= 80 ? 'Modified' : 'Original',
      };

      const asset = {
        id: crypto.randomUUID(),
        imageUrl,
        name: uploadedImage?.name ?? 'Untitled image',
        fingerprint: result.fingerprint,
        result,
      };

      setAnalysisResult(result);
      setIsScanning(false);
      onAssetAnalyzed(asset);
    }, 1500);
  };

  const similarityInfo = analysisResult
    ? getSimilarityLabel(analysisResult.similarity)
    : null;

  return (
    <aside className="flex flex-col rounded-2xl border border-lilac-100/60 bg-white p-7 shadow-lg shadow-lilac-200/25">
      {/* Section header with icon */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-lilac-100 to-blush-100 text-lilac-600 shadow-sm">
          <ScanSearch size={20} strokeWidth={2.2} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-lilac-900">Analysis</h2>
          <p className="text-sm font-medium text-lilac-600">
            Run a check to generate detection results
          </p>
        </div>
      </div>

      {/* Analyze button — distinct disabled vs active states */}
      <button
        className={`mt-6 w-full rounded-xl px-4 py-3.5 text-sm font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blush-300 ${
          !uploadedImage || isScanning
            ? 'cursor-not-allowed border border-lilac-200 bg-lilac-100 text-lilac-400 shadow-none'
            : 'bg-gradient-to-r from-blush-500 to-lilac-500 text-white shadow-lg shadow-blush-200/40 hover:-translate-y-0.5 hover:from-blush-600 hover:to-lilac-600 hover:shadow-xl hover:shadow-blush-300/40 active:translate-y-0 active:shadow-md'
        }`}
        disabled={!uploadedImage || isScanning}
        onClick={handleAnalyze}
        type="button"
      >
        {isScanning ? (
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Scanning...
          </span>
        ) : (
          'Analyze Image'
        )}
      </button>
      {!uploadedImage ? (
        <p className="mt-3 text-center text-sm font-medium text-lilac-400">
          Upload an image before running analysis.
        </p>
      ) : null}

      <div className="mt-6 flex-1 space-y-4">
        {/* Fingerprint section */}
        <div className="rounded-xl border border-lilac-100 bg-lilac-50/60 p-4">
          <div className="flex items-center gap-2">
            <Fingerprint size={14} className="text-lilac-500" strokeWidth={2.2} />
            <p className="text-xs font-bold uppercase tracking-wider text-lilac-500">
              Fingerprint
            </p>
          </div>
          <p className="mt-2.5 font-mono text-sm font-semibold text-lilac-900">
            {isScanning
              ? 'Scanning...'
              : analysisResult?.fingerprint ?? 'Pending analysis'}
          </p>
        </div>

        {/* Detection Result — prominent highlighted section */}
        <div className="relative overflow-hidden rounded-xl border-2 border-blush-200 bg-gradient-to-br from-blush-50 via-white to-lilac-50 p-4 shadow-md shadow-blush-100/40 ring-1 ring-blush-100/50">
          {/* Left accent bar */}
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blush-400 to-lilac-400" />

          <div className="flex items-center gap-2 pl-2">
            <ShieldCheck size={15} className="text-blush-600" strokeWidth={2.2} />
            <p className="text-xs font-bold uppercase tracking-wider text-blush-600">
              Detection Result
            </p>
          </div>
          {isScanning ? (
            <div className="mt-4 flex items-center gap-2 pl-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-blush-300 border-t-blush-600" />
              <p className="text-sm font-semibold text-blush-600">Scanning...</p>
            </div>
          ) : analysisResult ? (
            <dl className="mt-4 space-y-2.5 pl-2 text-sm">
              <div className="flex items-center justify-between gap-3 rounded-lg bg-white/80 px-3 py-2.5 shadow-sm">
                <dt className="font-medium text-lilac-600">Similarity</dt>
                <dd className="flex items-center gap-2">
                  <span className="text-lg font-bold text-blush-600">
                    {analysisResult.similarity}%
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${similarityInfo.color}`}
                  >
                    {similarityInfo.text}
                  </span>
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-lg bg-white/80 px-3 py-2.5 shadow-sm">
                <dt className="font-medium text-lilac-600">Source</dt>
                <dd className="text-right font-semibold text-lilac-900">
                  {analysisResult.source}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-lg bg-white/80 px-3 py-2.5 shadow-sm">
                <dt className="font-medium text-lilac-600">Type</dt>
                <dd>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                      analysisResult.type === 'Modified'
                        ? 'bg-blush-100 text-blush-700'
                        : 'bg-lilac-100 text-lilac-700'
                    }`}
                  >
                    {analysisResult.type}
                  </span>
                </dd>
              </div>
            </dl>
          ) : (
            <p className="mt-4 pl-2 text-sm font-medium text-lilac-500">
              Click Analyze Image to generate a similarity result.
            </p>
          )}
        </div>

        {/* Similarity legend */}
        <div className="rounded-lg border border-lilac-100/80 bg-lilac-50/40 px-4 py-3">
          <div className="mb-2 flex items-center gap-1.5">
            <Info size={12} className="text-lilac-400" strokeWidth={2.5} />
            <p className="text-[10px] font-bold uppercase tracking-wider text-lilac-400">
              Similarity Guide
            </p>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-blush-500" />
              <span className="text-lilac-600">80–100% High</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-amber-400" />
              <span className="text-lilac-600">70–79% Medium</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-lilac-600">60–69% Low</span>
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default AnalyzePanel;
