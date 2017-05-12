import React from 'react';
import { Link } from 'react-router';
import Sidebar from 'react-sidebar';
import './assets/component.css';

export default (props) => {
  const logout = (e) => {
      e.preventDefault();
      props.logout();
    };

  const links = (
    (props.authenticated) ?
      <div>
        <div className="nav navbar-nav float-xs-left">
          <Link to="/" className="navbar-brand">Apartments</Link>
        </div>
        <div className="nav navbar-nav float-xs-right">
          <Link to="#" onClick={logout} className="nav-item nav-link">Вихід</Link>
        </div>
      </div>
    :
      <div>
        <div className="nav navbar-nav float-xs-left">
          <Link to="/" className="navbar-brand">Apartments</Link>
        </div>
        <div className="nav navbar-nav float-xs-right">
          <Link to="/signin" className="nav-item nav-link">Увійти</Link>
          <Link to="/signup" className="nav-item nav-link">Зареєструватись</Link>
        </div>
      </div>
    );

  return (
    <div>
      <nav className="navbar header bg-faded mb-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{links}</div>
          </div>
        </div>
      </nav>
    </div>
  );
};
