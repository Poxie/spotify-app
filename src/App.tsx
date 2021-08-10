import { BrowserRouter as Router, Route } from 'react-router-dom';
import { APIProvider } from './contexts/ApiProvider';
import { Home } from './pages/home/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <APIProvider>
          <Route 
            path="/"
            exact
            component={Home}
          />
        </APIProvider>
      </Router>
    </div>
  );
}

export default App;
