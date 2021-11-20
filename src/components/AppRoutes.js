import {
    Routes,
    Route
} from "react-router-dom";
  
import About from './About';
import Home from './Home';
import FormList from './forms/FormList';

const AppRoutes = () => (
    <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/about" element={<About />} />
        <Route exact path='/forms' element={<FormList/>} />
    </Routes>
)

export default AppRoutes;