import { world, system, Player, Block, Dimension, Vector3 } from "@minecraft/server";

// ========================================
// CONFIGURAÇÕES DO VEIN MINE
// ========================================
const CONFIG = {
  maxBlocks: 64,           // Máximo de blocos que podem ser quebrados por veia
  maxDistance: 10,         // Distância máxima para procurar blocos conectados
  enabled: true            // Ativar/desativar o vein mine
};

// Lista de blocos que são considerados minérios
const ORES = new Set([
  "minecraft:coal_ore",
  "minecraft:deepslate_coal_ore",
  "minecraft:iron_ore",
  "minecraft:deepslate_iron_ore",
  "minecraft:copper_ore",
  "minecraft:deepslate_copper_ore",
  "minecraft:gold_ore",
  "minecraft:deepslate_gold_ore",
  "minecraft:redstone_ore",
  "minecraft:deepslate_redstone_ore",
  "minecraft:lit_redstone_ore",
  "minecraft:lit_deepslate_redstone_ore",
  "minecraft:emerald_ore",
  "minecraft:deepslate_emerald_ore",
  "minecraft:lapis_ore",
  "minecraft:deepslate_lapis_ore",
  "minecraft:diamond_ore",
  "minecraft:deepslate_diamond_ore",
  "minecraft:nether_gold_ore",
  "minecraft:nether_quartz_ore",
  "minecraft:ancient_debris"
]);

// ========================================
// FUNÇÕES AUXILIARES
// ========================================

const NEIGHBOR_OFFSETS: Vector3[] = [];
for (let x = -1; x <= 1; x++) {
  for (let y = -1; y <= 1; y++) {
    for (let z = -1; z <= 1; z++) {
      if (x === 0 && y === 0 && z === 0) continue;
      NEIGHBOR_OFFSETS.push({ x, y, z });
    }
  }
}

function positionKey(pos: Vector3): string {
  return `${pos.x},${pos.y},${pos.z}`;
}

/**
 * Encontra todos os blocos conectados do mesmo tipo usando BFS
 */
function findVein(
  startPos: Vector3,
  oreTypeId: string,
  dimension: Dimension
): Block[] {
  const vein: Block[] = [];
  const visited = new Set<string>();
  const queue: Vector3[] = [startPos];

  visited.add(positionKey(startPos));

  while (queue.length > 0 && vein.length < CONFIG.maxBlocks) {
    const currentPos = queue.shift()!;

    for (const offset of NEIGHBOR_OFFSETS) {
      const neighborPos: Vector3 = {
        x: currentPos.x + offset.x,
        y: currentPos.y + offset.y,
        z: currentPos.z + offset.z
      };

      const key = positionKey(neighborPos);
      if (visited.has(key)) continue;
      visited.add(key);

      // Limita distância do ponto inicial
      const dx = neighborPos.x - startPos.x;
      const dy = neighborPos.y - startPos.y;
      const dz = neighborPos.z - startPos.z;
      if (dx * dx + dy * dy + dz * dz > CONFIG.maxDistance * CONFIG.maxDistance) continue;

      try {
        const neighbor = dimension.getBlock(neighborPos);
        if (!neighbor) continue;
        if (neighbor.typeId !== oreTypeId) continue;

        vein.push(neighbor);
        queue.push(neighborPos);
      } catch {
        continue;
      }
    }
  }

  return vein;
}

// ========================================
// EVENTO PRINCIPAL
// ========================================

world.afterEvents.playerBreakBlock.subscribe((event) => {
  if (!CONFIG.enabled) return;

  // brokenBlockPermutation contém o tipo do bloco ANTES de ser quebrado
  const oreTypeId = event.brokenBlockPermutation.type.id;
  if (!ORES.has(oreTypeId)) return;

  const player = event.player;
  const dimension = event.dimension;
  const brokenPos: Vector3 = event.block.location;

  system.run(() => {
    const vein = findVein(brokenPos, oreTypeId, dimension);
    if (vein.length === 0) return;

    player.sendMessage(`§6[Vein Mine] §eQuebrando ${vein.length} bloco(s) conectado(s)...`);

    let index = 0;
    const interval = system.runInterval(() => {
      if (index >= vein.length) {
        system.clearRun(interval);
        return;
      }

      const block = vein[index];
      try {
        const loc = block.location;
        dimension.runCommand(
          `setblock ${loc.x} ${loc.y} ${loc.z} air destroy`
        );
      } catch {
        try { block.setType("minecraft:air"); } catch { /* ignore */ }
      }

      index++;
    }, 1);
  });
});

console.log("§a[Vein Mine] Script inicializado!");
