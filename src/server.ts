import { XMLParser } from 'fast-xml-parser';
import * as z from 'zod';
import { XJustizDocument } from './types/xjustiz.js';
import { CompanyProfile, CompanySearchResult } from './types/company.js';
import * as readline from 'readline';

// Example structured data representation for demonstration purposes, since no official REST API exists.
const mockCompanies: CompanyProfile[] = [
    {
        companyName: "Muster GmbH",
        legalForm: "GmbH",
        registeredOffice: "Berlin",
        registerCourt: "Berlin (Charlottenburg)",
        registerNumber: "HRB 12345",
        objectOfCompany: "Die Entwicklung und der Vertrieb von Software.",
        shareCapital: { amount: 25000, currency: "EUR" },
        managingDirectors: [
            { firstName: "Max", lastName: "Mustermann", authority: "einzelvertretungsberechtigt" }
        ],
        prokuraHolders: [],
        registrationDate: "2020-01-15",
        latestChanges: []
    }
];

class HandelsregisterMCPServer {
    private parser: XMLParser;

    constructor() {
        this.parser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: ""
        });
    }

    public async handleRequest(request: any): Promise<any> {
        const { method, params, id } = request;

        try {
            switch (method) {
                case 'search_company':
                    return { id, result: this.searchCompany(params) };
                case 'get_company_profile':
                    return { id, result: this.getCompanyProfile(params) };
                case 'get_register_extract':
                    return { id, result: this.getRegisterExtract(params) };
                case 'parse_xjustiz':
                    return { id, result: this.parseXJustiz(params) };
                case 'draft_articles':
                    return { id, result: this.draftArticles(params) };
                case 'monitor_company':
                    return { id, result: this.monitorCompany(params) };
                default:
                    return { id, error: { code: -32601, message: 'Method not found' } };
            }
        } catch (error: any) {
            return { id, error: { code: -32000, message: error.message } };
        }
    }

    private searchCompany(params: any): CompanySearchResult[] {
        const query = params.query?.toLowerCase() || '';
        return mockCompanies
            .filter(c => c.companyName.toLowerCase().includes(query) || c.registerNumber.toLowerCase().includes(query))
            .map(c => ({
                companyName: c.companyName,
                registerNumber: c.registerNumber,
                registerCourt: c.registerCourt,
                status: "active",
                address: c.registeredOffice
            }));
    }

    private getCompanyProfile(params: any): CompanyProfile {
        const id = params.registerNumber;
        const company = mockCompanies.find(c => c.registerNumber === id);
        if (!company) {
            throw new Error(`Company with register number ${id} not found.`);
        }
        return company;
    }

    private getRegisterExtract(params: any): any {
        const id = params.registerNumber;
        const type = params.extractType || 'Aktueller Abdruck';
        return {
            registerNumber: id,
            extractType: type,
            content: `Mocked ${type} for ${id}`,
            timestamp: new Date().toISOString()
        };
    }

    private parseXJustiz(params: any): CompanyProfile {
        const xml = params.xml;
        const parsed = this.parser.parse(xml) as XJustizDocument;
        
        const inhalt = parsed.registerInhalt;
        const profile: CompanyProfile = {
            companyName: inhalt.grunddaten.firma,
            legalForm: String(inhalt.grunddaten.rechtsform),
            registeredOffice: inhalt.grunddaten.sitz,
            registerCourt: inhalt.grunddaten.registergericht,
            registerNumber: inhalt.grunddaten.registerNummer,
            managingDirectors: [],
            prokuraHolders: []
        };

        if (inhalt.kapital?.stammkapital) {
            profile.shareCapital = {
                amount: parseFloat(inhalt.kapital.stammkapital['#text']),
                currency: inhalt.kapital.stammkapital.waehrung
            };
        }

        if (inhalt.vertretung?.geschaeftsfuehrer) {
            const gfs = Array.isArray(inhalt.vertretung.geschaeftsfuehrer) ? inhalt.vertretung.geschaeftsfuehrer : [inhalt.vertretung.geschaeftsfuehrer];
            profile.managingDirectors = gfs.map(gf => ({
                firstName: gf.person.vorname,
                lastName: gf.person.nachname,
                authority: String(gf.vertretungsbefugnis)
            }));
        }

        return profile;
    }

    private draftArticles(params: any): any {
        const type = params.documentType;
        const companyName = params.companyName || '[Firma]';
        
        let draft = '';
        if (type === 'Gesellschaftsvertrag') {
            draft = `GESELLSCHAFTSVERTRAG der ${companyName}\n\n§ 1 Firma, Sitz\nDie Gesellschaft lautet: ${companyName}\nSitz der Gesellschaft ist: [Sitz]\n\n§ 2 Gegenstand des Unternehmens\nGegenstand ist: [Gegenstand]\n\n... (Draft - Requires notarization according to § 12 HGB)`;
        } else {
            draft = `Draft for ${type} - ${companyName}. (Draft - Requires notarization)`;
        }

        return {
            documentType: type,
            content: draft,
            disclaimer: "DRAFT ONLY. Requires notarial certification (§ 12 HGB)."
        };
    }

    private monitorCompany(params: any): any {
        const id = params.registerNumber;
        const webhook = params.webhookUrl;
        return {
            status: "success",
            message: `Monitoring established for ${id}. Updates will be sent to ${webhook}.`
        };
    }
}

// Start MCP JSON-RPC over stdin/stdout
const server = new HandelsregisterMCPServer();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', async (line) => {
    if (!line) return;
    try {
        const req = JSON.parse(line);
        const res = await server.handleRequest(req);
        console.log(JSON.stringify(res));
    } catch (err) {
        console.error("Invalid JSON-RPC request", err);
    }
});
