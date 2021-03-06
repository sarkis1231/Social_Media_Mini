import React from 'react';
import PrivateRoute from "./components/HOC/Auth/PrivateRoute";
import Index from "./components/views/dashboard";
import {Redirect, Route, RouteComponentProps, Switch} from "react-router";
import Landing from "./components/views/Landing";
import PublicRoute from "./components/HOC/Auth/PublicRoute";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Error from "./components/error";
import {withClass} from "./components/HOC/withClass";
import CreateProfile from "./components/views/create-profile";
import EditProfile from "./components/views/edit-profile";
import Experience from "./components/views/add-credentials/Experience";
import Education from "./components/views/add-credentials/Education";

const withLoginRegisterClassName = withClass<RouteComponentProps>("loginRegister");
const LoginWithClassName = withLoginRegisterClassName(Login);
const RegisterWithClassName = withLoginRegisterClassName(Register);


const Routes: React.FC = () => {
    return (
        <Switch>
            <PrivateRoute exact path={['/dashboard', '/']} component={Index}/>
            <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
            <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
            <PrivateRoute exact path="/add-credentials/experience" component={Experience}/>
            <PrivateRoute exact path="/add-credentials/education" component={Education}/>


            <PublicRoute exact path="/login" component={LoginWithClassName}/>
            <PublicRoute exact path="/register" component={RegisterWithClassName}/>

            <PublicRoute exact path="/" component={Landing}/>

            <Route exact path="/404" component={Error}/>
            <Redirect to="/404"/>
        </Switch>
    );
};

export default Routes;