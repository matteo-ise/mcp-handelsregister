# Legal Constraints & Compliance (Handelsregister)

Das Handelsregister ist das öffentliche Verzeichnis der eingetragenen Kaufleute und Gesellschaften in Deutschland. Obwohl der Zugriff seit August 2022 durch das DiRUG (Gesetz zur Umsetzung der Digitalisierungsrichtlinie) kostenlos ist, gelten weiterhin strikte rechtliche Rahmenbedingungen.

## Automatisierbare Prozesse (✅ Machbar)

Folgende Prozesse können durch den `mcp-handelsregister` Server vollständig automatisiert werden:

- **Datenabruf (Lesen)**: Abruf von Registerinhalten (Aktueller Abdruck, Chronologischer Abdruck) ist öffentlich und kostenlos.
- **Parsing (XJustiz)**: Strukturierte Extraktion von Unternehmensdaten aus dem offiziellen SI-XML (XJustiz Standard).
- **Dokumenten-Entwurf (Drafting)**: Generierung von Gesellschaftsverträgen, Gesellschafterbeschlüssen und Handelsregisteranmeldungen als *Entwurf* (Draft).
- **Monitoring**: Überwachung von Registeränderungen (z.B. Geschäftsführerwechsel, Kapitalerhöhung).

## Nicht automatisierbare Prozesse (❌ Verboten / Unmöglich)

Folgende Prozesse erfordern menschliche und/oder notarielle Beteiligung:

- **Notarielle Beurkundung (§ 12 HGB)**: Anmeldungen zur Eintragung in das Handelsregister sind elektronisch in öffentlich beglaubigter Form (über einen Notar) einzureichen. Dies **kann nicht** durch einen KI-Agenten vollständig ohne Notar durchgeführt werden.
- **Online-Gründung (DiREG)**: Eine Online-Gründung (z.B. GmbH/UG) ist möglich über das Portal der Bundesnotarkammer (online.notar.de). Hierfür ist jedoch zwingend ein Videotermin mit einem Notar sowie eine elektronische Identität (eID) erforderlich. 

## Datenschutz & W-IdNr

- **W-IdNr (Wirtschafts-Identifikationsnummer)**: Seit Ende 2024 wird in Deutschland sukzessive die W-IdNr eingeführt (Format: DE + 9 Ziffern + 5-stellige Sub-ID). Sie dient als einheitliches Identifikationsmerkmal.
- **Öffentlichkeit des Registers**: Daten wie Geschäftsführer, Prokura und Stammkapital sind öffentliche Registerdaten. Private Wohnanschriften der Geschäftsführer werden zunehmend restriktiver behandelt (Eintragung oft nur noch mit Stadt/Wohnort, außer bei berechtigtem Interesse).

> [!WARNING]
> Alle generierten Dokumente durch den `draft_articles` Endpoint sind reine **Entwürfe** und entfalten keine Rechtswirkung, bevor sie nicht notariell beurkundet bzw. beglaubigt wurden.
