import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
  <div className="footer-content">
    <h2>
      <a href={t('footerLink')} className="git-link" target="_parent">{t('footer')}<span>&#174;</span></a>
    </h2>
  </div>
)}

export default Footer;