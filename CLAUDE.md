## Git-Workflow
- Änderungen lokal committen, aber NICHT automatisch pushen.
- Erst pushen, wenn der Nutzer explizit "push" oder "deploy" sagt.
- Mehrere kleine Commits vor dem Push zu einem sinnvollen Commit zusammenfassen (git rebase -i oder squash), außer der Nutzer sagt etwas anderes.

## Build
- `src/payload-types.ts` und `public/icons-sprite.svg` sind generierte, aber committete Dateien. Sie werden NICHT mehr automatisch im `build`-Script erzeugt.
- Nach Änderungen an Icons (`src/scripts/generate-icon-sprite.ts`-Quellen) manuell `pnpm generate:icon-sprite` ausführen und das Ergebnis committen.
- Nach Änderungen an Payload-Collections/-Config manuell `pnpm generate:types` ausführen und das Ergebnis committen.
- `payload migrate` bleibt im Build-Script (Prod-Konsistenz), ist aber ein No-op ohne offene Migration.
