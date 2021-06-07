/**
 * @module CommonFunctions
 */


interface EventDataObject {
  target?: HTMLElement,
  originalTarget?: HTMLElement,
  classList?: DOMTokenList,
  composedPath?: () => Array<EventTarget>,
}

/**
 * Retrieves source HTMLElement from an event by tagName or css ClassName inspecting
 * event.composedPath(), event.target and event.originalTarget properties
 * @param  {Event|EventDataObject} Event Event from which to find source HTMLElement
 * @param  {string} elementAccessor Element tagName or .cssClassName of source element
 * @returns HTMLElement found in source event, null if no elements matched accessor parameter
 */
export const getSrcElementFromEvent = (e: Event | EventDataObject, elementAccessor: string): HTMLElement | null | undefined => {
  const byClass = elementAccessor.startsWith('.');
  let element;
  if (e.target) {
    // target.classList
    const target = (e.target as HTMLElement);
    if (byClass) {
      element = target.classList && target.classList.contains(elementAccessor.substring(1)) ? target : null;
    } else {
      element = target.tagName && target.tagName.toLowerCase() === elementAccessor ? target : null;
    }
  }

  if (!element && e.composedPath) {
    const path = e.composedPath() as Array<HTMLElement>;
    if (byClass) {
      element = path.filter(e => e.classList && e.classList.contains(elementAccessor.substring(1)))[0];
    } else {
      element = path.filter(e => e.tagName && e.tagName.toLowerCase() === elementAccessor)[0];
    }
  }

  if (!element && (e as EventDataObject).originalTarget) {
    const path: Array<HTMLElement> = [];
    let parent: HTMLElement | undefined = (e as EventDataObject).originalTarget;
    while (parent && parent !== this) {
      path.push(parent);
      parent = parent.parentNode as HTMLElement;
    }
    element = getSrcElementFromEvent({ composedPath: () => path }, elementAccessor);
  }

  if (!element && e.target) {
    const path: Array<HTMLElement> = [];
    let parent: any = e.target;
    while (parent && parent !== this) {
      path.push(parent);
      parent = parent.parentNode as HTMLElement;
    }
    element = getSrcElementFromEvent({ composedPath: () => path }, elementAccessor);
  }

  return element;
}

/**
 * @param  {string} queryData Query String parameters
 * @returns Object with parameters or nul if no query data was received
 */
export const getQueryParams = (queryData: string): Object | null => {
  return queryData
    ? queryData.split("&").reduce((result, param) => {
      const [key, value] = param.split("=");
      return { ...result, [key]: value !== undefined ? value : true }
    }, {})
    : null;
}

/**
 * Format the received Object into a URL query params String
 * @param  {any} params The Object contained the params to format
 * @returns String URL query params String
 */
export const getQueryParamsString = (params: any): String => {
  const queryParams = Object.keys(params).map(
    key => key + '=' + (
      params[key] === null || params[key] === undefined
        ? null
        : params[key].push || typeof params[key] === 'object'
          ? JSON.stringify(params[key])
          : params[key]
    )
  ).join('&');
  return queryParams;
}

/**
 * Get the position of a node in a list
 * @param  {Array<Node>} nodeList The Array<Node> list containing the object
 * @param  {Node} node The None for which is looking for position
 * @returns number with the position on the Node in the list, -1 if list does not contains the node
 */
export const getNodePosition = (nodeList: Array<Node>, node: Node): number => {
  let position = -1;
  nodeList.some((item, index) => (position = item === node ? index : position) !== -1);
  return position;
}

/**
 * Get the the parent node accesor which matches parentTag nodeName
 * @param  {Node} node Start node
 * @param  {string} parentTag tagName looking for
 * @returns The parent Node matching de tagName, null if no parent tagName found in DOM
 */
export const getParentNode = (node: Node, parentTag: string): Node | null => {
  let parent = node ? node.parentNode : node;
  const parentTagUpperCase = parentTag.toUpperCase();
  while (parent && parent.nodeName !== parentTagUpperCase && parent.parentNode) {
    parent = parent.parentNode;
  }
  return parent && parent.nodeName === parentTagUpperCase ? parent : null;
}

