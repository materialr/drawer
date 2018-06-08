import { shallow } from 'enzyme';
import React from 'react';

import ToolbarSpacer from './toolbar-spacer';

test('Renders the default classNames', () => {
  const wrapper = shallow(<ToolbarSpacer />, { disableLifecycleMethods: true });
  const expected = 'mdc-drawer__toolbar-spacer';

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('Renders additional classNames from the \'className\' prop', () => {
  const CLASS_NAME = 'CLASS_NAME';
  const wrapper = shallow(
    <ToolbarSpacer className={CLASS_NAME} />,
    { disableLifecycleMethods: true },
  );
  const expected = `mdc-drawer__toolbar-spacer ${CLASS_NAME}`;

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('Passes through all necessary props', () => {
  const CHILDREN = <p>CHILDREN</p>;
  const wrapper = shallow(
    <ToolbarSpacer>{CHILDREN}</ToolbarSpacer>,
    { disableLifecycleMethods: true },
  );
  const expected = CHILDREN;

  const actual = wrapper.props().children;

  expect(actual).toBe(expected);
});

test('Passes through additional props', () => {
  const DATA_QA = 'DATA_QA';
  const wrapper = shallow(<ToolbarSpacer data-qa={DATA_QA} />, { disableLifecycleMethods: true });
  const expected = DATA_QA;

  const actual = wrapper.props()['data-qa'];

  expect(actual).toBe(expected);
});
