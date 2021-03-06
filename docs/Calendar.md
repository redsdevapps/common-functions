<a name="Calendar"></a>

## Calendar
Calendar functionalities.

**Kind**: global class  

* [Calendar](#Calendar)
    * [new Calendar(year, month, date, hours, minutes, seconds, milliseconds)](#new_Calendar_new)
    * _instance_
        * [.getTime()](#Calendar+getTime) 
        * [.isLeap()](#Calendar+isLeap) 
        * [.toISOString()](#Calendar+toISOString) 
        * [.dateString()](#Calendar+dateString) 
        * [.format(format)](#Calendar+format) 
        * [.weekDay()](#Calendar+weekDay) 
        * [.dayName()](#Calendar+dayName) 
        * [.monthName()](#Calendar+monthName) 
        * [.time(short, ampm)](#Calendar+time) 
        * [.add(param, intValue)](#Calendar+add) 
        * [.clone()](#Calendar+clone) 
    * _static_
        * [.getInstance()](#Calendar.getInstance) 
        * [.calendarAt(hours, minutes, seconds, milliseconds)](#Calendar.calendarAt) 
        * [.parse(strDate?)](#Calendar.parse) 
        * [.getLocalDate(date?)](#Calendar.getLocalDate) 

<a name="new_Calendar_new"></a>

### new Calendar(year, month, date, hours, minutes, seconds, milliseconds)
Creates a Calendar instance with the provided parameters.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| year | <code>number</code> | <code>1</code> | Calendar Year |
| month | <code>number</code> | <code>1</code> | Calendar month of the year |
| date | <code>number</code> | <code>1</code> | Calenadar date of the month |
| hours | <code>number</code> | <code>0</code> | Calendar hours of the date |
| minutes | <code>number</code> | <code>0</code> | Calendar minutes of the hour |
| seconds | <code>number</code> | <code>0</code> | Calendar seconds of the minute |
| milliseconds | <code>number</code> | <code>0</code> | Calendar milliseconds of the second |

<a name="Calendar+getTime"></a>

### calendar.getTime() 
Get the current Calendar instance time in milliseconds

**Kind**: instance method of [<code>Calendar</code>](#Calendar)  
**Returns**: number Milliseconds  
<a name="Calendar+isLeap"></a>

### calendar.isLeap() 
Checks if the current Calendar instance corresponds whit a leap year

**Kind**: instance method of [<code>Calendar</code>](#Calendar)  
**Returns**: boolean if the current Calendar instance is a leap year  
<a name="Calendar+toISOString"></a>

### calendar.toISOString() 
Converts the current Calendar instance to ISO-8601 String format yyyy-MM-ddTHH:mm:ss.SSSZ

**Kind**: instance method of [<code>Calendar</code>](#Calendar)  
**Returns**: string formated date  
<a name="Calendar+dateString"></a>

### calendar.dateString() 
Converts the current Calendar instance to String format yyyy-MM-dd

**Kind**: instance method of [<code>Calendar</code>](#Calendar)  
**Returns**: string formated date  
<a name="Calendar+format"></a>

### calendar.format(format) 
Converts the current Calendar instance to String specified format
Pattern          | Component     | Examples
---------------- | ------------- | ---------------------------------
yy\|yyyy         | Year          | yy=21, yyyy=2021
M\|MM\|MMM\|MMMM | Month         | M=6, MM=06, MMM=Jun, MMMM=June
d\|dd\|ddd\|dddd | Date          | d=1, dd=01, ddd=Sun, dddd=Sunday
h\|hh\|H\|HH     | Hours         | h=1, hh=1, H=13, HH=13 for 13 Hrs
a\|aa            | am/pm marker  | a=P, aa=PM for 13 Hrs
m\|mm            | Minutes       | m=1, mm=01
s\|ss            | Seconds       | s=1, ss=01
S\|SSS           | Milliseconds  | S=1, SSS=001
other            | Literal       | T=T, Z=Z, -=-

**Kind**: instance method of [<code>Calendar</code>](#Calendar)  
**Returns**: string  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| format | <code>string</code> | <code>&quot;&#x27;yyyy-MM-dd&#x27;&quot;</code> | pattern definition |

<a name="Calendar+weekDay"></a>

### calendar.weekDay() 
Returns the day of the week at the current Calendar instance, 0 for Sunday

**Kind**: instance method of [<code>Calendar</code>](#Calendar)  
**Returns**: number the day of the week  
<a name="Calendar+dayName"></a>

### calendar.dayName() 
Returns the curren Calendar instance day Name

**Kind**: instance method of [<code>Calendar</code>](#Calendar)  
**Returns**: string Day name  
<a name="Calendar+monthName"></a>

### calendar.monthName() 
Returns the curren Calendar instance month Name

**Kind**: instance method of [<code>Calendar</code>](#Calendar)  
**Returns**: string Month name  
<a name="Calendar+time"></a>

### calendar.time(short, ampm) 
Return the curren Calendar instance time in HH:mm(:ss)?() aa)?

**Kind**: instance method of [<code>Calendar</code>](#Calendar)  
**Returns**: string  

| Param | Default | Description |
| --- | --- | --- |
| short | <code>false</code> | If true time is HH:mm, else time is HH:mm:ss |
| ampm | <code>false</code> | If true adds am/pm marker |

<a name="Calendar+add"></a>

### calendar.add(param, intValue) 
Adds or substracts the indicated parameter to the current Calendar instance

**Kind**: instance method of [<code>Calendar</code>](#Calendar)  
**Returns**: Calendar current Calendar instance updated.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| param | <code>PARAM</code> |  | Parameter to add or substract |
| intValue | <code>number</code> | <code>0</code> | amount to add or substract |

<a name="Calendar+clone"></a>

### calendar.clone() 
Clones the current Calendar instance

**Kind**: instance method of [<code>Calendar</code>](#Calendar)  
**Returns**: Calendar instance  
<a name="Calendar.getInstance"></a>

### Calendar.getInstance() 
Creates a Calendar instance from current Date

**Kind**: static method of [<code>Calendar</code>](#Calendar)  
**Returns**: Calendar instance  
<a name="Calendar.calendarAt"></a>

### Calendar.calendarAt(hours, minutes, seconds, milliseconds) 
Creates a Calendar instance from current date and the specified time parameters

**Kind**: static method of [<code>Calendar</code>](#Calendar)  
**Returns**: Calendar instance  

| Param | Default | Description |
| --- | --- | --- |
| hours | <code>0</code> | Hours of the current date |
| minutes | <code>0</code> | Minutes of the hour |
| seconds | <code>0</code> | Seconds of the minute |
| milliseconds | <code>0</code> | Milliseconds of the second |

<a name="Calendar.parse"></a>

### Calendar.parse(strDate?) 
Parses the stringDate parameter format ISO-8601 like into a Calendar instance

**Kind**: static method of [<code>Calendar</code>](#Calendar)  
**Returns**: Calendar instance  

| Param | Type | Description |
| --- | --- | --- |
| strDate? | <code>string</code> | the String date to parse |

<a name="Calendar.getLocalDate"></a>

### Calendar.getLocalDate(date?) 
Converts the current date paremeter into a javascript Date instance

**Kind**: static method of [<code>Calendar</code>](#Calendar)  
**Returns**: Date the javascript Date instance  

| Param | Type | Description |
| --- | --- | --- |
| date? | <code>number</code> \| <code>string</code> | millisencods date o string javascript Date, if undefined current Date is assigned |

