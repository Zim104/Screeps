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
var getFromRoom7="sources";

//Nomads get energy from where?
var getFromNomad="sources"

//Construct closest or first?
var constructDistance = "closest"


//-----SETTINGS-----


var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

//Emergency fix here, no clue why this isn't working correctly
var getFromNomad="sources"
//var getFromRoom5 = "storage";
//////////////////////


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



	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	    }

	    if(creep.memory.building) {
	        if (constructDistance=="closest") {
	            var targets = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                if(creep.build(targets) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets);
                }
	        } 
	        else if (constructDistance=="first") {
	            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length) {
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }
                }
	        }
	    }

        else if (creep.memory.goFlag == "1"){
            creep.moveTo(Game.flags.NomadsB)
            if (creep.pos.inRangeTo(Game.flags.NomadsB, 5) == '1') {
                creep.memory.goFlag ="0"
                console.log("Clearing goflag")
            }
        }

// Get energy from sources?
        else if(getFrom=="sources") {
            let sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
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
};

module.exports = roleBuilder;