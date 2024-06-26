import React, { useEffect, useState } from 'react';
import './Certificate.css';
import QRCode from 'qrcode.react';
import Ecert from '/E-CERT.png';

export const Certificate = ({ user, onBackToLandingPage }) => {

  const sanitizeName = (name) => {
    return name.replace('*', '')
  }

  const {
    NAME,
    birthday,
    age,
    cluster,
    'PRECINCT NO.': precinct,
    ADDRESS,
    contactNumber,
    photoUrl,
    // signatureUrl,
  } = user;

  const qrData = NAME;

  const [qrSize, setQrSize] = useState(110);

  useEffect(() => {
    const updateQrSize = () => {
      if (window.innerWidth < 480) {
        setQrSize(50);
      } else if (window.innerWidth < 768) {
        setQrSize(100); // Adjust for 768px and below
      } else if (window.innerWidth < 834) {
        setQrSize(100); // No change for 834px
      } else if (window.innerWidth < 1024) {
        setQrSize(110); // Back to default for 1024px and above
      } else if (window.innerWidth < 1440) {
        setQrSize(110); // No change for 1440px
      } else {
        setQrSize(110); // Default for larger screens
      }
    };

    window.addEventListener('resize', updateQrSize);
    updateQrSize(); // Initial check on component mount

    return () => {
      window.removeEventListener('resize', updateQrSize);
    };
  }, []);

  console.log('User Data:', user);
  console.log('Photo URL:', photoUrl);

  const displayPhotoUrl = photoUrl || 'https://via.placeholder.com/150';

  // const isValidUrl = (url) => {
  //   try {
  //     new URL(url);
  //     return true;
  //   } catch (_) {
  //     return false;
  //   }
  // };

  return (
    <div className="certificate-container">
      <div className="certificate-info-container">
        <div className="certificate-info-details">
          <div className="photo-container">
            <img src={displayPhotoUrl} alt="User Photo" />
          </div>
          <div className="name-container">
            <h2>{sanitizeName(NAME)}</h2>
          </div>
          <div className="details-container">
            <div className="qr-code">
              <QRCode value={qrData} size={qrSize} />
            </div>
            <div className="user-details">
              <div className="personal-info">
                <div className="info">
                  <p className='pb'>Birthday:</p>
                  <p>{birthday}</p>
                </div>
                <div className="info">
                  <p className='pb'>Age:</p>
                  <p>{age}</p>
                </div>
                <div className="info">
                  <p className='pb'>Cluster #:</p>
                  <p>{cluster}</p>
                </div>
                <div className="info">
                  <p className='pb'>Precinct #:</p>
                  <p>{precinct}</p>
                </div>
              </div>
              <div className="add-contact-info">
                <p className='pb'>Address:</p>
                <p>{ADDRESS}</p>
              </div>
              <div className="add-contact-info">
                <p className='pb'>Contact Number:</p>
                <p>{contactNumber}</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      <div className="back-box">
        <button
          onClick={onBackToLandingPage}
          className="back"
          >
          BACK
        </button>
      </div>
    </div>
  );
};
