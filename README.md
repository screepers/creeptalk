# CreepTalk

This project overloads the existing functions of Creeps to give them social
skills.

In more detailed terms, this module does two things.

1. It adds a new Creep.talk(group) function. When this is called a random saying
from the specified group will be pulled from the language file and the creep
will `say` it.

2. It places all of the existing creep action functions inside of a wrapper
function that calls `talk` before the action is performed.


## Disclaimer

This is a project for the [Screeps Game](https://screeps.com/). It does not help
real creeps learn to talk.


## Usage

Loading CreepTalk is as simple as requiring and running a single function.

```javascript
require('creeptalk')({
  'public': true,
  'language': require('creeptalk_basic')
})
```

* **public**: whether 'sayings' should be displayed in private or to all
  players.

* **language**: an object containing the desired phrases for the creeps to use.


## Languages

Language packs are simply javascript objects that form key/value pairs. The key
is the group itself (with most groups matching Creep functions). The value can
be a-

* string - This will be used directly each time it's called.
* array - A random entry from the array will be used.
* function - The results of the function will be used.


## Contributing Language Packs

New language packs are always appreciated! Just copy `creeptalk_template.js`
and fill in your custom details.
