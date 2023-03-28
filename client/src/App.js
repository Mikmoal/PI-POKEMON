import { Route, useLocation } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import { Landing, Home, Detail, Form } from "./views";

function App() {
  const location = useLocation();
  return (
    <div className="App">

      {location.pathname !== "/" && <NavBar />}
      <h1>Henry Pokemon</h1>

      
      
       <Route exact path="/" component={Landing} />
       <Route exact path="/home" component={Home} />
       <Route exact path="/home/:id" component={Detail} />  
       <Route exact path="/newPokemon" component={Form} />
     
    </div>
  );
}

export default App;
