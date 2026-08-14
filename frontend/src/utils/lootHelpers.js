import { CURRENCY_DROPS, RARITIES } from "@/constants/Loot";
import { mockCustomizables } from "@/mocks/Customizables";

const COSMETIC_ITEMS = [
  ...mockCustomizables.frames,
  ...mockCustomizables.badges.filter(entry => entry.id !== 'badge_none'),
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
  // every not unlocked COSMETIC
  const availableCosmetics = COSMETIC_ITEMS.filter(
    item => !unlockedCustomizables.includes(item.id)
  );

  const allPossibleDrops = [...CURRENCY_DROPS, ...availableCosmetics];

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