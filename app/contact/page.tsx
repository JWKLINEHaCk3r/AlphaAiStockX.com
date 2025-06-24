'use client';

export default function ContactPage() {
  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold neon-text mb-8">Contact Us</h1>
      <form className="space-y-6">
        <div>
          <label className="block text-slate-200 mb-1">Your Name</label>
          <input
            className="w-full px-4 py-2 rounded bg-black/60 border border-violet-700 text-white"
            required
          />
        </div>
        <div>
          <label className="block text-slate-200 mb-1">Your Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded bg-black/60 border border-violet-700 text-white"
            required
          />
        </div>
        <div>
          <label className="block text-slate-200 mb-1">Message</label>
          <textarea
            className="w-full px-4 py-2 rounded bg-black/60 border border-violet-700 text-white"
            rows={5}
            required
          />
        </div>
        <button className="holo-btn px-8 py-3 font-bold" type="submit">
          Send Message
        </button>
      </form>
    </div>
  );
}
