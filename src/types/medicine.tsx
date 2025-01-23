// Enum for Drug Category, matching Prisma's schema
export type DrugCategory = 'Antibiotic' | 'Painkiller' | 'Vitamin' | 'Antifungal' | 'Antiviral' | 'Select';

// Enum for Dosage Form, matching Prisma's schema
type Float = number;

export type PrescriptionReq = "YES" | "NO" | "Select";

export type ApprovalInfo = "FDA" | "EMA" | "Select"


// Medicine interface reflecting the Prisma schema
export interface Medicine {
    id: string;
    medicineName: string;
    brandName: string;
    productType: string;
    doseFormId: string;
    weightage: string;
    manufacturer: string;
    packSize: string;
    price: Float;
    routeOfAdministration: string;
    sideEffects: string;
    prescriptionReq: string;
    barcodeSKU: string; 
    ndc: string;
    image?:string;
    scheduleType:string;
    gstPercentage:number
    // expiryDate: Date | null;
}

// Type for Medicine form input, used when creating or updating a medicine
export interface MedicineFormInput {
    id?:string;
    medicineName: string;
    brandName: string;
    productType: string;
    doseFormId: string;
    weightage: string;
    manufacturer: string;
    packSize: string;
    price: Float;
    routeOfAdministration: string;
    sideEffects: string;
    prescriptionReq: string;
    barcodeSKU: string;
    ndc: string;
    image?:string;
    scheduleType:string;
    gstPercentage:number

    // expiryDate: Date | null;
}
