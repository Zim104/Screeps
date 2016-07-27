//-----SETTINGS-----

//Do upgraders get energy from storage or sources?
var getFrom="storage";

//-----SETTINGS-----


var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {



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
	}
};

module.exports = roleUpgrader;