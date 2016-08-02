var roleClaimer = {

    /** @param {Creep} creep **/


    run: function(creep) {
        creep.moveTo(Game.flags.Claimers);
        console.log(creep.name)
        console.log(creep.claimController(creep.room.controller));

        if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
    }
};

module.exports = roleClaimer;