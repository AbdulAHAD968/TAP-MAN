import React, { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import OCRProcessor from './components/OCRProcessor';
import PhoneNumberFormatter from './components/PhoneNumberFormatter';
import DarkModeToggle from './components/DarkModeToggle';
import './App.css';

const App = () => {
  const [imageSrc, setImageSrc] = useState('');
  const [extractedText, setExtractedText] = useState('');

  return (
    <div className="App">
      <DarkModeToggle />
      <h1>Phone Number Extractor</h1>
      <ImageUploader onImageUpload={setImageSrc} />
      {imageSrc && <img src={imageSrc} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />}
      {imageSrc && <OCRProcessor imageSrc={imageSrc} onTextExtracted={setExtractedText} />}
      {extractedText && <PhoneNumberFormatter extractedText={extractedText} />}
    </div>
  );
};

export default App;