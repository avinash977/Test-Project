import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function ContentTile(props) {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };
  // FIX: Strictly validate the poster prop to only allow safe image URLs (e.g., only http(s) URLs, no data: or javascript: schemes)
  function sanitizePosterUrl(url) {
    try {
      const parsed = new URL(url, window.location.origin);
      if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
        return url;
      }
    } catch (e) {
      // Invalid URL
    }
    // Return a safe fallback image or empty string
    return '/static/safe-placeholder.png'; // Adjust path as needed
  }
  const safePoster = sanitizePosterUrl(props.poster);
  return (
    <li
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      style={{ marginRight: 24 }}
    >
      <article>
        <section style={{ zIndex: 2 }}>
          <div>
            <img
              style={{
                height: 140,
                width: 248,
                borderRadius: 8,
              }}
              src={safePoster} // FIX: Use sanitized URL
              alt="poster"
            ></img>
          </div>
        </section>
      </article>
    </li>
  );
}

// FIX EXPLANATION: The sanitizePosterUrl function ensures that only http(s) URLs are allowed for the image source. If the input is not a valid or safe URL, a safe placeholder image is used instead. This prevents attackers from injecting malicious data URIs or javascript: URLs, mitigating XSS risk.

export default ContentTile;
