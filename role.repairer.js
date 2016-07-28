//-----SETTINGS-----

//Note - these repairers are meant to only repair roads and structures.  Instead, Extra turret energy is used to repair walls.

//Turn on road repair?
var roadRep = true;

//When to repair roads? 1.2 is 80%, 2 is 50%, 3 is 33%
var roadRepStart = 1.4;

//Turn on Structure repair?
var structureRep = true;

//Max structure hits heal?
var structureRepHits = 350000;

//-----SETTINGS-----


var roleRepairer = {
    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.carry.energy == 0) {
            var spwn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
            creep.moveTo(spwn);
            if((spwn.energy) > [0]) {
                spwn.transferEnergy(creep);
            }
            else {
//Not enough energy to repair
            }
        }
        else if (roadRep == true) {
//repair roads
            var repRoad = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function(object){
                    if(object.structureType == STRUCTURE_ROAD & object.hits < object.hitsMax / roadRepStart){
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
            else if (structureRep = true) {
//repair structures that aren't walls or roads
                var targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType != STRUCTURE_ROAD & structure.structureType != STRUCTURE_WALL
                        & structure.hits != structure.hitsMax) & structure.hits < structureRepHits;
                    }
	            });
                if(targets) {
                    if(creep.repair(targets) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets);
                    }
                }
            }
        }
    }
};

module.exports = roleRepairer;