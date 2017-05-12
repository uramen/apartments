import React from 'react';

import Navbar from '../containers/NavbarContainer';
import Sidebar from '../containers/SidebarContainer';

export default ({authenticated, children }) => (
  <div className={authenticated ? 'without-bg' : 'with-bg'}>
    <div className={authenticated ? '' : 'black-bg'}>
      {authenticated ? null :   <Navbar />}

      <div className="container-fluid">
        {
          authenticated
          ? <div className="row">
              <div className="col-md-3">
                <Sidebar />
              </div>
              <div className="col-md-9">
                {children}
              </div>
            </div>
          : <div className="row">
              <div className="col-md-8 offset-md-2">
                {children}
              </div>
            </div>
        }
      </div>
    </div>
  </div>
);
