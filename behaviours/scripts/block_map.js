import { add, floor, Unit } from "./extensions/vectors";
import { Block, world } from "@minecraft/server";

const falling_blocks = [
    "minecraft:sand",
    "minecraft:gravel",
    "minecraft:anvil",
    "minecraft:dragon_egg",
    "minecraft:scaffolding",
    "minecraft:black_concrete_powder",
    "minecraft:blue_concrete_powder",
    "minecraft:brown_concrete_powder",
    "minecraft:cyan_concrete_powder",
    "minecraft:gray_concrete_powder",
    "minecraft:green_concrete_powder",
    "minecraft:light_blue_concrete_powder",
    "minecraft:light_gray_concrete_powder",
    "minecraft:lime_concrete_powder",
    "minecraft:magenta_concrete_powder",
    "minecraft:orange_concrete_powder",
    "minecraft:pink_concrete_powder",
    "minecraft:purple_concrete_powder",
    "minecraft:red_concrete_powder",
    "minecraft:white_concrete_powder",
    "minecraft:yellow_concrete_powder",
    "minecraft:pointed_dripstone",
    "minecraft:snow_layer",
    "minecraft:suspicious_sand",
    "minecraft:suspicious_gravel"
]

/** @type {Map<String, String>} */
export const BlockMap = new Map;

world.beforeEvents.playerBreakBlock.subscribe(event => logSurroundingBlocks(event.block));
world.afterEvents.playerPlaceBlock.subscribe(event => {
    logBlock(event.block);
    logSurroundingBlocks(event.block);
});
world.afterEvents.entitySpawn.subscribe(event => {
    const { entity } = event;
    if (!entity.isValid() || entity.typeId != "minecraft:falling_block") return;
    const { location, dimension } = entity;
    const block_location = floor(add(location, Unit.Up));
    logSurroundingBlocks(dimension.getBlock(block_location));
});
world.beforeEvents.explosion.subscribe(event => {
    for (const block of event.getImpactedBlocks()) {
        logBlock(block);
        logSurroundingBlocks(block);
    }
});
// world.beforeEvents.pistonActivate.subscribe(event => {
//     for (const location of event.piston.getAttachedBlocks()) {
//         const block = event.dimension.getBlock(location);
//         logSurroundingBlocks(block);
//         if (!falling_blocks.includes(block.typeId)) continue;
//         const direction = pistonDirectionToVector(event.block.permutation.getState("facing_direction"));
//         const position = event.isExpanding ? add(location, direction) : sub(location, direction);
//         BlockMap.set(stringifyVec(position), getFallingBlockId(block));
//     }
// });

/**
 * Logs a falling block to the block map.
 * @param {Block} block
 */
function logBlock(block) {
    const { typeId, location, dimension } = block, { heightRange } = dimension;
    if (!falling_blocks.includes(typeId)) return;
    BlockMap.set(stringifyVec(location), getFallingBlockId(block));
    if (typeId == "minecraft:pointed_dripstone" &&
        location.y > heightRange.min) logBlock(block.below());
}

/**
 * Logs the surrounding falling blocks to the block map.
 * @param {Block} block 
 */
function logSurroundingBlocks(block) {
    logBlock(block.north());
    logBlock(block.south());
    logBlock(block.east());
    logBlock(block.west());
    const { location, dimension } = block, { heightRange } = dimension;
    if (location.y < heightRange.max) logBlock(block.above());
    if (location.y > heightRange.min) logBlock(block.below());
}

/**
 * Returns a falling block id depending on the given block.
 * @param {Block} block 
 * @returns {String}
 */
function getFallingBlockId(block) {
    const { permutation, typeId } = block;
    const states = permutation.getAllStates();
    switch (typeId) {
        case 'minecraft:snow_layer':
            return "rtx:falling_snow_layer_" + states["height"];
        case "minecraft:anvil":
            let id = "rtx:falling_anvil";
            const damage = states["damage"];
            id += damage == "slightly_damaged" ? '_1' : damage == "very_damaged" ? '_2' : '_0';
            const direction = states["minecraft:cardinal_direction"];
            if (direction == "north" || direction == "south") id += '_rotated';
            return id;
        case "minecraft:pointed_dripstone":
            const thickness = states["dripstone_thickness"];
            return "rtx:falling_pointed_dripstone_" + (thickness == "merge" ? "tip" : thickness);
        default: return "rtx:falling_" + block.typeId.slice(10);
    }
}