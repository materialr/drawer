import { shallow } from 'enzyme';
import React from 'react';

import PermanentDrawer from './index';

const CHILDREN = 'CHILDREN';

test('<PermanentDrawer /> > Adds default classNames', () => {
  const wrapper = shallow(
    <PermanentDrawer>{CHILDREN}</PermanentDrawer>,
    { disableLifecycleMethods: true },
  );
  const expected = 'mdc-drawer mdc-drawer--permanent mdc-typography';

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('<PermanentDrawer /> > Adds extra classNames', () => {
  const CLASS_NAME = 'CLASS_NAME';
  const wrapper = shallow(
    <PermanentDrawer className={CLASS_NAME}>{CHILDREN}</PermanentDrawer>,
    { disableLifecycleMethods: true },
  );
  const expected = `mdc-drawer mdc-drawer--permanent mdc-typography ${CLASS_NAME}`;

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('<PermanentDrawer /> > Renders children as a child', () => {
  const wrapper = shallow(
    <PermanentDrawer>{CHILDREN}</PermanentDrawer>,
    { disableLifecycleMethods: true },
  );
  const expected = CHILDREN;

  const actual = wrapper.find('.mdc-drawer__content').props().children;

  expect(actual).toBe(expected);
});

test('<PermanentDrawer /> > Passes through additional props', () => {
  const DATA_QA = 'DATA_QA';
  const wrapper = shallow(
    <PermanentDrawer data-qa={DATA_QA}>{CHILDREN}</PermanentDrawer>,
    { disableLifecycleMethods: true },
  );
  const expected = DATA_QA;

  const actual = wrapper.props()['data-qa'];

  expect(actual).toBe(expected);
});
