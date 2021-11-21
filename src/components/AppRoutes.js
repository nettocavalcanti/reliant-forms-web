import {
    Routes,
    Route
} from "react-router-dom";
  
import About from './About';
import Home from './Home';
import FormList from './forms/FormList';
import FormCreate from './forms/FormCreate';
import FormDetail from './forms/FormDetail';
import FormSpecCreate from './forms/specs/FormSpecCreate';
import FormSpecDetail from './forms/specs/FormSpecDetail';
import FormSpecValueCreate from './forms/specs/values/FormSpecValueCreate';

const AppRoutes = () => (
    <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/about" element={<About />} />
        <Route exact path='/forms' element={<FormList/>} />
        <Route exact path='/forms/new' element={<FormCreate/>} />
        <Route exact path='/forms/:form_id' element={<FormDetail/>} />

        <Route exact path='/forms/:form_id/specs/new' element={<FormSpecCreate/>} />
        <Route exact path='/forms/:form_id/specs/:spec_id' element={<FormSpecDetail />} />

        <Route exact path='/forms/:form_id/specs/:spec_id/values/new' element={<FormSpecValueCreate />} />

        <Route exact path='/forms/:form_id/specs/:spec_id/values/:value_id' element={<FormSpecValueCreate />} />
    </Routes>
)

export default AppRoutes;