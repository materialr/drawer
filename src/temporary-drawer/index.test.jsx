import { mount, shallow } from 'enzyme';
import React from 'react';

import TemporaryDrawer from './index';
import drawerFoundation from './foundation';

const CHILDREN = 'CHILDREN';

test('<TemporaryDrawer /> > Adds default classNames', () => {
  const wrapper = shallow(
    <TemporaryDrawer>{CHILDREN}</TemporaryDrawer>,
    { disableLifecycleMethods: true },
  );
  const expected = 'mdc-drawer mdc-drawer--temporary mdc-typography';

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('<TemporaryDrawer /> > Adds extra classNames', () => {
  const CLASS_NAME = 'CLASS_NAME';
  const wrapper = shallow(
    <TemporaryDrawer className={CLASS_NAME}>{CHILDREN}</TemporaryDrawer>,
    { disableLifecycleMethods: true },
  );
  const expected = `mdc-drawer mdc-drawer--temporary mdc-typography ${CLASS_NAME}`;

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('<TemporaryDrawer /> > Creates the foundation on mount', () => {
  const persistentDrawerCreate = jest.fn();
  const persistentDrawerOpen = jest.fn();
  const wrapper = shallow(
    <TemporaryDrawer>{CHILDREN}</TemporaryDrawer>,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expectedTemporaryDrawerCreate = 1;
  const expectedTemporaryDrawerOpen = 0;
  instance.persistentDrawerCreate = persistentDrawerCreate;
  instance.persistentDrawerOpen = persistentDrawerOpen;

  instance.componentDidMount();
  const actualTemporaryDrawerCreate = persistentDrawerCreate.mock.calls.length;
  const actualTemporaryDrawerOpen = persistentDrawerOpen.mock.calls.length;

  expect(actualTemporaryDrawerCreate).toBe(expectedTemporaryDrawerCreate);
  expect(actualTemporaryDrawerOpen).toBe(expectedTemporaryDrawerOpen);
});

test('<TemporaryDrawer /> > Opens the drawer on mount if set to', () => {
  const persistentDrawerOpen = jest.fn();
  const wrapper = shallow(
    <TemporaryDrawer isOpen>{CHILDREN}</TemporaryDrawer>,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expectedTemporaryDrawerOpen = 1;
  instance.persistentDrawerCreate = () => 'persistentDrawerCreate';
  instance.persistentDrawerOpen = persistentDrawerOpen;

  instance.componentDidMount();
  const actualTemporaryDrawerOpen = persistentDrawerOpen.mock.calls.length;

  expect(actualTemporaryDrawerOpen).toBe(expectedTemporaryDrawerOpen);
});

test('<TemporaryDrawer /> > Opens the drawer when the prop changes', () => {
  const persistentDrawerOpen = jest.fn();
  const wrapper = shallow(
    <TemporaryDrawer>{CHILDREN}</TemporaryDrawer>,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expectedTemporaryDrawerOpen = 1;
  instance.persistentDrawerOpen = persistentDrawerOpen;

  instance.componentWillReceiveProps({ isOpen: true });
  const actualTemporaryDrawerOpen = persistentDrawerOpen.mock.calls.length;

  expect(actualTemporaryDrawerOpen).toBe(expectedTemporaryDrawerOpen);
});

test('<TemporaryDrawer /> > Closes the drawer when the prop changes', () => {
  const isOpen = jest.fn();
  const persistentDrawerClose = jest.fn();
  const wrapper = shallow(
    <TemporaryDrawer isOpen>{CHILDREN}</TemporaryDrawer>,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expectedTemporaryDrawerClose = 1;
  instance.persistentDrawerClose = persistentDrawerClose;
  instance.drawerFoundation = { isOpen };
  isOpen.mockReturnValue = true;

  instance.componentWillReceiveProps({ isOpen: false });
  const actualTemporaryDrawerClose = persistentDrawerClose.mock.calls.length;

  expect(actualTemporaryDrawerClose).toBe(expectedTemporaryDrawerClose);
});

test('<TemporaryDrawer /> > Destroys the drawer on unmount', () => {
  const persistentDrawerDestroy = jest.fn();
  const wrapper = shallow(
    <TemporaryDrawer>{CHILDREN}</TemporaryDrawer>,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expectedTemporaryDrawerDestroy = 1;
  instance.persistentDrawerDestroy = persistentDrawerDestroy;

  instance.componentWillUnmount();
  const actualTemporaryDrawerDestroy = persistentDrawerDestroy.mock.calls.length;

  expect(actualTemporaryDrawerDestroy).toBe(expectedTemporaryDrawerDestroy);
});

test('<TemporaryDrawer /> > getOnClose() returns the onClose property', () => {
  const ON_CLOSE = () => 'ON_CLOSE';
  const wrapper = shallow(
    <TemporaryDrawer onClose={ON_CLOSE}>{CHILDREN}</TemporaryDrawer>,
    { disableLifecycleMethods: true },
  );
  const expected = ON_CLOSE;

  const actual = wrapper.instance().getOnClose();

  expect(actual).toBe(expected);
});

test('<TemporaryDrawer /> > getOnClose() returns a default empty method', () => {
  const wrapper = shallow(
    <TemporaryDrawer>{CHILDREN}</TemporaryDrawer>,
    { disableLifecycleMethods: true },
  );
  const expected = () => {};

  const actual = wrapper.instance().getOnClose();
  actual();

  expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
});

test('<TemporaryDrawer /> > getOnOpen() returns the onOpen property', () => {
  const ON_OPEN = () => 'ON_OPEN';
  const wrapper = shallow(
    <TemporaryDrawer onOpen={ON_OPEN}>{CHILDREN}</TemporaryDrawer>,
    { disableLifecycleMethods: true },
  );
  const expected = ON_OPEN;

  const actual = wrapper.instance().getOnOpen();

  expect(actual).toBe(expected);
});

test('<TemporaryDrawer /> > getOnOpen() returns a default empty method', () => {
  const wrapper = shallow(
    <TemporaryDrawer>{CHILDREN}</TemporaryDrawer>,
    { disableLifecycleMethods: true },
  );
  const expected = () => {};

  const actual = wrapper.instance().getOnOpen();
  actual();

  expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
});

test('<TemporaryDrawer /> > Closes the drawer', () => {
  const close = jest.fn();
  const wrapper = shallow(
    <TemporaryDrawer>{CHILDREN}</TemporaryDrawer>,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expected = 1;
  instance.drawerFoundation = { close };

  instance.persistentDrawerClose();
  const actual = close.mock.calls.length;

  expect(actual).toBe(expected);
});

test('<TemporaryDrawer /> > Creates the foundation', () => {
  const wrapper = mount(<TemporaryDrawer>{CHILDREN}</TemporaryDrawer>);
  const instance = wrapper.instance();
  const { elementDrawer, elementRoot, getOnClose, getOnOpen } = instance;
  const expected = drawerFoundation({
    elementDrawer,
    elementRoot,
    onClose: getOnClose(),
    onOpen: getOnOpen(),
    propClassNames: instance.getClassNamesFromProps().split(' '),
    updateClassNames: instance.updateClassNames,
    updateCssVariables: instance.updateCssVariables,
  });
  expected.init();

  const actual = instance.drawerFoundation;

  expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
});

test('<TemporaryDrawer /> > Destroys the drawer', () => {
  const destroy = jest.fn();
  const wrapper = shallow(
    <TemporaryDrawer>{CHILDREN}</TemporaryDrawer>,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expected = 1;
  instance.drawerFoundation = { destroy };

  instance.persistentDrawerDestroy();
  const actual = destroy.mock.calls.length;

  expect(actual).toBe(expected);
});

test('<TemporaryDrawer /> > Opens the drawer', () => {
  const open = jest.fn();
  const wrapper = shallow(
    <TemporaryDrawer>{CHILDREN}</TemporaryDrawer>,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expected = 1;
  instance.drawerFoundation = { open };

  instance.persistentDrawerOpen();
  const actual = open.mock.calls.length;

  expect(actual).toBe(expected);
});

test('<TemporaryDrawer /> > Updates classNames when the component is mounted', () => {
  const CLASS_NAMES = 'CLASS_NAMES';
  const setState = jest.fn();
  const wrapper = shallow(
    <TemporaryDrawer>{CHILDREN}</TemporaryDrawer>,
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

test('<TemporaryDrawer /> > Does not update classNames when the component is not mounted', () => {
  const setState = jest.fn();
  const wrapper = shallow(
    <TemporaryDrawer>{CHILDREN}</TemporaryDrawer>,
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


test('<TemporaryDrawer /> > Updates cssVariables when the component is mounted', () => {
  const CSS_VARIABLES = 'CSS_VARIABLES';
  const setState = jest.fn();
  const wrapper = shallow(
    <TemporaryDrawer>{CHILDREN}</TemporaryDrawer>,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expected = { cssVariables: CSS_VARIABLES };
  instance.componentIsMounted = true;
  instance.setState = setState;

  instance.updateCssVariables(CSS_VARIABLES);
  const actual = setState.mock.calls[0][0];

  expect(actual).toEqual(expected);
});

test('<TemporaryDrawer /> > Does not update cssVariables when the component is not mounted', () => {
  const setState = jest.fn();
  const wrapper = shallow(
    <TemporaryDrawer>{CHILDREN}</TemporaryDrawer>,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expected = 0;
  instance.componentIsMounted = false;
  instance.setState = setState;

  instance.updateCssVariables();
  const actual = setState.mock.calls.length;

  expect(actual).toBe(expected);
});
