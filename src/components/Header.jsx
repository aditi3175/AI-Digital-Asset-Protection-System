import { NavLink } from 'react-router-dom';
import { Home, ScanSearch, LayoutDashboard } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Home', Icon: Home },
  { to: '/analyze', label: 'Analyze', Icon: ScanSearch },
  { to: '/dashboard', label: 'Dashboard', Icon: LayoutDashboard },
];

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-coal-700/50 bg-coal-900/80 shadow-lg shadow-coal-950/50 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* App name */}
        <NavLink to="/" className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-tea-500 to-tea-700 text-sm font-black text-coal-950 shadow-md shadow-tea-500/30 transition-transform duration-200 group-hover:scale-105">
            AI
          </div>
          <span className="bg-gradient-to-r from-tea-300 via-tea-400 to-tea-300 bg-clip-text text-lg font-extrabold tracking-tight text-transparent">
            AI Asset Guard
          </span>
        </NavLink>

        {/* Navigation */}
        <nav className="flex items-center gap-1 rounded-xl border border-coal-700/60 bg-coal-800/70 p-1 backdrop-blur-sm">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-tea-500 to-tea-600 text-coal-950 shadow-lg shadow-tea-500/30 ring-1 ring-tea-400/30'
                    : 'text-coal-300 hover:bg-coal-700/60 hover:text-tea-300'
                }`
              }
            >
              <item.Icon size={16} strokeWidth={2.2} />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
