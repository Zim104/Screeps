var roleAttacker = {

    /** @param {Creep} creep **/


    run: function(creep) {
        creep.moveTo(Game.flags.Attackers)
        var enemies= creep.room.find(Game.HOSTILE_CREEPS);
        if (creep.attack(enemies[0]) == -7) {
            creep.moveTo(Game.flags.Attackers)
        }
        else {
            creep.moveTo(enemies[0]);
        }
    }
};

module.exports = roleAttacker;