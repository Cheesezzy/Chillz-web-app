import "./Footer.css";
import playstore from "/play-store.png";
import appstore from "/app-store.png";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import ContactForm from "../ContactForm/ContactForm";

const Footer = () => {
  const { t } = useTranslation();
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <div className="pg-footer mt-8">
      <footer className="footer">
        <div className="footer-content">
          {/* <a href="#" target="blank">
            <img src={chillzLogo} className="logo" alt="Chillz logo" />
          </a> */}
          <div className="footer-content-column">
            <div className="footer-menu">
              <h2 className="footer-menu-name"> {t('downloadApp')}</h2>
              <ul id="menu-get-started" className="footer-menu-list">
                <li className="menu-item menu-item-type-post_type menu-item-object-product">
                  <a href="#" className="footer-call-to-action-button">
                    {t('appStore')}
                    <img
                      src={appstore}
                      alt="appstore-icon"
                      width={30}
                      height={30}
                    />
                  </a>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-product">
                  <a href="#" className="footer-call-to-action-button">
                    {t('playStore')}
                    <img
                      src={playstore}
                      alt="playstore-icon"
                      width={30}
                      height={30}
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-content-column">
            <div className="footer-menu">
              <h2 className="footer-menu-name"> {t('company')}</h2>
              <ul id="menu-company" className="footer-menu-list">
                <li className="menu-item menu-item-type-taxonomy menu-item-object-category">
                  <a href="#">{t('news')}</a>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-page">
                  <a href="#">{t('careers')}</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-content-column">
            <div className="footer-menu">
              <h2 className="footer-menu-name"> {t('quickLinks')}</h2>
              <ul id="menu-quick-links" className="footer-menu-list">
                <li className="menu-item menu-item-type-post_type menu-item-object-page">
                  <a href="#">{t('blog')}</a>
                </li>
                <li className="menu-item menu-item-type-post_type_archive menu-item-object-customer">
                  <a href="#">{t('customers')}</a>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-page">
                  <a href="#">{t('reviews')}</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-content-column">
            <div className="footer-call-to-action">
              <h2 className="footer-call-to-action-title"> {t('letsChat')}</h2>
              <p className="footer-call-to-action-description">
                {" "}
                {t('haveASupportQuestion')}
              </p>
              <a
                className="footer-call-to-action-button button"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setShowContactForm(true);
                }}
              >
                {" "}
                {t('getInTouch')}
              </a>
            </div>
          </div>
          <div className="footer-social-links">
            {" "}
            <svg
              className="footer-social-amoeba-svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 236 54"
            >
              <path
                className="footer-social-amoeba-path"
                d="M223.06,43.32c-.77-7.2,1.87-28.47-20-32.53C187.78,8,180.41,18,178.32,20.7s-5.63,10.1-4.07,16.7-.13,15.23-4.06,15.91-8.75-2.9-6.89-7S167.41,36,167.15,33a18.93,18.93,0,0,0-2.64-8.53c-3.44-5.5-8-11.19-19.12-11.19a21.64,21.64,0,0,0-18.31,9.18c-2.08,2.7-5.66,9.6-4.07,16.69s.64,14.32-6.11,13.9S108.35,46.5,112,36.54s-1.89-21.24-4-23.94S96.34,0,85.23,0,57.46,8.84,56.49,24.56s6.92,20.79,7,24.59c.07,2.75-6.43,4.16-12.92,2.38s-4-10.75-3.46-12.38c1.85-6.6-2-14-4.08-16.69a21.62,21.62,0,0,0-18.3-9.18C13.62,13.28,9.06,19,5.62,24.47A18.81,18.81,0,0,0,3,33a21.85,21.85,0,0,0,1.58,9.08,16.58,16.58,0,0,1,1.06,5A6.75,6.75,0,0,1,0,54H236C235.47,54,223.83,50.52,223.06,43.32Z"
              ></path>
            </svg>
            <a className="footer-social-link tiktok" href="#" target="_blank">
              <span className="hidden-link-text">TikTok</span>
              <svg
                className="footer-social-icon-svg"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="footer-social-icon-path"
                  d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
                ></path>
              </svg>
            </a>
            <a className="footer-social-link instagram" href="#" target="_blank">
              <span className="hidden-link-text">Instagram</span>
              <svg
                className="footer-social-icon-svg"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="footer-social-icon-path"
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                ></path>
              </svg>
            </a>
            <a className="footer-social-link twitter" href="#" target="_blank">
              <span className="hidden-link-text">Twitter</span>
              <svg
                className="footer-social-icon-svg"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="footer-social-icon-path"
                  d="M 25.855469 5.574219 C 24.914063 5.992188 23.902344 6.273438 22.839844 6.402344 C 23.921875 5.75 24.757813 4.722656 25.148438 3.496094 C 24.132813 4.097656 23.007813 4.535156 21.8125 4.769531 C 20.855469 3.75 19.492188 3.113281 17.980469 3.113281 C 15.082031 3.113281 12.730469 5.464844 12.730469 8.363281 C 12.730469 8.773438 12.777344 9.175781 12.867188 9.558594 C 8.503906 9.339844 4.636719 7.246094 2.046875 4.070313 C 1.59375 4.847656 1.335938 5.75 1.335938 6.714844 C 1.335938 8.535156 2.261719 10.140625 3.671875 11.082031 C 2.808594 11.054688 2 10.820313 1.292969 10.425781 C 1.292969 10.449219 1.292969 10.46875 1.292969 10.492188 C 1.292969 13.035156 3.101563 15.15625 5.503906 15.640625 C 5.0625 15.761719 4.601563 15.824219 4.121094 15.824219 C 3.78125 15.824219 3.453125 15.792969 3.132813 15.730469 C 3.800781 17.8125 5.738281 19.335938 8.035156 19.375 C 6.242188 20.785156 3.976563 21.621094 1.515625 21.621094 C 1.089844 21.621094 0.675781 21.597656 0.265625 21.550781 C 2.585938 23.039063 5.347656 23.90625 8.3125 23.90625 C 17.96875 23.90625 23.25 15.90625 23.25 8.972656 C 23.25 8.742188 23.246094 8.515625 23.234375 8.289063 C 24.261719 7.554688 25.152344 6.628906 25.855469 5.574219 "
                ></path>
              </svg>
            </a>
            <a className="footer-social-link youtube" href="#" target="_blank">
              <span className="hidden-link-text">Youtube</span>
              <svg
                className="footer-social-icon-svg"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="footer-social-icon-path"
                  d="M 15 4 C 10.814 4 5.3808594 5.0488281 5.3808594 5.0488281 L 5.3671875 5.0644531 C 3.4606632 5.3693645 2 7.0076245 2 9 L 2 15 L 2 15.001953 L 2 21 L 2 21.001953 A 4 4 0 0 0 5.3769531 24.945312 L 5.3808594 24.951172 C 5.3808594 24.951172 10.814 26.001953 15 26.001953 C 19.186 26.001953 24.619141 24.951172 24.619141 24.951172 L 24.621094 24.949219 A 4 4 0 0 0 28 21.001953 L 28 21 L 28 15.001953 L 28 15 L 28 9 A 4 4 0 0 0 24.623047 5.0546875 L 24.619141 5.0488281 C 24.619141 5.0488281 19.186 4 15 4 z M 12 10.398438 L 20 15 L 12 19.601562 L 12 10.398438 z"
                ></path>
              </svg>
            </a>
            <a className="footer-social-link tiktok" href="#" target="_blank">
              <span className="hidden-link-text">TikTok</span>
              <svg
                className="footer-social-icon-svg"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="footer-social-icon-path"
                  d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
                ></path>
              </svg>
            </a>
          </div>
        </div>
        <footer className="bg-black text-white relative bottom-0 left-0 w-full">
          <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="md:flex items-center md:justify-between">
              <div className="mb-6 md:mb-0">
                <p className="mt-1 text-sm text-gray-300">
                  © 2025 Chillz. {t('allRightsReserved')}
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  {t('termsOfService')}
                </a>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  {t('privacyPolicy')}
                </a>
                <a href="#" className="text-gray-300 hover:text-white text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowContactForm(true);
                  }}
                >
                  {t('contactUs')}
                </a>
              </div>
            </div>
          </div>
        </footer>
      </footer>

      {/* Contact Form Modal */}
      {showContactForm && (
        <ContactForm onClose={() => setShowContactForm(false)} />
      )}
    </div>
  );
};

export default Footer;
