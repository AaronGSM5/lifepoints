export const RARITIES = {
  COMMON: { id: 'common', color: '#B2BEC3', label: 'Common' },
  RARE: { id: 'rare', color: '#0984E3', label: 'Rare' },
  EPIC: { id: 'epic', color: '#6C5CE7', label: 'Epic' },
  LEGENDARY: { id: 'legendary', color: '#F1C40F', label: 'Legendary' }
};

export const CURRENCY_DROPS = [
  { type: 'XP', amount: 50, rarity: RARITIES.COMMON, name: '50 XP' },
  { type: 'XP', amount: 100, rarity: RARITIES.RARE, name: '100 XP' },
  { type: 'XP', amount: 500, rarity: RARITIES.EPIC, name: '500 XP' },
  { type: 'LP', amount: 5, rarity: RARITIES.COMMON, name: '5 LP' },
  { type: 'LP', amount: 10, rarity: RARITIES.RARE, name: '10 LP' },
  { type: 'LP', amount: 50, rarity: RARITIES.EPIC, name: '50 LP' },
];