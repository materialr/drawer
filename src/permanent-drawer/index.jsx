import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import '@material/drawer/mdc-drawer.scss';
import '@material/drawer/permanent/mdc-permanent-drawer.scss';

const getClassNames = className => classnames({
  'mdc-drawer': true,
  'mdc-drawer--permanent': true,
  'mdc-typography': true,
  [className]: !!className,
});

const PermanentDrawer = ({ children, className }) => (
  <nav className={getClassNames(className)}>
    <div className="mdc-drawer__content">
      {children}
    </div>
  </nav>
);

PermanentDrawer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

PermanentDrawer.defaultProps = {
  className: '',
};

export default PermanentDrawer;
