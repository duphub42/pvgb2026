# Portfolio-Unterseiten Konzept (Payload CMS)

## Ziel
Eine editierbare Portfolio-Struktur mit klar unterscheidbarer Gestaltung je Bereich:

- `Webdesign` (visuell/UX-lastig)
- `Marketing` (Performance/KPI-lastig)
- `Branding` (Marken-/Designsystem-lastig)

Das Konzept nutzt primär bestehende Payload-Blöcke und ergänzt optional wenige neue Portfolio-Blöcke für Premium-Qualität.

## IA / Seitenstruktur

Empfohlene Seiten:

- `/portfolio` (Hub-Seite)
- `/portfolio-webdesign`
- `/portfolio-marketing`
- `/portfolio-branding`

Hinweis:
- Die Slugs passen zu den vorhandenen Mega-Menu-Links.
- Das aktuelle Frontend-Routing ist Single-Slug (`[slug]`), daher sind diese URLs direkt kompatibel.

## Design-DNA pro Unterseite

### 1) Portfolio Webdesign

Charakter:
- großflächige Mockups
- Before/After Story
- Fokus auf UX, UI, Performance

Mood:
- klare Typografie, viel Weißraum
- präzise Linien, Device-Rahmen
- Mikroanimationen bei Cards und Bildern

### 2) Portfolio Marketing (SEO/SEM/Leads)

Charakter:
- KPI- und Funnel-Erzählung
- datenbasiert, ergebnisorientiert
- Case Cards mit Ziel/Kanal/Impact

Mood:
- kontraststark
- „Dashboard“-Anmutung
- strukturierte, scannbare Sections

### 3) Portfolio Branding (Marken/Logos)

Charakter:
- visuelle Markenwelt
- Logo-Systeme und Anwendungen
- rationale + emotionale Markenargumentation

Mood:
- editorial/minimal
- hochwertige Bildwirkung
- rhythmische, ruhige Sektionen

## Block-Blueprints (MVP mit bestehenden Komponenten)

## A) `/portfolio` (Hub)

Reihenfolge:
1. Hero (`leistungenHero` oder `lowImpact`)
2. `Introduction` (Portfolio-Ansatz)
3. `ServicesGrid` als Bereichsnavigation mit 3 Cards (Webdesign/Marketing/Branding)
4. `WhyWorkWithMe` (kurz, 3-4 Gründe)
5. `CallToAction` (Projekt anfragen)

## B) `/portfolio-webdesign`

Reihenfolge:
1. Hero (`lowImpact` mit starkem Mockup)
2. `Introduction` (UX-Methodik, Prozess)
3. `ShadcnBlock` Variante `feature267` (funktioniert bereits mit `content.*`)
4. `ServicesGrid` (Case-Kategorien: Corporate, Landingpages, Shops, Apps)
5. `Content` (Case-Details / Tech Stack / Ergebnis)
6. `ContactInfoCards` + `CalPopup`

## C) `/portfolio-marketing`

Reihenfolge:
1. Hero (`leistungenHero`, KPI-orientierter Claim)
2. `Introduction` (Strategie + Kanäle)
3. `ServicesOverview` (SEO, SEM, Leads, Automationen)
4. `ServicesGrid` (Case Cards nach Kanal)
5. `Content` (Messwerte / Learnings)
6. optional `PriceCalculator` (wenn auf Servicesite-Logik einzahlen soll)
7. `FormBlock` (Lead-/Projektformular)

## D) `/portfolio-branding`

Reihenfolge:
1. Hero (`lowImpact`, ruhige Visual Language)
2. `Introduction` (Markenstrategie + Positionierung)
3. `ServicesGrid` (Logo, CI, Markenstrategie, Brand Refresh)
4. `MediaBlock` (Anwendungen, Logo-Sets, Farbwelten)
5. `Content` (Case-Story + Entscheidungslogik)
6. `CallToAction` (Brand Audit / Erstgespräch)

## Reuse-Status vorhandener Komponenten

Direkt stark nutzbar:
- `Introduction`
- `ServicesGrid`
- `ServicesOverview`
- `WhyWorkWithMe`
- `CallToAction`
- `FormBlock`
- `ContactInfoCards`
- `CalPopup`

Wichtig:
- `ShadcnBlock` ist nur teilweise CMS-editierbar.
- In der Praxis ist vor allem `feature267` aktuell sauber über `content.headline/subheadline/body/images/links` steuerbar.
- Viele andere Shadcn-Varianten haben noch statische Inhalte.

## Bereits vorhandene Assets (sofort nutzbar)

Portfolio:
- `portfolio-webdesign.svg`
- `portfolio-marketing.svg`
- `portfolio-brands.svg`

Leistungs-/Themenicons:
- `design-leistungen.svg`
- `marketing-leistungen.svg`
- `webdesign.svg`
- `SEO.svg`
- `Logo-Design.svg`
- `Leadgenerierung.svg`

## Premium-Ausbau (empfohlen für „hochwertig“)

Für wirklich starke Portfolio-Unterseiten reichen Standard-Blöcke oft nur bis ~80%.  
Empfohlene neue, dedizierte Blocks:

1. `portfolioCaseGrid`
- Cases als Cards mit Feldern:
  - Titel
  - Branche
  - Ziel
  - Maßnahmen
  - Ergebnis/KPI
  - Coverbild
  - CTA / Detail-Link
  - Tags (SEO, SEM, Branding, UX etc.)

2. `portfolioKpiStrip`
- KPI-Band für Marketing/Webdesign:
  - Kennzahl
  - Label
  - Kontext (z. B. Zeitraum)
  - optional Vorher/Nachher

3. `brandShowcase`
- Branding-spezifisch:
  - Logo-Varianten
  - Farbpalette
  - Typografie
  - Anwendungen (Mockups)
  - Markensatz / Claim

## Backend-Editor-Fokus

Damit Redakteure schnell arbeiten können:

- klare Seitenvorlagen im Titel benennen:
  - `Portfolio – Webdesign (Template)`
  - `Portfolio – Marketing (Template)`
  - `Portfolio – Branding (Template)`
- pro Seite feste Block-Reihenfolge als Start-Template anlegen
- pro Block eine kurze „Was hier rein?“ Guideline in `admin.description`

## Rollout-Plan

Phase 1 (schnell):
1. Drei Unterseiten in `site-pages` anlegen (`portfolio-webdesign`, `portfolio-marketing`, `portfolio-branding`)
2. Block-Blueprints aus diesem Dokument umsetzen
3. Bestehende Portfolio-Assets/Icons zuweisen

Phase 2 (hochwertig):
1. `portfolioCaseGrid`, `portfolioKpiStrip`, `brandShowcase` als neue Blocks implementieren
2. In `site-pages.layout` registrieren
3. Typen generieren (`generate:types`), Importmap aktualisieren, TS prüfen

Aktueller Stand:
- Die drei dedizierten Portfolio-Blocks sind bereits im Projekt vorhanden und in `site-pages.layout` verdrahtet.
- Preset-Templates fuer `webdesign`, `marketing`, `branding` sind in `src/collections/Pages/portfolioPresets.ts` hinterlegt.

Phase 3 (optional):
1. Falls gewünscht: verschachtelte URLs (`/portfolio/webdesign`) mit `[...slug]` Route einführen
2. Mega-Menu-Links migrieren
