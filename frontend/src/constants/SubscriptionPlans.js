export const SUBSCRIPTION_PLANS = [
  {
    id: "standard",
    title: "LifePoints Standard",
    isFree: true,
    priceMonthly: null,
    priceYearly: null,
    priceTotalYearly: null,
    features: [
      "Track impact",
      "Standard Rewards",
      "Standard Look"
    ]
  },
  {
    id: "plus",
    title: "LifePoints+",
    isFree: false,
    priceMonthly: "€1.99",
    priceYearly: "€0.99",
    priceTotalYearly: "€11.88",
    features: [
      "Everything from Standard",
      "Advanced Statistics",
      "Ad-free",
      "Custom Profile & Community Banners"
    ]
  },
  {
    id: "premium",
    title: "LifePoints Premium",
    isFree: false,
    priceMonthly: "€9.99",
    priceYearly: "€4.99",
    priceTotalYearly: "€59.88",
    features: [
      "Everything from LifePoints+",
      "Mentor Status",
      "Charity-Voting",
      "Maximum Freedom",
      "Smart Community Administration",
      "Custom Themes"
    ]
  }
];