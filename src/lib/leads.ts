export type LeadType = 'auto' | 'habitation' | 'sante' | 'animaux' | 'rc-pro';

export interface Lead {
    id: string;
    type: LeadType;
    createdAt: string;
    data: Record<string, any>;
    status: 'new' | 'contacted' | 'converted' | 'lost';
}

const STORAGE_KEY = 'assur_compar_leads';

// Configuration des URLs par formulaire
const SHEET_URLS: Record<LeadType, string> = {
    'auto': "https://script.google.com/macros/s/AKfycbyXoKNWcu03KMkG_RV5PnqzZ_F9wv1A7s9f1A94E5opIaR0LwESzqiWJqm1kP5Zf7Jn/exec", // URL actuelle (Auto)
    'habitation': "https://script.google.com/macros/s/AKfycbzCDKzUz1gvUnwbForFJG9myoeLUNvREPhhavyvlkN4dZp8gLCNF3d9pLRrJoPLgsGU7Q/exec",
    'sante': "https://script.google.com/macros/s/AKfycbyMiDqWjDvlK319Lj-mH09UvRp2ckQgCgK4xlqQenZnimYrhOFb0YvGrzllqIuNdk-nhw/exec",
    'animaux': "https://script.google.com/macros/s/AKfycbwTtzcThX5GhNrFsk_viAr0cICcxR5Sgoh-SQ_uC8tSVqpVkjSav_hMKB0dtcAzaIal/exec",
    'rc-pro': "https://script.google.com/macros/s/AKfycbwbN_SaYh5gl46DOuK8oYPN8z7bl3m4T7Ys9Ra3PuJQYE1WT3qRzOAhWoYL5u_TNVtR/exec"
};

export const LeadService = {
    getAll: (): Lead[] => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Failed to parse leads from storage', error);
            return [];
        }
    },

    save: async (leadData: Omit<Lead, 'id' | 'createdAt' | 'status'>): Promise<Lead> => {
        const leads = LeadService.getAll();
        const newLead: Lead = {
            ...leadData,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            status: 'new',
        };

        // 1. Save to LocalStorage (Backup)
        leads.unshift(newLead);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));

        // 2. Send to Google Sheets (Async)
        const targetUrl = SHEET_URLS[leadData.type];

        if (targetUrl) {
            try {
                fetch(targetUrl, {
                    method: "POST",
                    mode: "no-cors",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newLead)
                }).then(() => {
                    console.log(`✅ [LeadService] Sent to ${leadData.type} Sheet`);
                }).catch(err => {
                    console.error("❌ [LeadService] Google Sheets Error:", err);
                });
            } catch (error) {
                console.error("❌ [LeadService] Failed to initiate Google Sheets request:", error);
            }
        } else {
            console.warn(`⚠️ [LeadService] No Google Sheet URL configured for type: ${leadData.type}`);
        }

        // Simulate email notification
        console.log('📧 [MOCK EMAIL] New Lead Received:', newLead);

        // Simulate Google Analytics Event
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'generate_lead', {
                event_category: 'engagement',
                event_label: leadData.type
            });
        }

        return newLead;
    },

    exportToCSV: () => {
        const leads = LeadService.getAll();
        if (leads.length === 0) return;

        // Flatten data for CSV
        const csvRows = [
            ['ID', 'Type', 'Date', 'Status', 'Data'], // Header
            ...leads.map(lead => [
                lead.id,
                lead.type,
                new Date(lead.createdAt).toLocaleString(),
                lead.status,
                JSON.stringify(lead.data).replace(/"/g, '""') // Escape quotes
            ])
        ];

        const csvContent = "data:text/csv;charset=utf-8,"
            + csvRows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};
