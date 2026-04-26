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
    <main className="min-h-screen bg-gradient-to-br from-lilac-100 via-blush-50 to-white px-4 py-8 text-lilac-950 sm:px-6 lg:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl flex-col justify-center">
        <div className="max-w-3xl">
          <p className="mb-5 w-fit rounded-full border border-blush-200/80 bg-gradient-to-r from-blush-50 to-lilac-50 px-5 py-2.5 text-sm font-bold text-blush-700 shadow-sm shadow-blush-100 backdrop-blur">
            AI Digital Asset Protection
          </p>
          <h1 className="max-w-4xl text-6xl font-black leading-none text-lilac-950 sm:text-7xl lg:text-8xl">
            Protect Your Digital Assets
          </h1>
          <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-lilac-800 sm:text-xl">
            Upload images, generate asset fingerprints, scan for AI similarity,
            and keep detection results organized in a clean local dashboard.
          </p>
          <button
            className="mt-9 rounded-lg bg-gradient-to-r from-blush-500 to-lilac-500 px-7 py-3.5 text-sm font-bold text-white shadow-[0_16px_40px_rgba(236,72,153,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:from-blush-600 hover:to-lilac-600 hover:shadow-[0_20px_48px_rgba(168,85,247,0.32)] focus:outline-none focus:ring-2 focus:ring-blush-300"
            onClick={() => navigate('/analyze')}
            type="button"
          >
            Start Analyzing
          </button>
        </div>

        <div className="my-12 h-px w-full bg-gradient-to-r from-transparent via-blush-200 to-transparent" />

        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <article
              className="rounded-xl border border-lilac-100 bg-white/75 p-5 shadow-lg shadow-lilac-100/60 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:border-blush-200 hover:bg-white hover:shadow-2xl hover:shadow-blush-100"
              key={feature.title}
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-blush-100 to-lilac-100 text-blush-700">
                <feature.Icon aria-hidden="true" size={22} strokeWidth={2.2} />
              </div>
              <h2 className="text-lg font-bold text-lilac-950">
                {feature.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-lilac-700">
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
