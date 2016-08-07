Hunter's Screep Code
===========================
Version 0.18a



To do list
===========================
o Harvesters need to deposit into links
o Refine repairers to fully repair instead of repairing to the set threshold.
o Add code for links.
o Repairers make poor decisions & prioritize poorly on what needs repairs.  Plz fix.



History
===========================

Version 0.18a
8/6
---------------------------
- Emergency upgrader fix.  They weren't going to storage ever.


Version 0.18
8/6
---------------------------
- If a source is blocked (by another harvester for example), then the harvester will go to storage and gather energy to distribute to extensions and towers.  Less downtime for harvesters especially in rooms with not much source access.
- Miners will drop off energy at links
- Upgraders will now take energy from links
- Link transferring to other links is not currently coded
- Added a storage threshold for tower healing.  If it's set at 100000, then towers will not heal walls if energy storage is less than 100000


Version 0.17c
8/5
---------------------------
- Emergy fix that actually fixes the towers for real.  No more colony collapse syndrome, thank you.


Version 0.17b
8/5
---------------------------
- Emergency repairer fix and emergency tower fix.  White-list code removed until it can be fixed.


Version 0.17a
8/4
---------------------------
- More settings for repairers, and fixes to undiscovered broken repairerer code.


Version 0.17
8/4
---------------------------
- Added white-list for towers.
- Fixed miners because they were doing weird stuff when dumping energy into storage.


Version 0.16
8/2
---------------------------
- Added builder nomads.
- Added wall repair settings to repairers.  (good for brand new walls)
- Added support for room 2 tower defense and healing.  (done poorly, needs fixing.)
- Fixed some broken stuff.


Version 0.15
8/1
---------------------------
- Refined the nomad code.  Now, a powerful room (room 1) can gift other creeps to other rooms.  When a nomad get's within range 5 of a flag, it's set loose and will go about it's normal behavior.  Only currently set up for nomad harvester.


Version 0.14
7/31
---------------------------
- Code is officially a mess.
- Added claimer role.  Moves based on flags.
- Added attacker role.  Also moves based on flags.
- Added support for room #2.  Spawns different sized creeps and counts it's population separately.
- Added creep.memory.bornIn to designate which room they originated from.  Can also be set to nomad, in which they will typically use sources for energy.
- Added some other settings to memory.
- Added some other things that I can't remember right now.
- Note: The update works well enough.  My brain hurts after going through hours of trying to reach some sort of workable management of multiple rooms.  Since my rooms are so incredibly different (one only has 1 source with 1 access point....) I ended up with completely separate controls for each room.


Version 0.13
7/28
---------------------------
- Added a new role: Miner.  Specifically they mine in uninhabited rooms.  They currently travel using Flag1 (place on foreign mine) and Flag2 (place on storage.)
- Harvesters now make better decisions regarding giving energy to turrets.
- Fixed several errors that were added with the settings from previous update.


Version 0.12
7/26/2016
---------------------------
- Added settings to main.js, repairers.ks, and upgraders.js.
- Upgraders now get their energy from storage instead of sources.
- Added some memory injections for starting a brand new respawn.
- Other minor fixes/upgrades.

Version 0.11
7/25/2016
---------------------------
- Tower fixed and given a heal wall mode when above 700 energy.
- Repairers set to only worry about buildings and not walls.
- Defcon countdown created to spawn emergency harvesters.
-	(...probably a better way to handle that, but that's good enough for now.)
- Greatly improved harvester logic.
- Added naming convention which assigns a serial number and a letter based on role.

Version 0.1
7/24/2016
---------------------------
- Initial code