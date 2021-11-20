import {
    Routes,
    Route
} from "react-router-dom";
  
import About from './About';
import Home from './Home';
import FormList from './forms/FormList';
import FormShow from './forms/FormShow';

const AppRoutes = () => (
    <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/about" element={<About />} />
        <Route exact path='/forms' element={<FormList/>} />

        <Route exact path='/forms/:form_id' element={<FormShow/>} />
    </Routes>
)

export default AppRoutes;