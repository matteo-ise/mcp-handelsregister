export enum Rechtsform {
    GmbH = 'Gesellschaft mit beschränkter Haftung',
    UG = 'Unternehmergesellschaft (haftungsbeschränkt)',
    AG = 'Aktiengesellschaft',
    KG = 'Kommanditgesellschaft',
    OHG = 'Offene Handelsgesellschaft',
    eK = 'Eingetragener Kaufmann',
    GnR = 'Genossenschaft',
    PR = 'Partnerschaftsgesellschaft',
    VR = 'Eingetragener Verein'
}

export enum Vertretungsbefugnis {
    EINZELVERTRETUNGSBERECHTIGT = 'einzelvertretungsberechtigt',
    GESAMTVERTRETUNGSBERECHTIGT = 'gesamtvertretungsberechtigt',
    BEFREIT_VON_181_BGB = 'befreit von den Beschränkungen des § 181 BGB'
}

export interface Person {
    vorname: string;
    nachname: string;
    geburtsdatum?: string;
    wohnort?: string;
}

export interface Geschaeftsfuehrer {
    person: Person;
    vertretungsbefugnis: Vertretungsbefugnis | string;
}

export interface Prokurist {
    person: Person;
    vertretungsbefugnis: string;
}

export interface Gesellschafter {
    person?: Person;
    firma?: string;
    sitz?: string;
    anteile?: string;
}

export interface Grunddaten {
    firma: string;
    rechtsform: Rechtsform | string;
    sitz: string;
    registergericht: string;
    registerNummer: string;
}

export interface Kapital {
    stammkapital?: {
        waehrung: string;
        '#text': string;
    };
    grundkapital?: {
        waehrung: string;
        '#text': string;
    };
}

export interface Vertretung {
    geschaeftsfuehrer?: Geschaeftsfuehrer | Geschaeftsfuehrer[];
    prokurist?: Prokurist | Prokurist[];
}

export interface RegisterInhalt {
    grunddaten: Grunddaten;
    kapital?: Kapital;
    vertretung?: Vertretung;
}

export interface XJustizDocument {
    registerInhalt: RegisterInhalt;
}
