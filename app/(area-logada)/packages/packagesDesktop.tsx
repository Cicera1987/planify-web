"use client";

import "./styles.css";

export default function PackagesDesktop() {
  return (
    <div className="packages-container">
      <div className="desktop-packages">
        <div className="background-packages-dark"></div>
        <div className="background-packages-light">
          <div className="light-packages-header">
            <h1 className="app-packages-title">Pacotes de serviços</h1>
          </div>
        </div>

        <div className="form-packages-container">Pacotes de serviços</div>
      </div>
    </div>
  );
}
