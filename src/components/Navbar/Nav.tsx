import React from "react";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation()
  return(
  <nav className='nav-bar'>
    <h2 className='nav-bar__greeting greeting'>
      <a href='/'>{t('title')}</a>
    </h2>
  </nav>
)};

export default Navbar;
