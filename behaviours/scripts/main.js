// src/main.js
import { EntitySpawnAfterEvent, world as world2 } from "@minecraft/server";

// node_modules/@madlad3718/mcvec3/dist/index.js
import { Direction } from "@minecraft/server";
var Vec3;
((Vec32) => {
  Vec32.Zero = { x: 0, y: 0, z: 0 };
  Vec32.Up = { x: 0, y: 1, z: 0 };
  Vec32.Down = { x: 0, y: -1, z: 0 };
  Vec32.North = { x: 0, y: 0, z: -1 };
  Vec32.South = { x: 0, y: 0, z: 1 };
  Vec32.East = { x: 1, y: 0, z: 0 };
  Vec32.West = { x: -1, y: 0, z: 0 };
  function isVector3(v) {
    return typeof v === "object" && "x" in v && "y" in v && "z" in v;
  }
  Vec32.isVector3 = isVector3;
  function isDirection(x) {
    return typeof x === "string";
  }
  function from(x, y, z) {
    if (isDirection(x)) {
      switch (x) {
        case Direction.Up:
          return Vec32.Up;
        case Direction.Down:
          return Vec32.Down;
        case Direction.North:
          return Vec32.North;
        case Direction.South:
          return Vec32.South;
        case Direction.East:
          return Vec32.East;
        case Direction.West:
          return Vec32.West;
      }
    }
    if (typeof x === "number") return {
      x,
      y: y ?? x,
      z: z ?? x
    };
    if (Array.isArray(x)) return {
      x: x[0],
      y: x[1],
      z: x[2]
    };
    throw new Error("Invalid input values for vector construction.");
  }
  Vec32.from = from;
  function toDirection(v) {
    const a = abs(v), s = sign(v);
    const max2 = Math.max(a.x, a.y, a.z);
    if (max2 === a.x)
      return s.x >= 0 ? Direction.East : Direction.West;
    else if (max2 === a.y)
      return s.y >= 0 ? Direction.Up : Direction.Down;
    else return s.z >= 0 ? Direction.South : Direction.North;
  }
  Vec32.toDirection = toDirection;
  function toArray(v) {
    const { x, y, z } = v;
    return [x, y, z];
  }
  Vec32.toArray = toArray;
  function toString(v) {
    const { x, y, z } = v;
    return [x, y, z].join(" ");
  }
  Vec32.toString = toString;
  function parse(s) {
    const [x, y, z] = s.split(" ").map(Number);
    return { x, y, z };
  }
  Vec32.parse = parse;
  function isnan(v) {
    return Number.isNaN(v.x) || Number.isNaN(v.y) || Number.isNaN(v.z);
  }
  Vec32.isnan = isnan;
  function isinf(v) {
    return !isinf(v);
  }
  Vec32.isinf = isinf;
  function isfinite(v) {
    return Number.isFinite(v.x) && Number.isFinite(v.y) && Number.isFinite(v.z);
  }
  Vec32.isfinite = isfinite;
  function equal(u, v) {
    return u.x === v.x && u.y === v.y && u.z === v.z;
  }
  Vec32.equal = equal;
  function min(u, v) {
    return {
      x: Math.min(u.x, v.x),
      y: Math.min(u.y, v.y),
      z: Math.min(u.z, v.z)
    };
  }
  Vec32.min = min;
  function max(u, v) {
    return {
      x: Math.max(u.x, v.x),
      y: Math.max(u.y, v.y),
      z: Math.max(u.z, v.z)
    };
  }
  Vec32.max = max;
  function clamp(v, min2, max2) {
    return {
      x: Math.min(Math.max(v.x, min2.x), max2.x),
      y: Math.min(Math.max(v.y, min2.y), max2.y),
      z: Math.min(Math.max(v.z, min2.z), max2.z)
    };
  }
  Vec32.clamp = clamp;
  function sign(v) {
    return {
      x: Math.sign(v.x),
      y: Math.sign(v.y),
      z: Math.sign(v.z)
    };
  }
  Vec32.sign = sign;
  function floor(v) {
    return {
      x: Math.floor(v.x),
      y: Math.floor(v.y),
      z: Math.floor(v.z)
    };
  }
  Vec32.floor = floor;
  function ceil(v) {
    return {
      x: Math.ceil(v.x),
      y: Math.ceil(v.y),
      z: Math.ceil(v.z)
    };
  }
  Vec32.ceil = ceil;
  function frac(v) {
    return {
      x: v.x - Math.floor(v.x),
      y: v.y - Math.floor(v.y),
      z: v.z - Math.floor(v.z)
    };
  }
  Vec32.frac = frac;
  function round(v) {
    return {
      x: Math.round(v.x),
      y: Math.round(v.y),
      z: Math.round(v.z)
    };
  }
  Vec32.round = round;
  function mod(u, v) {
    return {
      x: u.x % v.x,
      y: u.y % v.y,
      z: u.z % v.z
    };
  }
  Vec32.mod = mod;
  function neg(v) {
    return {
      x: -v.x,
      y: -v.y,
      z: -v.z
    };
  }
  Vec32.neg = neg;
  function abs(v) {
    return {
      x: Math.abs(v.x),
      y: Math.abs(v.y),
      z: Math.abs(v.z)
    };
  }
  Vec32.abs = abs;
  function add(u, v) {
    return {
      x: u.x + v.x,
      y: u.y + v.y,
      z: u.z + v.z
    };
  }
  Vec32.add = add;
  function sub(u, v) {
    return {
      x: u.x - v.x,
      y: u.y - v.y,
      z: u.z - v.z
    };
  }
  Vec32.sub = sub;
  function mul(v, m) {
    if (isVector3(m)) return {
      x: v.x * m.x,
      y: v.y * m.y,
      z: v.z * m.z
    };
    else return {
      x: v.x * m,
      y: v.y * m,
      z: v.z * m
    };
  }
  Vec32.mul = mul;
  function div(v, m) {
    if (isVector3(m)) return {
      x: v.x / m.x,
      y: v.y / m.y,
      z: v.z / m.z
    };
    else return {
      x: v.x / m,
      y: v.x / m,
      z: v.x / m
    };
  }
  Vec32.div = div;
  function sqrt(v) {
    return {
      x: Math.sqrt(v.x),
      y: Math.sqrt(v.y),
      z: Math.sqrt(v.z)
    };
  }
  Vec32.sqrt = sqrt;
  function exp(v) {
    return {
      x: Math.exp(v.x),
      y: Math.exp(v.y),
      z: Math.exp(v.z)
    };
  }
  Vec32.exp = exp;
  function exp2(v) {
    return {
      x: Math.pow(2, v.x),
      y: Math.pow(2, v.y),
      z: Math.pow(2, v.z)
    };
  }
  Vec32.exp2 = exp2;
  function log(v) {
    return {
      x: Math.log(v.x),
      y: Math.log(v.y),
      z: Math.log(v.z)
    };
  }
  Vec32.log = log;
  function log2(v) {
    return {
      x: Math.log2(v.x),
      y: Math.log2(v.y),
      z: Math.log2(v.z)
    };
  }
  Vec32.log2 = log2;
  function log10(v) {
    return {
      x: Math.log10(v.x),
      y: Math.log10(v.y),
      z: Math.log10(v.z)
    };
  }
  Vec32.log10 = log10;
  function pow(v, p) {
    if (isVector3(p)) return {
      x: Math.pow(v.x, p.x),
      y: Math.pow(v.y, p.y),
      z: Math.pow(v.z, p.z)
    };
    else return {
      x: Math.pow(v.x, p),
      y: Math.pow(v.y, p),
      z: Math.pow(v.z, p)
    };
  }
  Vec32.pow = pow;
  function sin(v) {
    return {
      x: Math.sin(v.x),
      y: Math.sin(v.y),
      z: Math.sin(v.z)
    };
  }
  Vec32.sin = sin;
  function asin(v) {
    return {
      x: Math.asin(v.x),
      y: Math.asin(v.y),
      z: Math.asin(v.z)
    };
  }
  Vec32.asin = asin;
  function sinh(v) {
    return {
      x: Math.sinh(v.x),
      y: Math.sinh(v.y),
      z: Math.sinh(v.z)
    };
  }
  Vec32.sinh = sinh;
  function asinh(v) {
    return {
      x: Math.asinh(v.x),
      y: Math.asinh(v.y),
      z: Math.asinh(v.z)
    };
  }
  Vec32.asinh = asinh;
  function cos(v) {
    return {
      x: Math.cos(v.x),
      y: Math.cos(v.y),
      z: Math.cos(v.z)
    };
  }
  Vec32.cos = cos;
  function acos(v) {
    return {
      x: Math.acos(v.x),
      y: Math.acos(v.y),
      z: Math.acos(v.z)
    };
  }
  Vec32.acos = acos;
  function cosh(v) {
    return {
      x: Math.cosh(v.x),
      y: Math.cosh(v.y),
      z: Math.cosh(v.z)
    };
  }
  Vec32.cosh = cosh;
  function acosh(v) {
    return {
      x: Math.acosh(v.x),
      y: Math.acosh(v.y),
      z: Math.acosh(v.z)
    };
  }
  Vec32.acosh = acosh;
  function tan(v) {
    return {
      x: Math.tan(v.x),
      y: Math.tan(v.y),
      z: Math.tan(v.z)
    };
  }
  Vec32.tan = tan;
  function atan(v) {
    return {
      x: Math.atan(v.x),
      y: Math.atan(v.y),
      z: Math.atan(v.z)
    };
  }
  Vec32.atan = atan;
  function tanh(v) {
    return {
      x: Math.tanh(v.x),
      y: Math.tanh(v.y),
      z: Math.tanh(v.z)
    };
  }
  Vec32.tanh = tanh;
  function atanh(v) {
    return {
      x: Math.atanh(v.x),
      y: Math.atanh(v.y),
      z: Math.atanh(v.z)
    };
  }
  Vec32.atanh = atanh;
  function above(v, s = 1) {
    return add(v, mul(Vec32.Up, s));
  }
  Vec32.above = above;
  function below(v, s = 1) {
    return add(v, mul(Vec32.Down, s));
  }
  Vec32.below = below;
  function north(v, s = 1) {
    return add(v, mul(Vec32.North, s));
  }
  Vec32.north = north;
  function south(v, s = 1) {
    return add(v, mul(Vec32.South, s));
  }
  Vec32.south = south;
  function east(v, s = 1) {
    return add(v, mul(Vec32.East, s));
  }
  Vec32.east = east;
  function west(v, s = 1) {
    return add(v, mul(Vec32.West, s));
  }
  Vec32.west = west;
  function dot(u, v) {
    return u.x * v.x + u.y * v.y + u.z * v.z;
  }
  Vec32.dot = dot;
  function cross(u, v) {
    return {
      x: u.y * v.z - u.z * v.y,
      y: u.z * v.x - u.x * v.z,
      z: u.x * v.y - u.y * v.x
    };
  }
  Vec32.cross = cross;
  function length(v) {
    return Math.hypot(v.x, v.y, v.z);
  }
  Vec32.length = length;
  function normalize(v) {
    return div(v, length(v));
  }
  Vec32.normalize = normalize;
  function distance(u, v) {
    return length(sub(u, v));
  }
  Vec32.distance = distance;
  function project(u, v) {
    return mul(v, dot(u, v) / dot(v, v));
  }
  Vec32.project = project;
  function reject(u, v) {
    return sub(u, project(u, v));
  }
  Vec32.reject = reject;
  function reflect(i, n) {
    return sub(i, mul(n, 2 * dot(n, i)));
  }
  Vec32.reflect = reflect;
  function refract(i, n, e) {
    const cosi = -dot(i, n);
    const sin2t = e * e * (1 - cosi * cosi);
    const cost = Math.sqrt(1 - sin2t);
    return add(mul(i, e), mul(n, e * cosi - cost));
  }
  Vec32.refract = refract;
  function lerp(u, v, t) {
    if (t === 0) return u;
    if (t === 1) return v;
    return {
      x: u.x + t * (v.x - u.x),
      y: u.y + t * (v.y - u.y),
      z: u.z + t * (v.z - u.z)
    };
  }
  Vec32.lerp = lerp;
  function slerp(u, v, t) {
    const cost = dot(u, v);
    const theta = Math.acos(cost);
    const sint = Math.sqrt(1 - cost * cost);
    const tu = Math.sin((1 - t) * theta) / sint;
    const tv = Math.sin(t * theta) / sint;
    return add(mul(u, tu), mul(v, tv));
  }
  Vec32.slerp = slerp;
  function rotate(v, k, t) {
    const cost = Math.cos(t), sint = Math.sin(t);
    const par = mul(k, dot(v, k)), per = sub(v, par), kxv = cross(k, v);
    return add(par, add(mul(per, cost), mul(kxv, sint)));
  }
  Vec32.rotate = rotate;
})(Vec3 || (Vec3 = {}));
var Mat3;
((Mat32) => {
  Mat32.Identity = {
    ux: 1,
    vx: 0,
    wx: 0,
    uy: 0,
    vy: 1,
    wy: 0,
    uz: 0,
    vz: 0,
    wz: 1
  };
  function isMatrix3(m) {
    return typeof m === "object" && "ux" in m && "vx" in m && "wx" in m && "uy" in m && "vy" in m && "wy" in m && "uz" in m && "vz" in m && "wz" in m;
  }
  Mat32.isMatrix3 = isMatrix3;
  function from(u, v, w) {
    return {
      ux: u.x,
      vx: v.x,
      wx: w.x,
      uy: u.y,
      vy: v.y,
      wy: w.y,
      uz: u.z,
      vz: v.z,
      wz: w.z
    };
  }
  Mat32.from = from;
  function col1(m) {
    return {
      x: m.ux,
      y: m.uy,
      z: m.uz
    };
  }
  Mat32.col1 = col1;
  function col2(m) {
    return {
      x: m.vx,
      y: m.vy,
      z: m.vz
    };
  }
  Mat32.col2 = col2;
  function col3(m) {
    return {
      x: m.wx,
      y: m.wy,
      z: m.wz
    };
  }
  Mat32.col3 = col3;
  function row1(m) {
    return {
      x: m.ux,
      y: m.vx,
      z: m.wx
    };
  }
  Mat32.row1 = row1;
  function row2(m) {
    return {
      x: m.uy,
      y: m.vy,
      z: m.wy
    };
  }
  Mat32.row2 = row2;
  function row3(m) {
    return {
      x: m.uz,
      y: m.vz,
      z: m.wz
    };
  }
  Mat32.row3 = row3;
  function transpose(m) {
    return {
      ux: m.ux,
      vx: m.uy,
      wx: m.uz,
      uy: m.vx,
      vy: m.vy,
      wy: m.vz,
      uz: m.wx,
      vz: m.wy,
      wz: m.wz
    };
  }
  Mat32.transpose = transpose;
  function mul(m, t) {
    if (isMatrix3(t)) return {
      ux: Vec3.dot(row1(m), col1(t)),
      vx: Vec3.dot(row1(m), col2(t)),
      wx: Vec3.dot(row1(m), col3(t)),
      uy: Vec3.dot(row2(m), col1(t)),
      vy: Vec3.dot(row2(m), col2(t)),
      wy: Vec3.dot(row2(m), col3(t)),
      uz: Vec3.dot(row3(m), col1(t)),
      vz: Vec3.dot(row3(m), col2(t)),
      wz: Vec3.dot(row3(m), col3(t))
    };
    else if (Vec3.isVector3(t)) return {
      x: Vec3.dot(row1(m), t),
      y: Vec3.dot(row2(m), t),
      z: Vec3.dot(row3(m), t)
    };
    else return {
      ux: m.ux * t,
      vx: m.vx * t,
      wx: m.wx * t,
      uy: m.uy * t,
      vy: m.vy * t,
      wy: m.wy * t,
      uz: m.uz * t,
      vz: m.vz * t,
      wz: m.wz * t
    };
  }
  Mat32.mul = mul;
  function trace(m) {
    return m.ux + m.vy + m.wz;
  }
  Mat32.trace = trace;
  function determinant(m) {
    return m.ux * m.vy * m.wz + m.uy * m.vz * m.wx + m.uz * m.vx * m.wy - m.wx * m.vy * m.uz - m.wy * m.vz * m.ux - m.wz * m.vx * m.uy;
  }
  Mat32.determinant = determinant;
  function cofactor(m) {
    return {
      ux: m.vy * m.wz - m.wy * m.vz,
      vx: m.wy * m.uz - m.uy * m.wz,
      wx: m.uy * m.vz - m.vy * m.uz,
      uy: m.wx * m.vz - m.vx * m.wz,
      vy: m.ux * m.wz - m.wx * m.uz,
      wy: m.vx * m.uz - m.ux * m.vz,
      uz: m.vx * m.wy - m.wx * m.vy,
      vz: m.wx * m.uy - m.ux * m.wy,
      wz: m.ux * m.vy - m.vx * m.uy
    };
  }
  Mat32.cofactor = cofactor;
  function adjugate(m) {
    return {
      ux: m.vy * m.wz - m.wy * m.vz,
      vx: m.wx * m.vz - m.vx * m.wz,
      wx: m.vx * m.wy - m.wx * m.vy,
      uy: m.wy * m.uz - m.uy * m.wz,
      vy: m.ux * m.wz - m.wx * m.uz,
      wy: m.wx * m.uy - m.ux * m.wy,
      uz: m.uy * m.vz - m.vy * m.uz,
      vz: m.vx * m.uz - m.ux * m.vz,
      wz: m.ux * m.vy - m.vx * m.uy
    };
  }
  Mat32.adjugate = adjugate;
  function inverse(m) {
    const det = determinant(m);
    if (det === 0) throw new Error("Matrix is not invertible.");
    return mul(adjugate(m), 1 / det);
  }
  Mat32.inverse = inverse;
  function buildTNB(n) {
    const u = Math.abs(n.y) === 1 ? Vec3.West : Vec3.normalize(Vec3.from(n.z, 0, -n.x));
    const w = Vec3.cross(n, u);
    return from(u, n, w);
  }
  Mat32.buildTNB = buildTNB;
})(Mat3 || (Mat3 = {}));

// src/block_map.js
import { Block, world } from "@minecraft/server";
var falling_blocks = [
  "minecraft:sand",
  "minecraft:gravel",
  "minecraft:anvil",
  "minecraft:chipped_anvil",
  "minecraft:damaged_anvil",
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
];
var BlockMap = /* @__PURE__ */ new Map();
world.beforeEvents.playerBreakBlock.subscribe((event) => logSurroundingBlocks(event.block));
world.afterEvents.playerPlaceBlock.subscribe((event) => {
  logBlock(event.block);
  logSurroundingBlocks(event.block);
});
world.afterEvents.entitySpawn.subscribe((event) => {
  const { entity } = event;
  if (!entity.isValid() || entity.typeId != "minecraft:falling_block") return;
  const { location, dimension } = entity;
  const block_location = Vec3.floor(Vec3.add(location, Vec3.Up));
  logSurroundingBlocks(dimension.getBlock(block_location));
});
world.beforeEvents.explosion.subscribe((event) => {
  for (const block of event.getImpactedBlocks()) {
    logBlock(block);
    logSurroundingBlocks(block);
  }
});
function logBlock(block) {
  const { typeId, location, dimension } = block, { heightRange } = dimension;
  if (!falling_blocks.includes(typeId)) return;
  BlockMap.set(Vec3.toString(location), getFallingBlockId(block));
  if (typeId == "minecraft:pointed_dripstone" && location.y > heightRange.min) logBlock(block.below());
}
function logSurroundingBlocks(block) {
  logBlock(block.north());
  logBlock(block.south());
  logBlock(block.east());
  logBlock(block.west());
  const { location, dimension } = block, { heightRange } = dimension;
  if (location.y < heightRange.max) logBlock(block.above());
  if (location.y > heightRange.min) logBlock(block.below());
}
function getFallingBlockId(block) {
  const { permutation, typeId } = block;
  const states = permutation.getAllStates();
  switch (typeId) {
    case "minecraft:snow_layer":
      return "rtx:falling_snow_layer_" + states["height"];
    case "minecraft:anvil":
    case "minecraft:chipped_anvil":
    case "minecraft:damaged_anvil":
      let id = "rtx:falling_" + typeId.slice(10);
      const direction = states["minecraft:cardinal_direction"];
      if (direction == "north" || direction == "south") id += "_rotated";
      return id;
    case "minecraft:pointed_dripstone":
      const thickness = states["dripstone_thickness"];
      return "rtx:falling_pointed_dripstone_" + (thickness == "merge" ? "tip" : thickness);
    default:
      return "rtx:falling_" + typeId.slice(10);
  }
}

// src/main.js
world2.afterEvents.entitySpawn.subscribe(fallingBlockSpawn);
function fallingBlockSpawn(event) {
  const { entity } = event;
  if (!entity.isValid() || entity.typeId != "minecraft:falling_block") return;
  const { dimension, location } = entity;
  const key = Vec3.toString(Vec3.floor(Vec3.above(location)));
  if (!BlockMap.has(key)) return;
  dimension.spawnEntity(BlockMap.get(key), location).applyImpulse(Vec3.from(0, -0.1, 0));
  BlockMap.delete(key);
}
