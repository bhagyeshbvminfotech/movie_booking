
import './App.css';
import Datachage from './Datachage';
import { Routes, Route,BrowserRouter} from "react-router-dom";
import Poster from "./Poster";
import {moviesURL} from "./constant";
import ClockData from "./ClockData";
import Login from "./Login";
import SignIn from "./SignIn";


function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route path={moviesURL} element={<Poster />} />
                    <Route path={`${moviesURL}/:name`} element={<ClockData />} />
                    <Route path={`${moviesURL}/:name/:id`} element={<Datachage />} />
                    <Route path="/Datachage" element={<Datachage />} />
                    {/*<Route path="/signup" element={<SignUp />} />*/}
                    <Route path='/login' element={<Login />} />
                    <Route path="/signup" element={<SignIn />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
