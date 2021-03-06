<a name="module_ObjectUtils"></a>

## ObjectUtils

* [ObjectUtils](#module_ObjectUtils)
    * [.is](#module_ObjectUtils.is) 
    * [.isFunction](#module_ObjectUtils.isFunction) 
    * [.isString](#module_ObjectUtils.isString) 
    * [.isObject](#module_ObjectUtils.isObject) 
    * [.isArray](#module_ObjectUtils.isArray) 
    * [.isDate](#module_ObjectUtils.isDate) 
    * [.isNumber](#module_ObjectUtils.isNumber) 
    * [.isNill](#module_ObjectUtils.isNill) 
    * [.isEmpty](#module_ObjectUtils.isEmpty) 
    * [.getPathValue](#module_ObjectUtils.getPathValue) 
    * [.setPathValue](#module_ObjectUtils.setPathValue) 
    * [.reduceObjectProperties](#module_ObjectUtils.reduceObjectProperties) 
    * [.map](#module_ObjectUtils.map) 
    * [.stringProjection](#module_ObjectUtils.stringProjection) 
    * [.projection](#module_ObjectUtils.projection) 
    * [.deepEquals](#module_ObjectUtils.deepEquals) 
    * [.includes](#module_ObjectUtils.includes) 
    * [.hasProperty](#module_ObjectUtils.hasProperty)

<a name="module_ObjectUtils.is"></a>

### ObjectUtils.is 
Validate if Value val is intance of Type.

**Kind**: static constant of [<code>ObjectUtils</code>](#module_ObjectUtils)  
**Returns**: boolean true if value is instace of Type, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| Type | <code>function</code> | Contructor to validate instance relation. |
| val | <code>any</code> | Value to validate if is instance of Type Function. |

<a name="module_ObjectUtils.isFunction"></a>

### ObjectUtils.isFunction 
Validate if Value val is intance of Function.

**Kind**: static constant of [<code>ObjectUtils</code>](#module_ObjectUtils)  
**Returns**: boolean true if value is instace of Function, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>any</code> | Value to validate if is instance of Function. |

<a name="module_ObjectUtils.isString"></a>

### ObjectUtils.isString 
Validate if Value val is intance of String.

**Kind**: static constant of [<code>ObjectUtils</code>](#module_ObjectUtils)  
**Returns**: boolean true if value is instace of String, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>any</code> | Value to validate if is instance of String. |

<a name="module_ObjectUtils.isObject"></a>

### ObjectUtils.isObject 
Validate if Value val is intance of Object.

**Kind**: static constant of [<code>ObjectUtils</code>](#module_ObjectUtils)  
**Returns**: boolean true if value is instace of Object, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>any</code> | Value to validate if is instance of Object. |

<a name="module_ObjectUtils.isArray"></a>

### ObjectUtils.isArray 
Validate if Value val is intance of Array.

**Kind**: static constant of [<code>ObjectUtils</code>](#module_ObjectUtils)  
**Returns**: boolean true if value is instace of Array, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>any</code> | Value to validate if is instance of Array. |

<a name="module_ObjectUtils.isDate"></a>

### ObjectUtils.isDate 
Validate if Value val is intance of Date.

**Kind**: static constant of [<code>ObjectUtils</code>](#module_ObjectUtils)  
**Returns**: boolean true if value is instace of Date, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>any</code> | Value to validate if is instance of Date. |

<a name="module_ObjectUtils.isNumber"></a>

### ObjectUtils.isNumber 
Validate if Value val is intance of Number.

**Kind**: static constant of [<code>ObjectUtils</code>](#module_ObjectUtils)  
**Returns**: boolean true if value is instace of Number, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>any</code> | Value to validate if is instance of Number. |

<a name="module_ObjectUtils.isNill"></a>

### ObjectUtils.isNill 
Validate if Value val is null or undefined.

**Kind**: static constant of [<code>ObjectUtils</code>](#module_ObjectUtils)  
**Returns**: boolean true if value is null or undefined, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>any</code> | Value to validate if is null or undefined. |

<a name="module_ObjectUtils.isEmpty"></a>

### ObjectUtils.isEmpty 
Validate if Value val is null, undefined, empty String, empty Array or an Object without attributes.

**Kind**: static constant of [<code>ObjectUtils</code>](#module_ObjectUtils)  
**Returns**: boolean true if value is empty, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>any</code> | Value to validate if is empty. |

<a name="module_ObjectUtils.getPathValue"></a>

### ObjectUtils.getPathValue 
Retrieves a value from an Object inspect values by path accesor (parent.attibute)

**Kind**: static constant of [<code>ObjectUtils</code>](#module_ObjectUtils)  
**Returns**: any The value found, default value if there was no value, undefined if no default value and not value found in path.  

| Param | Type | Description |
| --- | --- | --- |
| from | <code>object</code> | Source object with atribites to inspect |
| path | <code>string</code> | String path to the value |
| defaultValue | <code>any</code> \| <code>undefined</code> | Value to return if property is not found, undefined if no default value was informed. |

<a name="module_ObjectUtils.setPathValue"></a>

### ObjectUtils.setPathValue 
Sets a value for an Object inspect route by path accesor (parent.attibute)

**Kind**: static constant of [<code>ObjectUtils</code>](#module_ObjectUtils)  
**Returns**: any same target object recived.  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>object</code> | Target object with atribites to inspect |
| path | <code>string</code> | String path to the value |
| value | <code>any</code> | Attribute value to set in target |

<a name="module_ObjectUtils.reduceObjectProperties"></a>

### ObjectUtils.reduceObjectProperties 
Simplifies an object of deep 2+ levels into a 1 deep level object

**Kind**: static constant of [<code>ObjectUtils</code>](#module_ObjectUtils)  
**Returns**: object simplifield  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| source | <code>any</code> |  | Source Object to simplify |
| prefix | <code>strinng</code> | <code>&#x27;&#x27;</code> | String for appen to new property attributes |

<a name="module_ObjectUtils.map"></a>

### ObjectUtils.map 
Iterates over an Object attributes or Array items and executes a function over each one. Function return
replaces attribute or item original value.

**Kind**: static constant of [<code>ObjectUtils</code>](#module_ObjectUtils)  
**Returns**: object containing the new values.  

| Param | Type | Description |
| --- | --- | --- |
| source | <code>object</code> \| <code>Array.&lt;any&gt;</code> | Source object to map |
| fn | <code>function</code> | Function to apply over each attribute or item. |

<a name="module_ObjectUtils.stringProjection"></a>

### ObjectUtils.stringProjection 
Proyects a string injecting object properties like literal template ${} format and value by path access object.property

**Kind**: static constant of [<code>ObjectUtils</code>](#module_ObjectUtils)  
**Returns**: string containing injected values  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| src | <code>object</code> |  | Source object whit values to inject |
| value | <code>string</code> |  | String whit value tamplate |
| avoidEmptyValues |  | <code>false</code> | if true, nill values would not be replaced and template remains in original string, else nill values remove template |

<a name="module_ObjectUtils.projection"></a>

### ObjectUtils.projection 
Projects an Object into a template

**Kind**: static constant of [<code>ObjectUtils</code>](#module_ObjectUtils)  
**Returns**: any Object or Array containing poroyected values.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| src | <code>Array.&lt;any&gt;</code> \| <code>object</code> |  | Source object with data |
| descriptor | <code>object</code> |  | template result Object |
| avoidEmptyValues |  | <code>false</code> | if true, nill values would not be replaced and template remains in original string, |

<a name="module_ObjectUtils.deepEquals"></a>

### ObjectUtils.deepEquals 
Compares 2 Objects atribute by atribute to know if all values are the same

**Kind**: static constant of [<code>ObjectUtils</code>](#module_ObjectUtils)  
**Returns**: boolean true if all values and inner objects are the same, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>any</code> | Object a for compare to b |
| b | <code>any</code> | Object b to compate with a |

<a name="module_ObjectUtils.includes"></a>

### ObjectUtils.includes 
Chaechs if all Objects b atributes values matches Object a atributes

**Kind**: static constant of [<code>ObjectUtils</code>](#module_ObjectUtils)  
**Returns**: boolean true if all values and inner objects of b are the same in a, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>any</code> | Object a for check with b |
| b | <code>any</code> | Object b to match with a |

<a name="module_ObjectUtils.hasProperty"></a>

### ObjectUtils.hasProperty
Check if an Object has declared a property no mathers which value it has

**Kind**: static constant of [<code>ObjectUtils</code>](#module_ObjectUtils)  

| Param | Type | Description |
| --- | --- | --- |
| src | <code>any</code> | Source object to check for property declaration |
| property | <code>string</code> | Property name |

