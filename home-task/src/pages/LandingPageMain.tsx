import { useState } from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import MainModal from './components/MainModal';
import themePictureSrc from '../../public/grayandgreen.jpg';
export default function LandingPageMain() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pageTitle = "Noam's Landing Page";
  const buttonText = 'Submit Form';
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="App">
      <div className="landing-page">
        <Header pageTitle={pageTitle} />

        <Content themePictureSrc={themePictureSrc.src} />

        <button
          className="landing-page--btn"
          onClick={handleOpenModal}
          type="button"
          aria-label="Open contact form"
        >
          {buttonText}
        </button>

        <Footer />

        {/* The Modal */}
        {isModalOpen && (
          <MainModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </div>
    </div>
  );
}
