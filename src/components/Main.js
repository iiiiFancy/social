import React from 'react';
import { Register } from './Register';
import { Login } from './Login';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Home } from './Home';

export class Main extends React.Component {
    getLogin = () => {
        return this.props.isLoggedIn ? <Redirect to="/home"/> : <Login handleLogin={this.props.handleLogin}/>;
    }

    getHome = () => {
        return this.props.isLoggedIn ? <Home/> : <Redirect to="/login"/>;
    }

    getRoot = () => {
        return <Redirect to="/login"/>
    }
    render() {
        return (
            <div className="main">
                <Switch>
                    {/*精确匹配*/}
                    <Route exact path="/" render={this.getRoot}/>
                    {/*start with 匹配*/}
                    <Route path="/register" component={Register}/>
                    <Route path="/login" render={this.getLogin}/>
                    <Route path="/home" render={this.getHome}/>
                    {/*匹配失败 默认情况*/}
                    <Route render={this.getRoot}/>
                </Switch>
            </div>
        );
    }
}

