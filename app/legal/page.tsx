'use client';

export default function LegalPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold neon-text mb-8">Legal & Disclosures</h1>
      <p className="mb-4 text-slate-300">
        Trading involves significant risks. Our algorithms are based on simulated data with inherent
        limitations and may not accurately predict actual market conditions. Past performance does
        not guarantee future results. Always approach trading with caution and consider potential
        risks before utilizing any algorithm.
      </p>
      <ul className="list-disc list-inside text-slate-400 space-y-2">
        <li>Return Policy</li>
        <li>Contact</li>
        <li>Disclosure</li>
        <li>Privacy Policy</li>
        <li>Terms & Conditions</li>
      </ul>
    </div>
  );
}
