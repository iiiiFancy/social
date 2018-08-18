// 网页的上面部分保持不变
import React  from 'react';
import logo from '../assets/images/logo.jpg';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import Particles from 'react-particles-js';

const particlesOptions = {
    particles: {
        number: {
            value: 20,
            density: {
                enable: true,
                value_area: 1000
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#1890ff",
            opacity: 0.4,
            width: 1
        },
    }
}

export class Header extends React.Component {
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        handleLogout: PropTypes.func.isRequired,
    }

    state = {
        showParticals: true
    }

    onClick = () => {
        this.setState(x => {
            // console.log(x.showParticals)
            x.showParticals = !x.showParticals
            console.log(this.state.showParticals)
        })
    }

    render() {
        return (
            <header className="App-header">
                <img src={logo} className="header-logo" alt="logo" />
                <h1 className="App-title">Welcome to my demo site :) </h1>
                {/*<button onClick={this.onClick}>test</button>*/}
                {
                    this.props.isLoggedIn ?
                        <a className="logout" onClick={this.props.handleLogout}>
                            <Icon type="logout" />{' '}Logout
                        </a>
                        : null
                }
                {
                    this.state.showParticals ?
                        <Particles className='particles'
                                   params={particlesOptions}
                        />
                        : null
                }
            </header>
        );
    }
}

