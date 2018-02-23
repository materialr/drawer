import { FOCUSABLE_ELEMENTS } from '@material/drawer/slidable';
import {
  getTransformPropertyName,
  restoreElementTabState,
  saveElementTabState,
} from '@material/drawer/util';

const PASSIVE_EVENT_LISTENERS = ['touchstart'];

const deregisterInteractionHandler = (element, type) => handler =>
  element.removeEventListener(type, handler);

const registerInteractionHandler = (element, type) => handler =>
  element.addEventListener(
    type,
    handler,
    PASSIVE_EVENT_LISTENERS.includes(type) ? { passive: true } : null,
  );

export default () => {
  let classNames = [];
  let cssVariables = {};

  return {
    addBodyClass: element => className => element.classList.add(className),
    addClass: updateClassNames => (className) => {
      classNames = [...classNames, className];
      updateClassNames(classNames);
    },
    deregisterInteractionHandler,
    deregisterInteractionHandlerAny: element => (type, handler) =>
      deregisterInteractionHandler(element, type)(handler),
    eventTargetHasClass: () => (element, className) => element.classList.contains(className),
    getDrawerWidth: elementDrawer => () => elementDrawer.offsetWidth,
    getFocusableElements: elementDrawer => () => elementDrawer.querySelectorAll(FOCUSABLE_ELEMENTS),
    hasClass: propClassNames => className =>
      [...classNames, ...propClassNames].includes(className),
    hasNecessaryDom: elementDrawer => () => !!elementDrawer,
    isDrawer: elementDrawer => element => element === elementDrawer,
    isRtl: () => () => false,
    makeElementUntabbable: () => element => element.setAttribute('tabindex', -1),
    notifyClose: onClose => onClose,
    notifyOpen: onOpen => onOpen,
    registerInteractionHandler,
    registerInteractionHandlerAny: element => (type, handler) =>
      registerInteractionHandler(element, type)(handler),
    removeBodyClass: element => className => element.classList.remove(className),
    removeClass: updateClassNames => (className) => {
      classNames = classNames.filter(currentClassName => currentClassName !== className);
      updateClassNames(classNames);
    },
    restoreElementTabState: () => element => restoreElementTabState(element),
    saveElementTabState: () => element => saveElementTabState(element),
    setTranslateX: elementDrawer => value =>
      elementDrawer.style.setProperty(
        getTransformPropertyName(),
        value === null ? null : `translateX(${value}px)`,
      ),
    updateCssVariable: updateCssVariables => (variable, value) => {
      cssVariables = { ...cssVariables, [variable]: value };
      updateCssVariables(cssVariables);
    },
  };
};
