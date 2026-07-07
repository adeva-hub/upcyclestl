import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Package, ArrowLeft, LogOut, Clock } from 'lucide-react';

const PURCHASE_ORDERS = [
  { id: 'ORD-0091', item: 'Residual Form No. 1', date: 'Jun 18, 2026', status: 'Delivered', total: '$385' },
  { id: 'ORD-0074', item: 'Archive Coat', date: 'May 3, 2026', status: 'Delivered', total: '$510' },
  { id: 'ORD-0062', item: 'Strata Jacket', date: 'Mar 22, 2026', status: 'Delivered', total: '$295' },
  { id: 'ORD-0055', item: 'Patchwork Reverie', date: 'Feb 10, 2026', status: 'Delivered', total: '$440' },
  { id: 'ORD-0041', item: 'Small Batch No. 2 — Vest', date: 'Dec 5, 2025', status: 'Delivered', total: '$210' },
];

const STATUS_STYLES: Record<string, string> = {
  Delivered: 'bg-stone-700 text-stone-200',
  Processing: 'bg-brick-900 text-brick-300',
  Shipped: 'bg-stone-700 text-cream-100',
};

export function AccountPage() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-stone-900 text-cream-100">
      {/* Header bar */}
      <div className="border-b border-stone-800 px-6 py-5 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-stone-400 hover:text-cream-100 text-xs tracking-widest uppercase font-medium transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Studio
        </Link>
        <span className="font-editorial text-cream-100 text-lg italic">Upcycle STL</span>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-stone-400 hover:text-brick-400 text-xs tracking-widest uppercase font-medium transition-colors duration-200"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Welcome */}
        <div className="mb-14">
          <p className="text-brick-400 text-xs tracking-ultrawide uppercase font-medium font-sans mb-2">My Account</p>
          <h1 className="font-editorial text-cream-100 text-5xl font-light">
            Welcome back,
            <br />
            <em className="text-brick-400">{user.name.split(' ')[0]}.</em>
          </h1>
        </div>

        {/* Orders section */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Package className="w-5 h-5 text-brick-400" />
            <h2 className="font-editorial text-cream-100 text-2xl font-light">Previous Purchase Orders</h2>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block border border-stone-800 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-800 bg-stone-800/60">
                  <th className="px-6 py-4 text-left text-stone-400 text-xs tracking-widest uppercase font-medium">Order ID</th>
                  <th className="px-6 py-4 text-left text-stone-400 text-xs tracking-widest uppercase font-medium">Item</th>
                  <th className="px-6 py-4 text-left text-stone-400 text-xs tracking-widest uppercase font-medium">Date</th>
                  <th className="px-6 py-4 text-left text-stone-400 text-xs tracking-widest uppercase font-medium">Total</th>
                  <th className="px-6 py-4 text-left text-stone-400 text-xs tracking-widest uppercase font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {PURCHASE_ORDERS.map((order, i) => (
                  <tr
                    key={order.id}
                    className={`border-b border-stone-800 last:border-0 transition-colors duration-150 hover:bg-stone-800/40 ${i % 2 === 0 ? '' : 'bg-stone-800/20'}`}
                  >
                    <td className="px-6 py-4 font-mono text-stone-400 text-xs">{order.id}</td>
                    <td className="px-6 py-4 font-editorial text-cream-100 text-base font-light">{order.item}</td>
                    <td className="px-6 py-4 text-stone-400 text-sm">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {order.date}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-cream-100 font-medium text-sm">{order.total}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs tracking-widest uppercase font-medium px-2.5 py-1 rounded-full ${STATUS_STYLES[order.status] ?? 'bg-stone-700 text-stone-200'}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-4">
            {PURCHASE_ORDERS.map(order => (
              <div key={order.id} className="border border-stone-800 rounded-xl p-5 bg-stone-800/30">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-mono text-stone-500 text-xs mb-1">{order.id}</p>
                    <p className="font-editorial text-cream-100 text-lg font-light">{order.item}</p>
                  </div>
                  <span className={`text-xs tracking-widest uppercase font-medium px-2.5 py-1 rounded-full ${STATUS_STYLES[order.status] ?? 'bg-stone-700 text-stone-200'}`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-stone-400 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{order.date}</span>
                  <span className="text-cream-100 font-medium">{order.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
