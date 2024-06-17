import { useState, useEffect } from "react";
import "./App.css";
import { SearchBar } from "./components/SearchBar";
import { SearchResultsList } from "./components/SearchResultsList";
import { BirthdayForm } from "./components/BirthdayPopup";
import { RegistrationForm } from "./components/RegistrationForm";
import { Certificate } from "./components/Certificate";
import { LandingPage } from "./components/LandingPage";

function App() {
  const [results, setResults] = useState([]);
  const [showBirthdayForm, setShowBirthdayForm] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showLandingPage, setShowLandingPage] = useState(true); // Show landing page initially

  // Combined user data and birthday to avoid separate states
  const [selectedUser, setSelectedUser] = useState(null); 

  const handleResultClick = (user) => {
    setSelectedUser(user);
    setShowBirthdayForm(true);
  };

  const handleAgeError = () => {
    setShowBirthdayForm(false);
  };

  const handleAgeSuccess = (birthday) => {
    setSelectedUser((prevUser) => ({ ...prevUser, birthday, age: calculateAge(birthday) }));
    setShowBirthdayForm(false);
    setShowRegistrationForm(true);
  };

  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleRegistrationSubmit = (formData) => {
    setSelectedUser((prevUser) => ({ ...prevUser, ...formData }));
    setShowRegistrationForm(false);
    setShowCertificate(true);
  };

  const handleBackToSearch = () => {
    setShowCertificate(false);
    setResults([]);
    setSelectedUser(null);
    setShowLandingPage(true); // Return to landing page
  };

  const handleNavigateToSearch = () => {
    setShowLandingPage(false); // Hide landing page
  };

  useEffect(() => {
    if (selectedUser && selectedUser.birthday) {
      setSelectedUser((prevUser) => ({
        ...prevUser,
        age: calculateAge(selectedUser.birthday),
      }));
    }
  }, [selectedUser, selectedUser.birthday]);


  return (
    <div className="App">
      {(showBirthdayForm || showRegistrationForm || showCertificate) && (
        <div className="overlay" />
      )}

      {showLandingPage ? ( 
        <LandingPage onNavigateToSearch={handleNavigateToSearch} />
      ) : (
        <div className="search-bar-container">
          <SearchBar setResults={setResults} />
          {results && results.length > 0 && (
            <SearchResultsList results={results} handleResultClick={handleResultClick} />
          )}
          {showBirthdayForm && (
            <BirthdayForm
              onAgeSuccess={(birthday) => handleAgeSuccess(birthday)}
              onAgeError={handleAgeError}
            />
          )}
          {showRegistrationForm && (
            <RegistrationForm onSubmit={handleRegistrationSubmit} />
          )}
          {showCertificate && (
            <Certificate user={selectedUser} onBackToSearch={handleBackToSearch} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
