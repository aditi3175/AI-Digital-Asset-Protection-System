import { useEffect, useState } from 'react';
import { ScanSearch, Fingerprint, ShieldCheck, Info } from 'lucide-react';

const getSimilarityLabel = (value) => {
  if (value >= 80) return { text: 'High', color: 'text-red-400 bg-red-500/15' };
  if (value >= 70) return { text: 'Medium', color: 'text-amber-400 bg-amber-500/15' };
  return { text: 'Low', color: 'text-tea-400 bg-tea-500/15' };
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
    if (!uploadedImage || isScanning) return;
    setAnalysisResult(null);
    setIsScanning(true);

    window.setTimeout(async () => {
      let imageUrl = '';
      try {
        imageUrl = uploadedImage.file ? await readFileAsDataUrl(uploadedImage.file) : '';
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

  const similarityInfo = analysisResult ? getSimilarityLabel(analysisResult.similarity) : null;

  return (
    <aside className="flex flex-col rounded-2xl border border-coal-700/60 bg-coal-800/80 p-7 shadow-lg shadow-coal-950/30 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-tea-600/20 text-tea-400">
          <ScanSearch size={20} strokeWidth={2.2} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-coal-50">Analysis</h2>
          <p className="text-sm font-medium text-coal-400">Run a check to generate detection results</p>
        </div>
      </div>

      {/* Button */}
      <button
        className={`mt-6 w-full rounded-xl px-4 py-3.5 text-sm font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-tea-400/50 ${
          !uploadedImage || isScanning
            ? 'cursor-not-allowed border border-coal-700 bg-coal-700/50 text-coal-500 shadow-none'
            : 'bg-gradient-to-r from-tea-500 to-tea-600 text-coal-950 shadow-lg shadow-tea-500/25 hover:-translate-y-0.5 hover:from-tea-400 hover:to-tea-500 hover:shadow-xl active:translate-y-0'
        }`}
        disabled={!uploadedImage || isScanning}
        onClick={handleAnalyze}
        type="button"
      >
        {isScanning ? (
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-coal-950/30 border-t-coal-950" />
            Scanning...
          </span>
        ) : 'Analyze Image'}
      </button>
      {!uploadedImage && <p className="mt-3 text-center text-sm font-medium text-coal-500">Upload an image before running analysis.</p>}

      <div className="mt-6 flex-1 space-y-4">
        {/* Fingerprint */}
        <div className="rounded-xl border border-coal-700/50 bg-coal-900/50 p-4">
          <div className="flex items-center gap-2">
            <Fingerprint size={14} className="text-coal-400" strokeWidth={2.2} />
            <p className="text-xs font-bold uppercase tracking-wider text-coal-400">Fingerprint</p>
          </div>
          <p className="mt-2.5 font-mono text-sm font-semibold text-coal-100">
            {isScanning ? 'Scanning...' : analysisResult?.fingerprint ?? 'Pending analysis'}
          </p>
        </div>

        {/* Detection Result */}
        <div className="relative overflow-hidden rounded-xl border-2 border-tea-500/30 bg-gradient-to-br from-tea-900/15 via-coal-800/50 to-coal-900/50 p-4 shadow-md shadow-tea-500/10 ring-1 ring-tea-500/10">
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-tea-400 to-tea-600" />
          <div className="flex items-center gap-2 pl-2">
            <ShieldCheck size={15} className="text-tea-400" strokeWidth={2.2} />
            <p className="text-xs font-bold uppercase tracking-wider text-tea-400">Detection Result</p>
          </div>
          {isScanning ? (
            <div className="mt-4 flex items-center gap-2 pl-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-tea-700 border-t-tea-400" />
              <p className="text-sm font-semibold text-tea-400">Scanning...</p>
            </div>
          ) : analysisResult ? (
            <dl className="mt-4 space-y-2.5 pl-2 text-sm">
              <div className="flex items-center justify-between gap-3 rounded-lg bg-coal-900/60 px-3 py-2.5">
                <dt className="font-medium text-coal-400">Similarity</dt>
                <dd className="flex items-center gap-2">
                  <span className="text-lg font-bold text-tea-400">{analysisResult.similarity}%</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${similarityInfo.color}`}>{similarityInfo.text}</span>
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-lg bg-coal-900/60 px-3 py-2.5">
                <dt className="font-medium text-coal-400">Source</dt>
                <dd className="text-right font-semibold text-coal-100">{analysisResult.source}</dd>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-lg bg-coal-900/60 px-3 py-2.5">
                <dt className="font-medium text-coal-400">Type</dt>
                <dd>
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${analysisResult.type === 'Modified' ? 'bg-red-500/15 text-red-400' : 'bg-tea-500/15 text-tea-400'}`}>
                    {analysisResult.type}
                  </span>
                </dd>
              </div>
            </dl>
          ) : (
            <p className="mt-4 pl-2 text-sm font-medium text-coal-500">Click Analyze Image to generate a similarity result.</p>
          )}
        </div>

        {/* Similarity legend */}
        <div className="rounded-lg border border-coal-700/40 bg-coal-900/30 px-4 py-3">
          <div className="mb-2 flex items-center gap-1.5">
            <Info size={12} className="text-coal-500" strokeWidth={2.5} />
            <p className="text-[10px] font-bold uppercase tracking-wider text-coal-500">Similarity Guide</p>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium">
            <span className="flex items-center gap-1.5"><span className="inline-block h-2 w-2 rounded-full bg-red-400" /><span className="text-coal-400">80–100% High</span></span>
            <span className="flex items-center gap-1.5"><span className="inline-block h-2 w-2 rounded-full bg-amber-400" /><span className="text-coal-400">70–79% Medium</span></span>
            <span className="flex items-center gap-1.5"><span className="inline-block h-2 w-2 rounded-full bg-tea-400" /><span className="text-coal-400">60–69% Low</span></span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default AnalyzePanel;
