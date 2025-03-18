import React, { useState } from 'react';

const PhoneNumberFormatter = ({ extractedText }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const formatAndValidate = () => {
    // Extract numbers using regex
    const numbersOnly = extractedText.replace(/\D/g, '');

    let formattedNumber = 'Invalid phone number';

    if(numbersOnly.length === 11 && numbersOnly.startsWith('03')){
      formattedNumber = `0${numbersOnly.slice(1, 4)} ${numbersOnly.slice(4, 7)} ${numbersOnly.slice(7)}`;
    }
    else if (numbersOnly.length >= 10 && numbersOnly.length <= 11){
      formattedNumber = `0${numbersOnly}`;
    }

    setPhoneNumber(formattedNumber);
  };

  return (
    <div>
      <button onClick={formatAndValidate}>Format & Validate</button>
      <p>{phoneNumber}</p>
      {phoneNumber !== 'Invalid phone number' && (
        <div>
          <button onClick={() => navigator.clipboard.writeText(phoneNumber)}>Copy</button>
          <button onClick={() => window.open(`tel:${phoneNumber}`)}>Call</button>
        </div>
      )}
    </div>
  );
};

export default PhoneNumberFormatter;
