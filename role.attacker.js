var roleAttacker = {

    /** @param {Creep} creep **/


    run: function(creep) {

         if (creep.memory.goFlag == "1"){
             creep.moveTo(Game.flags.Attackers)
             if (creep.pos.inRangeTo(Game.flags.Attackers, 3) == '1') {
                 creep.memory.goFlag ="0"
                 console.log("Attackers clearing goflag")
             }
         }

        var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
            //filter: function(creep) {
            //    return creep.getActiveBodyparts(ATTACK) >= 1 || creep.getActiveBodyparts(RANGED_ATTACK) >= 1;
            //}
        });

        if (!target) {
            target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        }
        if (target) {
            if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                if (creep.moveTo(target) == ERR_NO_BODYPART) {
                    creep.suicide();
                }
            }
        }
        else {
            creep.moveTo(Game.flags.Attackers);
        }
        //creep.moveTo(Game.flags.Attackers);
    }
};

module.exports = roleAttacker;