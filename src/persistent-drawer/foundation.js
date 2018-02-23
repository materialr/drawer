import { MDCPersistentDrawerFoundation } from '@material/drawer';

import adapterUtilities from '../adapter-utilities';

export default ({
  elementDrawer,
  elementRoot,
  onClose,
  onOpen,
  propClassNames,
  updateClassNames,
}) => {
  const {
    addClass,
    deregisterInteractionHandler,
    deregisterInteractionHandlerAny,
    getDrawerWidth,
    getFocusableElements,
    hasClass,
    hasNecessaryDom,
    isDrawer,
    isRtl,
    makeElementUntabbable,
    notifyClose,
    notifyOpen,
    registerInteractionHandler,
    registerInteractionHandlerAny,
    removeClass,
    restoreElementTabState,
    saveElementTabState,
    setTranslateX,
  } = adapterUtilities();
  return new MDCPersistentDrawerFoundation({
    addClass: addClass(updateClassNames),
    deregisterDocumentKeydownHandler: deregisterInteractionHandler(document, 'keydown'),
    deregisterDrawerInteractionHandler: deregisterInteractionHandlerAny(elementDrawer),
    deregisterInteractionHandler: deregisterInteractionHandlerAny(elementRoot),
    deregisterTransitionEndHandler: deregisterInteractionHandler(elementRoot, 'transitionend'),
    getDrawerWidth: getDrawerWidth(elementDrawer),
    getFocusableElements: getFocusableElements(elementDrawer),
    hasClass: hasClass(propClassNames),
    hasNecessaryDom: hasNecessaryDom(elementDrawer),
    isDrawer: isDrawer(elementDrawer),
    isRtl: isRtl(),
    makeElementUntabbable: makeElementUntabbable(),
    notifyClose: notifyClose(onClose),
    notifyOpen: notifyOpen(onOpen),
    registerDocumentKeydownHandler: registerInteractionHandler(document, 'keydown'),
    registerDrawerInteractionHandler: registerInteractionHandlerAny(elementDrawer),
    registerInteractionHandler: registerInteractionHandlerAny(elementRoot),
    registerTransitionEndHandler: registerInteractionHandler(elementRoot, 'transitionend'),
    removeClass: removeClass(updateClassNames),
    restoreElementTabState: restoreElementTabState(),
    saveElementTabState: saveElementTabState(),
    setTranslateX: setTranslateX(elementDrawer),
  });
};
