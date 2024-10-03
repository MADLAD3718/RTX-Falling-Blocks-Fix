import { PropertyOutOfBoundsError } from "@minecraft/common";

import { EntitySpawnAfterEvent, world } from "@minecraft/server";
import { Unit, add, floor, stringifyVec } from "./extensions/vectors";
import { BlockMap } from "./block_map";

world.afterEvents.entitySpawn.subscribe(fallingBlockSpawn);

/**
 * Creates a falling block display entity upon a falling block spawn event.
 * @param {EntitySpawnAfterEvent} event 
 */
function fallingBlockSpawn(event) {
    const { entity } = event;
    if (!entity.isValid() || entity.typeId != "minecraft:falling_block") return;
    const { dimension, location } = entity;
    const key = stringifyVec(floor(add(location, Unit.Up)));
    if (!BlockMap.has(key)) return;
    dimension.spawnEntity(BlockMap.get(key), location).applyImpulse({ x: 0, y: -0.1, z: 0 });
    BlockMap.delete(key);
}
