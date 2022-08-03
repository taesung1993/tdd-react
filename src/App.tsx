import React, {useState} from 'react';

function App() {
  const [checked, setChecked] = useState(false);
  
  return (
    <div className="App">
      <button disabled={checked}>Button</button>
      <input
        type="checkbox"
        defaultChecked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    </div>
  );
}

export default App;
