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
            creep.moveTo(Game.flags.Mine);
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
//                creep.moveTo(source);

            }
        }




//If full energy, return energy to STORAGE

        else{
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_LINK) && structure.energy < structure.energyCapacity;
                }
            });

            if (creep.transfer(target, RESOURCE_ENERGY) == -9) {
                target = null;
            }

            if (target == null) {
                var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE) && structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                        creep.transfer(target, RESOURCE_ENERGY)
                        console.log("attempting to deposit into storage")
                    }
                });
            }

            if (target == null) {
//                console.log("k")
                creep.moveTo(Game.flags.MineStorage);
                var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE) && structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                    }
                });
            }

// Move to closest energy container
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.flags.MineStorage);
            }
        }
    }
};

module.exports = roleMiner;