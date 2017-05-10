import React from 'react';

import Navbar from '../containers/NavbarContainer';
import Sidebar from '../containers/SidebarContainer';

export default ({ children }) => (
  <div>
    <Navbar />
    <Sidebar>
      {children}
    </Sidebar>
  </div>
);
