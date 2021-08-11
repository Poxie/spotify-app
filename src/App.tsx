import { BrowserRouter as Router, Route } from 'react-router-dom';
import { APIProvider } from './contexts/ApiProvider';
import { AuthenticationProvider } from './contexts/AuthenticationProvider';
import { Authorize } from './pages/authorize/Authorize';
import { Home } from './pages/home/Home';
import { Profile } from './pages/profile/Profile';

function App() {
  return (
    <div className="App">
      <Router>
        <APIProvider>
          <AuthenticationProvider>
            <Route 
              path="/"
              exact
              component={Home}
            />
            <Route 
              path="/authorize"
              component={Authorize}
            />
            <Route 
              path="/profile"
              component={Profile}
            />
          </AuthenticationProvider>
        </APIProvider>
      </Router>
    </div>
  );
}

export default App;
