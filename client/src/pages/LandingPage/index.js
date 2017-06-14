import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';

import './assets/component.css';

export default () => (
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <div className="welcome">
          <h2>Вітаємо на сайті</h2>
          <p>Сайт призначений для пошуку квартир в твоєму місті</p>
          <Link to="/signin" className="yellow-btn">
            Розпочати
          </Link>
        </div>
      </div>
    </div>
  </div>
);
