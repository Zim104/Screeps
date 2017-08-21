//-----SETTINGS-----

//Does room 1 get energy from storage,sources, or spawn?
var getFromRoom1="storage";

//Does room 2 get energy from storage,sources, or spawn?
var getFromRoom2="storage";

//Does room 3 get energy from storage,sources, or spawn?
var getFromRoom3="storage";

//Does room 4 get energy from storage,sources, or spawn?
var getFromRoom4="storage";

//Does room 5 get energy from storage,sources, or spawn?
var getFromRoom5="storage";

//Does room 6 get energy from storage,sources, or spawn?
var getFromRoom6="storage";

//Does room 7 get energy from storage,sources, or spawn?
var getFromRoom7="storage";

//Do nomads get energy from storage,sources, or spawn?
var getFromNomad="sources";

//-----SETTINGS-----


var roleUpgrader = {

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


        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	    }



	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }


        else if (creep.memory.goFlag == "1"){
            creep.moveTo(Game.flags.NomadsU)
            if (creep.pos.inRangeTo(Game.flags.NomadsU, 5) == '1') {
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


// Get energy from storage?




        else if(getFrom=="storage") {

            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_LINK) && structure.energy > 0;
                }
            });
            if (target !== null) {
                if (creep.pos.inRangeTo(target, 2) == 1){
                    creep.moveTo(target);
                    target.transferEnergy(creep)
                }
                else {
                    var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] != 0)
                        }
                    });
                    if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
            }
            else {
                var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] != 0)
                    }
                });
                if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
	}
};

module.exports = roleUpgrader;