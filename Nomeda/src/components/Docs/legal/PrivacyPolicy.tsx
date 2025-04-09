import React from "react";

export const PrivacyPolicy = () => (
  <div className="legal-doc">
    <h2>Privacy Policy</h2>
    <p><em>Last Updated: {new Date().toLocaleDateString()}</em></p>
    
    <section>
      <h3>1. Data Collection</h3>
      <p>
        Nomeda Task Hub collects minimal data required for functionality:
      </p>
      <ul>
        <li>Task content (stored locally unless synced to your cloud account).</li>
        <li>Optional email (if you create an account).</li>
      </ul>
    </section>

    <section>
      <h3>2. Third-Party Services</h3>
      <p>
        We use <strong>Firebase</strong> (for auth) and <strong>Vercel Analytics</strong> (anonymous usage stats).
        No data is sold to advertisers.
      </p>
    </section>

    <section>
      <h3>3. Your Rights</h3>
      <p>
        You can delete your data anytime via <code>Settings → Delete Account</code>.
      </p>
    </section>
  </div>
);