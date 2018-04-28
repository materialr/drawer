import { shallow } from 'enzyme';
import React from 'react';

import Header from './header';

test('Renders the default classNames', () => {
  const wrapper = shallow(<Header />, { disableLifecycleMethods: true });
  const expected = 'mdc-drawer__header';

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('Renders additional classNames from the \'className\' prop', () => {
  const CLASS_NAME = 'CLASS_NAME';
  const wrapper = shallow(<Header className={CLASS_NAME} />, { disableLifecycleMethods: true });
  const expected = `mdc-drawer__header ${CLASS_NAME}`;

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('Passes through all necessary props', () => {
  const CHILDREN = <p>CHILDREN</p>;
  const wrapper = shallow(<Header>{CHILDREN}</Header>, { disableLifecycleMethods: true });
  const expected = CHILDREN;

  const actual = wrapper.find('.mdc-drawer__header-content').props().children;

  expect(actual).toBe(expected);
});
