import { mount, shallow } from 'enzyme';
import React from 'react';

import PersistentDrawer from './index';
import drawerFoundation from './foundation';

const CHILDREN = 'CHILDREN';

test('<PersistentDrawer /> > Adds default classNames', () => {
  const wrapper = shallow(
    <PersistentDrawer>{CHILDREN}</PersistentDrawer>,
    { disableLifecycleMethods: true },
  );
  const expected = 'mdc-drawer mdc-drawer--persistent mdc-typography';

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('<PersistentDrawer /> > Adds extra classNames', () => {
  const CLASS_NAME = 'CLASS_NAME';
  const wrapper = shallow(
    <PersistentDrawer className={CLASS_NAME}>{CHILDREN}</PersistentDrawer>,
    { disableLifecycleMethods: true },
  );
  const expected = `mdc-drawer mdc-drawer--persistent mdc-typography ${CLASS_NAME}`;

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('<PersistentDrawer /> > Creates the foundation on mount', () => {
  const persistentDrawerCreate = jest.fn();
  const persistentDrawerOpen = jest.fn();
  const wrapper = shallow(
    <PersistentDrawer>{CHILDREN}</PersistentDrawer>,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expectedPersistentDrawerCreate = 1;
  const expectedPersistentDrawerOpen = 0;
  instance.persistentDrawerCreate = persistentDrawerCreate;
  instance.persistentDrawerOpen = persistentDrawerOpen;

  instance.componentDidMount();
  const actualPersistentDrawerCreate = persistentDrawerCreate.mock.calls.length;
  const actualPersistentDrawerOpen = persistentDrawerOpen.mock.calls.length;

  expect(actualPersistentDrawerCreate).toBe(expectedPersistentDrawerCreate);
  expect(actualPersistentDrawerOpen).toBe(expectedPersistentDrawerOpen);
});

test('<PersistentDrawer /> > Opens the drawer on mount if set to', () => {
  const persistentDrawerOpen = jest.fn();
  const wrapper = shallow(
    <PersistentDrawer isOpen>{CHILDREN}</PersistentDrawer>,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expectedPersistentDrawerOpen = 1;
  instance.persistentDrawerCreate = () => 'persistentDrawerCreate';
  instance.persistentDrawerOpen = persistentDrawerOpen;

  instance.componentDidMount();
  const actualPersistentDrawerOpen = persistentDrawerOpen.mock.calls.length;

  expect(actualPersistentDrawerOpen).toBe(expectedPersistentDrawerOpen);
});

test('<PersistentDrawer /> > Opens the drawer when the prop changes', () => {
  const persistentDrawerOpen = jest.fn();
  const wrapper = shallow(
    <PersistentDrawer>{CHILDREN}</PersistentDrawer>,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expectedPersistentDrawerOpen = 1;
  instance.persistentDrawerOpen = persistentDrawerOpen;

  instance.componentWillReceiveProps({ isOpen: true });
  const actualPersistentDrawerOpen = persistentDrawerOpen.mock.calls.length;

  expect(actualPersistentDrawerOpen).toBe(expectedPersistentDrawerOpen);
});

test('<PersistentDrawer /> > Closes the drawer when the prop changes', () => {
  const persistentDrawerClose = jest.fn();
  const wrapper = shallow(
    <PersistentDrawer isOpen>{CHILDREN}</PersistentDrawer>,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expectedPersistentDrawerClose = 1;
  instance.persistentDrawerClose = persistentDrawerClose;

  instance.componentWillReceiveProps({ isOpen: false });
  const actualPersistentDrawerClose = persistentDrawerClose.mock.calls.length;

  expect(actualPersistentDrawerClose).toBe(expectedPersistentDrawerClose);
});

test('<PersistentDrawer /> > Destroys the drawer on unmount', () => {
  const persistentDrawerDestroy = jest.fn();
  const wrapper = shallow(
    <PersistentDrawer>{CHILDREN}</PersistentDrawer>,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expectedPersistentDrawerDestroy = 1;
  instance.persistentDrawerDestroy = persistentDrawerDestroy;

  instance.componentWillUnmount();
  const actualPersistentDrawerDestroy = persistentDrawerDestroy.mock.calls.length;

  expect(actualPersistentDrawerDestroy).toBe(expectedPersistentDrawerDestroy);
});

test('<PersistentDrawer /> > getOnClose() returns the onClose property', () => {
  const ON_CLOSE = () => 'ON_CLOSE';
  const wrapper = shallow(
    <PersistentDrawer onClose={ON_CLOSE}>{CHILDREN}</PersistentDrawer>,
    { disableLifecycleMethods: true },
  );
  const expected = ON_CLOSE;

  const actual = wrapper.instance().getOnClose();

  expect(actual).toBe(expected);
});

test('<PersistentDrawer /> > getOnClose() returns a default empty method', () => {
  const wrapper = shallow(
    <PersistentDrawer>{CHILDREN}</PersistentDrawer>,
    { disableLifecycleMethods: true },
  );
  const expected = () => {};

  const actual = wrapper.instance().getOnClose();
  actual();

  expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
});

test('<PersistentDrawer /> > getOnOpen() returns the onOpen property', () => {
  const ON_OPEN = () => 'ON_OPEN';
  const wrapper = shallow(
    <PersistentDrawer onOpen={ON_OPEN}>{CHILDREN}</PersistentDrawer>,
    { disableLifecycleMethods: true },
  );
  const expected = ON_OPEN;

  const actual = wrapper.instance().getOnOpen();

  expect(actual).toBe(expected);
});

test('<PersistentDrawer /> > getOnOpen() returns a default empty method', () => {
  const wrapper = shallow(
    <PersistentDrawer>{CHILDREN}</PersistentDrawer>,
    { disableLifecycleMethods: true },
  );
  const expected = () => {};

  const actual = wrapper.instance().getOnOpen();
  actual();

  expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
});

test('<PersistentDrawer /> > Closes the drawer', () => {
  const close = jest.fn();
  const wrapper = shallow(
    <PersistentDrawer>{CHILDREN}</PersistentDrawer>,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expected = 1;
  instance.drawerFoundation = { close };

  instance.persistentDrawerClose();
  const actual = close.mock.calls.length;

  expect(actual).toBe(expected);
});

test('<PersistentDrawer /> > Creates the foundation', () => {
  const wrapper = mount(<PersistentDrawer>{CHILDREN}</PersistentDrawer>);
  const instance = wrapper.instance();
  const { elementDrawer, elementRoot, getOnClose, getOnOpen } = instance;
  const expected = drawerFoundation({
    elementDrawer,
    elementRoot,
    onClose: getOnClose(),
    onOpen: getOnOpen(),
    propClassNames: instance.getClassNamesFromProps().split(' '),
    updateClassNames: instance.updateClassNames,
  });
  expected.init();

  const actual = instance.drawerFoundation;

  expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
});

test('<PersistentDrawer /> > Destroys the drawer', () => {
  const destroy = jest.fn();
  const wrapper = shallow(
    <PersistentDrawer>{CHILDREN}</PersistentDrawer>,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expected = 1;
  instance.drawerFoundation = { destroy };

  instance.persistentDrawerDestroy();
  const actual = destroy.mock.calls.length;

  expect(actual).toBe(expected);
});

test('<PersistentDrawer /> > Opens the drawer', () => {
  const open = jest.fn();
  const wrapper = shallow(
    <PersistentDrawer>{CHILDREN}</PersistentDrawer>,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expected = 1;
  instance.drawerFoundation = { open };

  instance.persistentDrawerOpen();
  const actual = open.mock.calls.length;

  expect(actual).toBe(expected);
});

test('<PersistentDrawer /> > Updates classNames when the component is mounted', () => {
  const CLASS_NAMES = 'CLASS_NAMES';
  const setState = jest.fn();
  const wrapper = shallow(
    <PersistentDrawer>{CHILDREN}</PersistentDrawer>,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expected = { classNames: CLASS_NAMES };
  instance.componentIsMounted = true;
  instance.setState = setState;

  instance.updateClassNames(CLASS_NAMES);
  const actual = setState.mock.calls[0][0];

  expect(actual).toEqual(expected);
});

test('<PersistentDrawer /> > Does not update classNames when the component is not mounted', () => {
  const setState = jest.fn();
  const wrapper = shallow(
    <PersistentDrawer>{CHILDREN}</PersistentDrawer>,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expected = 0;
  instance.componentIsMounted = false;
  instance.setState = setState;

  instance.updateClassNames();
  const actual = setState.mock.calls.length;

  expect(actual).toBe(expected);
});
