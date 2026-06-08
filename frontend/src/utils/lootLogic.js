import { mockCustomizables } from "@/mocks/Customizables";

export const RARITIES = {
  COMMON: { id: 'common', color: '#B2BEC3', label: 'Common' },
  RARE: { id: 'rare', color: '#0984E3', label: 'Rare' },
  EPIC: { id: 'epic', color: '#6C5CE7', label: 'Epic' },
  LEGENDARY: { id: 'legendary', color: '#F1C40F', label: 'Legendary' }
};

const COSMETIC_ITEMS = [
  ...mockCustomizables.frames,
  ...mockCustomizables.titles,
].map(item => {
  const matchedRarity = Object.values(RARITIES).find(r => r.id === item.rarityId) || RARITIES.COMMON;
  return {
    id: item.id,
    type: 'COLLECTIBLE',
    name: item.name,
    icon: item.icon,
    rarity: matchedRarity
  }
});

export const generateTripleLoot = (unlockedCustomizables = []) => {
  const currencyDrops = [
    { type: 'XP', amount: 50, rarity: RARITIES.COMMON, name: '50 XP' },
    { type: 'XP', amount: 100, rarity: RARITIES.RARE, name: '100 XP' },
    { type: 'XP', amount: 500, rarity: RARITIES.EPIC, name: '500 XP' },
    { type: 'LP', amount: 5, rarity: RARITIES.COMMON, name: '5 LP' },
    { type: 'LP', amount: 10, rarity: RARITIES.RARE, name: '10 LP' },
    { type: 'LP', amount: 50, rarity: RARITIES.EPIC, name: '50 LP' },
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