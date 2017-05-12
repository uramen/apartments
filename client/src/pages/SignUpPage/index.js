import React from 'react';

import SignUpFormContainer from '../../containers/SignUpFormContainer';

export default () => (
  <div className="container">
    <div className="row">
      <div className="col-sm-6 offset-sm-3 form-box">
        <div className="form-top">
          <div className="form-top-left">
            <h3>Реєстрація</h3>
              <p>Заповніть всі данні для реєстрація:</p>
          </div>
          <div className="form-top-right">
            <i className="fa fa-pencil-square-o"></i>
          </div>
          </div>
          <div className="form-bottom">
        <SignUpFormContainer />
      </div>
    </div>
    </div>
  </div>
);
