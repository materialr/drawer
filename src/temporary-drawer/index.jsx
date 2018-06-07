import { MDCTemporaryDrawer } from '@material/drawer/temporary';
import { strings } from '@material/drawer/temporary/constants';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import '@material/drawer/temporary/mdc-temporary-drawer.scss';

class TemporaryDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.elementRoot = undefined;
    this.temporaryDrawer = undefined;
    this.getClassNames = this.getClassNames.bind(this);
    this.setOpen = this.setOpen.bind(this);
  }
  componentDidMount() {
    const { elementRoot, props: { onClose, onOpen } } = this;
    this.temporaryDrawer = new MDCTemporaryDrawer(elementRoot);
    if (onClose) {
      this.temporaryDrawer.listen(strings.CLOSE_EVENT, onClose);
    }
    if (onOpen) {
      this.temporaryDrawer.listen(strings.OPEN_EVENT, onOpen);
    }
    this.setOpen();
  }
  componentDidUpdate({ open: previousOpen }) {
    if (previousOpen !== this.props.open) {
      this.setOpen();
    }
  }
  componentWillUnmount() {
    const { onClose, onOpen } = this.props;
    if (onClose) {
      this.temporaryDrawer.unlisten(strings.CLOSE_EVENT, onClose);
    }
    if (onOpen) {
      this.temporaryDrawer.unlisten(strings.OPEN_EVENT, onOpen);
    }
    this.temporaryDrawer.destroy();
  }
  getClassNames() {
    const { className } = this.props;
    return classnames({
      'mdc-drawer': true,
      'mdc-drawer--temporary': true,
      'mdc-typography': true,
      [className]: !!className,
    });
  }
  setOpen() {
    this.temporaryDrawer.open = this.props.open;
  }
  render() {
    const {
      getClassNames,
      props: {
        children,
        className,
        onClose,
        onOpen,
        open,
        ...props
      },
    } = this;
    return (
      <aside
        className={getClassNames()}
        ref={(elementRoot) => { this.elementRoot = elementRoot; }}
        {...props}
      >
        <nav className="mdc-drawer__drawer">
          {children}
        </nav>
      </aside>
    );
  }
}

TemporaryDrawer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  open: PropTypes.bool,
};

TemporaryDrawer.defaultProps = {
  className: undefined,
  onClose: undefined,
  onOpen: undefined,
  open: false,
};

export default TemporaryDrawer;
