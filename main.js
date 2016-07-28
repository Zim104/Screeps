//-----SETTINGS-----

//Note, dynamic spawning will not work properly in a new room.  You will need to manually update the creep body parts below
//This will be fixed in a later version

//Set username
var userName = "Zim";

//Adjust population caps here
var hCap = 3;
var bCap = 0;
var rCap = 1;
var uCap = 3;
var mCap = 3;

//Show summary on tick?
var showSum = 0;

//Turn on tower wall healing?
var towerHeal = 1;
var towerHealTo = 125000;

//-----SETTINGS-----


//Inject some memory for starting rooms
if (Memory.firstRun == null) {
    Memory.cNum = 1;
    Memory.failSafe = 250;
    Memory.firstRun = 1;
}


//The real stuff starts here.
module.exports.loop = function () {
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    

    var Room=Game.spawns.Spawn1.room;
    var roleHarvester = require('role.harvester');
    var roleUpgrader = require('role.upgrader');
    var roleBuilder = require('role.builder');
    var roleRepairer = require('role.repairer');
    var roleMiner = require('role.miner');

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    var population = harvesters.length + repairers.length + builders.length + upgraders.length + miners.length;

//How much energy is available?  Thanks for the code, Dan
    var energystores = _.filter(Game.structures, (structure) => structure.structureType == STRUCTURE_EXTENSION ||
    structure.structureType == STRUCTURE_SPAWN ||
    structure.structureType == STRUCTURE_CONTAINER);

    TotalEnergy = 0;
    for (var i in energystores)
    {
        TotalEnergy += energystores[i].energy;
    }

    if (showSum == true) {
        console.log('-------------------------')
        console.log('Pop:' + population + ' - H:' + harvesters.length + '/' + hCap + ' - R:' + repairers.length + '/' + rCap + ' - B:' + builders.length + '/' + bCap + ' - U:' + upgraders.length + '/' + uCap + ' - M:' + miners.length + '/' + mCap+ ' ......... Enrgy:' + TotalEnergy);
    }

//These need to be adjusted at the start of a room to WORK,CARRY,MOVE
//Checking to see if new spawns are needed
    if (harvesters.length < hCap) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'H' + Memory.cNum, {role: 'harvester'});
        console.log('Spawning new harvester: ' + newName);
        Memory.cNum++;
        Memory.failSafe--;
        console.log('Defcon countdown: ' + Memory.failSafe);
        if (Memory.failSafe < 1) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], 'H' + Memory.cNum, {role: 'harvester'});
            console.log('**SPWANING EMERGENCY HARVESTER: ' + newName + '**');
        }
    }
    else if (builders.length < bCap) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], 'B' + Memory.cNum, {role: 'builder'});
        console.log('Spawning new builder: ' + newName);
        Memory.cNum++;
    }
    else if (repairers.length < rCap) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'R' + Memory.cNum, {role: 'repairer'});
        console.log('Spawning new repairer: ' + newName);
        Memory.cNum++;
    }
    else if (upgraders.length < uCap) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], 'U' + Memory.cNum, {role: 'upgrader'});
        console.log('Spawning new upgrader: ' + newName);
        Memory.cNum++;
    }
    else if (miners.length < mCap) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'M' + Memory.cNum, {role: 'miner'});
        console.log('Spawning new miner: ' + newName);
        Memory.cNum++;
    }

    else if (harvesters.length == hCap & Memory.failSafe != 250) {
        Memory.failSafe = 250;
        console.log('Defcon countdown reset to: ' + Memory.failSafe);
    }
    

//Telling each creep what to do
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if (creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
    }

//Tower Defense
    var towers = Room.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_TOWER
    });
    for (let tower of towers) {
        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target != undefined) {
            tower.attack(target);
            Game.notify("Tower has spotted enemies!")
            console.log("ENEMY SIGHTED!")
        }
//Tower Healing
        else if(towerHeal == true) {
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => (structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART) && structure.hits < towerHealTo && structure.hits != structure.hitsMax
            });
            if(closestDamagedStructure && tower.energy > 750) {
                tower.repair(closestDamagedStructure);
            }
        }
    }
}



