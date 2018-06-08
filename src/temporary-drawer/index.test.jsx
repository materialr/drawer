import * as temporaryDrawer from '@material/drawer/temporary';
import { strings } from '@material/drawer/temporary/constants';
import { mount, shallow } from 'enzyme';
import React from 'react';

import TemporaryDrawer from './index';

const CHILDREN = <p>CHILDREN</p>;

test('Renders the default classNames', () => {
  const wrapper = shallow(
    <TemporaryDrawer>{CHILDREN}</TemporaryDrawer>,
    { disableLifecycleMethods: true },
  );
  const expected = 'mdc-drawer mdc-drawer--temporary mdc-typography';

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('Renders additional classnames from the \'className\' prop', () => {
  const CLASS_NAME = 'CLASS_NAME';
  const wrapper = shallow(
    <TemporaryDrawer className={CLASS_NAME}>{CHILDREN}</TemporaryDrawer>,
    { disableLifecycleMethods: true },
  );
  const expected = `mdc-drawer mdc-drawer--temporary mdc-typography ${CLASS_NAME}`;

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('Passes through all the necessary props', () => {
  const wrapper = shallow(
    <TemporaryDrawer>{CHILDREN}</TemporaryDrawer>,
    { disableLifecycleMethods: true },
  );
  const expected = CHILDREN;

  const actual = wrapper.find('nav').props().children;

  expect(actual).toBe(expected);
});

test('Creates the MDCTemporaryDrawer component on mount', () => {
  const OPEN = true;
  const implementation = { open: undefined };
  const MDCTemporaryDrawer = jest.fn();
  MDCTemporaryDrawer.mockImplementation(() => implementation);
  temporaryDrawer.MDCTemporaryDrawer = MDCTemporaryDrawer;
  const wrapper = mount(<TemporaryDrawer open={OPEN}>{CHILDREN}</TemporaryDrawer>);
  const instance = wrapper.instance();
  const expectedMDCTemporaryDrawer = instance.elementRoot;
  const expectedOpen = OPEN;

  const actualMDCTemporaryDrawer = MDCTemporaryDrawer.mock.calls[0][0];
  const actualOpen = implementation.open;

  expect(actualMDCTemporaryDrawer).toBe(expectedMDCTemporaryDrawer);
  expect(actualOpen).toBe(expectedOpen);
});

test('Destroys the MDCTemporaryDrawer component on unmount', () => {
  const destroy = jest.fn();
  const wrapper = mount(<TemporaryDrawer>{CHILDREN}</TemporaryDrawer>);
  const instance = wrapper.instance();
  const expected = 1;
  instance.temporaryDrawer.destroy = destroy;

  wrapper.unmount();
  const actual = destroy.mock.calls.length;

  expect(actual).toBe(expected);
});

test('Adds event listeners when the component mounts', () => {
  const ON_CLOSE = () => 'ON_CLOSE';
  const ON_OPEN = () => 'ON_OPEN';
  const listen = jest.fn();
  const MDCTemporaryDrawer = jest.fn();
  MDCTemporaryDrawer.mockImplementation(() => ({ listen }));
  temporaryDrawer.MDCTemporaryDrawer = MDCTemporaryDrawer;
  mount(<TemporaryDrawer onClose={ON_CLOSE} onOpen={ON_OPEN}>{CHILDREN}</TemporaryDrawer>);
  const expectedOnCloseOne = strings.CLOSE_EVENT;
  const expectedOnCloseTwo = ON_CLOSE;
  const expectedOnOpenOne = strings.OPEN_EVENT;
  const expectedOnOpenTwo = ON_OPEN;

  const mockOnCloseCall = listen.mock.calls[0];
  const actualOnCloseOne = mockOnCloseCall[0];
  const actualOnCloseTwo = mockOnCloseCall[1];
  const mockOnOpenCall = listen.mock.calls[1];
  const actualOnOpenOne = mockOnOpenCall[0];
  const actualOnOpenTwo = mockOnOpenCall[1];

  expect(actualOnCloseOne).toBe(expectedOnCloseOne);
  expect(actualOnCloseTwo).toBe(expectedOnCloseTwo);
  expect(actualOnOpenOne).toBe(expectedOnOpenOne);
  expect(actualOnOpenTwo).toBe(expectedOnOpenTwo);
});

test('Removes event listeners when the component mounts', () => {
  const ON_CLOSE = () => 'ON_CLOSE';
  const ON_OPEN = () => 'ON_OPEN';
  const destroy = () => {};
  const listen = () => {};
  const unlisten = jest.fn();
  const MDCTemporaryDrawer = jest.fn();
  MDCTemporaryDrawer.mockImplementation(() => ({ destroy, listen, unlisten }));
  temporaryDrawer.MDCTemporaryDrawer = MDCTemporaryDrawer;
  const wrapper = mount(
    <TemporaryDrawer onClose={ON_CLOSE} onOpen={ON_OPEN}>{CHILDREN}</TemporaryDrawer>,
  );
  const expectedOnCloseOne = strings.CLOSE_EVENT;
  const expectedOnCloseTwo = ON_CLOSE;
  const expectedOnOpenOne = strings.OPEN_EVENT;
  const expectedOnOpenTwo = ON_OPEN;

  wrapper.unmount();
  const mockOnCloseCall = unlisten.mock.calls[0];
  const actualOnCloseOne = mockOnCloseCall[0];
  const actualOnCloseTwo = mockOnCloseCall[1];
  const mockOnOpenCall = unlisten.mock.calls[1];
  const actualOnOpenOne = mockOnOpenCall[0];
  const actualOnOpenTwo = mockOnOpenCall[1];

  expect(actualOnCloseOne).toBe(expectedOnCloseOne);
  expect(actualOnCloseTwo).toBe(expectedOnCloseTwo);
  expect(actualOnOpenOne).toBe(expectedOnOpenOne);
  expect(actualOnOpenTwo).toBe(expectedOnOpenTwo);
});

test('Opens/Closes the drawer when the \'open\' prop changes', () => {
  const OPEN = true;
  const listen = () => {};
  const implementation = { listen, open: undefined };
  const MDCTemporaryDrawer = jest.fn();
  MDCTemporaryDrawer.mockImplementation(() => implementation);
  temporaryDrawer.MDCTemporaryDrawer = MDCTemporaryDrawer;
  const wrapper = mount(<TemporaryDrawer>{CHILDREN}</TemporaryDrawer>);
  const expected = OPEN;

  wrapper.setProps({ open: OPEN });
  const actual = implementation.open;

  expect(actual).toBe(expected);
});

test('Does not open/close the drawer when the \'open\' prop doesn\'t change', () => {
  const OPEN = true;
  const listen = () => {};
  const implementation = { listen, open: OPEN };
  const MDCTemporaryDrawer = jest.fn();
  MDCTemporaryDrawer.mockImplementation(() => implementation);
  temporaryDrawer.MDCTemporaryDrawer = MDCTemporaryDrawer;
  const wrapper = mount(<TemporaryDrawer open={OPEN}>{CHILDREN}</TemporaryDrawer>);
  const expected = OPEN;

  wrapper.setProps({ open: OPEN });
  const actual = implementation.open;

  expect(actual).toBe(expected);
});

test('Passes through additional props', () => {
  const DATA_QA = 'DATA_QA';
  const wrapper = shallow(
    <TemporaryDrawer data-qa={DATA_QA}>{CHILDREN}</TemporaryDrawer>,
    { disableLifecycleMethods: true },
  );
  const expected = DATA_QA;

  const actual = wrapper.props()['data-qa'];

  expect(actual).toBe(expected);
});
