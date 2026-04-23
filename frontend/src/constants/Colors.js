export const DarkTheme = {
  text: 'rgb(248, 250, 252)',
  background: 'rgb(15, 23, 41)',
  primary: 'rgb(26, 34, 53)',
  secondary: 'rgb(36, 53, 82)',
  primaryAccent: 'rgb(47, 196, 146)',
  secondaryAccent: 'rgb(255, 0, 255)',
  gold: '#FFD700',
  muted: 'rgba(248, 250, 252, 0.5)',
  success: 'rgb(0, 240, 160)',
  warning: 'rgb(240, 0, 0)',
  separator: "rgba(0,0,0,0.08)",
  glas: "rgba(255,255,255,0.05)"
};

export const LightTheme = {
  text: 'rgb(15, 23, 41)',
  background: 'rgb(248, 250, 252)',
  primary: 'rgb(255, 255, 255)',
  secondary: 'rgb(226, 232, 240)',
  primaryAccent: 'rgb(47, 196, 146)',
  secondaryAccent: 'rgb(255, 0, 255)',
  gold: '#FFD700',
  muted: 'rgba(15, 23, 41, 0.5)',
  success: 'rgb(0, 200, 130)',
  warning: 'rgb(220, 38, 38)',
  separator: "rgba(0, 0, 0, 0.06)",
  glas: "rgba(255, 255, 255, 0.7)"
};

export const MyTheme = { ...LightTheme };

export const applyTheme = (isDark) => {
  const newTheme = isDark ? DarkTheme : LightTheme;
  Object.assign(MyTheme, newTheme);
};