import React, { useState } from 'react';
import UserProfileSearch from './components/UserProfileSearch';

function App() {
  const [darkModeToggle, setDarkModeToggle] = useState(false);

  const toggleDarkModeFn = () => {
    setDarkModeToggle(!darkModeToggle);
  }
  return (
    <div className="App">
      <UserProfileSearch darkModeToggle={darkModeToggle} toggleDarkModeFn={toggleDarkModeFn} />
    </div>
  );
}

export default App;
