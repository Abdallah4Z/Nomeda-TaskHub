import React from "react";

export const SecurityInfo = () => (
  <div className="security-doc">
    <h2>Security Practices</h2>
    
    <div className="security-feature">
      <h3>🔒 Encryption</h3>
      <p>
        All data in transit is encrypted via <strong>TLS 1.3</strong>. Local data uses browser security (e.g., IndexedDB).
      </p>
    </div>

    <div className="security-feature">
      <h3>🛡️ Permissions</h3>
      <p>
        Nomeda Task Hub requests only the permissions it needs (e.g., browser storage). Revoke anytime in settings.
      </p>
    </div>

    <div className="security-feature">
      <h3>📧 Reporting Issues</h3>
      <p>
        Found a vulnerability? Email <code>security@nomeda-task-hub.example</code>.
      </p>
    </div>
  </div>
);