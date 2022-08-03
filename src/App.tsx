import React, {useState} from 'react';

function App() {
  const [checked, setChecked] = useState(false);
  
  return (
    <div className="App">
      <button disabled={checked}>
        Button
      </button>
      <input
        type="checkbox"
        id="disable-button-checkbox"
        defaultChecked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <label htmlFor="disable-button-checkbox">
        Disable button
      </label>
    </div>
  );
}

export default App;
