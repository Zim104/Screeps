var Room=Game.spawns.Spawn1.room;

var wallRepLimit = 240000;


var roleRepairer = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy == 0) {
            var spwn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
            creep.moveTo(spwn);
            if((spwn.energy) > [251]) {
                spwn.transferEnergy(creep);
            }
            else {
                //console.log('Not enough energy for repairer')
            }
        }
        else {
            var repRoad = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function(object){
                    if(object.structureType == STRUCTURE_ROAD & object.hits < object.hitsMax / 1.3){
                        return true;
                    }
                    else {
                        return false;
                    }
                } 
            });
            if(repRoad){
                creep.moveTo(repRoad);
                creep.repair(repRoad);
                //console.log('I am repairing roads now')
            }
            else {
                var targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType != STRUCTURE_ROAD & structure.structureType != STRUCTURE_WALL
                        & structure.hits != structure.hitsMax & structure.hits < wallRepLimit);
                    }
	            });
                if(targets) {
//                    console.log('I am repairing ' + targets);
                    if(creep.repair(targets) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets);
                    }
                }
            }
        }
    }
};


module.exports = roleRepairer;