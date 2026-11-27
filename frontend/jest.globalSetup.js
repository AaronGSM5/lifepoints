// Feste Zeitzone für alle Tests, damit Datums-Tests auf jedem Rechner gleich laufen.
// Läuft vor dem Start der Worker, die die Variable erben.
module.exports = () => {
  process.env.TZ = "Europe/Berlin";
};
