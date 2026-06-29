
export const LEAGUE_SYSTEM = [
  { name: 'Couch', color: '#94A3B8', ranks: ['Couch Potato', 'Sleepyhead', 'Dodger'] },
  { name: 'Rising', color: '#FACC15', ranks: ['Rookie', 'Seeker', 'Talent'] },
  { name: 'Boost', color: '#FB923C', ranks: ['Hustler', 'Engine', 'Pusher'] },
  { name: 'Focus', color: '#38BDF8', ranks: ['Fighter', 'Athlete', 'Specialist'] },
  { name: 'Pro', color: '#4ADE80', ranks: ['Expert', 'Master', 'Champion'] },
  { name: 'Elite', color: '#2DD4BF', ranks: ['Leader', 'Star', 'Luminary'] },
  { name: 'Olympus', color: '#A855F7', ranks: ['Titan', 'Idol', 'Legend'] },
  { name: 'Zenith', color: '#F43F5E', ranks: ['Prodigy', 'Phenomenon', 'Myth'] }
];

export const getLeagueData = (leagueIdx) => LEAGUE_SYSTEM[leagueIdx] || LEAGUE_SYSTEM[0];