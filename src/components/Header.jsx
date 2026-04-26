import { NavLink } from 'react-router-dom';
import { Home, ScanSearch, LayoutDashboard } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Home', Icon: Home },
  { to: '/analyze', label: 'Analyze', Icon: ScanSearch },
  { to: '/dashboard', label: 'Dashboard', Icon: LayoutDashboard },
];

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/70 shadow-lg shadow-lilac-200/30 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* App name */}
        <NavLink to="/" className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blush-500 to-lilac-600 text-sm font-black text-white shadow-md shadow-blush-200/50 transition-transform duration-200 group-hover:scale-105">
            AI
          </div>
          <span className="bg-gradient-to-r from-lilac-900 via-blush-700 to-lilac-800 bg-clip-text text-lg font-extrabold tracking-tight text-transparent">
            AI Asset Guard
          </span>
        </NavLink>

        {/* Navigation */}
        <nav className="flex items-center gap-1 rounded-xl border border-lilac-100/80 bg-lilac-50/60 p-1 backdrop-blur-sm">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blush-500 to-lilac-500 text-white shadow-lg shadow-blush-200/50 ring-1 ring-blush-300/30'
                    : 'text-lilac-600 hover:bg-white hover:text-lilac-900 hover:shadow-sm'
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
