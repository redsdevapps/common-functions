<a name="module_CommonFunctions"></a>

## CommonFunctions

* [CommonFunctions](#module_CommonFunctions)
    * [.getSrcElementFromEvent](#module_CommonFunctions.getSrcElementFromEvent) 
    * [.getQueryParams](#module_CommonFunctions.getQueryParams) 
    * [.getQueryParamsString](#module_CommonFunctions.getQueryParamsString) 
    * [.getNodePosition](#module_CommonFunctions.getNodePosition) 
    * [.getParentNode](#module_CommonFunctions.getParentNode) 

<a name="module_CommonFunctions.getSrcElementFromEvent"></a>

### CommonFunctions.getSrcElementFromEvent 
Retrieves source HTMLElement from an event by tagName or css ClassName inspecting
event.composedPath(), event.target and event.originalTarget properties

**Kind**: static constant of [<code>CommonFunctions</code>](#module_CommonFunctions)  
**Returns**: HTMLElement found in source event, null if no elements matched accessor parameter  

| Param | Type | Description |
| --- | --- | --- |
| Event | <code>Event</code> \| <code>EventDataObject</code> | Event from which to find source HTMLElement |
| elementAccessor | <code>string</code> | Element tagName or .cssClassName of source element |

<a name="module_CommonFunctions.getQueryParams"></a>

### CommonFunctions.getQueryParams 
**Kind**: static constant of [<code>CommonFunctions</code>](#module_CommonFunctions)  
**Returns**: Object with parameters or nul if no query data was received  

| Param | Type | Description |
| --- | --- | --- |
| queryData | <code>string</code> | Query String parameters |

<a name="module_CommonFunctions.getQueryParamsString"></a>

### CommonFunctions.getQueryParamsString 
Format the received Object into a URL query params String

**Kind**: static constant of [<code>CommonFunctions</code>](#module_CommonFunctions)  
**Returns**: String URL query params String  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>any</code> | The Object contained the params to format |

<a name="module_CommonFunctions.getNodePosition"></a>

### CommonFunctions.getNodePosition 
Get the position of a node in a list

**Kind**: static constant of [<code>CommonFunctions</code>](#module_CommonFunctions)  
**Returns**: number with the position on the Node in the list, -1 if list does not contains the node  

| Param | Type | Description |
| --- | --- | --- |
| nodeList | <code>Array.&lt;Node&gt;</code> | The Array<Node> list containing the object |
| node | <code>Node</code> | The None for which is looking for position |

<a name="module_CommonFunctions.getParentNode"></a>

### CommonFunctions.getParentNode 
Get the the parent node accesor which matches parentTag nodeName

**Kind**: static constant of [<code>CommonFunctions</code>](#module_CommonFunctions)  
**Returns**: The parent Node matching de tagName, null if no parent tagName found in DOM  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>Node</code> | Start node |
| parentTag | <code>string</code> | tagName looking for |

