import { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { APIProvider } from './contexts/ApiProvider';
import { AuthenticationProvider } from './contexts/AuthenticationProvider';
import { ModalProvider } from './contexts/ModalProvider';
import { ProfileProvider } from './contexts/ProfileProvider';
import { FeedbackProvider } from './contexts/FeedbackProvider';
import { Authorize } from './pages/authorize/Authorize';
import { Explore } from './pages/explore/Explore';
import { Home } from './pages/home/Home';
import { Profile } from './pages/profile/Profile';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="App">
      <Router>
        <FeedbackProvider>
          <APIProvider>
            <AuthenticationProvider>
              <ModalProvider>
                <Navbar />
                <Route 
                  path="/"
                  exact
                  component={Home}
                />
                <Route 
                  path="/authorize/:type?"
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
                <Footer />
              </ModalProvider>
            </AuthenticationProvider>
          </APIProvider>
        </FeedbackProvider>
      </Router>
    </div>
  );
}

export default App;
