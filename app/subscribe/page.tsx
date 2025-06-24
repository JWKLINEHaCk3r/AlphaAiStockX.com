'use client';

export default function SubscribePage() {
  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold neon-text mb-8">Subscribe to Algo Exchange</h1>
      <p className="mb-4 text-slate-300">Receive valuable tips, news, and special promotions.</p>
      <form className="space-y-6">
        <div>
          <label className="block text-slate-200 mb-1">Your email address</label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded bg-black/60 border border-violet-700 text-white"
            required
          />
        </div>
        <button className="holo-btn px-8 py-3 font-bold" type="submit">
          Subscribe
        </button>
      </form>
    </div>
  );
}
