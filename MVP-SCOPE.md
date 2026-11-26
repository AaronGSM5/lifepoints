# LifePoints – MVP-Scope

Stand: 2026-11-26 · Branch `mvp`

Ziel des MVP: der erste echte Testlauf mit dem Kern-Loop **Anmelden → Task tracken → abhaken → LP/XP/Level → teilen & Freunden folgen**.
Alles andere bleibt im Code, ist aber über Feature-Flags aus Navigation und UI genommen.

## So funktioniert das Ausblenden

- Zentrale Schalter: `frontend/src/constants/FeatureFlags.js` (`FEATURES`).
  Ein Feature wieder einschalten = Flag auf `true` setzen. Es wird kein Code gelöscht.
- `ROUTE_FEATURES` ordnet Routen den Flags zu. Der Root-Guard in `src/app/_layout.jsx` leitet Deep-Links auf deaktivierte Routen nach `/home` um.
- Tabs: `Navbar.jsx` filtert über `TAB_FEATURES`, `(tabs)/_layout.jsx` setzt `href: null`.
- Sub-Tabs, Toolbar-Icons, Settings-Einträge (`feature`-Feld in `SettingsConfig.js`) und Profil-Sektionen lesen dieselben Flags.
- Tests: Die bestehenden Screen-Tests laufen mit allen Flags auf `true` und sichern damit den vollen Umfang ab. `__tests__/screens/mvp-scope.test.jsx` prüft das MVP-Verhalten mit den echten Flags.

## DRIN (Core Loop)

| Bereich | Umfang im MVP |
|---|---|
| Einstieg | Onboarding-Slides → Login/Registrierung (Appwrite) → E-Mail-Verifikation. Die Survey wird übersprungen. |
| Tasks › Today | Getrackte Tasks aus dem Store (API- und Katalog-Tasks), „Erledigt“ → Erfolgsscreen |
| Tasks › Catalog | Kategorien-Rails aus `GET /tasks`, Track und Insta-Track |
| Task-Detail | Beschreibung, eigene Historie, „Track now“, Erledigt-Haken |
| Belohnung | LP, XP, Level, LevelUp-Modal, LP-Anzeige im Toolbar |
| Quests | Daily/Weekly-Quests im QuestModal mit echtem Fortschritt und Einlösen. Nur Quests mit automatischem Trigger (`TASK_COMPLETED`) |
| Home-Feed | Bild-Posts, Aktionsleiste „Herz + Like-Zahl“ links und „Teilen“ rechts, eigene Posts zuerst |
| Post erstellen | Bild + Beschreibung + ein in den letzten 24 h erledigter Task |
| Social | „Freunde“: einseitig folgen, Live-Suche (Teil von Name oder Benutzername), Vorschläge, Einladen-Karte (nur hier, nicht im Profil) |
| Profil | Header (Avatar, Name, Level/XP), Journal, Profil bearbeiten |
| Settings | Profil, Sicherheit, Sprache, Hilfe, Datenschutz, AGB, Logout |

## SPÄTER (V1.1) – per Flag ausgeblendet

| Flag | Was |
|---|---|
| `shop` | Shop-Tab, `reward/[id]`, LP-Icon → Shop |
| `routines` | Routinen-Tab, `routine/*`, öffentliche Routinen |
| `trophies` | Trophäen-Sektion, `trophies`, `trophy/[id]`, TrophyPopup |
| `customizables` | Frames, Status-Badges, `customizables` |
| `profileStats` | Streak/Statistik-Kacheln |
| `onboardingGuide` | Onboarding-Checkliste im Profil |
| `notifications`, `notificationSettings` | Push-Prompt, Notifications-Screen, Glocke, Push-Settings |
| `communities` | Explore, `community/[id]`, `mycommunity/*`, Community erstellen |
| `comments` | CommentSheet |
| `heroCarousel`, `forYouTasks` | Event-Banner, „For You“-Empfehlungen |
| `appearance` | Farbthemes und App-Icon (Dark Mode bleibt Default) |
| `suggestTask` | Task-Vorschlag im Catalog |

## RAUS (Over-Engineering für den MVP) – per Flag ausgeblendet

| Flag | Was | Grund |
|---|---|---|
| `chat` | 1:1- und Community-Chat | Echtzeit-Infrastruktur, Moderation |
| `videoPosts`, `feedInfiniteScroll` | Video-Posts, Reels, künstliches Nachladen | Media-Pipeline |
| `lootGame` | Loot-Truhen im Feed | serverseitiger RNG, Anti-Cheat |
| `postOptions` | Melden/Löschen-Sheet | Moderations-Workflow |
| `savePosts` | Lesezeichen im Feed | ohne „Gespeichert“-Ansicht wirkungslos, bräuchte eigene Sammlung im Backend |
| `search` | globale Suche | Volltextindex |
| `taskSearch` | Catalog-Suchfeld (ohne Funktion) | Dummy |
| `taskSubsteps` | Substeps an aktiven Tasks | Sub-Entities pro Activity |
| `subscription`, `linkedServices`, `clearCache` | Abo, verknüpfte Dienste, Cache | Payments bzw. Dummy |
| `onboardingSurvey` | Fragebogen | Daten ungenutzt, wirkt wie Marktforschung |
| `devTools` | Logo → `/dev`, Profil-Reset | nur im Dev-Build aktiv |

## Core-Loop-Fixes in diesem Branch

- Eine ID-Welt: `normalizeTask` (`utils/taskHelpers.js`) vereinheitlicht API-Tasks (`_id`, `lifepoints`) und Katalog-Tasks (`id`, `lp`). `trackTask` und `completeTask` nehmen Objekte oder IDs an und speichern Snapshots (`trackedTasks`).
- `completeTask` vergibt zentral LP, XP (ohne eigenes XP gilt XP = LP) und Quest-Fortschritt und gibt den Task zurück. Vorher bekam Insta-Track aus dem Catalog weder LP noch XP.
- Today zeigt die echten getrackten Tasks statt Mock-Daten. Der Empty-State-Bug (`length === 1`) ist behoben.
- QuestModal ist an `questProgress` und `claimQuestReward` angebunden. Daily- und Weekly-Reset laufen clientseitig (`syncQuestPeriods`), der Fortschritt bleibt über App-Neustarts erhalten.
- Registrierung leitet auf die existierende Route `/auth/email-verification`, nicht mehr auf `/auth/verify-email`.
- Feed: kein Platzhalter-Link `task/dasIstNurEinPlatzhalter` mehr. Task-Zeile und LP kommen aus dem Post.
- Profil und Journal nutzen `useProfileView`: Fortschritt aus dem Store, Stammdaten aus `/pages/user`, falls das Backend erreichbar ist. „Profil bearbeiten“ speichert lokal und synchronisiert best effort.

## Backend-Bedarf für den MVP (Nächste Schritte)

Lokal persistierte Zustände, die als Nächstes serverseitig werden müssen:

1. **Activities**: `POST /activities/task/:id` existiert. Es fehlen Abschluss inkl. LP/XP-Vergabe und `GET /activities/me` für das Journal.
2. **Profil**: `PATCH /profile/update` (vom Frontend aufgerufen, Route fehlt), Avatar-Upload.
3. **Posts**: `POST /posts` (Bild-Upload), `GET /posts/feed` (gefolgte + eigene, chronologisch, Cursor-Pagination wie `task.services.ts`), `POST/DELETE /posts/:id/like`.
4. **Folgen**: `POST/DELETE /users/:id/follow`, `GET /users/me/following`, `GET /users/by-username/:name`.
5. **Quests**: Fortschritt serverseitig, Reset per Tages- und Wochenfenster (ersetzt `syncQuestPeriods`).
6. **Konto löschen**: Pflicht für die App Stores. Der Settings-Eintrag existiert, ist aber noch ein Dummy.

## Bekannte Restpunkte

- Ohne `.env` (Appwrite) und laufendes Backend sind Login und Catalog nicht nutzbar. Freunde-Vorschläge und Feed basieren bis zum Backend auf Mock-Daten (`mocks/PublicProfile.js`, `mocks/FeedData.js`).
- Der Text im Post-Formular nennt noch „Bild oder Video“, obwohl nur Bilder wählbar sind.
- Schon vorhanden und nicht Teil dieses Branches: 2 zeitzonenabhängige Tests in `dateHelpers.test.js` sowie 3 ESLint-Fehler (fehlende `react-hooks`-Regeldefinitionen, Import-Sortierung in `community/[id].jsx`).
