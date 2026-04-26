function ResultCard({ asset, onDeleteAsset }) {
  const similarity = asset.result.similarity;
  const badgeStyles =
    similarity >= 80
      ? 'border-blush-200 bg-blush-50 text-blush-700'
      : 'border-lilac-200 bg-lilac-50 text-lilac-700';
  const typeStyles =
    asset.result.type === 'Modified'
      ? 'bg-blush-50 text-blush-700'
      : 'bg-lilac-50 text-lilac-700';

  const handleDelete = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this asset?',
    );

    if (confirmed) {
      onDeleteAsset(asset.id);
    }
  };

  return (
    <article className="rounded-xl border border-lilac-100 bg-gradient-to-br from-white via-blush-50 to-lilac-50 p-3 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-blush-200 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-lilac-50 text-sm text-lilac-600">
        {asset.imageUrl ? (
          <img
            alt={asset.name}
            className="h-full w-full rounded-lg object-cover transition duration-300 hover:scale-105"
            src={asset.imageUrl}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            Image preview
          </div>
        )}
        <div className="absolute right-3 top-3">
          <button
            aria-label={`Delete ${asset.name}`}
            className="rounded-full border border-blush-200 bg-white/95 px-2.5 py-1 text-sm font-semibold text-blush-600 shadow-sm transition-all duration-200 hover:bg-blush-50 hover:text-blush-700 focus:outline-none focus:ring-2 focus:ring-blush-200"
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
            <h3 className="truncate text-base font-bold text-lilac-900">
              {asset.name}
            </h3>
            <p className="mt-1 text-xs font-medium uppercase text-blush-400">
              Analyzed asset
            </p>
          </div>
          <span
            className={`shrink-0 rounded-full border px-4 py-2 text-xl font-bold ${badgeStyles}`}
          >
            {similarity}%
          </span>
        </div>

        <dl className="divide-y divide-lilac-100 rounded-lg border border-lilac-100 bg-lilac-50 text-sm">
          <div className="space-y-1 px-4 py-3">
            <dt className="text-xs font-semibold uppercase text-lilac-500">
              Fingerprint
            </dt>
            <dd className="break-all font-mono text-xs font-semibold text-lilac-900">
              {asset.fingerprint}
            </dd>
          </div>
          <div className="grid grid-cols-[90px_1fr] gap-3 px-4 py-3">
            <dt className="text-lilac-600">Similarity</dt>
            <dd className="text-lg font-bold text-blush-600">{similarity}%</dd>
          </div>
          <div className="grid grid-cols-[90px_1fr] gap-3 px-4 py-3">
            <dt className="text-lilac-600">Source</dt>
            <dd className="font-medium text-lilac-900">{asset.result.source}</dd>
          </div>
          <div className="grid grid-cols-[90px_1fr] gap-3 px-4 py-3">
            <dt className="text-lilac-600">Type</dt>
            <dd>
              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${typeStyles}`}
              >
                {asset.result.type}
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

export default ResultCard;
