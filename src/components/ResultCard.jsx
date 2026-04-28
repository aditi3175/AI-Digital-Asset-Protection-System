import { Sparkles } from 'lucide-react';

function ResultCard({ asset, onDeleteAsset }) {
  const similarity = asset.result.similarity;
  const badgeStyles =
    similarity >= 80
      ? 'border-red-500/30 bg-red-500/15 text-red-400'
      : 'border-tea-500/30 bg-tea-500/15 text-tea-400';
  const typeStyles =
    asset.result.type === 'Modified'
      ? 'bg-red-500/15 text-red-400'
      : 'bg-tea-500/15 text-tea-400';

  const handleDelete = () => {
    const confirmed = window.confirm('Are you sure you want to delete this asset?');
    if (confirmed) onDeleteAsset(asset.id);
  };

  return (
    <article className="rounded-xl border border-coal-700/60 bg-coal-800/80 p-3 shadow-lg shadow-coal-950/30 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-tea-500/30 hover:shadow-xl hover:shadow-tea-500/10">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-coal-900/60 text-sm text-coal-500">
        {asset.imageUrl ? (
          <img alt={asset.name} className="h-full w-full rounded-lg object-cover transition duration-300 hover:scale-105" src={asset.imageUrl} />
        ) : (
          <div className="flex h-full w-full items-center justify-center">Image preview</div>
        )}
        <div className="absolute right-3 top-3">
          <button
            aria-label={`Delete ${asset.name}`}
            className="rounded-full border border-red-500/30 bg-coal-900/90 px-2.5 py-1 text-sm font-semibold text-red-400 shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-red-500/20 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-500/30"
            onClick={handleDelete}
            type="button"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="space-y-4 px-2 pb-2 pt-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="truncate text-base font-bold text-coal-50">{asset.name}</h3>
            <p className="mt-1 text-xs font-medium uppercase text-tea-500">Analyzed asset</p>
          </div>
          <span className={`shrink-0 rounded-full border px-4 py-2 text-xl font-bold ${badgeStyles}`}>{similarity}%</span>
        </div>

        <dl className="divide-y divide-coal-700/50 rounded-lg border border-coal-700/50 bg-coal-900/50 text-sm">
          <div className="space-y-1 px-4 py-3">
            <dt className="text-xs font-semibold uppercase text-coal-500">Fingerprint</dt>
            <dd className="break-all font-mono text-xs font-semibold text-coal-200">{asset.fingerprint}</dd>
          </div>
          <div className="grid grid-cols-[90px_1fr] gap-3 px-4 py-3">
            <dt className="text-coal-400">Similarity</dt>
            <dd className="text-lg font-bold text-tea-400">{similarity}%</dd>
          </div>
          <div className="grid grid-cols-[90px_1fr] gap-3 px-4 py-3">
            <dt className="text-coal-400">Source</dt>
            <dd className="font-medium text-coal-200">{asset.result.source}</dd>
          </div>
          <div className="grid grid-cols-[90px_1fr] gap-3 px-4 py-3">
            <dt className="text-coal-400">Type</dt>
            <dd>
              <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${typeStyles}`}>{asset.result.type}</span>
            </dd>
          </div>
        </dl>

        {/* AI Explanation */}
        {asset.aiExplanation && (
          <div className="rounded-lg border border-coal-700/50 bg-gradient-to-br from-coal-800/60 to-coal-900/60 p-3">
            <div className="mb-2 flex items-center gap-1.5">
              <Sparkles size={12} className="text-tea-400" strokeWidth={2.2} />
              <p className="text-[10px] font-bold uppercase tracking-wider text-tea-400">AI Explanation</p>
              <span className="rounded-full bg-tea-500/15 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-tea-400">Gemini</span>
            </div>
            <p className="text-xs leading-relaxed text-coal-300">{asset.aiExplanation}</p>
          </div>
        )}
      </div>
    </article>
  );
}

export default ResultCard;
