var roleHarvester = {

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
//Nomad flag mode first
	    if(creep.memory.return == false) {
	        if (creep.memory.goFlag == "1"){
	            creep.moveTo(Game.flags.NomadsH)
                if (creep.pos.inRangeTo(Game.flags.NomadsH, 5) == '1') {
                    creep.memory.goFlag ="0"
                    console.log("Clearing goflag")
                }
            }
//Find sources
            else {
                var source = creep.pos.findClosestByPath(FIND_SOURCES);
                if (creep.moveTo(source) == -7){
                    var sourceAccess = false;
                }
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }

                if (creep.memory.dropOff == 1) {
                    var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] != 0)
                        }
                    });
                    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                    else {
                        (creep.memory.dropOff = 0)
                        console.log("Setting dropOff to 0")
                    }

                }


                //If they have no access to the source (blocked) then get some energy from storage in order to feed towers, links, extensions
                else if (sourceAccess == false){
                    var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || (structure.structureType == STRUCTURE_TOWER && (structure.energy < structure.energyCapacity - 249))
                                ) &&
                                structure.energy < structure.energyCapacity;
                        }
                    });
                    if (target !== null) {
                        var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] != 0)
                            }
                        });
                        if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target);
                        }
                    }
//If there are no extensions, spawns, or towers that need energy, then get some energy from a nearby receiver link and put it in storage
//This is REALLY specific but greatly helps my current room 2.
                    else if (target == null){


                        var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_LINK) && structure.energy > 400;
                            }
                        });
                        if (target !== null) {
                            if (creep.pos.inRangeTo(target, 7) == 1){
                                creep.moveTo(target);
                                if (target.transferEnergy(creep) !== -9){
                                    creep.memory.dropOff = 1;
                                    console.log("Setting dropOff to 1")
                                }
                            }
                        }



                    }
                }
            }
        }



//If full energy, return energy to structures
//Harvesters will currently put energy into extensions, spawns, and towers.  If those are all full, they will put energy into storage.
        else {
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || (structure.structureType == STRUCTURE_TOWER && (structure.energy < structure.energyCapacity - 249))
                    ) &&
                    structure.energy < structure.energyCapacity;
                    }
                });
//If extensions, spawns, & towers are good, put energy in links if they arent too far away
            if (target == null && creep.memory.dropOff !== 1) {
                var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_LINK) && structure.energy < structure.energyCapacity;
                        creep.transfer(target, RESOURCE_ENERGY)
                    }
                });
                if (target !== null){
                    if (creep.pos.inRangeTo(target, 4) !== false){
                        creep.moveTo(target);
//                        console.log(creep.name + " Going to link")
//                        console.log(creep.pos.inRangeTo(target, 2))
//                        target.transferEnergy(creep)
                    }
                    else {
                        target = null
                    }
                }
            }
            if (target == null) {
                  var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE) && structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                    }
                });
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
// Move to closest energy container
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
	}
};

module.exports = roleHarvester;



