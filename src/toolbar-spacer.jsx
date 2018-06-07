import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const getClassNames = className => classnames({
  'mdc-drawer__toolbar-spacer': true,
  [className]: !!className,
});

const ToolbarSpacer = ({ children, className, ...props }) =>
  <div className={getClassNames(className)} {...props}>{children}</div>;

ToolbarSpacer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

ToolbarSpacer.defaultProps = {
  children: undefined,
  className: undefined,
};

export default ToolbarSpacer;
