import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ArrowLeft, LogOut, TrendingUp, Users, ShoppingBag,
  ExternalLink, CheckCircle2, XCircle, Clock,
  BarChart3, Package
} from 'lucide-react';

// --- Hardcoded demo data ---

const ANALYTICS = [
  { label: 'Total Revenue', value: '$14,820', change: '+12% this month', icon: TrendingUp, up: true },
  { label: 'Orders Placed', value: '47', change: '+8 this month', icon: ShoppingBag, up: true },
  { label: 'Unique Visitors', value: '3,241', change: '+19% this month', icon: Users, up: true },
  { label: 'Avg. Order Value', value: '$315', change: '-3% this month', icon: BarChart3, up: false },
];

const ORDERS = [
  { id: 'ORD-0098', customer: 'Maya Chen', date: 'Jul 4, 2026', status: 'Processing' },
  { id: 'ORD-0097', customer: 'Tariq Osei', date: 'Jul 3, 2026', status: 'Shipped' },
  { id: 'ORD-0096', customer: 'Jordan Lee', date: 'Jul 2, 2026', status: 'Delivered' },
  { id: 'ORD-0095', customer: 'Sofia Reyes', date: 'Jun 30, 2026', status: 'Delivered' },
  { id: 'ORD-0094', customer: 'Alex Müller', date: 'Jun 28, 2026', status: 'Delivered' },
  { id: 'ORD-0093', customer: 'Priya Nair', date: 'Jun 25, 2026', status: 'Delivered' },
  { id: 'ORD-0092', customer: 'Dante Wallace', date: 'Jun 22, 2026', status: 'Delivered' },
];

const ORDER_STATUS: Record<string, { classes: string; label: string }> = {
  Processing: { classes: 'bg-brick-900/60 text-brick-300 border border-brick-800', label: 'Processing' },
  Shipped:    { classes: 'bg-stone-700 text-cream-100 border border-stone-600', label: 'Shipped' },
  Delivered:  { classes: 'bg-stone-800 text-stone-300 border border-stone-700', label: 'Delivered' },
};

const INVENTORY = [
  {
    id: 'SKU-001', name: 'Residual Form No. 1', type: 'One-of-One',
    vinted: 'active', depop: 'active',
  },
  {
    id: 'SKU-002', name: 'Archive Coat', type: 'One-of-One',
    vinted: 'sold', depop: 'sold',
  },
  {
    id: 'SKU-003', name: 'Strata Jacket — S', type: 'Small Batch',
    vinted: 'active', depop: 'inactive',
  },
  {
    id: 'SKU-004', name: 'Strata Jacket — M', type: 'Small Batch',
    vinted: 'active', depop: 'active',
  },
  {
    id: 'SKU-005', name: 'Patchwork Reverie', type: 'One-of-One',
    vinted: 'inactive', depop: 'sold',
  },
  {
    id: 'SKU-006', name: 'Small Batch No. 3 Vest', type: 'Small Batch',
    vinted: 'active', depop: 'active',
  },
  {
    id: 'SKU-007', name: 'Studio Experiment: Boucle Wrap', type: 'Experimental',
    vinted: 'inactive', depop: 'inactive',
  },
];

type MarketplaceStatus = 'active' | 'inactive' | 'sold';

function MarketplaceBadge({ status }: { status: string }) {
  const s = status as MarketplaceStatus;
  if (s === 'active') return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-900/40 text-emerald-400 border border-emerald-800">
      <CheckCircle2 className="w-3 h-3" /> Live
    </span>
  );
  if (s === 'sold') return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-brick-900/40 text-brick-400 border border-brick-800">
      <XCircle className="w-3 h-3" /> Sold
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-stone-800 text-stone-400 border border-stone-700">
      <Clock className="w-3 h-3" /> Inactive
    </span>
  );
}

export function AdminDashboard() {
  const { user, logout } = useAuth();
  if (!user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-stone-900 text-cream-100">
      {/* Header */}
      <div className="border-b border-stone-800 px-6 py-5 flex items-center justify-between sticky top-0 bg-stone-900/95 backdrop-blur-md z-10">
        <Link
          to="/"
          className="flex items-center gap-2 text-stone-400 hover:text-cream-100 text-xs tracking-widest uppercase font-medium transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Studio Site
        </Link>
        <div className="text-center">
          <span className="font-editorial text-cream-100 text-lg italic">Upcycle STL</span>
          <p className="text-brick-400 text-xs tracking-widest uppercase font-medium -mt-0.5">Admin</p>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-stone-400 hover:text-brick-400 text-xs tracking-widest uppercase font-medium transition-colors duration-200"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">

        {/* ── Analytics ─────────────────────────────── */}
        <section>
          <p className="text-brick-400 text-xs tracking-ultrawide uppercase font-medium font-sans mb-6">Analytics</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {ANALYTICS.map(stat => (
              <div key={stat.label} className="bg-stone-800/50 border border-stone-700 rounded-xl p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-9 h-9 rounded-lg bg-stone-700/80 flex items-center justify-center">
                    <stat.icon className="w-4 h-4 text-brick-400" />
                  </div>
                  <span className={`text-xs font-medium ${stat.up ? 'text-emerald-400' : 'text-brick-400'}`}>
                    {stat.change}
                  </span>
                </div>
                <p className="font-editorial text-cream-100 text-3xl font-light mb-1">{stat.value}</p>
                <p className="text-stone-400 text-xs tracking-wide uppercase font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Orders ───────────────────────────────── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Package className="w-5 h-5 text-brick-400" />
            <p className="text-brick-400 text-xs tracking-ultrawide uppercase font-medium font-sans">Orders</p>
          </div>

          <div className="border border-stone-800 rounded-xl overflow-hidden">
            {/* Desktop */}
            <table className="hidden md:table w-full text-sm">
              <thead>
                <tr className="bg-stone-800/60 border-b border-stone-800">
                  <th className="px-6 py-4 text-left text-stone-400 text-xs tracking-widest uppercase font-medium">Order ID</th>
                  <th className="px-6 py-4 text-left text-stone-400 text-xs tracking-widest uppercase font-medium">Customer</th>
                  <th className="px-6 py-4 text-left text-stone-400 text-xs tracking-widest uppercase font-medium">Date</th>
                  <th className="px-6 py-4 text-left text-stone-400 text-xs tracking-widest uppercase font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {ORDERS.map((o, i) => (
                  <tr key={o.id} className={`border-b border-stone-800 last:border-0 hover:bg-stone-800/40 transition-colors duration-150 ${i % 2 !== 0 ? 'bg-stone-800/20' : ''}`}>
                    <td className="px-6 py-4 font-mono text-stone-400 text-xs">{o.id}</td>
                    <td className="px-6 py-4 text-cream-100 font-medium">{o.customer}</td>
                    <td className="px-6 py-4 text-stone-400">{o.date}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs tracking-widest uppercase font-medium px-2.5 py-1 rounded-full ${ORDER_STATUS[o.status]?.classes ?? ''}`}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile */}
            <div className="md:hidden divide-y divide-stone-800">
              {ORDERS.map(o => (
                <div key={o.id} className="px-5 py-4 flex items-center justify-between">
                  <div>
                    <p className="font-mono text-stone-500 text-xs mb-0.5">{o.id}</p>
                    <p className="text-cream-100 font-medium text-sm">{o.customer}</p>
                    <p className="text-stone-500 text-xs mt-0.5">{o.date}</p>
                  </div>
                  <span className={`text-xs tracking-widest uppercase font-medium px-2.5 py-1 rounded-full ${ORDER_STATUS[o.status]?.classes ?? ''}`}>
                    {o.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Crossposting Tracker ─────────────────── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <ExternalLink className="w-5 h-5 text-brick-400" />
            <p className="text-brick-400 text-xs tracking-ultrawide uppercase font-medium font-sans">Crossposting Tracker</p>
          </div>

          <div className="border border-stone-800 rounded-xl overflow-hidden">
            {/* Desktop */}
            <table className="hidden md:table w-full text-sm">
              <thead>
                <tr className="bg-stone-800/60 border-b border-stone-800">
                  <th className="px-6 py-4 text-left text-stone-400 text-xs tracking-widest uppercase font-medium">SKU</th>
                  <th className="px-6 py-4 text-left text-stone-400 text-xs tracking-widest uppercase font-medium">Item</th>
                  <th className="px-6 py-4 text-left text-stone-400 text-xs tracking-widest uppercase font-medium">Type</th>
                  <th className="px-6 py-4 text-center text-stone-400 text-xs tracking-widest uppercase font-medium">Vinted</th>
                  <th className="px-6 py-4 text-center text-stone-400 text-xs tracking-widest uppercase font-medium">Depop</th>
                </tr>
              </thead>
              <tbody>
                {INVENTORY.map((item, i) => (
                  <tr key={item.id} className={`border-b border-stone-800 last:border-0 hover:bg-stone-800/40 transition-colors duration-150 ${i % 2 !== 0 ? 'bg-stone-800/20' : ''}`}>
                    <td className="px-6 py-4 font-mono text-stone-500 text-xs">{item.id}</td>
                    <td className="px-6 py-4 font-editorial text-cream-100 text-base font-light">{item.name}</td>
                    <td className="px-6 py-4">
                      <span className="text-xs tracking-widest uppercase font-medium text-stone-400 border border-stone-700 rounded-full px-2.5 py-1">
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center"><MarketplaceBadge status={item.vinted} /></td>
                    <td className="px-6 py-4 text-center"><MarketplaceBadge status={item.depop} /></td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile */}
            <div className="md:hidden divide-y divide-stone-800">
              {INVENTORY.map(item => (
                <div key={item.id} className="px-5 py-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-mono text-stone-500 text-xs mb-0.5">{item.id}</p>
                      <p className="font-editorial text-cream-100 text-base font-light">{item.name}</p>
                    </div>
                    <span className="text-xs tracking-widest uppercase font-medium text-stone-400 border border-stone-700 rounded-full px-2 py-0.5">
                      {item.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-stone-500 text-xs uppercase tracking-wide">Vinted</span>
                      <MarketplaceBadge status={item.vinted} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-stone-500 text-xs uppercase tracking-wide">Depop</span>
                      <MarketplaceBadge status={item.depop} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
