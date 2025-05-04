import React from "react";
import Navbar from './Navbar/Nav';
import Form from './Form/Form';
import Cards from './Cards/Cards';
import Footer from './Footer/Footer';
import { useTranslation } from 'react-i18next';

const App = () => {
  const { t } = useTranslation();
  return (
  <div className='wrapper'>
    <header className='header'>
      <Navbar />
    </header>
    <main className='main'>
      <h1>
        {t('subtitle')}
      </h1>
      <Form />
      <div className="cards-block">
        <Cards />
      </div>
    </main>
    <footer className="footer">
      <Footer />
    </footer>
  </div>
  )
};

export default App
