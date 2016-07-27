Hunter's Screep Code
===========================
Version 0.12


To do list
===========================
o Refine repairers to fully repair instead of repairing to the set threshold.
o Maybe combining builders with repairers (with repairing getting a priority of course).
o Dynamic creep spawning based on energy available.


History
===========================

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