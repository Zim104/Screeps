//The real stuff starts here.
module.exports.loop = function () {
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

//-----SETTINGS-----

//Note, dynamic spawning will not work properly in a new room.  You will need to manually update the creep body parts below
//This will be fixed in a later version

//Set username
    var userName = "Zim";

//Show summary on tick?  If so, which room?  ('all' or 'nomads' are a valid sumRoom)
    var showSum = 0;
    var sumRoom = 'all';

//Room 1 population caps
    var hCap1 = 3;  //harvester
    var bCap1 = 0;  //builder
    var rCap1 = 1;  //repairer
    var uCap1 = 2;  //upgrader
    var mCap1 = 0;  //miner
    var cCap1 = 0;  //claimer
    var aCap1 = 0;  //attacker

//Room 2 population caps
    var hCap2 = 2;  //harvester
    var bCap2 = 0;  //builder
    var rCap2 = 1;  //repairer
    var uCap2 = 1;  //upgrader
    var mCap2 = 0;  //miner
    var cCap2 = 0;  //claimer
    var aCap2 = 2;  //attacker

//Room 3 population caps
    var hCap3 = 0;  //harvester
    var bCap3 = 0;  //builder
    var rCap3 = 2;  //repairer
    var uCap3 = 5;  //upgrader
    var mCap3 = 0;  //miner
    var cCap3 = 0;  //claimer
    var aCap3 = 0;  //attacker

//Nomad population caps
    var nhCap = 4;  //harvester
    var nbCap = 3;  //builder
    var nuCap = 1;  //upgrader

//Turn on tower wall healing?
    var tower1Heal = 1;
    var tower1HealTo = 500000;
    var tower2Heal = 1;
    var tower2HealTo = 700000;
    var tower3Heal = 1;
    var tower3HealTo = 5000;


//Towers will only heal if storage is higher than this amount of energy
    var tower1HealStores = 100000;
    var tower2HealStores = 100000;
    var tower3HealStores = 100000;

//Name of rooms
    var room1Name = "[room E41S13]";
    var room2Name = "[room E41S14]";
    var room3Name = "[room E41S15]";

//Deposit Links and TransferTo Links
    var senderLink1 = Game.getObjectById('57a67f8222bb9fd753d28d39');
    var receiverLink1 = Game.getObjectById('579ce693eebe391d28db5ad3');
    var senderLink2 = Game.getObjectById('57a63d55b69bb6ed4c388e63');
    var receiverLink2 = Game.getObjectById('57a61e031d5b55a61ab1aac3');

//How many spawn rooms do you have?
    var spawnrooms = 3;

//Alliance Members
    var allianceMembers = ['GMan', 'Nam', 'Spyingwing', 'Dushinto'];



//-----SETTINGS-----





//Inject some memory for starting rooms
    if (Memory.firstRun == null) {
        Memory.cNum = 1;
        Memory.cNum2 = 1;
        Memory.cNum3 = 1;
        Memory.failSafe1 = 250;
        Memory.failSafe2 = 250;
        Memory.failSafe3 = 250;
        Memory.firstRun = 1;
        Memory.spawnrooms = 1;
    }
    if (Memory.room1Name == null){
        Memory.room1Name = room1Name;
    }
    if (room2Name != null) {
        Memory.room2Name = room2Name;
    }
    if (room3Name != null) {
        Memory.room3Name = room3Name;
    }
    if (Memory.spawnrooms != spawnrooms) {
        Memory.spawnrooms = spawnrooms;
    }








    var Room1=Game.spawns.Spawn1.room;
    if (spawnrooms == 3) {
        var Room2=Game.spawns.Spawn2.room;
        var Room3=Game.spawns.Spawn3.room;
//        var Room3=Game.spawns.Spawn3.room;
//        console.log(Room2)
//        var Room3="[room E41S14]";
    }
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
    
//Population monitoring for room2
    var harvesters3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.bornIn == '3');
    var builders3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.bornIn == '3');
    var upgraders3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.memory.bornIn == '3');
    var repairers3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer' && creep.memory.bornIn == '3');
    var miners3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner' && creep.memory.bornIn == '3');
    var claimers3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer' && creep.memory.bornIn == '3');
    var attackers3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker' && creep.memory.bornIn == '3');
    var population3 = harvesters3.length + repairers3.length + builders3.length + upgraders3.length + miners3.length + claimers3.length + attackers3.length;    

//Population monitoring for nomads
    var nomadsH = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.bornIn == 'nomad');
    var nomadsB = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.bornIn == 'nomad');
    var nomadsU = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.memory.bornIn == 'nomad');
    var populationN = nomadsH.length + nomadsB.length + nomadsU.length;

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
            console.log('[Nomads]Pop:' + populationN + ' - NH:' + nomadsH.length + '/' + nhCap + ' - NB:' + nomadsB.length + '/' + nbCap);
        }
        else if (sumRoom =="nomads"){
            console.log('[Nomads]Pop:' + populationN + ' - NH:' + nomadsH.length + '/' + nhCap + ' - NB:' + nomadsB.length + '/' + nbCap);
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
        var newName = Game.spawns['Spawn1'].createCreep([MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY], 'B' + Memory.cNum, {role: 'builder', bornIn: '1'});
        console.log('[Room1]Spawning new builder: ' + newName);
        Memory.cNum++;
    }
    else if (repairers1.length < rCap1) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'R' + Memory.cNum, {role: 'repairer', bornIn: '1'});
        console.log('[Room1]Spawning new repairer: ' + newName);
        Memory.cNum++;
    }
    else if (upgraders1.length < uCap1) {
        var newName = Game.spawns['Spawn1'].createCreep([MOVE,MOVE,MOVE,WORK,WORK,CARRY,CARRY,CARRY], 'U' + Memory.cNum, {role: 'upgrader', bornIn: '1'});
        console.log('[Room1]Spawning new upgrader: ' + newName);
        Memory.cNum++;
    }
    else if (miners1.length < mCap1) {
        var newName = Game.spawns['Spawn1'].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY], 'M' + Memory.cNum, {role: 'miner', bornIn: '1'});
        console.log('[Room1]Spawning new miner: ' + newName);
        Memory.cNum++;
    }

    else if (claimers1.length < cCap1) {
        var newName = Game.spawns['Spawn1'].createCreep([CLAIM, MOVE, MOVE], 'C' + Memory.cNum, {role: 'claimer', bornIn: '1'});
        console.log('[Room1]Spawning new claimer: ' + newName);
        Memory.cNum++;
    }

    else if (attackers1.length < aCap1) {
        var newName = Game.spawns['Spawn1'].createCreep([MOVE], 'A' + Memory.cNum, {role: 'attacker', bornIn: '1', goFlag: '1'});
        console.log('[Room1]Spawning new attacker: ' + newName);
        Memory.cNum++;
    }

    else if (harvesters1.length == hCap1 & Memory.failSafe1 != 250) {
        Memory.failSafe1 = 250;
        console.log('[Room1]Defcon countdown reset to: ' + Memory.failSafe1);
    }


//If spawn is in room2, then spawn things like this...
    if (Memory.spawnrooms <= 3){
        if (harvesters2.length < hCap2) {
            var newName = Game.spawns['Spawn2'].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], 'H' + Memory.cNum2, {role: 'harvester', bornIn: '2'});
            console.log('[Room2]Spawning new harvester: ' + newName);
            Memory.cNum2++;
            Memory.failSafe2--;
            console.log('[Room2]Defcon countdown: ' + Memory.failSafe2);
            if (Memory.failSafe2 < 1) {
                var newName = Game.spawns['Spawn2'].createCreep([WORK, CARRY, MOVE], 'H' + Memory.cNum2, {role: 'harvester', bornIn: '2'});
                console.log('[Room2]**SPWANING EMERGENCY HARVESTER: ' + newName + '**');
            }
        }
        else if (builders2.length < bCap2) {
            var newName = Game.spawns['Spawn2'].createCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], 'B' + Memory.cNum2, {role: 'builder', bornIn: '2'});
            console.log('[Room2]Spawning new builder: ' + newName);
            Memory.cNum2++;
        }
        else if (repairers2.length < rCap2) {
            var newName = Game.spawns['Spawn2'].createCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], 'R' + Memory.cNum2, {role: 'repairer', bornIn: '2'});
            console.log('[Room2]Spawning new repairer: ' + newName);
            Memory.cNum2++;
        }
        else if (upgraders2.length < uCap2) {
            var newName = Game.spawns['Spawn2'].createCreep([WORK, WORK, CARRY, CARRY, MOVE], 'U' + Memory.cNum2, {role: 'upgrader', bornIn: '2'});
            console.log('[Room2]Spawning new upgrader: ' + newName);
            Memory.cNum2++;
        }
        else if (miners2.length < mCap2) {
            var newName = Game.spawns['Spawn2'].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY], 'M' + Memory.cNum2, {role: 'miner', bornIn: '2'});
            console.log('[Room2]Spawning new miner: ' + newName);
            Memory.cNum2++;
        }

        else if (claimers2.length < cCap2) {
            var newName = Game.spawns['Spawn2'].createCreep([CLAIM, CLAIM, MOVE, MOVE], 'C' + Memory.cNum2, {role: 'claimer', bornIn: '2'});
            console.log('[Room2]Spawning new claimer: ' + newName);
            Memory.cNum2++;
        }

        else if (attackers2.length < aCap2) {
            var newName = Game.spawns['Spawn2'].createCreep([MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK], 'A' + Memory.cNum2, {role: 'attacker', bornIn: '2', goFlag: '1'});
            console.log('[Room2]Spawning new attacker: ' + newName);
            Memory.cNum2++;
        }

        else if (harvesters2.length == hCap2 & Memory.failSafe2 != 250) {
            Memory.failSafe2 = 250;
            console.log('[Room2]Defcon countdown reset to: ' + Memory.failSafe2);
        }
    }





     //If spawn is in room3, then spawn things like this...
     if (Memory.spawnrooms <= 3){
         if (harvesters3.length < hCap3) {
             var newName = Game.spawns['Spawn3'].createCreep([WORK, WORK, CARRY, MOVE], 'H' + Memory.cNum3, {role: 'harvester', bornIn: '3'});
             console.log('[Room3]Spawning new harvester: ' + newName);
             Memory.cNum3++;
             Memory.failSafe3--;
             console.log('[Room3]Defcon countdown: ' + Memory.failSafe3);
             if (Memory.failSafe3 < 1) {
                 var newName = Game.spawns['Spawn3'].createCreep([WORK, CARRY, MOVE], 'H' + Memory.cNum3, {role: 'harvester', bornIn: '3'});
                 console.log('[Room3]**SPWANING EMERGENCY HARVESTER: ' + newName + '**');
             }
         }
         else if (builders3.length < bCap3) {
             var newName = Game.spawns['Spawn3'].createCreep([WORK, WORK, CARRY, MOVE], 'B' + Memory.cNum3, {role: 'builder', bornIn: '3'});
             console.log('[Room3]Spawning new builder: ' + newName);
             Memory.cNum3++;
         }
         else if (repairers3.length < rCap3) {
             var newName = Game.spawns['Spawn3'].createCreep([WORK, WORK, CARRY, MOVE], 'R' + Memory.cNum3, {role: 'repairer', bornIn: '3'});
             console.log('[Room3]Spawning new repairer: ' + newName);
             Memory.cNum3++;
         }
         else if (upgraders3.length < uCap3) {
             var newName = Game.spawns['Spawn3'].createCreep([MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY], 'U' + Memory.cNum3, {role: 'upgrader', bornIn: '3'});
             console.log('[Room3]Spawning new upgrader: ' + newName);
             Memory.cNum3++;
         }
         else if (miners3.length < mCap3) {
             var newName = Game.spawns['Spawn3'].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY], 'M' + Memory.cNum3, {role: 'miner', bornIn: '3'});
             console.log('[Room3]Spawning new miner: ' + newName);
             Memory.cNum3++;
         }
    
         else if (claimers3.length < cCap3) {
             var newName = Game.spawns['Spawn3'].createCreep([CLAIM, CLAIM, MOVE, MOVE], 'C' + Memory.cNum3, {role: 'claimer', bornIn: '3'});
             console.log('[Room3]Spawning new claimer: ' + newName);
             Memory.cNum3++;
         }
    
         else if (attackers3.length < aCap3) {
             var newName = Game.spawns['Spawn3'].createCreep([MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK], 'A' + Memory.cNum3, {role: 'attacker', bornIn: '3', goFlag: '1'});
             console.log('[Room3]Spawning new attacker: ' + newName);
             Memory.cNum3++;
         }
    
         else if (harvesters3.length == hCap3 & Memory.failSafe3 != 250) {
             Memory.failSafe3 = 250;
             console.log('[Room3]Defcon countdown reset to: ' + Memory.failSafe3);
         }
     }








//Nomads
    if (nomadsH.length < nhCap) {
        var newName = Game.spawns['Spawn2'].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], 'NH' + Memory.cNum2, {
            role: 'harvester',
            bornIn: 'nomad',
            goFlag: '1'
        });
        console.log('[Room2]Spawning new nomad harvester: ' + newName);
        Memory.cNum2++;
    }
    else if (nomadsB.length < nbCap) {
        var newName = Game.spawns['Spawn2'].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], 'NB' + Memory.cNum2, {
            role: 'builder',
            bornIn: 'nomad',
            goFlag: '1'
        });
        console.log('[Room2]Spawning new nomad builder: ' + newName);
        Memory.cNum2++;
    }
    else if (nomadsU.length < nuCap) {
        var newName = Game.spawns['Spawn2'].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], 'NU' + Memory.cNum2, {
            role: 'upgrader',
            bornIn: 'nomad',
            goFlag: '1'
        });
        console.log('[Room2]Spawning new nomad upgrader: ' + newName);
        Memory.cNum2++;
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



//Link Room 1
    var link1Cooldown = senderLink1.cooldown;
    if (senderLink1.energy > 0){
        if (link1Cooldown == "0"){
            if (senderLink1.energy < receiverLink1.energyCapacity - receiverLink1.energy){
                senderLink1.transferEnergy(receiverLink1, senderLink1.energy)
//                console.log("Sender 1 attempting to send all it's got")
            }
            else {
                senderLink1.transferEnergy(receiverLink1, receiverLink1.energyCapacity - receiverLink1.energy);
//                console.log("Sender 1 attempting to cap off")
            }
        }
    }

//Link Room 2
    var link2Cooldown = senderLink2.cooldown;
    if (senderLink2.energy > 0){
        if (senderLink2.cooldown == "0"){
            if (senderLink2.energy < receiverLink2.energyCapacity - receiverLink2.energy){
//                console.log("Sender 2 attempting to send all it's got")
                senderLink2.transferEnergy(receiverLink2, senderLink2.energy)
            }
            else {
//                console.log("Sender 2 attempting to cap off")
                senderLink2.transferEnergy(receiverLink2, receiverLink2.energyCapacity - receiverLink2.energy);
            }
        }
    }


//    for (var allianceMembers){
//        console.log(allianceMembers)
//    }




//Shuts off tower healing if energy storage is not enough
    var storage1 = Room1.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] > tower1HealStores)
        }
    });
    if (storage1 == ""){
        tower1HealShutoff = 1
    }
    else {
        tower1HealShutoff = 0
    }
//Tower Defense Room 1
    var towers1 = Room1.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_TOWER
    });
    for (let tower1 of towers1) {
        var targetTower1 = tower1.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

//Code to detect allies
        ally = 0;
        for (i=0; i < allianceMembers.length;i++){
            if (targetTower1 != undefined && targetTower1.owner.username == allianceMembers[i]){
                ally = 1;
            }
        }

        if (targetTower1 != undefined) {
            tower1.attack(targetTower1);
            Game.notify("Room1 Tower has spotted enemies!");
            console.log("[Room1]ENEMY SIGHTED!")
        }
//Tower Healing
        else if(tower1Heal == 1 && tower1HealShutoff !== 1) {
            var closestDamagedStructure = tower1.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => (structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART) && structure.hits < tower1HealTo && structure.hits != structure.hitsMax
            });
            if(closestDamagedStructure && tower1.energy > 700) {
                tower1.repair(closestDamagedStructure);
            }
        }
    }







//Shuts off tower healing if energy storage is not enough
    var storage2 = Room2.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] > tower2HealStores)
        }
    });
    if (storage2 == ""){
        tower2HealShutoff = 1
    }
    else {
        tower2HealShutoff = 0
    }
//Tower Defense Room 2
    var towers2 = Room2.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_TOWER
    });
    for (let tower2 of towers2) {
        var targetTower2 = tower2.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

//Code to detect allies
        ally = 0;
        for (i=0; i < allianceMembers.length;i++){
            if (targetTower2 != undefined && targetTower2.owner.username == allianceMembers[i]){
                ally = 1;
            }
        }

        if (targetTower2 != undefined) {
            tower2.attack(targetTower2);
            Game.notify("Room2 Tower has spotted enemies!");
            console.log("[Room2]ENEMY SIGHTED!")
        }
//Tower Healing
        else if(tower2Heal == 1 && tower2HealShutoff !== 1) {
            var closestDamagedStructure2 = tower2.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => (structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART) && structure.hits < tower2HealTo && structure.hits != structure.hitsMax
            });
            if(closestDamagedStructure2 && tower2.energy > 700) {
                tower2.repair(closestDamagedStructure2);
            }
        }
    }




//Shuts off tower healing if energy storage is not enough
    var storage3 = Room3.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] > tower3HealStores)
        }
    });
    if (storage3 == ""){
        tower3HealShutoff = 1
    }
    else {
        tower3HealShutoff = 0
    }
//Tower Defense Room 3
    var towers3 = Room3.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_TOWER
    });
    for (let tower3 of towers3) {
        var targetTower3 = tower3.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

//Code to detect allies
        ally = 0;
        for (i=0; i < allianceMembers.length;i++){
            if (targetTower3 != undefined && targetTower3.owner.username == allianceMembers[i]){
                ally = 1;
            }
        }

        if (targetTower3 != undefined) {
            tower3.attack(targetTower3);
            Game.notify("Room3 Tower has spotted enemies!");
            console.log("[Room3]ENEMY SIGHTED!")
        }
//Tower Healing
        else if(tower3Heal == 1 && tower3HealShutoff !== 1) {
            var closestDamagedStructure = tower3.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => (structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART) && structure.hits < tower3HealTo && structure.hits != structure.hitsMax
            });
            if(closestDamagedStructure && tower3.energy > 700) {
                tower3.repair(closestDamagedStructure);
            }
        }
    }






}



