import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SummaryForms from './pages/summary/SummaryForm';
import Options from './pages/entry/Options';

function App() {
  return (
    <div className="App">
      <SummaryForms />
      <Options optionType={'scoops'} />
    </div>
  );
}

export default App;
