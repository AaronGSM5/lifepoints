import { trophyImages } from "./TrophyAssets";

export const trophiesCatalog = [
  {
    id: 1,
    title: "Gym Rat",
    description: "You've consistently hit the gym a Week. Keep grinding!",
    icon: trophyImages['gymTrans'],
    requirement: 'Hit gym for 7 Days',
    goal: 7
  },
  {
    id: 2,
    title: "Early Riser",
    description: 'Early bird gets the worm - and the LP!\nA perfect start to a productive life.',
    icon: trophyImages['sleepTrans'],
    requirement: 'Track 10 Tasks before 7:00 AM',
    goal: 10
  },
  {
    id: 3,
    title: "Reader",
    description: "Knowledge is power.\nBy completing your monthly reading goal and sharing your key insights, you've unlocked this scholarly honor.",
    icon: trophyImages['bookTrans'],
    requirement: 'Track reading 12 times',
    goal: 12
  },
  {
    id: 4,
    title: "Sugar Free",
    description: "14 days without refined sugar!\nYou've mastered self-discipline and fueled your body with the good stuff. Your health is your wealth.",
    icon: trophyImages['candyTrans'],
    requirement: '14 Days without sugar',
    goal: 14
  }
];