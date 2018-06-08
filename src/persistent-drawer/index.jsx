import { MDCPersistentDrawer } from '@material/drawer/persistent';
import { strings } from '@material/drawer/persistent/constants';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import '@material/drawer/persistent/mdc-persistent-drawer.scss';

class PersistentDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.elementRoot = undefined;
    this.persistentDrawer = undefined;
    this.getClassNames = this.getClassNames.bind(this);
    this.setOpen = this.setOpen.bind(this);
  }
  componentDidMount() {
    const { elementRoot, props: { onClose, onOpen } } = this;
    this.persistentDrawer = new MDCPersistentDrawer(elementRoot);
    if (onClose) {
      this.persistentDrawer.listen(strings.CLOSE_EVENT, onClose);
    }
    if (onOpen) {
      this.persistentDrawer.listen(strings.OPEN_EVENT, onOpen);
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
      this.persistentDrawer.unlisten(strings.CLOSE_EVENT, onClose);
    }
    if (onOpen) {
      this.persistentDrawer.unlisten(strings.OPEN_EVENT, onOpen);
    }
    this.persistentDrawer.destroy();
  }
  getClassNames() {
    const { className } = this.props;
    return classnames({
      'mdc-drawer': true,
      'mdc-drawer--persistent': true,
      'mdc-typography': true,
      [className]: !!className,
    });
  }
  setOpen() {
    this.persistentDrawer.open = this.props.open;
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

PersistentDrawer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  open: PropTypes.bool,
};

PersistentDrawer.defaultProps = {
  className: undefined,
  onClose: undefined,
  onOpen: undefined,
  open: false,
};

export default PersistentDrawer;
