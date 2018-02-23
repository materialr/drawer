import { FOCUSABLE_ELEMENTS } from '@material/drawer/slidable';
import {
  getTransformPropertyName,
  restoreElementTabState,
  saveElementTabState,
} from '@material/drawer/util';

import adapterUtilities from './adapter-utilities';

const adapterUtilitiesInstance = adapterUtilities();

const CLASS_NAME_1 = 'CLASS_NAME_1';
const CLASS_NAME_2 = 'CLASS_NAME_2';
const CSS_VARIABLE_2 = 'CSS_VARIABLE_2';
const CSS_VARIABLE_VALUE_2 = 'CSS_VARIABLE_VALUE_2';

test('\'addBodyClass()\' adds a class to the body element', () => {
  const CLASS_NAME = 'CLASS_NAME';
  const add = jest.fn();
  const element = { classList: { add } };
  const expected = CLASS_NAME;

  adapterUtilitiesInstance.addBodyClass(element)(CLASS_NAME);
  const actual = add.mock.calls[0][0];

  expect(actual).toBe(expected);
});

test('\'addClass()\' adds a className and sends the list to \'updateClassNames()\'', () => {
  const expectedFirst = [CLASS_NAME_1];
  const expectedSecond = [CLASS_NAME_1, CLASS_NAME_2];
  const updateClassNames = jest.fn();

  adapterUtilitiesInstance.addClass(updateClassNames)(CLASS_NAME_1);
  adapterUtilitiesInstance.addClass(updateClassNames)(CLASS_NAME_2);

  expect(updateClassNames.mock.calls[0][0]).toEqual(expectedFirst);
  expect(updateClassNames.mock.calls[1][0]).toEqual(expectedSecond);
});

test('\'deregisterInteractionHandler()\' removes an event listener from the element', () => {
  const HANDLER = 'HANDLER';
  const REMOVE_EVENT_LISTENER = jest.fn();
  const TYPE = 'TYPE';
  const element = { removeEventListener: REMOVE_EVENT_LISTENER };

  adapterUtilitiesInstance.deregisterInteractionHandler(element, TYPE)(HANDLER);

  expect(REMOVE_EVENT_LISTENER).toBeCalledWith(TYPE, HANDLER);
});

test('\'deregisterInteractionHandlerAny()\' removes an event listener from the element', () => {
  const HANDLER = 'HANDLER';
  const REMOVE_EVENT_LISTENER = jest.fn();
  const TYPE = 'TYPE';
  const element = { removeEventListener: REMOVE_EVENT_LISTENER };

  adapterUtilitiesInstance.deregisterInteractionHandlerAny(element)(TYPE, HANDLER);

  expect(REMOVE_EVENT_LISTENER).toBeCalledWith(TYPE, HANDLER);
});

test('\'eventTargetHasClass()\' returns whether the given element contains a className', () => {
  const CLASS_NAME = 'CLASS_NAME';
  const contains = jest.fn();
  const element = { classList: { contains } };
  const expected = CLASS_NAME;

  adapterUtilitiesInstance.eventTargetHasClass()(element, CLASS_NAME);
  const actual = contains.mock.calls[0][0];

  expect(actual).toBe(expected);
});

test('\'getDrawerWidth()\' returns the drawer\'s offsetWidth amount', () => {
  const OFFSET_WIDTH = 222;
  const elementDrawer = { offsetWidth: OFFSET_WIDTH };
  const expected = OFFSET_WIDTH;

  const actual = adapterUtilitiesInstance.getDrawerWidth(elementDrawer)();

  expect(actual).toBe(expected);
});

test('\'getFocusableElements()\' gets the list of elements for focus inside the drawer', () => {
  const querySelectorAll = jest.fn();
  const element = { querySelectorAll };
  const expected = FOCUSABLE_ELEMENTS;

  adapterUtilitiesInstance.getFocusableElements(element)();
  const actual = querySelectorAll.mock.calls[0][0];

  expect(actual).toBe(expected);
});

test('\'hasClass()\' returns whether the element has the given className', () => {
  const PROP_CLASS_NAME = 'PROP_CLASS_NAME';
  const checkClass = adapterUtilitiesInstance.hasClass([PROP_CLASS_NAME]);
  const expectedFirst = true;
  const expectedSecond = true;
  const expectedThird = false;

  const actualFirst = checkClass(CLASS_NAME_1);
  const actualSecond = checkClass(PROP_CLASS_NAME);
  const actualThird = checkClass('NONEXISTANT_CLASS');

  expect(actualFirst).toBe(expectedFirst);
  expect(actualSecond).toBe(expectedSecond);
  expect(actualThird).toBe(expectedThird);
});

test('\'hasNecessaryDom()\' returns true when the \'.nav-drawer__drawer\' element is present', () => {
  const DRAWER = 'DRAWER';
  const expected = true;

  const actual = adapterUtilitiesInstance.hasNecessaryDom(DRAWER)();

  expect(actual).toBe(expected);
});

test('\'isDrawer()\' returns true when a given element is the drawer element', () => {
  const DRAWER = 'DRAWER';
  const expected = true;

  const actual = adapterUtilitiesInstance.isDrawer(DRAWER)(DRAWER);

  expect(actual).toBe(expected);
});

test('\'isDrawer()\' returns false when a given element is not the drawer element', () => {
  const DRAWER = 'DRAWER';
  const NOT_DRAWER = 'NOT_DRAWER';
  const expected = false;

  const actual = adapterUtilitiesInstance.isDrawer(DRAWER)(NOT_DRAWER);

  expect(actual).toBe(expected);
});

test('\'isRtl()\' always returns false for now', () => {
  const expected = false;

  const actual = adapterUtilitiesInstance.isRtl()();

  expect(actual).toBe(expected);
});

test('\'makeElementUntabbable()\' makes it impossible to tab to the element', () => {
  const setAttribute = jest.fn();
  const element = { setAttribute };
  const expectedFirst = 'tabindex';
  const expectedSecond = -1;

  adapterUtilitiesInstance.makeElementUntabbable()(element);
  const mockValues = setAttribute.mock.calls[0];
  const actualFirst = mockValues[0];
  const actualSecond = mockValues[1];

  expect(actualFirst).toBe(expectedFirst);
  expect(actualSecond).toBe(expectedSecond);
});

test('\'notifyClose()\' calls the callback when the drawer is closed', () => {
  const onClose = jest.fn();
  const expected = 1;

  adapterUtilitiesInstance.notifyClose(onClose)();
  const actual = onClose.mock.calls.length;

  expect(actual).toBe(expected);
});

test('\'notifyOpen()\' calls the callback when the drawer is opened', () => {
  const onOpen = jest.fn();
  const expected = 1;

  adapterUtilitiesInstance.notifyOpen(onOpen)();
  const actual = onOpen.mock.calls.length;

  expect(actual).toBe(expected);
});

test('\'registerInteractionHandler()\' adds a non-passive interaction handler', () => {
  const ADD_EVENT_LISTENER = jest.fn();
  const HANDLER = 'HANDLER';
  const TYPE = 'TYPE';
  const element = { addEventListener: ADD_EVENT_LISTENER };

  adapterUtilitiesInstance.registerInteractionHandler(element, TYPE)(HANDLER);

  expect(ADD_EVENT_LISTENER).toBeCalledWith(TYPE, HANDLER, null);
});

test('\'registerInteractionHandler()\' adds a passive interaction handler', () => {
  const ADD_EVENT_LISTENER = jest.fn();
  const HANDLER = 'HANDLER';
  const TYPE = 'touchstart';
  const element = { addEventListener: ADD_EVENT_LISTENER };

  adapterUtilitiesInstance.registerInteractionHandler(element, TYPE)(HANDLER);

  expect(ADD_EVENT_LISTENER).toBeCalledWith(TYPE, HANDLER, { passive: true });
});

test('\'registerInteractionHandlerAny()\' adds a non-passive interaction handler', () => {
  const ADD_EVENT_LISTENER = jest.fn();
  const HANDLER = 'HANDLER';
  const TYPE = 'TYPE';
  const element = { addEventListener: ADD_EVENT_LISTENER };

  adapterUtilitiesInstance.registerInteractionHandlerAny(element)(TYPE, HANDLER);

  expect(ADD_EVENT_LISTENER).toBeCalledWith(TYPE, HANDLER, null);
});

test('\'registerInteractionHandlerAny()\' adds a passive interaction handler', () => {
  const ADD_EVENT_LISTENER = jest.fn();
  const HANDLER = 'HANDLER';
  const TYPE = 'touchstart';
  const element = { addEventListener: ADD_EVENT_LISTENER };

  adapterUtilitiesInstance.registerInteractionHandlerAny(element)(TYPE, HANDLER);

  expect(ADD_EVENT_LISTENER).toBeCalledWith(TYPE, HANDLER, { passive: true });
});

test('\'removeBodyClass()\' removes a class from the body element', () => {
  const CLASS_NAME = 'CLASS_NAME';
  const remove = jest.fn();
  const element = { classList: { remove } };
  const expected = CLASS_NAME;

  adapterUtilitiesInstance.removeBodyClass(element)(CLASS_NAME);
  const actual = remove.mock.calls[0][0];

  expect(actual).toBe(expected);
});

test('\'removeClass()\' removes a classNames and sends the list of classNames to \'updateClassNames()\'', () => {
  const expectedFirst = [CLASS_NAME_1];
  const expectedSecond = [];
  const updateClassNames = jest.fn();

  adapterUtilitiesInstance.removeClass(updateClassNames)(CLASS_NAME_2);
  adapterUtilitiesInstance.removeClass(updateClassNames)(CLASS_NAME_1);

  expect(updateClassNames.mock.calls[0][0]).toEqual(expectedFirst);
  expect(updateClassNames.mock.calls[1][0]).toEqual(expectedSecond);
});

// This test is junk, just didn't want to pass in util.restoreElementTabState (curied) _just_ for
// the sake of testing, as that means the foundation then needs to know about it.
// `util.restoreElementTabState` is also already tested on it's own
test('\'restoreElementTabState()\' restores the tab state of the element', () => {
  const ELEMENT = { hasAttribute: () => {}, setAttribute: () => {} };
  const expected = restoreElementTabState(ELEMENT);

  const actual = adapterUtilitiesInstance.restoreElementTabState()(ELEMENT);

  expect(actual).toBe(expected);
});

// This test is junk, just didn't want to pass in util.saveElementTabState (curied) _just_ for the
// sake of testing, as that means the foundation then needs to know about it.
// `util.saveElementTabState` is also already tested on it's own
test('\'saveElementTabState()\' saves the tab state of the element', () => {
  const ELEMENT = { hasAttribute: () => {}, setAttribute: () => {} };
  const expected = saveElementTabState(ELEMENT);

  const actual = adapterUtilitiesInstance.saveElementTabState()(ELEMENT);

  expect(actual).toBe(expected);
});

test('\'setTranslateX() sets a null translate property on the drawer element', () => {
  const setProperty = jest.fn();
  const element = { style: { setProperty } };
  const expectedFirst = getTransformPropertyName();
  const expectedSecond = null;

  adapterUtilitiesInstance.setTranslateX(element)(null);
  const mockValues = setProperty.mock.calls[0];
  const actualFirst = mockValues[0];
  const actualSecond = mockValues[1];

  expect(actualFirst).toBe(expectedFirst);
  expect(actualSecond).toBe(expectedSecond);
});

test('\'setTranslateX() sets a translate property on the drawer element', () => {
  const setProperty = jest.fn();
  const element = { style: { setProperty } };
  const VALUE = 'VALUE';
  const expectedFirst = getTransformPropertyName();
  const expectedSecond = `translateX(${VALUE}px)`;

  adapterUtilitiesInstance.setTranslateX(element)(VALUE);
  const mockValues = setProperty.mock.calls[0];
  const actualFirst = mockValues[0];
  const actualSecond = mockValues[1];

  expect(actualFirst).toBe(expectedFirst);
  expect(actualSecond).toBe(expectedSecond);
});

test('\'updateCssVariable()\' adds a css variable', () => {
  const CSS_VARIABLE_1 = 'CSS_VARIABLE_1';
  const CSS_VARIABLE_VALUE_1 = 'CSS_VARIABLE_VALUE_1';
  const updateCssVariables = jest.fn();
  const expectedFirst = { [CSS_VARIABLE_1]: CSS_VARIABLE_VALUE_1 };
  const expectedSecond = {
    [CSS_VARIABLE_1]: CSS_VARIABLE_VALUE_1,
    [CSS_VARIABLE_2]: CSS_VARIABLE_VALUE_2,
  };

  adapterUtilitiesInstance.updateCssVariable(updateCssVariables)(
    CSS_VARIABLE_1,
    CSS_VARIABLE_VALUE_1,
  );
  adapterUtilitiesInstance.updateCssVariable(updateCssVariables)(
    CSS_VARIABLE_2,
    CSS_VARIABLE_VALUE_2,
  );

  expect(updateCssVariables.mock.calls[0][0]).toEqual(expectedFirst);
  expect(updateCssVariables.mock.calls[1][0]).toEqual(expectedSecond);
});

test('\'updateCssVariable()\' changes a css variable', () => {
  const CSS_VARIABLE_1 = 'CSS_VARIABLE_1';
  const CSS_VARIABLE_VALUE_1_NEW = 'CSS_VARIABLE_VALUE_1_NEW';
  const updateCssVariables = jest.fn();
  const expected = {
    [CSS_VARIABLE_1]: CSS_VARIABLE_VALUE_1_NEW,
    [CSS_VARIABLE_2]: CSS_VARIABLE_VALUE_2,
  };

  adapterUtilitiesInstance.updateCssVariable(updateCssVariables)(
    CSS_VARIABLE_1,
    CSS_VARIABLE_VALUE_1_NEW,
  );

  expect(updateCssVariables).toBeCalledWith(expected);
});
