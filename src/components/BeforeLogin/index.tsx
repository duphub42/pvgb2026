'use client'

import React from 'react'

const ART_LOGO_SRC = 'http://localhost:3000/api/media/file/philippbacher-logo-b-16.svg'
const FRONTEND_LOGO_SRC = '/media/weblogo-philippbacher.svg'

const BeforeLogin: React.FC = () => {
  return (
    <div className="custom-login-art" aria-hidden="true">
      <style>{`
        .template-minimal__wrap {
          --login-panel-height: clamp(360px, 62vh, 640px);
          display: grid !important;
          grid-template-columns: minmax(320px, 520px) minmax(360px, 1fr) !important;
          align-items: stretch !important;
          gap: clamp(1rem, 2vw, 2rem) !important;
          width: 100%;
        }

        .template-minimal__wrap .login__brand {
          display: none !important;
        }

        .template-minimal__wrap > form {
          grid-column: 1 / 2;
          align-self: center;
          justify-self: center;
          width: min(100%, 520px);
          min-height: var(--login-panel-height);
          height: var(--login-panel-height);
          margin: 0 !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: center;
        }

        .template-minimal__wrap > form::before {
          content: '';
          display: block;
          width: min(100%, 180px);
          height: 36px;
          margin: 0 auto 1.1rem;
          background: url('${FRONTEND_LOGO_SRC}') center / contain no-repeat;
          flex-shrink: 0;
        }

        .template-minimal__wrap > .custom-login-art {
          grid-column: 2 / 3;
          min-height: var(--login-panel-height);
        }

        .custom-login-art {
          position: relative;
          min-height: clamp(360px, 62vh, 640px);
          width: 100%;
          border-radius: 28px;
          border: 1px solid rgba(15, 23, 42, 0.08);
          background: #f8fafc;
          overflow: hidden;
          isolation: isolate;
        }

        .custom-login-art::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(to right, rgba(15, 23, 42, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15, 23, 42, 0.12) 1px, transparent 1px);
          background-size: 40px 40px;
          opacity: 0.48;
          mask-image: radial-gradient(circle at center, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.72) 38%, rgba(0, 0, 0, 0.24) 66%, rgba(0, 0, 0, 0) 100%);
          -webkit-mask-image: radial-gradient(circle at center, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.72) 38%, rgba(0, 0, 0, 0.24) 66%, rgba(0, 0, 0, 0) 100%);
          pointer-events: none;
        }

        .custom-login-art::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(15, 23, 42, 0.05) 0%, rgba(248, 250, 252, 0) 68%);
          pointer-events: none;
        }

        .custom-login-art__logo {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2.25rem;
          z-index: 1;
          pointer-events: none;
        }

        .custom-login-art__logo img {
          width: min(68%, 420px);
          height: auto;
          object-fit: contain;
          opacity: 0.1;
          filter: grayscale(1) contrast(1.08);
        }

        @media (max-width: 980px) {
          .template-minimal__wrap {
            grid-template-columns: 1fr !important;
          }

          .template-minimal__wrap > .custom-login-art,
          .template-minimal__wrap > form {
            grid-column: 1 / -1;
          }

          .template-minimal__wrap > form {
            width: 100%;
            min-height: auto;
            height: auto;
            justify-content: flex-start;
          }

          .custom-login-art {
            min-height: 280px;
            border-radius: 20px;
          }

          .custom-login-art__logo img {
            width: min(75%, 320px);
          }
        }
      `}</style>

      <div className="custom-login-art__logo">
        <img src={ART_LOGO_SRC} alt="" />
      </div>
    </div>
  )
}

export default BeforeLogin
