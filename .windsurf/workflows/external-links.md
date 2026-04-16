---
description: External Link Standards
---

# Externe Link Standards

Alle externen Links (URLs außerhalb der eigenen Domain) müssen folgende Attribute enthalten:

## Required Attributes

```tsx
<a
  href="https://externe-domain.com"
  target="_blank"
  rel="nofollow noopener noreferrer"
>
  Link Text
  <ArrowUpRight className="..." aria-hidden />
</a>
```

## Breakdown

1. **`target="_blank"`** - Öffnet Link in neuem Tab
2. **`rel="nofollow"`** - SEO: Suchmaschinen sollen dem Link nicht folgen
3. **`rel="noopener"`** - Sicherheit: Verhindert Zugriff auf window.opener
4. **`rel="noreferrer"`** - Sicherheit: Kein Referer-Header wird gesendet
5. **`<ArrowUpRight />` Icon** - Visuelles Indikator für externen Link (Lucide React)

## Example Implementations

### In CMSLink ( Payload )
- Setze `newTab: true` im CMS
- Icon wird automatisch gehandhabt

### In FooterClient.tsx (harte Links)
```tsx
<a
  href={`tel:${footerPhone.replace(/\s+/g, '')}`}
  target="_blank"
  rel="nofollow noopener noreferrer"
  className="footer-link ..."
>
  <span className="footer-link-text">{footerPhone}</span>
  <ArrowUpRight
    className="footer-link-arrow inline-block size-[0.85em] shrink-0"
    aria-hidden
  />
</a>
```

## Telefonnummern (tel: Links)

Auch `tel:` Links sollten wie externe Links behandelt werden:
- Sie öffnen externe Apps (Telefon-App)
- Gleiche Attribute wie externe Links
