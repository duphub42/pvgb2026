'use client'

import React from 'react'

const ART_LOGO_SRC = 'http://localhost:3000/api/media/file/philippbacher-logo-b-16.svg'
const FRONTEND_LOGO_SRC = '/media/weblogo-philippbacher.svg'

const BeforeLogin: React.FC = () => {
  return (
    <>
      <style>{`
        .login.template-minimal {
          min-height: 100vh !important;
          height: 100vh !important;
          margin: 0 !important;
          padding: 0 !important;
          display: block !important;
          background: #eef0f2;
        }

        .template-minimal__wrap {
          --login-panel-height: 100vh;
          display: grid !important;
          grid-template-columns: minmax(420px, 1fr) minmax(420px, 1fr) !important;
          width: 100% !important;
          max-width: none !important;
          min-height: 100vh;
          height: 100vh;
          margin: 0 !important;
          padding: 0 !important;
          gap: 0 !important;
          align-items: stretch !important;
        }

        .template-minimal__wrap .login__brand {
          display: none !important;
        }

        .template-minimal__wrap > .custom-login-form-logo,
        .template-minimal__wrap > .custom-login-art,
        .template-minimal__wrap > form {
          grid-row: 1;
        }

        .template-minimal__wrap > .custom-login-form-logo {
          grid-column: 1 / 2;
          align-self: center;
          justify-self: center;
          z-index: 3;
          width: min(220px, 36%);
          margin-top: 0;
          transform: translateY(-160px);
          pointer-events: none;
        }

        .template-minimal__wrap > .custom-login-form-logo img {
          display: block;
          width: 100%;
          height: auto;
          object-fit: contain;
        }

        .template-minimal__wrap > form {
          grid-column: 1 / 2;
          align-self: center;
          justify-self: center;
          width: min(460px, 74%);
          min-height: auto;
          height: auto;
          margin: 0 !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: center;
          padding-top: 0;
        }

        .template-minimal__wrap > .custom-login-art {
          grid-column: 2 / 3;
          align-self: stretch;
          min-height: var(--login-panel-height);
          height: var(--login-panel-height);
          width: 100%;
          border-radius: 0;
          border-left: 1px solid rgba(255, 255, 255, 0.1);
          background: #05070b;
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }

        .custom-login-art::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
          background-size: 44px 44px;
          opacity: 0.42;
          mask-image: radial-gradient(
            circle at center,
            rgba(0, 0, 0, 0.96) 0%,
            rgba(0, 0, 0, 0.74) 38%,
            rgba(0, 0, 0, 0.24) 68%,
            rgba(0, 0, 0, 0) 100%
          );
          -webkit-mask-image: radial-gradient(
            circle at center,
            rgba(0, 0, 0, 0.96) 0%,
            rgba(0, 0, 0, 0.74) 38%,
            rgba(0, 0, 0, 0.24) 68%,
            rgba(0, 0, 0, 0) 100%
          );
          pointer-events: none;
        }

        .custom-login-art::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(255, 255, 255, 0.06) 0%, rgba(5, 7, 11, 0) 68%);
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
          width: min(62%, 420px);
          height: auto;
          object-fit: contain;
          opacity: 0.1;
          filter: brightness(0) invert(1);
        }

        @media (max-width: 980px) {
          .login.template-minimal {
            height: auto !important;
            min-height: 100vh !important;
          }

          .template-minimal__wrap {
            --login-panel-height: auto;
            grid-template-columns: 1fr !important;
            min-height: 100vh;
            height: auto;
            gap: 1rem !important;
            width: min(560px, calc(100vw - 32px)) !important;
            margin: 0 auto !important;
          }

          .template-minimal__wrap > .custom-login-art {
            grid-column: 1 / -1;
            grid-row: 1;
            min-height: 180px;
            height: 180px;
            border-radius: 16px;
            border-left: none;
          }

          .template-minimal__wrap > .custom-login-form-logo {
            grid-column: 1 / -1;
            grid-row: 2;
            width: min(190px, 58%);
            margin-top: 0.25rem;
            transform: none;
          }

          .template-minimal__wrap > form {
            grid-column: 1 / -1;
            grid-row: 3;
            width: 100%;
            min-height: auto;
            height: auto;
            justify-content: flex-start;
            padding-top: 0;
          }
        }

        @media (max-width: 700px) {
          .template-minimal__wrap > .custom-login-art {
            display: none;
          }

          .template-minimal__wrap > .custom-login-form-logo {
            grid-row: 1;
            margin-top: 1.25rem;
            transform: none;
          }

          .template-minimal__wrap > form {
            grid-row: 2;
          }
        }
      `}</style>

      <div className="custom-login-form-logo" aria-hidden="true">
        <img src={FRONTEND_LOGO_SRC} alt="" />
      </div>

      <div className="custom-login-art" aria-hidden="true">
        <div className="custom-login-art__logo">
          <img src={ART_LOGO_SRC} alt="" />
        </div>
      </div>
    </>
  )
}

export default BeforeLogin
