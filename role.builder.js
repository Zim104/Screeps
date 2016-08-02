//-----SETTINGS-----

//Does room 1 get energy from storage,sources, or spawn?
var getFromRoom1="storage";

//Does room 2 get energy from storage,sources, or spawn?
var getFromRoom2="spawn";

//-----SETTINGS-----


var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

//Where does it get it's energy from?
        if (creep.memory.bornIn == 1) {
            var getFrom=getFromRoom1;
        }
        else if (Memory.spawnrooms == 2){
            if (creep.memory.bornIn == 2) {
                var getFrom=getFromRoom2;
            }
        }
        else if (creep.memory.bornIn == "nomad"){
            var getFrom="sources";
        }



	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
	    }
	    
// Get energy from sources?
        else if(getFrom=="sources") {
            var sources = creep.room.find(FIND_SOURCES);
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
            if((spwn.energy) > [149]) {
                spwn.transferEnergy(creep);
            }
            else {

            }
        }
	    
	}
};

module.exports = roleBuilder;