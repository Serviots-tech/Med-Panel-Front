/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { MedicineForm } from '../components/MedicineForm';
import { MedicineFormInput } from '../types/medicine'; // import your types
import {
    createMedicine,
    getMedicineById,
    updateMedicine
} from '../services/medicine';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { hasFormError, validateFormData } from '../helpers/utils';
import { Loader } from '../components/Loader';
import { getApi } from '../apis';
import { Button } from 'antd';
import { PlusIcon } from '@heroicons/react/16/solid';
import AddDoseFormModal from '../components/AddDoseFormModal';
const AddMedicinePage: React.FC = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [fileList, setFileList] = useState<any[]>([]);
    const [doseFormData, setDoseFormData] = useState<any>()
    const [isAddDoseFormModalOpen, setIsAddDoseFormModalOpen] = useState(false);


    const [formData, setFormData] = useState<MedicineFormInput>({
        medicineName: '',
        brandName: '',
        productType: '',
        doseFormId: '',
        weightage: '',
        manufacturer: '',
        packSize: '',
        unitType: '',
        price: 0,
        routeOfAdministration: '',
        sideEffects: '',
        prescriptionReq: '',
        barcodeSKU: '',
        ndc: '',
        marketedBy: '',
        scheduleType: '',
        gstPercentage: 0,
        saltComposition: [{
            name: '',
            strength: ''
        }],
        hsnCode: '',
        flavors: '',
        offers: '',
        subCategory: '',
    });


    const [formError, setFormError] = useState<any>({
        medicineName: false,
        productType: false,
        strength: false,
        manufacturer: false,
        packSize: false,
        unitType: false,
        price: false,
        prescriptionReq: false,
        scheduleType: false,
        gstPercentage: false,
        weightage: false,
    });

    const [isSubmitFormLoading, setIsSubmitFormLoading] = useState(false)


    // Store validation errors

    const [loading, setLoading] = useState<boolean>(false);

   
    useEffect(() => {
        if (id) {
            const fetchMedicine = async () => {
                try {
                    setLoading(true);
                    const response = await getMedicineById(id);
                    if (response?.data) {
                        const data = response.data;

                        const parsedSaltComposition = Array.isArray(data?.saltComposition)
                            ? data.saltComposition.map((item: string) => {
                                try {
                                    return JSON.parse(item); // Convert JSON string to object
                                } catch (error) {
                                    console.error("Error parsing saltComposition item:", error);
                                    return item; // If parsing fails, keep the original value
                                }
                            })
                            : [];

                        setFormData({
                            ...data,
                            saltComposition: parsedSaltComposition, // ✅ Use the parsed array
                            subCategory: data?.subCategory ?? "",
                            doseFormId: data?.doseFormId ?? "",
                        });
                    }
                } catch (e: any) {
                    toast.error("Something went wrong, please login again.");
                } finally {
                    setLoading(false);
                }
            };
            fetchMedicine();
        }
    }, [id]);


    useEffect(() => {
        fetchDoseForms()
    }, [])

    const fetchDoseForms = async () => {
        try {
            const doseFoemData = await getApi('/dose-form/get-all')
            setDoseFormData(doseFoemData?.data?.data?.data?.data)
        }
        catch (error: any) {
            toast.error(error?.response?.data?.message || "Fail to fetch dose form")
        }
    }

    // Step 3: Handle form submission
    const handleSubmit = async () => {
        // e.preventDefault();
        const updatedFormError = { ...formError };


        const checkFormError = validateFormData(
            {
                ...formData,
            },
            updatedFormError
        );

        setFormError(checkFormError);

        if (hasFormError(checkFormError)) {
            return;
        } else {


            try {

                const finalData: any = new FormData();

                setIsSubmitFormLoading(true)
                // Ensure price is a valid number (float)
                if (formData?.price) {
                    formData.price = parseFloat(formData.price.toString()); // Convert string to float
                }
                // Handle any invalid price (NaN or non-numeric)
                if (isNaN(formData?.price)) {
                    formData.price = 0;
                }


                for (const [key, value] of Object.entries(formData)) {
                    if (Array.isArray(value)) {
                        // Handle arrays (e.g., saltComposition)
                        value.forEach((item, index) => {
                            if (typeof item === "object") {
                                // Convert object to JSON string before appending
                                finalData.append(`${key}[${index}]`, JSON.stringify(item));
                            } else {
                                finalData.append(`${key}[${index}]`, item);
                            }
                        });
                    } else if (typeof value === "object" && value !== null) {
                        // Convert objects to JSON string
                        finalData.append(key, JSON.stringify(value));
                    } else {
                        // Append primitive values normally
                        finalData.append(key, value);
                    }
                }


                fileList.forEach((file) => {
                    finalData.append('files', file.originFileObj);
                });
                // finalData.append('files', file);
                for (let pair of finalData.entries()) {
                    console.log(pair[0], ":", pair[1]);
                }

                // Remove the `id` field from the form data if it's included
                const { id } = formData;

                if (id) {
                    // Update existing medicine
                    await updateMedicine(id, finalData);
                } else {
                    // Add new medicine
                    await createMedicine(finalData);
                }
                // Redirect to the medicines list page after the operation
                navigate('/');

                if (loading) {
                    return <Loader />;
                }

                // Reset the form after successful submission
                setFormData({
                    medicineName: '',
                    brandName: '',
                    productType: '',
                    doseFormId: '',
                    weightage: '',
                    manufacturer: '',
                    packSize: '',
                    unitType: '',
                    price: 0,
                    routeOfAdministration: '',
                    sideEffects: '',
                    prescriptionReq: 'Select',
                    barcodeSKU: '',
                    ndc: '',
                    scheduleType: '',
                    gstPercentage: 0,
                    saltComposition: [{
                        name: '',
                        strength: ''
                    }],
                    marketedBy: '',
                    hsnCode: '',
                    flavors: '',
                    offers: '',
                    subCategory: '',
                    // expiryDate: null,
                });

            } catch (error: any) {
                toast.error(error?.response?.data?.message || "Fail to add/update Medicine,try again..");
            }
            finally {
                setIsSubmitFormLoading(false)
            }
        }
    };

    return (
        <div className="container mx-auto p-6">

            <div className="flex items-center justify-between mt-10">
                <h1 className="text-4xl m-5 font-bold text-center absolute left-1/2 transform -translate-x-1/2">
                    {id ? 'Edit' : 'Add'} Medicine
                </h1>

            </div>
            <div className="flex justify-between">
                <button
                    className="flex text-3xl items-center text-blue-500 font-bold hover:text-blue-700"
                    onClick={() => navigate(-1)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>
                <Button
                    type="primary"
                    icon={<PlusIcon className="h-5 w-5 mr-2" />}
                    onClick={() => {
                        setIsAddDoseFormModalOpen(true)
                    }}
                >
                    Add New DoseForm
                </Button>
            </div>
            <hr className='mt-5' />
            {/* Step 4: Pass formData and handlers to the MedicineForm component */}
            <MedicineForm
                formError={formError}
                setFormError={setFormError}
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                isLoading={loading}
                isSubmitFormLoading={isSubmitFormLoading}
                setFileList={setFileList}
                fileList={fileList}
                doseFormData={doseFormData}
            />
            <AddDoseFormModal
                isAddDoseFormModalOpen={isAddDoseFormModalOpen}
                setIsAddDoseFormModalOpen={setIsAddDoseFormModalOpen}
                fetchDoseForms={fetchDoseForms}
                doseFormToEdit={null}
            />
        </div>
    );
};

export default AddMedicinePage;
