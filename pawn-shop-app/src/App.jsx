import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './styles/App.css';
import GoldInfoInput from './components/inputForm.jsx'; // Import the GoldInfoInput component

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      
      <GoldInfoInput /> {/* Include the GoldInfoInput component */}
    </>
  );
}

export default App;