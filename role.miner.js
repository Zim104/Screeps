var roleMiner = {

    run: function(creep) {
        var total = _.sum(creep.carry);
        //console.log(total + ' - ' + creep.carryCapacity);
        if(total < creep.carryCapacity) {
            var sources = creep.room.find(FIND_MINERALS);
            //var source = Game.getObjectById('577b95514cfed287307629ac');
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] < structure.storeCapacity);
                }
            });
            // if (target == null) {
            //     var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            //         filter: (structure) => {
            //             return (structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] < structure.storeCapacity);
            //         }
            //     });
            // }
            if(creep.transfer(target, RESOURCE_OXYGEN) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
            if(creep.transfer(target, RESOURCE_CATALYST) == ERR_NOT_IN_RANGE) {
            }
        }
    }
};
module.exports = roleMiner;