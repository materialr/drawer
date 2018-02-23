import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const getClassNames = className => classnames({
  'mdc-drawer__header': true,
  [className]: !!className,
});

const Header = ({ children, className }) => (
  <header className={getClassNames(className)}>
    <div className="mdc-drawer__header-content">
      {children}
    </div>
  </header>
);

Header.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Header.defaultProps = {
  children: undefined,
  className: undefined,
};

export default Header;
