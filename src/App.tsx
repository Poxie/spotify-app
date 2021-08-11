import { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { APIProvider } from './contexts/ApiProvider';
import { AuthenticationProvider } from './contexts/AuthenticationProvider';
import { ProfileProvider } from './contexts/ProfileProvider';
import { Authorize } from './pages/authorize/Authorize';
import { Explore } from './pages/explore/Explore';
import { Home } from './pages/home/Home';
import { Profile } from './pages/profile/Profile';

function App() {
  return (
    <div className="App">
      <Router>
        <APIProvider>
          <AuthenticationProvider>
            <Navbar />
            <Route 
              path="/"
              exact
              component={Home}
            />
            <Route 
              path="/authorize"
              component={Authorize}
            />
            <ProfileProvider>
              <Route 
                path="/profile"
                component={Profile}
              />
            </ProfileProvider>
            <Route 
              path="/explore"
              component={Explore}
            />
          </AuthenticationProvider>
        </APIProvider>
      </Router>
    </div>
  );
}

export default App;
