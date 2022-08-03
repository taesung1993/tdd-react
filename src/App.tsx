import React, {useState} from 'react';

function App() {
  const [buttonColor, setButtonColor] = useState('red');
  const [checked, setChecked] = useState(false);
  const disabled = checked;
  const newButtonColor = buttonColor === "red" ? "blue" : "red";
  
  return (
    <div className="App">
      <button
        disabled={disabled}
        style={{ backgroundColor: disabled ? "gray" : buttonColor }}
        onClick={() => setButtonColor(newButtonColor)}
      >
        Change to {disabled ? "grey" : newButtonColor}
      </button>
      <input
        type="checkbox"
        id="disable-button-checkbox"
        defaultChecked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <label htmlFor="disable-button-checkbox">Disable button</label>
    </div>
  );
}

export default App;
