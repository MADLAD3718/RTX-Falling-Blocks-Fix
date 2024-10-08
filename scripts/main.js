import { EntitySpawnAfterEvent, world } from "@minecraft/server";
import { Vec3 } from "@madlad3718/mcvec3";
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
    const key = Vec3.toString(Vec3.floor(Vec3.above(location)));
    if (!BlockMap.has(key)) return;
    dimension.spawnEntity(BlockMap.get(key), location).applyImpulse(Vec3.from(0, -0.1, 0));
    BlockMap.delete(key);
}
