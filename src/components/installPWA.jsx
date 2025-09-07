// src/components/InstallPWA.jsx

import React, { useState, useEffect } from "react";

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the default browser prompt
      e.preventDefault();
      // Store the event for later use
      setDeferredPrompt(e);
      // Show your custom button to the user
      setShowInstallBtn(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    setShowInstallBtn(false);

    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the PWA installation");
        } else {
          console.log("User dismissed the PWA installation");
        }
        setDeferredPrompt(null);
      });
    }
  };

  if (!showInstallBtn) {
    return null;
  }

  return (
    <div style={{ padding: "10px", backgroundColor: "#333", color: "#fff", textAlign: "center" }}>
      <p>Install this app for an even better experience!</p>
      <button
        onClick={handleInstallClick}
        style={{ padding: "8px 16px", borderRadius: "5px", border: "none", cursor: "pointer" }}
      >
        Install App
      </button>
    </div>
  );
};

export default InstallPWA;
