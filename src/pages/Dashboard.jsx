import ResultCard from '../components/ResultCard.jsx';

function Dashboard({ assets, onDeleteAsset }) {
  return (
    <section>
      <div className="mb-6 flex flex-col gap-3 border-b border-blush-100 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-lilac-900">
            Analysis Dashboard
          </h2>
          <p className="mt-1 text-sm font-medium text-lilac-700">
            Recent image checks and AI detection results.
          </p>
        </div>
        <span className="w-fit rounded-full border border-blush-200 bg-blush-50 px-3 py-1 text-sm font-medium text-blush-700">
          {assets.length} result{assets.length === 1 ? '' : 's'}
        </span>
      </div>

      <div className="mb-6 rounded-xl border border-lilac-100 bg-gradient-to-br from-white via-blush-50 to-lilac-50 p-5 shadow-sm">
        <p className="text-sm font-medium text-lilac-600">
          Total analyzed assets
        </p>
        <p className="mt-2 text-3xl font-bold text-blush-600">{assets.length}</p>
      </div>

      {assets.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {assets.map((asset) => (
            <ResultCard
              asset={asset}
              key={asset.id}
              onDeleteAsset={onDeleteAsset}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-lilac-200 bg-gradient-to-br from-white via-blush-50 to-lilac-50 px-6 py-14 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-blush-200 bg-blush-50 text-xl font-bold text-blush-600">
            AI
          </div>
          <h3 className="mt-5 text-lg font-bold text-lilac-900">
            No analyzed assets yet
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-6 text-lilac-700">
            Upload an image and run a scan to see fingerprints, similarity scores,
            source details, and asset type results here.
          </p>
        </div>
      )}
    </section>
  );
}

export default Dashboard;
