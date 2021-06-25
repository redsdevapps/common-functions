/**
 * @module ObjectUtils
 */

/**
 * Validate if Value val is intance of Type.
 * @param  {Function} Type Contructor to validate instance relation.
 * @param  {any} val Value to validate if is instance of Type Function.
 * @returns boolean true if value is instace of Type, false otherwise.
 */
export const is = (Type: Function, val: any): boolean => {
  return !isNill(val)
    ? val.constructor === Type || val instanceof Type
    : false;
}

/**
 * Validate if Value val is intance of Function.
 * @param  {any} val Value to validate if is instance of Function.
 * @returns boolean true if value is instace of Function, false otherwise.
 */
export const isFunction = (val: any): boolean => is(Function, val);
/**
 * Validate if Value val is intance of String.
 * @param  {any} val Value to validate if is instance of String.
 * @returns boolean true if value is instace of String, false otherwise.
 */
export const isString = (val: any): boolean => is(String, val);

/**
 * Validate if Value val is intance of Object.
 * @param  {any} val Value to validate if is instance of Object.
 * @returns boolean true if value is instace of Object, false otherwise.
 */
export const isObject = (val: any): boolean => is(Object, val);

/**
 * Validate if Value val is intance of Array.
 * @param  {any} val Value to validate if is instance of Array.
 * @returns boolean true if value is instace of Array, false otherwise.
 */
export const isArray = (val: any): boolean => is(Array, val);

/**
 * Validate if Value val is intance of Date.
 * @param  {any} val Value to validate if is instance of Date.
 * @returns boolean true if value is instace of Date, false otherwise.
 */
export const isDate = (val: any): boolean => is(Date, val);

/**
 * Validate if Value val is intance of Number.
 * @param  {any} val Value to validate if is instance of Number.
 * @returns boolean true if value is instace of Number, false otherwise.
 */
export const isNumber = (val: any): boolean => is(Number, val);

/**
 * Validate if Value val is null or undefined.
 * @param  {any} val Value to validate if is null or undefined.
 * @returns boolean true if value is null or undefined, false otherwise.
 */
export const isNill = (val: any): boolean => val === null || val === undefined;


/**
 * Validate if Value val is null, undefined, empty String, empty Array or an Object without attributes.
 * @param  {any} val Value to validate if is empty.
 * @returns boolean true if value is empty, false otherwise.
 */
export const isEmpty = (val: any): boolean => isNill(val) || (isArray(val) && !val.length) || (isObject(val) && !Object.keys(val).length) || (isString(val) && !val.trim());

/**
 * Retrieves a value from an Object inspect values by path accesor (parent.attibute)
 * @param  {object} from Source object with atribites to inspect
 * @param  {string} path String path to the value
 * @param  {any | undefined} defaultValue Value to return if property is not found, undefined if no default value was informed.
 * @returns any The value found, default value if there was no value, undefined if no default value and not value found in path.
 */
export const getPathValue = (source: object, path: string, defaultValue: any = undefined): any | undefined =>
  path.split('.')
    .reduce((current: any, attr) =>
      isNill(current) || isNill(current[attr])
        ? defaultValue
        : current[attr]
      , source);

/**
 * Sets a value for an Object inspect route by path accesor (parent.attibute)
 * @param  {object} target Target object with atribites to inspect
 * @param  {string} path String path to the value
 * @param  {any} value Attribute value to set in target
 * @returns any same target object recived.
 */
export const setPathValue = (target: object, path: string, value: any): any => {
  if (isNill(target) || !isObject(target) || !path) {
    return target;
  }

  let to: any = target;
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
  return target;
};

/**
 * Simplifies an object of deep 2+ levels into a 1 deep level object
 * @param  {any} source Source Object to simplify
 * @param  {strinng} prefix='' String for appen to new property attributes
 * @returns object simplifield
 */
export const reduceObjectProperties = (source: any, prefix: string = ''): object => {
  return Object.keys(source).reduce((result, key) => {
    const value = source[key];
    if (isObject(value)) {
      return { ...result, ...reduceObjectProperties(value, `${prefix}${key}.`) }
    } else {
      return { ...result, [`${prefix}${key}`]: value };
    }
  }, {})
}

/**
 * Iterates over an Object attributes or Array items and executes a function over each one. Function return
 * replaces attribute or item original value.
 * @param  {object|Array<any>} source Source object to map
 * @param  {Function} fn Function to apply over each attribute or item.
 * @returns object containing the new values.
 */
export const map = (source: object | Array<any>, fn: (item: any) => any): object | Array<any> => {
  const objIsArray = isArray(source);
  return source && isFunction(fn) ? Object.entries(source).reduce((result: any, [key, value]) => {
    const mapValue = fn(value);
    if (isArray(mapValue) || isObject(mapValue)) {
      result[key] = map(mapValue, fn);
    } else if (undefined !== mapValue) {
      result[key] = mapValue
    }
    return result;
  }, objIsArray ? [] : {}) : source;
};

/**
 * Proyects a string injecting object properties like literal template ${} format and value by path access object.property
 * @param  {object} src Source object whit values to inject
 * @param  {string} value String whit value tamplate
 * @param  {} avoidEmptyValues=false if true, nill values would not be replaced and template remains in original string,
 * else nill values remove template
 * @returns string containing injected values
 */
export const stringProjection = (src: object, value: string, avoidEmptyValues = false): string => {
  const keys = value.split(/(\$?\{.+?\})/);
  return keys.reduce((result, key) => {
    const value = /^\$?\{.+?\}$/.test(key) ? getPathValue(src, key.replace(/^\$?\{|\}$/g, '')) : key;
    return result + (!isEmpty(value) || !avoidEmptyValues ? value : key);
  });
}

/**
 * Projects an Object into a template
 * @param  {Array<any>|object} src Source object with data
 * @param  {object} descriptor template result Object
 * @param  {} avoidEmptyValues=false if true, nill values would not be replaced and template remains in original string,
 * @returns any Object or Array containing poroyected values.
 */
export const projection = (src: Array<any> | object, descriptor: object, avoidEmptyValues = false): any => {
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

/**
 * Compares 2 Objects atribute by atribute to know if all values are the same
 * @param  {any} a Object a for compare to b
 * @param  {any} b Object b to compate with a
 * @returns boolean true if all values and inner objects are the same, false otherwise.
 */
export const deepEquals = (a: any, b: any): boolean => {
  const ta = typeof a, tb = typeof b;
  return a && b && ta === tb && (isArray(a) || isObject(a))
    ? Object.keys(a).length === Object.keys(b).length && Object.keys(a).every(key => deepEquals(a[key], b[key]))
    : (a === b);
}

/**
 * Chaechs if all Objects b atributes values matches Object a atributes
 * @param  {any} a Object a for check with b
 * @param  {any} b Object b to match with a
 * @returns boolean true if all values and inner objects of b are the same in a, false otherwise.
 */
export const includes = (a: any, b: any): boolean => {
  const ta = typeof a, tb = typeof b;
  return a && b && ta === tb && (isArray(a) || isObject(a))
    ? Object.keys(a).length >= Object.keys(b).length && Object.keys(b).every(key => deepEquals(a[key], b[key]))
    : (a === b);
}

/**
 * Check if an Object has declared a property no mathers which value it has
 * @param  {any} src Source object to check for property declaration
 * @param  {string} property Property name
 */
export const hasProperty = (src: any, property: string) => Object.keys(src).includes(property) || property in src;