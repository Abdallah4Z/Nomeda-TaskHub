import React from "react";

export const TermsOfService = () => (
  <div className="legal-doc">
    <h2>Terms of Service</h2>
    <p><em>Effective: {new Date().toLocaleDateString()}</em></p>
    
    <section>
      <h3>1. Acceptance</h3>
      <p>
        By using Nomeda Task Hub, you agree to these terms. Don’t misuse the app (e.g., spam, illegal content).
      </p>
    </section>

    <section>
      <h3>2. Liability</h3>
      <p>
        We’re not responsible for lost tasks or data breaches caused by third-party services.
      </p>
    </section>

    <section>
      <h3>3. Changes</h3>
      <p>
        Terms may update; check this page periodically. Continued use = acceptance.
      </p>
    </section>
  </div>
);