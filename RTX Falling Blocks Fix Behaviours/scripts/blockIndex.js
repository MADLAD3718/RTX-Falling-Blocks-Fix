import { PistonActivateEvent, BlockLocation, world, EntitySpawnEvent, BlockPlaceEvent, BlockBreakEvent, BlockExplodeEvent } from "@minecraft/server";

/**
 * Indexes the non-static blocks surrounding block events and falling blocks.
 */
export class BlockIndex {
    /**
     * A list of block ids that correspond with non-static blocks.
     */
    #falling_blocks = ['minecraft:sand', 'minecraft:gravel', 'minecraft:anvil', 'minecraft:dragon_egg', 'minecraft:scaffolding', 'minecraft:concrete_powder', 'minecraft:pointed_dripstone', 'minecraft:snow_layer']
    constructor() {
        world.events.blockPlace.subscribe(event => this.#blockPlaceUpdate(event));
        world.events.blockBreak.subscribe(event => this.#blockBreakUpdate(event));
        world.events.entitySpawn.subscribe(event => this.#entityCreateUpdate(event));
        world.events.pistonActivate.subscribe(event => this.#pistonUpdate(event));
        world.events.blockExplode.subscribe(event => this.#explosionUpdate(event));
    }
    /**
     * Updates the block index surrounding a block place event.
     * @param {BlockPlaceEvent} event The block place event to upodate the index from.
     */
    #blockPlaceUpdate(event) {
        this.storeBlock(event.dimension.id, event.block.location.x, event.block.location.y, event.block.location.z, event.block.typeId);
        this.#indexSurroundingBlocks(event.dimension.id, event.block.location)
    }
    /**
     * Updates the block index surrounding a block break event.
     * @param {BlockBreakEvent} event The block break event to update the index from.
     */
    #blockBreakUpdate(event) {
        if (event.block.location.y < 319)
            this.#indexSurroundingBlocks(event.dimension.id, event.block.location.above());
        this.#indexSurroundingBlocks(event.dimension.id, event.block.location);
        this.#indexBelowBlocks(event.dimension.id, event.block.location);
    }
    /**
     * Uodate the block index upon a piston activate event.
     * @param {PistonActivateEvent} event Piston activate event to update block index from.
     */
    #pistonUpdate(event) {
        for (const blockLocation of event.piston.attachedBlocks) {
            const finalBlockLocation = new BlockLocation(blockLocation.x, blockLocation.y, blockLocation.z);
            const blockId = event.dimension.getBlock(finalBlockLocation).typeId;
            switch (event.block.permutation.getProperty('facing_direction').value) {
                case 'south':
                    event.piston.isRetracting ? finalBlockLocation.z++ : finalBlockLocation.z--;
                    break;
                case 'north':
                    event.piston.isRetracting ? finalBlockLocation.z-- : finalBlockLocation.z++;
                    break;
                case 'west':
                    event.piston.isRetracting ? finalBlockLocation.x-- : finalBlockLocation.x++;
                    break;
                case 'east':
                    event.piston.isRetracting ? finalBlockLocation.x++ : finalBlockLocation.x--;
                    break;
                case 'up':
                    event.piston.isRetracting ? finalBlockLocation.y-- : finalBlockLocation.y++;
                    break;
                case 'down':
                    event.piston.isRetracting ? finalBlockLocation.y++ : finalBlockLocation.y--;
            }
            this.storeBlock(event.dimension.id, finalBlockLocation.x, finalBlockLocation.y, finalBlockLocation.z, blockId);
            this.#indexBelowBlocks(event.dimension.id, blockLocation);
            this.#indexBelowBlocks(event.dimension.id, finalBlockLocation);
        }
    }
    /**
     * Updates the block index surrounding a falling block creation.
     * @param {EntitySpawnEvent} event 
     */
    #entityCreateUpdate(event) {
        if (event.entity.typeId !== "minecraft:falling_block") return;
        if (event.entity.location.y < 319)
            this.#indexSurroundingBlocks(event.entity.dimension.id, new BlockLocation(
                Math.floor(event.entity.location.x),
                Math.floor(event.entity.location.y + 1),
                Math.floor(event.entity.location.z)
            ));
        if (event.entity.location.y > -64)
            this.#indexSurroundingBlocks(event.entity.dimension.id, new BlockLocation(
                Math.floor(event.entity.location.x),
                Math.floor(event.entity.location.y - 1),
                Math.floor(event.entity.location.z)
            ));
    }
    /**
     * Updates the block index surrounding a block explode event.
     * @param {BlockExplodeEvent} event The block explode event to update the block index from.
     */
    #explosionUpdate(event) {
        const aboveBlockId = event.dimension.getBlock(event.block.location.above()).typeId;
        if (this.#falling_blocks.includes(aboveBlockId)) this.#indexSurroundingBlocks(event.dimension.id, event.block.location.above());
    }
    /**
     * Stores a block id in a specific location and dimension.
     * @param {String} dimension The dimension id the block is in.
     * @param {Number} x X position of the block.
     * @param {Number} y Y position of the block.
     * @param {Number} z Z position of the block.
     * @param {String} id The block id.
     */
    storeBlock(dimension, x, y, z, id) {
        if (!this.#falling_blocks.includes(id)) return;
        if (!this[dimension]) this[dimension] = {};
        switch (id) {
            case 'minecraft:snow_layer':
                const height = world.getDimension(dimension).getBlock(new BlockLocation(Math.floor(x), Math.floor(y), Math.floor(z))).permutation.getProperty("height").value;
                id = "minecraft:snow_layer_" + height;
                break;
            case "minecraft:sand":
                const sand_type = world.getDimension(dimension).getBlock(new BlockLocation(Math.floor(x), Math.floor(y), Math.floor(z))).permutation.getProperty("sand_type").value;
                if (sand_type === "red") id = "minecraft:red_sand";
                break;
            case "minecraft:concrete_powder":
                id += "_" + world.getDimension(dimension).getBlock(new BlockLocation(Math.floor(x), Math.floor(y), Math.floor(z))).permutation.getProperty("color").value;
                break;
            case "minecraft:anvil":
                const permutation = world.getDimension(dimension).getBlock(new BlockLocation(Math.floor(x), Math.floor(y), Math.floor(z))).permutation;
                const damage = permutation.getProperty("damage").value;
                id += damage === "slightly_damaged" ? '_1' : damage === "very_damaged" ? '_2' : '_0';
                if (permutation.getProperty("direction").value % 2 === 0) id += '_rotated';
                break;
            case "minecraft:pointed_dripstone":
                id += "_" + world.getDimension(dimension).getBlock(new BlockLocation(Math.floor(x), Math.floor(y), Math.floor(z))).permutation.getProperty("dripstone_thickness").value;
        }
        this[dimension][`${Math.floor(x)},${Math.floor(y)},${Math.floor(z)}`] = id;
    }
    /**
     * Returns a previously stored block id in a specific location and dimension.
     * @param {String} dimension The dimension id the block was in.
     * @param {Number} x X position of the block.
     * @param {Number} y Y position of the block.
     * @param {Number} z Z position of the block.
     * @returns {String | Object} The block id or data of the stored position.
     */
    getBlock(dimension, x, y, z) {
        return this[dimension]?.[`${Math.floor(x)},${Math.floor(y)},${Math.floor(z)}`];
    }
    /**
     * Indexes the surrounding non-static blocks around a given block location.
     * @param {String} dimension The id of the dimension to update the index in.
     * @param {BlockLocation} location The location to index the surrounding blocks from.
     */
    #indexSurroundingBlocks(dimension, location) {
        const from = new BlockLocation(location.x - 10, location.y, location.z - 10);
        const to = new BlockLocation(from.x + 21, from.y, from.z + 21);
        for (const blockLocation of from.blocksBetween(to)) {
            const blockId = world.getDimension(dimension).getBlock(blockLocation).typeId;
            if (!this.#falling_blocks.includes(blockId) || blockLocation.y < -64 || blockLocation.y > 319) continue;
            if (this.getBlock(dimension, blockLocation.x, blockLocation.y, blockLocation.z) !== blockId) this.storeBlock(dimension, blockLocation.x, blockLocation.y, blockLocation.z, blockId);
        }
    }
    /**
     * Indexes the non-static blocks below a given block location.
     * @param {String} dimension The id of the dimension to update the index in.
     * @param {BlockLocation} location The location to index the surrounding blocks under.
     */
    #indexBelowBlocks(dimension, location) {
        const from = new BlockLocation(location.x, location.y - 1, location.z);
        const to = new BlockLocation(from.x, from.y - 20, from.z);
        for (const blockLocation of from.blocksBetween(to)) {
            const blockId = world.getDimension(dimension).getBlock(blockLocation).typeId;
            if (!this.#falling_blocks.includes(blockId)) continue;
            if (this.getBlock(dimension, blockLocation.x, blockLocation.y, blockLocation.z) !== blockId) this.storeBlock(dimension, blockLocation.x, blockLocation.y, blockLocation.z, blockId);
        }
    }
}