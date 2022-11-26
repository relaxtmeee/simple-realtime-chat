import { BrowserRouter as Router } from "react-router-dom";
import { useContext } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';

import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";

import { Context } from "./index";

import './App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const App = () => {
    const {auth} = useContext(Context);
    const [user, loading, error] = useAuthState(auth);

    if(loading) {
        return <Loader />
    }

    return (
        <Router>
            <Navbar />
            <AppRouter />
        </Router>
    )
}

export default App;