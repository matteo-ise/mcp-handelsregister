export interface CompanyProfile {
    companyName: string;
    legalForm: string;
    registeredOffice: string;
    registerCourt: string;
    registerNumber: string;
    objectOfCompany?: string;
    shareCapital?: {
        amount: number;
        currency: string;
    };
    managingDirectors: Array<{
        firstName: string;
        lastName: string;
        authority: string;
    }>;
    prokuraHolders: Array<{
        firstName: string;
        lastName: string;
        authority: string;
    }>;
    shareholders?: Array<{
        name: string;
        shares?: string;
    }>;
    registrationDate?: string;
    latestChanges?: Array<{
        date: string;
        description: string;
    }>;
}

export interface CompanySearchResult {
    companyName: string;
    registerNumber: string;
    registerCourt: string;
    status: string;
    address: string;
}
