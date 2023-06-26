
import './App.css';
import Datachage from './Datachage';
import { Routes, Route,BrowserRouter} from "react-router-dom";
import Poster from "./Poster";
import {moviesURL} from "./constant";
import ClockData from "./ClockData";


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
                </Route>

            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
