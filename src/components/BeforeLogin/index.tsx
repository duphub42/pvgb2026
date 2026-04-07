'use client'

import React from 'react'

const FALLBACK_LOGO_SRC = '/media/weblogo-philippbacher.svg'

const BeforeLogin: React.FC = () => {
  return (
    <div className="custom-login-art">
      <style>{`
        .template-minimal__wrap {
          display: grid !important;
          grid-template-columns: minmax(320px, 1fr) minmax(420px, 1.05fr) !important;
          gap: 2rem !important;
          align-items: stretch !important;
          width: 100%;
        }

        .template-minimal__wrap > .login__brand {
          display: none !important;
        }

        .template-minimal__wrap > form {
          width: 100% !important;
          max-width: 100% !important;
          margin: 0 !important;
          padding: 2rem !important;
          background: rgba(255, 255, 255, 0.98) !important;
          border-radius: 32px !important;
          border: 1px solid rgba(15, 23, 42, 0.08) !important;
          box-shadow: 0 30px 80px rgba(15, 23, 42, 0.14) !important;
          grid-column: 1 / 2;
          display: flex !important;
          flex-direction: column !important;
          gap: 1rem !important;
          min-height: 580px;
        }

        .template-minimal__wrap > form h1,
        .template-minimal__wrap > form h2,
        .template-minimal__wrap > form h3 {
          color: #0f172a !important;
        }

        .template-minimal__wrap > form input,
        .template-minimal__wrap > form button,
        .template-minimal__wrap > form label {
          font-family: inherit !important;
        }

        .template-minimal__wrap > form input[type='email'],
        .template-minimal__wrap > form input[type='text'],
        .template-minimal__wrap > form input[type='password'] {
          width: 100%;
          border-radius: 16px !important;
          border: 1px solid rgba(15, 23, 42, 0.12) !important;
          background: rgba(255, 255, 255, 0.9) !important;
          padding: 1rem 1.15rem !important;
          box-shadow: inset 0 1px 2px rgba(15, 23, 42, 0.05) !important;
        }

        .template-minimal__wrap > form button[type='submit'] {
          border-radius: 14px !important;
          padding: 1rem 1.25rem !important;
          background: linear-gradient(90deg, #22d3ee, #8b5cf6) !important;
          color: #fff !important;
          font-weight: 700 !important;
          letter-spacing: 0.01em !important;
        }

        .template-minimal__wrap > form button[type='submit']:hover {
          opacity: 0.96 !important;
        }

        .template-minimal__wrap > form .field-error,
        .template-minimal__wrap > form .error {
          color: #dc2626 !important;
        }

        .custom-login-art {
          position: relative;
          min-height: 580px;
          width: 100%;
          padding: 2rem;
          border-radius: 32px;
          background: radial-gradient(circle at 20% 24%, rgba(56, 189, 248, 0.16), transparent 22%),
            radial-gradient(circle at 78% 78%, rgba(168, 85, 247, 0.14), transparent 22%),
            linear-gradient(145deg, rgba(15, 23, 42, 0.02) 1px, transparent 1px),
            linear-gradient(25deg, rgba(15, 23, 42, 0.02) 1px, transparent 1px);
          overflow: hidden;
          grid-column: 2 / 3;
        }

        .custom-login-art::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.08), transparent 32%);
          pointer-events: none;
        }

        .custom-login-art .brand-mark {
          position: absolute;
          left: 2rem;
          top: 2rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.85);
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
          z-index: 2;
        }

        .custom-login-art .brand-mark img {
          width: 34px;
          height: 34px;
          object-fit: contain;
        }

        .custom-login-art .hero-copy {
          position: relative;
          z-index: 2;
          display: grid;
          gap: 1rem;
          max-width: 420px;
          margin-top: 5rem;
          color: #f8fafc;
        }

        .custom-login-art .hero-copy h1 {
          margin: 0;
          font-size: clamp(2.25rem, 4vw, 3.5rem);
          line-height: 1.02;
          letter-spacing: -0.03em;
          color: #ffffff;
        }

        .custom-login-art .hero-copy p {
          margin: 0;
          max-width: 32rem;
          color: rgba(241, 245, 249, 0.88);
          line-height: 1.75;
          font-size: 1rem;
        }

        .custom-login-art .hero-copy ul {
          margin: 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 0.75rem;
        }

        .custom-login-art .hero-copy li {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          color: rgba(241, 245, 249, 0.92);
          font-size: 0.975rem;
        }

        .custom-login-art .hero-copy li::before {
          content: '›';
          color: rgba(56, 189, 248, 0.95);
          font-weight: 700;
          margin-top: 0.1rem;
        }

        .custom-login-art .art-grid {
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          padding: 4rem 2rem 2rem;
          z-index: 1;
          pointer-events: none;
        }

        .custom-login-art .art-grid__cell {
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          background: rgba(15, 23, 42, 0.04);
          backdrop-filter: blur(8px);
        }

        .custom-login-art .art-grid__stroke {
          position: absolute;
          inset: 0;
          opacity: 0.75;
          background: linear-gradient(135deg, rgba(56, 189, 248, 0.55), rgba(168, 85, 247, 0.35));
          mask-image: linear-gradient(180deg, transparent 10%, black 40%, black 60%, transparent 90%);
        }

        .custom-login-art .art-line {
          position: absolute;
          left: -18%;
          right: -18%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(148, 163, 184, 0.94), transparent);
          filter: drop-shadow(0 0 10px rgba(56, 189, 248, 0.4));
          opacity: 0;
          transform: translateX(-24px) scaleX(0.88);
          animation: decryptScramble 1.25s ease-out forwards;
        }

        .custom-login-art .art-line::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 10%, rgba(255, 255, 255, 0.6) 50%, transparent 90%);
          opacity: 0.3;
        }

        .custom-login-art .glow-ring {
          position: absolute;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          top: 32%;
          right: -56px;
          background: radial-gradient(circle, rgba(56, 189, 248, 0.16), transparent 65%);
          filter: blur(12px);
          z-index: 0;
        }

        @keyframes decryptScramble {
          0% {
            opacity: 0;
            transform: translateX(-24px) scaleX(0.88);
          }
          55% {
            opacity: 1;
            transform: translateX(4px) scaleX(1.02);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scaleX(1);
          }
        }

        @media (max-width: 980px) {
          .template-minimal__wrap {
            grid-template-columns: 1fr !important;
          }

          .custom-login-art {
            grid-column: 1 / -1;
            min-height: 420px;
            padding: 1.5rem;
          }

          .custom-login-art .art-grid {
            grid-template-columns: 1fr 1fr;
          }

          .custom-login-art .brand-mark {
            left: 1rem;
            top: 1rem;
          }
        }

        @media (max-width: 620px) {
          .custom-login-art {
            min-height: 320px;
            padding: 1.25rem;
            border-radius: 20px;
          }

          .custom-login-art .art-grid {
            grid-template-columns: 1fr;
            gap: 0.75rem;
            padding: 3rem 1rem 1rem;
          }

          .custom-login-art .brand-mark {
            width: 48px;
            height: 48px;
          }
        }
      `}</style>

      <div className="brand-mark">
        <img src={FALLBACK_LOGO_SRC} alt="Philipp Bacher" />
      </div>

      <div className="hero-copy">
        <h1>Dein Admin Login</h1>
        <p>Willkommen im Backend. Nutze deine Zugangsdaten, um Inhalte, Seiten und Einstellungen schnell und sicher zu verwalten.</p>
        <ul>
          <li>Schneller Zugriff auf alle Seiten</li>
          <li>Sichere Authentifizierung mit Payload</li>
          <li>Modernes Dashboard-Branding</li>
        </ul>
      </div>

      <div className="art-grid">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="art-grid__cell">
            <div className="art-grid__stroke" style={{ opacity: 0.18 + index * 0.08 }} />
            <span
              className="art-line"
              style={{
                top: `${15 + index * 9}%`,
                animationDelay: `${index * 0.12}s`,
                width: `${68 + (index % 3) * 8}%`,
              }}
            />
          </div>
        ))}
      </div>

      <div className="glow-ring" />
    </div>
  )
}

export default BeforeLogin
