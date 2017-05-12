import React from 'react';
import './assets/component.css';

import SignInFormContainer from '../../containers/SignInFormContainer';

export default () => (
  <div className="container">
    <div className="row">
      <div className="col-sm-6 offset-sm-3 form-box">
        <div className="form-top">
          <div className="form-top-left">
            <h3>Вхід</h3>
              <p>Введіть поштову адресу та пароль для входу:</p>
          </div>
          <div className="form-top-right">
            <i className="fa fa-lock"></i>
          </div>
          </div>
          <div className="form-bottom">
          <SignInFormContainer />
        </div>
      </div>
    </div>
  </div>
);
