"use client";

import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ToggleSwitch.css";

export default function ClientLayout({ children }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div>
      <div className="d-flex justify-content-end new-toggle-container">
        <label className="new-toggle-switch">
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
          <span className="new-slider" />
        </label>
      </div>
      {children}
    </div>
  );
}
