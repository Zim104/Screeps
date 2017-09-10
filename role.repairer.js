//-----SETTINGS-----

//Note - these repairers are meant to only repair roads and structures.  Instead, Extra turret energy is used to repair walls.

//Does room 1 get energy from storage,sources, or spawn?
var getFromRoom1 = "storage";

//Does room 2 get energy from storage,sources, or spawn?
var getFromRoom2 = "storage";

//Does room 3 get energy from storage,sources, or spawn?
var getFromRoom3 = "storage";

//Does room 4 get energy from storage,sources, or spawn?
var getFromRoom4 = "storage";

//Does room 5 get energy from storage,sources, or spawn?
var getFromRoom5 = "storage";

//Does room 6 get energy from storage,sources, or spawn?
var getFromRoom6 = "storage";

//Does room 7 get energy from storage,sources, or spawn?
var getFromRoom7 = "storage";

//Does room 8 get energy from storage,sources, or spawn?
var getFromRoom8 = "storage";

//Does room 9 get energy from storage,sources, or spawn?
var getFromRoom9 = "spawn";

//Do nomads get energy from storage,sources, or spawn?
var getFromNomad = "sources";

//Turn on wall repair?
var wallRep = 0; //This seems to break road repair.  Needs to be fixed.  --- I think it's fixed now?

//Max wall hits heal?
var wallRepHits = 10000;

//Turn on road repair?
var roadRep = 1;

//When to repair roads? 1.2 is 80%, 2 is 50%, 3 is 33%
var roadRepStart = 1.2;

//Turn on Structure repair?
var structureRep = 1;

//Max structure hits heal?
var structureRepHits = 5000;

//-----SETTINGS-----


var roleRepairer = {
    /** @param {Creep} creep **/
    run: function(creep) {

        //Where does it get it's energy from?
        if (creep.memory.bornIn == 1) {
            var getFrom=getFromRoom1;
        }
        else if (creep.memory.bornIn == 'nomad') {
            var getFrom=getFromNomad;
        }
        else if (creep.memory.bornIn == 2) {
            var getFrom=getFromRoom2;
            }
        else if (creep.memory.bornIn == 3) {
            var getFrom=getFromRoom3;
            }
        else if (creep.memory.bornIn == 4) {
            var getFrom=getFromRoom4;
            }
        else if (creep.memory.bornIn == 5) {
            var getFrom=getFromRoom5;
            }
        else if (creep.memory.bornIn == 6) {
            var getFrom=getFromRoom6;
        }
        else if (creep.memory.bornIn == 7) {
            var getFrom=getFromRoom7;
        }
        else if (creep.memory.bornIn == 8) {
            var getFrom=getFromRoom8;
        }
        else if (creep.memory.bornIn == 9) {
            var getFrom=getFromRoom9;
        }        

// Old part for automation, could reuse later?
//        else if (Memory.spawnrooms == 2){
//            if (creep.memory.bornIn == 2) {
//                var getFrom=getFromRoom2;
//            }
//        }
        

//        if(creep.carry.energy == 0) {
//            var spwn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
//            creep.moveTo(spwn);
//            if((spwn.energy) > [0]) {
//                spwn.transferEnergy(creep);
//            }
//            else {
//Not enough energy to repair
//            }
//        }
        if (creep.memory.return == "return")
        {
            if(creep.carry.energy == creep.carryCapacity) {
//                console.log("HEY DEBUG")
                creep.memory.return = "repair";

            }



            else if (creep.memory.goFlag == "1"){
                creep.moveTo(Game.flags.NomadsR)
                if (creep.pos.inRangeTo(Game.flags.NomadsR, 5) == '1') {
                    creep.memory.goFlag ="0"
                    console.log("Clearing goflag")
                }
            }



// Get energy from sources?
            else if(getFrom=="sources") {
                var sources = creep.room.find(FIND_SOURCES);
                if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[1]);
                }
            }

// Get energy from storage?
            else if(getFrom=="storage") {
                var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] != 0)
                    }
                });
                if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }

// Get energy from spawn?
            else if(getFrom=="spawn"){
                var spwn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
                creep.moveTo(spwn);
                if((spwn.energy) > [0]) {
                    spwn.transferEnergy(creep);
                }
                else {

                }
            }
        }

//repair walls
        else if (wallRep == true) {
            var targetWall = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_WALL
                        & structure.hits != structure.hitsMax) & structure.hits < wallRepHits;
                }
            });
            if(targetWall) {
                if(creep.repair(targetWall) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetWall);
                }
            }
        }

//repair roads
        else if (roadRep == true) {
            var repRoad = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function (object) {
                    if (object.structureType == STRUCTURE_ROAD & object.hits < object.hitsMax / roadRepStart) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            });
            if (repRoad) {
                creep.moveTo(repRoad);
                creep.repair(repRoad);
//console.log('I am repairing roads now')
            }
        }
        else if (structureRep == true) {
//repair structures that aren't walls or roads
                var targetRoad = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType != STRUCTURE_ROAD & structure.structureType != STRUCTURE_WALL
                        & structure.hits != structure.hitsMax) & structure.hits < structureRepHits;
                    }
	            });
                if(targetRoad) {
                    if(creep.repair(targetRoad) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targetRoad);
                    }
                }
            }
        if (creep.carry.energy == 0){
            creep.memory.return = "return";
        }
    }
};

module.exports = roleRepairer;