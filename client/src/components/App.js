import React from 'react';

import Navbar from '../containers/NavbarContainer';
import Sidebar from '../containers/SidebarContainer';

export default ({authenticated, children }) => (
  <div className={authenticated ? 'bg without-bg' : 'bg with-bg'}>
    <div className={authenticated ? '' : 'black-bg'}>
      {authenticated ? null :   <Navbar />}

      <Sidebar>
        {children}
      </Sidebar>
    </div>
  </div>
);
