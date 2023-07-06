
import './App.css';
import MovieSit from './MovieSit';
import { Routes, Route,BrowserRouter} from "react-router-dom";
import MovieName from "./MovieName";
import {moviesURL} from "./constant";
import MovieTime from "./MovieTime";
import Login from "./Login";
import SignIn from "./SignIn";
import Not404 from "./Not404";
import Calender from "./Calender";
import DataAdd from "./DataAdd";


function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route path={moviesURL} element={<MovieName />} />
                    <Route path={`${moviesURL}/:name`} element={<MovieTime />} />
                    <Route path={`${moviesURL}/:name/:id`} element={<MovieSit />} />
                    <Route path="/Datachage" element={<MovieSit />} />
                    <Route path='/login' element={<Login />} />
                    <Route path="/signup" element={<SignIn />} />
                    <Route path="/calender" element={<Calender />} />
                    <Route path="/dataadd" element={<DataAdd />} />
                    <Route path="*" element={<Not404/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
