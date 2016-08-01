var roleMiner = {

    /** @param {Creep} creep **/




    run: function(creep) {

//Check for full energy
        if(creep.carry.energy == creep.carryCapacity) {
            creep.memory.return = true;
        }
        if(creep.carry.energy < 50) {
            creep.memory.return = false;
        }

//Get full energy, if needed



        if (creep.memory.return == false) {
            creep.moveTo(Game.flags.Flag1);
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
//                creep.moveTo(source);
            }
        }




//If full energy, return energy to structures
//Harvesters will currently put energy into extensions, spawns, and towers.  If those are all full, they will put energy into storage.
        else {
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || (structure.structureType == STRUCTURE_TOWER  || structure.structureType == STRUCTURE_LINK && (structure.energy < structure.energyCapacity - 249))
                        ) &&
                        structure.energy < structure.energyCapacity;
                }
            });
            if (target == null) {
                creep.moveTo(Game.flags.Flag2);
                var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE) && structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                    }
                });
            }
            
// Move to closest energy container
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.flags.Flag2);
            }
        }
    }
};

module.exports = roleMiner;