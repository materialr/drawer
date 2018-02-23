import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import '@material/drawer/mdc-drawer.scss';
import '@material/drawer/persistent/mdc-persistent-drawer.scss';

import drawerFoundation from './foundation';

class PersistentDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.componentIsMounted = undefined;
    this.elementRoot = undefined;
    this.elementDrawer = undefined;
    this.state = {
      classNames: [],
    };
    this.drawerFoundation = undefined;
    this.getClassNames = this.getClassNames.bind(this);
    this.getClassNamesAsString = this.getClassNamesAsString.bind(this);
    this.getClassNamesFromProps = this.getClassNamesFromProps.bind(this);
    this.getOnClose = this.getOnClose.bind(this);
    this.getOnOpen = this.getOnOpen.bind(this);
    this.persistentDrawerClose = this.persistentDrawerClose.bind(this);
    this.persistentDrawerCreate = this.persistentDrawerCreate.bind(this);
    this.persistentDrawerDestroy = this.persistentDrawerDestroy.bind(this);
    this.persistentDrawerOpen = this.persistentDrawerOpen.bind(this);
    this.updateClassNames = this.updateClassNames.bind(this);
  }
  componentDidMount() {
    this.componentIsMounted = true;
    this.persistentDrawerCreate();
    if (this.props.isOpen) {
      this.persistentDrawerOpen();
    }
  }
  componentWillReceiveProps({ isOpen: nextIsOpen }) {
    const { isOpen } = this.props;
    if (isOpen && !nextIsOpen) {
      this.persistentDrawerClose();
    }
    if (!isOpen && nextIsOpen) {
      this.persistentDrawerOpen();
    }
  }
  componentWillUnmount() {
    this.componentIsMounted = false;
    this.persistentDrawerDestroy();
  }
  getClassNamesAsString() {
    return `${this.getClassNamesFromProps()} ${this.getClassNames()}`.trim();
  }
  getClassNamesFromProps() {
    const { className } = this.props;
    return classnames({
      'mdc-drawer': true,
      'mdc-drawer--persistent': true,
      'mdc-typography': true,
      [className]: !!className,
    });
  }
  getClassNames() {
    return this.state.classNames.join(' ');
  }
  getOnClose() {
    return this.props.onClose || (() => {});
  }
  getOnOpen() {
    return this.props.onOpen || (() => {});
  }
  persistentDrawerClose() {
    this.drawerFoundation.close();
  }
  persistentDrawerCreate() {
    this.drawerFoundation = drawerFoundation({
      elementDrawer: this.elementDrawer,
      elementRoot: this.elementRoot,
      onClose: this.getOnClose(),
      onOpen: this.getOnOpen(),
      propClassNames: this.getClassNamesFromProps().split(' '),
      updateClassNames: this.updateClassNames,
    });
    this.drawerFoundation.init();
  }
  persistentDrawerDestroy() {
    this.drawerFoundation.destroy();
    this.drawerFoundation = undefined;
  }
  persistentDrawerOpen() {
    this.drawerFoundation.open();
  }
  updateClassNames(classNames) {
    if (this.componentIsMounted) {
      this.setState({ classNames });
    }
  }
  render() {
    return (
      <aside
        className={this.getClassNamesAsString()}
        ref={(elementRoot) => { this.elementRoot = elementRoot; }}
      >
        <nav
          className="mdc-drawer__drawer"
          ref={(elementDrawer) => { this.elementDrawer = elementDrawer; }}
        >
          {this.props.children}
        </nav>
      </aside>
    );
  }
}

PersistentDrawer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
};

PersistentDrawer.defaultProps = {
  className: '',
  isOpen: false,
  onClose: undefined,
  onOpen: undefined,
};

export default PersistentDrawer;
