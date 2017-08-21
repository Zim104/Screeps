var roleClaimer = {

    /** @param {Creep} creep **/

//Currently set to reserve

    run: function(creep) {
        creep.moveTo(Game.flags.Claimers);
//        console.log(creep.name)
//        console.log(creep.reserveController(creep.room.controller));

        if(creep.signController(creep.room.controller, "[8] Room property of the Zim AI. We are a proud and peaceful AI. Feel free to contact us") == ERR_NOT_IN_RANGE) {

        }

        if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            //creep.moveTo(creep.room.controller);
        }
    }
};

module.exports = roleClaimer;