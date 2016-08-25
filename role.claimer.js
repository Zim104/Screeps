var roleClaimer = {

    /** @param {Creep} creep **/

//Currently set to reserve

    run: function(creep) {
        creep.moveTo(Game.flags.Claimers);
//        console.log(creep.name)
//        console.log(creep.reserveController(creep.room.controller));

        if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            //creep.moveTo(creep.room.controller);
        }
    }
};

module.exports = roleClaimer;