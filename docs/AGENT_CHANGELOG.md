# Agent-Änderungsverlauf (Chronologisch)

Diese Übersicht listet **Cursor-Agent-Unterhaltungen** mit kurzer Beschreibung, damit du einen Überblick hast und ggf. einen Stand wiederherstellen kannst.

**Quelle:** Transkripte in  
`~/.cursor/projects/Users-horus-Desktop-pvgb2026-pvgb2026/agent-transcripts/`  
(Jede Unterhaltung = ein Ordner mit einer `.jsonl`-Datei.)

**Stand wiederherstellen:**

- **Git:** `git log --oneline` → gewünschten Commit auswählen, dann  
  `git checkout <commit-hash>` (nur lesen) oder  
  `git reset --hard <commit-hash>` (Branch auf diesen Stand zurücksetzen).
- **Einzelne Dateien:** `git show <commit-hash>:<pfad>` ansehen oder  
  `git checkout <commit-hash> -- <pfad>` um eine Datei aus einem Commit zu holen.

---

## Chronologische Liste (neueste zuerst)

| Datum/Zeit   | Chat-ID (UUID)   | Kurzbeschreibung |
|-------------|------------------|-------------------|
| 2026-02-23 22:52 | `88b037e3-84b5-4e7b-8366-477e7da89752` | **Content Blocks / Feature19** – Shadcnblocks Feature19 nachgebaut (2-Spalten-Feature mit Tabs, Bild rechts). Feature19-Block Config + Component, fix-sqlite-schema für Feature19-Tabellen, ensure-feature19-tables. |
| 2026-02-23 22:43 | `510d0ced-ab14-45e7-908e-03b3a627141d` | **Logo-Animation** – Dezente Logo-Animation (Fade + Scale beim Laden, Hover-Scale) in Logo-Komponente und globals.css. |
| 2026-02-23 22:41 | `4fece30d-f350-4382-8353-178e39fa7c60` | **Vercel Upload / Blob** – Sicherstellen, dass bei Deployments auf Vercel hinterlegte Daten (z. B. Bilder) nicht überschrieben werden. DEPLOYMENT.md, Hinweise zu BLOB_READ_WRITE_TOKEN. |
| 2026-02-23 22:21 | `855d6461-30cd-465f-a7b0-8017bba6d9c9` | **Hero in Payload integrieren** – Neuen Hero in Payload CMS integriert (Pages-Collection, PhilippBacherHero, linkGroup, Bedingungen). |
| 2026-02-21 12:49 | `1bcb557d-e565-4281-bab8-5279485d1de8` | **Hero-Responsivität** – Analyse angehängter Screenshots: Hero-Text überdeckt Vordergrundbild; Vordergrundbild auf Landscape-Mobil zu klein. Anpassungen: Text an Fuß des Heroes (justify-end), größeres Vordergrundbild (landscape-short, 65vw/520px). |

*(Die UUIDs verweisen auf Ordner in  
`~/.cursor/projects/Users-horus-Desktop-pvgb2026-pvgb2026/agent-transcripts/<uuid>/`.)*

---

## Hinweis

- Es werden nur **über die Transkript-Dateien** sichtbare Chats erfasst; nicht alle Agent-Läufe haben ein gespeichertes Transkript.
- Für **vollständige Code-Stände** ist Git die Referenz: `git log`, `git diff`, `git checkout` / `git reset`.
