
export const LEAGUE_SYSTEM = [
  { name: 'Sofa', color: '#94A3B8', ranks: ['Faulpelz', 'Schlafmütze', 'Drückeberger'] },
  { name: 'Aufbruch', color: '#FACC15', ranks: ['Neuling', 'Sucher', 'Talent'] },
  { name: 'Schub', color: '#FB923C', ranks: ['Macher', 'Motor', 'Antreiber'] },
  { name: 'Fokus', color: '#38BDF8', ranks: ['Kämpfer', 'Athlet', 'Spezialist'] },
  { name: 'Profi', color: '#4ADE80', ranks: ['Experte', 'Meister', 'Champion'] },
  { name: 'Elite', color: '#2DD4BF', ranks: ['Leader', 'Star', 'Koryphäe'] },
  { name: 'Olymp', color: '#A855F7', ranks: ['Titan', 'Idol', 'Legende'] },
  { name: 'Zenit', color: '#F43F5E', ranks: ['Unikat', 'Phänomen', 'Mythos'] }
];

export const getLeagueData = (leagueIdx) => LEAGUE_SYSTEM[leagueIdx] || LEAGUE_SYSTEM[0];