import './App.css';
import Loading from './pages/Loading';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './pages/Navbar'
import Home from './pages/Home';
import EventsContextProvider from './context/EventsContext'


function App() {
  return (
    <Router>
      <div className="App">
        <EventsContextProvider>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Loading />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
          </Switch>
        </EventsContextProvider>
      </div>
    </Router>
  );
}

export default App;
