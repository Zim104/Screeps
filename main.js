//-----SETTINGS-----

//Note, dynamic spawning will not work properly in a new room.  You will need to manually update the creep body parts below
//This will be fixed in a later version

//Set username
var userName = "Zim";

//Show summary on tick?  If so, which room?  ('all' or 'nomads' are a valid sumRoom)
var showSum = 0;
var sumRoom = 'all';


//Room 1 population caps
var hCap1 = 3;
var bCap1 = 0;
var rCap1 = 1;
var uCap1 = 1;
var mCap1 = 0;
var cCap1 = 0;
var aCap1 = 0;

//Room 2 population caps
var hCap2 = 0;
var bCap2 = 1;
var rCap2 = 0;
var uCap2 = 4;
var mCap2 = 0;
var cCap2 = 0;
var aCap2 = 0;

//Nomad population caps
var n1Cap = 2; //harvester


//Turn on tower wall healing?
var towerHeal = 1;
var towerHealTo = 125000;

//Name of rooms
var room1Name = "[room E41S13]";
var room2Name = "[room E41S14]";

//How many spawn rooms do you have?
var spawnrooms = 2;


//-----SETTINGS-----


//Inject some memory for starting rooms
if (Memory.firstRun == null) {
    Memory.cNum = 1;
    Memory.cNum2 = 1;
    Memory.failSafe1 = 250;
    Memory.failSafe2 = 250;
    Memory.firstRun = 1;
    Memory.spawnrooms = 1;
}

if (Memory.room1Name == null){
    Memory.room1Name = room1Name;
}

if (room2Name != null) {
    Memory.room2Name = room2Name;
}

if (Memory.spawnrooms != spawnrooms) {
    Memory.spawnrooms = spawnrooms;
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
    var roleClaimer = require('role.claimer');
    var roleAttacker = require('role.attacker');

//Population monitoring for room1
    var harvesters1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.bornIn == '1');
    var builders1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.bornIn == '1');
    var upgraders1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.memory.bornIn == '1');
    var repairers1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer' && creep.memory.bornIn == '1');
    var miners1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner' && creep.memory.bornIn == '1');
    var claimers1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer' && creep.memory.bornIn == '1');
    var attackers1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker' && creep.memory.bornIn == '1');
    var population1 = harvesters1.length + repairers1.length + builders1.length + upgraders1.length + miners1.length + claimers1.length + attackers1.length;

//Population monitoring for room2
    var harvesters2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.bornIn == '2');
    var builders2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.bornIn == '2');
    var upgraders2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.memory.bornIn == '2');
    var repairers2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer' && creep.memory.bornIn == '2');
    var miners2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner' && creep.memory.bornIn == '2');
    var claimers2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer' && creep.memory.bornIn == '2');
    var attackers2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker' && creep.memory.bornIn == '2');
    var population2 = harvesters2.length + repairers2.length + builders2.length + upgraders2.length + miners2.length + claimers2.length + attackers2.length;

//Population monitoring for nomads
    var nomads1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.bornIn == 'nomad');
    var populationN = nomads1.length;

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
        if (sumRoom == 1){
            console.log('[Room 1]Pop:' + population1 + ' - H:' + harvesters1.length + '/' + hCap1 + ' - R:' + repairers1.length + '/' + rCap1 + ' - B:' + builders1.length + '/' + bCap1 + ' - U:' + upgraders1.length + '/' + uCap1 + ' - M:' + miners1.length + '/' + mCap1 + ' - A:' + attackers1.length + '/' + aCap1 + ' ......... Enrgy:' + TotalEnergy);
        }
        else if (sumRoom ==2) {
            console.log('[Room 2]Pop:' + population2 + ' - H:' + harvesters2.length + '/' + hCap2 + ' - R:' + repairers2.length + '/' + rCap2 + ' - B:' + builders2.length + '/' + bCap2 + ' - U:' + upgraders2.length + '/' + uCap2 + ' - M:' + miners2.length + '/' + mCap2 + ' - A:' + attackers2.length + '/' + aCap2 + ' ......... Enrgy:' + TotalEnergy);
        }
        else if (sumRoom =="all"){
            console.log('[Room 1]Pop:' + population1 + ' - H:' + harvesters1.length + '/' + hCap1 + ' - R:' + repairers1.length + '/' + rCap1 + ' - B:' + builders1.length + '/' + bCap1 + ' - U:' + upgraders1.length + '/' + uCap1 + ' - M:' + miners1.length + '/' + mCap1 + ' - A:' + attackers1.length + '/' + aCap1 + ' ......... Enrgy:' + TotalEnergy);
            console.log('[Room 2]Pop:' + population2 + ' - H:' + harvesters2.length + '/' + hCap2 + ' - R:' + repairers2.length + '/' + rCap2 + ' - B:' + builders2.length + '/' + bCap2 + ' - U:' + upgraders2.length + '/' + uCap2 + ' - M:' + miners2.length + '/' + mCap2 + ' - A:' + attackers2.length + '/' + aCap2 + ' ......... Enrgy:' + TotalEnergy);
            console.log('[Nomads]Pop:' + populationN + ' - N1:' + nomads1.length);
        }
        else if (sumRoom =="nomads"){
            console.log('[Nomads]Pop:' + populationN + ' - N1:' + nomads1.length);
        }

    }


//If spawn is in Room1, then spawn things like this....
    if (harvesters1.length < hCap1) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'H' + Memory.cNum, {role: 'harvester', bornIn: '1'});
        console.log('[Room1]Spawning new harvester: ' + newName);
        Memory.cNum++;
        Memory.failSafe1--;
        console.log('[Room1]Defcon countdown: ' + Memory.failSafe1);
        if (Memory.failSafe1 < 1) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], 'H' + Memory.cNum, {role: 'harvester', bornIn: '1'});
            console.log('[Room1]**SPWANING EMERGENCY HARVESTER: ' + newName + '**');
        }
    }
    else if (builders1.length < bCap1) {
        var newName = Game.spawns['Spawn1'].createCreep([MOVE], 'B' + Memory.cNum, {role: 'builder', bornIn: '1'});
        console.log('[Room1]Spawning new builder: ' + newName);
        Memory.cNum++;
    }
    else if (repairers1.length < rCap1) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'R' + Memory.cNum, {role: 'repairer', bornIn: '1'});
        console.log('[Room1]Spawning new repairer: ' + newName);
        Memory.cNum++;
    }
    else if (upgraders1.length < uCap1) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], 'U' + Memory.cNum, {role: 'upgrader', bornIn: '1'});
        console.log('[Room1]Spawning new upgrader: ' + newName);
        Memory.cNum++;
    }
    else if (miners1.length < mCap1) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'M' + Memory.cNum, {role: 'miner', bornIn: '1'});
        console.log('[Room1]Spawning new miner: ' + newName);
        Memory.cNum++;
    }

    else if (claimers1.length < cCap1) {
        var newName = Game.spawns['Spawn1'].createCreep([CLAIM, MOVE, MOVE], 'C' + Memory.cNum, {role: 'claimer', bornIn: '1'});
        console.log('[Room1]Spawning new claimer: ' + newName);
        Memory.cNum++;
    }

    else if (attackers1.length < aCap1) {
        var newName = Game.spawns['Spawn1'].createCreep([ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE], 'A' + Memory.cNum, {role: 'attacker', bornIn: '1'});
        console.log('[Room1]Spawning new attacker: ' + newName);
        Memory.cNum++;
    }

    else if (harvesters1.length == hCap1 & Memory.failSafe1 != 250) {
        Memory.failSafe1 = 250;
        console.log('[Room1]Defcon countdown reset to: ' + Memory.failSafe1);
    }


//If spawn is in room2, then spawn things like this...
    if (Memory.spawnrooms == 2){
        if (harvesters2.length < hCap2) {
            var newName = Game.spawns['Spawn2'].createCreep([WORK, WORK, CARRY, CARRY, MOVE], 'H' + Memory.cNum2, {role: 'harvester', bornIn: '2'});
            console.log('[Room2]Spawning new harvester: ' + newName);
            Memory.cNum2++;
            Memory.failSafe2--;
            console.log('[Room2]Defcon countdown: ' + Memory.failSafe2);
            if (Memory.failSafe < 1) {
                var newName = Game.spawns['Spawn2'].createCreep([WORK, CARRY, MOVE], 'H' + Memory.cNum2, {role: 'harvester', bornIn: '2'});
                console.log('[Room2]**SPWANING EMERGENCY HARVESTER: ' + newName + '**');
            }
        }
        else if (builders2.length < bCap2) {
            var newName = Game.spawns['Spawn2'].createCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE], 'B' + Memory.cNum2, {role: 'builder', bornIn: '2'});
            console.log('[Room2]Spawning new builder: ' + newName);
            Memory.cNum2++;
        }
        else if (repairers2.length < rCap2) {
            var newName = Game.spawns['Spawn2'].createCreep([WORK, WORK, CARRY, MOVE], 'R' + Memory.cNum2, {role: 'repairer', bornIn: '2'});
            console.log('[Room2]Spawning new repairer: ' + newName);
            Memory.cNum2++;
        }
        else if (upgraders2.length < uCap2) {
            var newName = Game.spawns['Spawn2'].createCreep([WORK, WORK, CARRY, CARRY, MOVE], 'U' + Memory.cNum2, {role: 'upgrader', bornIn: '2'});
            console.log('[Room2]Spawning new upgrader: ' + newName);
            Memory.cNum2++;
        }
        else if (miners2.length < mCap2) {
            var newName = Game.spawns['Spawn2'].createCreep([WORK, WORK, CARRY, MOVE], 'M' + Memory.cNum2, {role: 'miner', bornIn: '2'});
            console.log('[Room2]Spawning new miner: ' + newName);
            Memory.cNum2++;
        }

        else if (claimers2.length < cCap2) {
            var newName = Game.spawns['Spawn2'].createCreep([CLAIM, MOVE, MOVE], 'C' + Memory.cNum2, {role: 'claimer', bornIn: '2'});
            console.log('[Room2]Spawning new claimer: ' + newName);
            Memory.cNum2++;
        }

        else if (attackers2.length < aCap2) {
            var newName = Game.spawns['Spawn2'].createCreep([ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE], 'A' + Memory.cNum2, {role: 'attacker', bornIn: '2'});
            console.log('[Room2]Spawning new attacker: ' + newName);
            Memory.cNum2++;
        }

        else if (harvesters2.length == hCap2 & Memory.failSafe2 != 250) {
            Memory.failSafe2 = 250;
            console.log('[Room2]Defcon countdown reset to: ' + Memory.failSafe2);
        }
    }

//Nomad mode
    if (nomads1.length < n1Cap) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'N' + Memory.cNum, {
            role: 'harvester',
            bornIn: 'nomad',
            goFlag: '1'
        });
        console.log('[Room1]Spawning new nomad harvester: ' + newName);
        Memory.cNum++;
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
        if (creep.memory.role == 'claimer') {
            roleClaimer.run(creep);
        }
        if (creep.memory.role == 'attacker') {
            roleAttacker.run(creep);
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



