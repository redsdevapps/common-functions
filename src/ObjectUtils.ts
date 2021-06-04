export const is = (Type: Function, val: any) => {

  return val != null
    ? Type !== Object
      ? val.constructor === Type || val instanceof Type
      : "[[function]],[[string]],[[number]]".indexOf(`[[${typeof val}]]`) === -1 && !val.map && !val.getTime
    : false;
}

export const isFunction = (val: any) => is(Function, val);
export const isString = (val: any) => is(String, val);
export const isObject = (val: any) => is(Object, val);
export const isArray = (val: any) => is(Array, val);
export const isDate = (val: any) => is(Date, val);
export const isNumber = (val: any) => is(Number, val);
export const isNill = (val: any) => val === null || val === undefined;
export const isEmpty = (val: any) => isNill(val) || (isArray(val) && !val.length) || (isObject(val) && !Object.keys(val).length) || (isString(val) && !val.trim());

export const getPathValue = (from: object, path: string, defaultValue: any = '') =>
  path.split('.')
    .reduce((current: any, attr) =>
      isNill(current) || isNill(current[attr])
        ? defaultValue
        : current[attr]
      , from);

export const setPathValue = (parent: object, path: string, value: any) => {
  if (isNill(parent) || !isObject(parent) || !path) {
    return parent;
  }

  let to: any = parent;
  path.split('.').forEach(
    (attr, index, atts) => {
      if (index === atts.length - 1) {
        to[attr] = value;
      } else if (to[attr]) {
        to = to[attr]
      } else if (/^[0-9]+$/.test(atts[index + 1])) {
        to = to[attr] = [];
      } else {
        to = to[attr] = {};
      }
    }
  )
  return parent;
};

export const reduceObjectProperties = (object: any, prefix = ''): object => {
  return Object.keys(object).reduce((result, key) => {
    const value = object[key];
    if (isObject(value)) {
      return { ...result, ...reduceObjectProperties(value, `${prefix}${key}.`) }
    } else {
      return { ...result, [`${prefix}${key}`]: value };
    }
  }, {})
}

export const mapObject = (obj: object | Array<any>, fn: Function): object => {
  const objIsArray = isArray(obj);
  return obj ? Object.entries(obj).reduce((result: any, [key, value]) => {
    const mapValue = fn(value);
    if (isArray(mapValue) || isObject(mapValue)) {
      result[key] = mapObject(mapValue, fn);
    } else if (undefined !== mapValue) {
      result[key] = mapValue
    }
    // console.log('mapValue', mapValue, 'key', key, 'result', result);
    return result;
  }, objIsArray ? [] : {}) : obj;
};

export const map = (obj: Array<any> | object, fn: (item: any) => any) => fn ?
  mapObject(obj, fn)
  : obj;

export const stringProjection = (src: object, value: string, avoidEmptyValues = false) => {
  // console.log('projectString', src, value);
  const keys = value.split(/(\$?\{.+?\})/);
  // console.log(keys);
  return keys.reduce((result, key) => {
    // console.log('projection key', key, /^\$?\{.+?\}$/.test(key));
    const value = /^\$?\{.+?\}$/.test(key) ? getPathValue(src, key.replace(/^\$?\{|\}$/g, '')) : key;
    // console.log('projection value', value);
    return result + (!isEmpty(value) || !avoidEmptyValues ? value : key);
  });
}

export const projection = (src: Array<any> | object, descriptor: object, avoidEmptyValues = false) => {
  return map(descriptor, (value) => {
    // console.log('value', value);
    const res: any = avoidEmptyValues && isEmpty(value)
      ? undefined
      : isFunction(value)
        ? value(src)
        : isObject(value)
          ? projection(src, value, avoidEmptyValues)
          : isString(value)
            ? stringProjection(src, value, avoidEmptyValues)
            : value;
    // console.log('projection result', res);
    return res;
  });
};

export const deepEquals = (a: any, b: any): boolean => {
  const ta = typeof a, tb = typeof b;
  return a && b && ta === tb && (isArray(a) || isObject(a))
    ? Object.keys(a).length === Object.keys(b).length && Object.keys(a).every(key => deepEquals(a[key], b[key]))
    : (a === b);
}

export const includes = (a: any, b: any): boolean => {
  const ta = typeof a, tb = typeof b;
  return a && b && ta === tb && (isArray(a) || isObject(a))
    ? Object.keys(a).length >= Object.keys(b).length && Object.keys(b).every(key => deepEquals(a[key], b[key]))
    : (a === b);
}