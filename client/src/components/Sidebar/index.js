import React from 'react';
import FontAwesome from 'react-fontawesome'
import { Link, IndexLink } from 'react-router';

import './assets/component.css';

const Sidebar = (props) => {
  const logout = (e) => {
      e.preventDefault();
      props.logout();
    };

  const menu = (
      <div className="menu">
        <div className="flex-wrapp">
          <div className="logo">Apartments</div>

          <div className="burger">
            <FontAwesome name="align-left" />
          </div>
        </div>
        <nav>
          <IndexLink to="/" activeClassName="active">
            <FontAwesome name="home" />
            Доступні квартири
          </IndexLink>
          <Link to="/messages" activeClassName="active">
            <FontAwesome name="map-marker" style={{fontSize: '13px'}} />
            Карта
          </Link>
        </nav>
        <div className="bottom-nav">
          <a href="">
            <FontAwesome name="cogs" />
          </a>
          <a href="">
            <FontAwesome name="lock" />
          </a>
          <Link onClick={logout}>
            <FontAwesome name="sign-out" />
          </Link>
        </div>
      </div>
  )

  return(
    <div className="container-fluid">
      <div className="row">
        {props.authenticated && menu}
      </div>
    </div>
  )
}

export default Sidebar;
