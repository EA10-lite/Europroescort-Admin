"use client";
import React from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';

function GoogleTranslate() {
  return (
    <HelmetProvider>
    <div
      className={``}
    >
      <>
        <Helmet>
          <script>
            {`
            window.gtranslateSettings = {
              "default_language": "en",
              "detect_browser_language": true,
              "wrapper_selector": ".gtranslate_wrapper",
              "flag_size": 24,
              "flag_style": "3d",
              "alt_flags": {
                "en": "usa"
              }
            };
          `}
          </script>
          <script
            defer
            src="https://cdn.gtranslate.net/widgets/latest/popup.js"
          ></script>
        </Helmet>
        <div className="gtranslate_wrapper"></div>
      </>
    </div>
    </HelmetProvider>
  );
}

export default GoogleTranslate;
