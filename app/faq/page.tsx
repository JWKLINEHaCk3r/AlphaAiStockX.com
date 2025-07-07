'use client';
import React from 'react';

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold neon-text mb-8">Frequently Asked Questions</h1>
      {/* Add dynamic FAQ accordion here, powered by AI or static content */}
      <ul className="space-y-6">
        <li>
          <b>Which brokerages are compatible?</b> Any US-regulated brokerage with API access (see
          onboarding).
        </li>
        <li>
          <b>How do I connect my brokerage?</b> Use the secure onboarding flow in the dashboard.
        </li>
        <li>
          <b>Does Algo Exchange have access to my funds?</b> No, you retain full control. We only
          send trade instructions via secure APIs.
        </li>
        <li>
          <b>Are the algorithms beginner friendly?</b> Yes! Our AI recommends the best fit for your
          goals and risk.
        </li>
        <li>
          <b>Can I assess performance?</b> Yes, every algorithm has live and historical analytics,
          backtests, and explainable AI reports.
        </li>
        <li>
          <b>How is risk managed?</b> Each algo has built-in risk controls, and you can set your own
          limits.
        </li>
        <li>
          <b>Do I need to download anything?</b> No, everything runs securely in the cloud.
        </li>
        <li>
          <b>What if my ruleset is updated?</b> You’ll be notified and can review/accept any
          changes.
        </li>
        <li>
          <b>Is there support?</b> Yes, contact us or schedule a video call for a walkthrough.
        </li>
      </ul>
    </div>
  );
}
