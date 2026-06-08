
export const RARITIES = {
  COMMON: { id: 'common', color: '#B2BEC3', label: 'Common' },
  RARE: { id: 'rare', color: '#0984E3', label: 'Rare' },
  EPIC: { id: 'epic', color: '#6C5CE7', label: 'Epic' },
  LEGENDARY: { id: 'legendary', color: '#F1C40F', label: 'Legendary' }
};

const COSMETIC_ITEMS = [
  { id: 'frame_neon', type: 'COLLECTIBLE', name: 'Neon Rahmen', rarity: RARITIES.EPIC, icon: 'hexagon' },
  { id: 'frame_fire', type: 'COLLECTIBLE', name: 'Feuer Rahmen', rarity: RARITIES.LEGENDARY, icon: 'fire' },
  { id: 'coll_plant', type: 'COLLECTIBLE', name: 'Kaktus des Fokus', rarity: RARITIES.RARE, icon: 'tree' },
  { id: 'coll_crown', type: 'COLLECTIBLE', name: 'Krone der Disziplin', rarity: RARITIES.LEGENDARY, icon: 'crown' },
];

export const generateTripleLoot = (unlockedCustomizables = []) => {
  const currencyDrops = [
    { type: 'XP', amount: 50, rarity: RARITIES.COMMON, name: '50 XP' },
    { type: 'LP', amount: 10, rarity: RARITIES.RARE, name: '10 LP' },
    { type: 'XP', amount: 500, rarity: RARITIES.EPIC, name: '500 XP' },
  ];

  const availableCosmetics = COSMETIC_ITEMS.filter(
    item => !unlockedCustomizables.includes(item.id)
  );

  const allPossibleDrops = [...currencyDrops, ...availableCosmetics];

  const shuffled = allPossibleDrops.sort(() => 0.5 - Math.random());
  const selectedLoot = shuffled.slice(0, 3);

  const hasHighRarity = selectedLoot.some(item =>
    item.rarity.id === 'epic' || item.rarity.id === 'legendary'
  );

  if (!hasHighRarity) {
    const availableHighRarityPool = allPossibleDrops.filter(
      item => item.rarity.id === 'epic' || item.rarity.id === 'legendary'
    );

    if (availableHighRarityPool.length > 0) {
      const fallbackItem = availableHighRarityPool[Math.floor(Math.random() * availableHighRarityPool.length)];
      selectedLoot[2] = fallbackItem;
    }
  }

  return selectedLoot.sort(() => 0.5 - Math.random());
};