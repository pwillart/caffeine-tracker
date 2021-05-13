import ReactDOM from "react-dom";
import AuthProvider from './context/AuthContext';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import ProtectedRoute from "./hoc/ProtectedRoute";
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";
import NotFound from "./components/pages/NotFound";

ReactDOM.render(
    <AuthProvider>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/login" component={Login}/>
                <ProtectedRoute exact path="/dashboard" component={Dashboard}/>
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    </AuthProvider>,
    document.getElementById('root')
);
