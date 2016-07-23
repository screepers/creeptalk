
var CreepTalk = function (opts) {
  this.registerCreepFunctions(opts)
}

CreepTalk.prototype.overrideFunctions = [
  'attack',
  'attackController',
  'build',
  'claimController',
  'dismantle',
  'drop',
  'harvest',
  'heal',
  'move',
  'pickup',
  'rangedAttack',
  'rangedHeal',
  'rangedMassAttack',
  'repair',
  'reserveController',
  'suicide',
  'transfer',
  'upgradeController',
  'withdraw'
]

CreepTalk.prototype.wrapFunction = function (name, originalFunction) {
  return function wrappedFunction() {
    if(!!this.talk) {
      this.talk(name)
    }
    return originalFunction.apply(this, arguments);
  };
}

CreepTalk.prototype.registerCreepFunctions = function (opts) {

  try {
    if(!!opts.language) {
      if(typeof opts.language === 'string') {
        var language_pack = require('creeptalk_' + language)
      } else {
        var language_pack = opts.language
      }
    }
  } catch (err) {
    console.log('Unable to load language pack ' + language)
    return
  }

  for(var function_name of this.overrideFunctions) {
    Creep.prototype[function_name] = this.wrapFunction(function_name, Creep.prototype[function_name])
  }

  Creep.prototype.talk = function (group) {
    try {
      if(!!language_pack[group] && language_pack[group].length > 0) {
        if(typeof language_pack[group] == 'string') {
          var string = language_pack[group]
        } else {
          var string = language_pack[group][Math.floor(Math.random()*language_pack[group].length)];
        }
        this.say(string, !!opts.public)
      }
    } catch (err) {}
  }
}

module.exports = function (opts) {
  new CreepTalk({'public':true, 'language': require('lib_creeptalk_basic')})
}
