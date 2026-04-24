import React from 'react';
import './RemoteControls.css';

export default function RemoteControls() {
  return (
    <section className="remotes-section">
      <div className="remotes-inner">

        {/* Header */}
        <div className="remotes-head">
          <div className="remotes-label">Accessories Available</div>
          <div className="remotes-title">AC Remote Controls</div>
          <div className="remotes-divider" />
          <p className="remotes-sub">
            Compatible remotes for all major AC brands — original &amp; universal.
          </p>
        </div>

        {/* Offer badges */}
        <div className="remotes-badges">
          <div className="remotes-badge remotes-badge--call">
            <span className="remotes-badge-icon">📞</span>
            <div>
              <div className="remotes-badge-title">Prior Order on Call</div>
              <div className="remotes-badge-desc">Call us to check availability &amp; reserve</div>
            </div>
          </div>
          <div className="remotes-badge remotes-badge--delivery">
            <span className="remotes-badge-icon">🚚</span>
            <div>
              <div className="remotes-badge-title">Free Home Delivery</div>
              <div className="remotes-badge-desc">Delivered to your door within service area</div>
            </div>
          </div>
          <div className="remotes-badge remotes-badge--time">
            <span className="remotes-badge-icon">⏱️</span>
            <div>
              <div className="remotes-badge-title">Same-Day Dispatch</div>
              <div className="remotes-badge-desc">Order before 6 PM for same-day delivery</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
