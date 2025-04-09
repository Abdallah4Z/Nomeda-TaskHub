import React, { useState, useEffect } from "react";

export const CookieConsent = () => {
  const [consent, setConsent] = useState<boolean | null>(null);

  useEffect(() => {
    const savedConsent = localStorage.getItem("cookieConsent") === "true";
    setConsent(savedConsent);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setConsent(true);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "false");
    setConsent(false);
  };

  if (consent !== null) return null;

  return (
    <div className="cookie-banner">
      <p>
        We use cookies for analytics. By continuing, you agree to our{" "}
        <a href="/privacy">Privacy Policy</a>.
      </p>
      <div className="cookie-buttons">
        <button onClick={handleAccept}>Accept</button>
        <button onClick={handleDecline}>Decline</button>
      </div>
    </div>
  );
};