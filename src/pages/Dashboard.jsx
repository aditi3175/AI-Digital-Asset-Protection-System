import ResultCard from '../components/ResultCard.jsx';

function Dashboard({ assets, onDeleteAsset }) {
  return (
    <section>
      <div className="mb-6 flex flex-col gap-3 border-b border-coal-700/50 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-coal-50">Analysis Dashboard</h2>
          <p className="mt-1 text-sm font-medium text-coal-400">Recent image checks and AI detection results.</p>
        </div>
        <span className="w-fit rounded-full border border-tea-500/30 bg-tea-500/15 px-3 py-1 text-sm font-medium text-tea-400">
          {assets.length} result{assets.length === 1 ? '' : 's'}
        </span>
      </div>

      <div className="mb-6 rounded-xl border border-coal-700/50 bg-coal-800/60 p-5 shadow-sm shadow-coal-950/20">
        <p className="text-sm font-medium text-coal-400">Total analyzed assets</p>
        <p className="mt-2 text-3xl font-bold text-tea-400">{assets.length}</p>
      </div>

      {assets.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {assets.map((asset) => (
            <ResultCard asset={asset} key={asset.id} onDeleteAsset={onDeleteAsset} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-coal-600 bg-coal-800/40 px-6 py-14 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-tea-500/30 bg-tea-500/15 text-xl font-bold text-tea-400">
            AI
          </div>
          <h3 className="mt-5 text-lg font-bold text-coal-100">No analyzed assets yet</h3>
          <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-6 text-coal-400">
            Upload an image and run a scan to see fingerprints, similarity scores, source details, and asset type results here.
          </p>
        </div>
      )}
    </section>
  );
}

export default Dashboard;
