import { EntitySpawnEvent, Location, world } from "@minecraft/server";
import { BlockIndex } from "./blockIndex";

const blockIndex = new BlockIndex();
world.events.entitySpawn.subscribe(fallingBlockDisplay);

/**
 * Spawns a custom falling block entity when a vanilla falling block is spawned.
 * @param {EntitySpawnEvent} event The entity spawn event to spawn a custom falling block for.
 */
function fallingBlockDisplay(event) {
    if (event.entity.typeId !== "minecraft:falling_block") return;
    const location = new Location(event.entity.location.x, event.entity.location.y, event.entity.location.z);
    const originalBlockId = blockIndex[event.entity.dimension.id]?.[`${Math.floor(location.x)},${Math.floor(location.y)},${Math.floor(location.z)}`];
    if (originalBlockId == undefined) return;
    const entityId = "rtxfixes:falling_" + originalBlockId.slice(originalBlockId.indexOf(":") + 1);
    try {
        const falling_block = event.entity.dimension.spawnEntity(entityId, location);
        falling_block.setVelocity({ x: 0, y: -0.1, z: 0 });
    } catch {}
}