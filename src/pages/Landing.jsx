import { useNavigate } from 'react-router-dom';
import { Fingerprint, LayoutDashboard, ScanSearch } from 'lucide-react';

const features = [
  {
    Icon: Fingerprint,
    title: 'Fingerprinting',
    description: 'Generate unique visual signatures for uploaded digital assets.',
  },
  {
    Icon: ScanSearch,
    title: 'Detection',
    description: 'Compare assets against simulated AI detection results and sources.',
  },
  {
    Icon: LayoutDashboard,
    title: 'Dashboard',
    description: 'Review analyzed images, similarity scores, and asset status in one view.',
  },
];

function Landing() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gradient-to-br from-coal-950 via-coal-900 to-coal-800 px-4 py-8 text-coal-50 sm:px-6 lg:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl flex-col justify-center">
        <div className="max-w-3xl">
          <p className="mb-5 w-fit rounded-full border border-tea-500/30 bg-gradient-to-r from-tea-900/50 to-coal-800 px-5 py-2.5 text-sm font-bold text-tea-400 shadow-sm shadow-tea-500/10 backdrop-blur">
            AI Digital Asset Protection
          </p>
          <h1 className="max-w-4xl text-6xl font-black leading-none text-coal-50 sm:text-7xl lg:text-8xl">
            Protect Your Digital Assets
          </h1>
          <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-coal-300 sm:text-xl">
            Upload images, generate asset fingerprints, scan for AI similarity,
            and keep detection results organized in a clean local dashboard.
          </p>
          <button
            className="mt-9 rounded-lg bg-gradient-to-r from-tea-500 to-tea-600 px-7 py-3.5 text-sm font-bold text-coal-950 shadow-[0_16px_40px_rgba(62,168,62,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:from-tea-400 hover:to-tea-500 hover:shadow-[0_20px_48px_rgba(62,168,62,0.35)] focus:outline-none focus:ring-2 focus:ring-tea-400/50"
            onClick={() => navigate('/analyze')}
            type="button"
          >
            Start Analyzing
          </button>
        </div>

        <div className="my-12 h-px w-full bg-gradient-to-r from-transparent via-tea-500/30 to-transparent" />

        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <article
              className="rounded-xl border border-coal-700/60 bg-coal-800/50 p-5 shadow-lg shadow-coal-950/40 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:border-tea-500/40 hover:bg-coal-800 hover:shadow-2xl hover:shadow-tea-500/10"
              key={feature.title}
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-tea-600/20 to-tea-500/10 text-tea-400">
                <feature.Icon aria-hidden="true" size={22} strokeWidth={2.2} />
              </div>
              <h2 className="text-lg font-bold text-coal-50">
                {feature.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-coal-400">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Landing;
