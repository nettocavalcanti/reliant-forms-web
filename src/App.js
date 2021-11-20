import { BrowserRouter as Router } from "react-router-dom";
import {ToastsContainer, ToastsStore} from 'react-toasts';

import './App.css';
import theme from './components/themes/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import NavBar from './components/NavBar';
import AppRoutes from './components/AppRoutes';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <ToastsContainer store={ToastsStore}/>
        <div className="App">
          <Router>
            <header className="App-header" style={{backgroundColor: theme.palette.primary.light}}>
                <NavBar />
                <AppRoutes />
            </header>
          </Router>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;
