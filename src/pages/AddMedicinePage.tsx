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
    const [doseFormToEdit, setDoseFormToEdit] = useState<any>(null);
    // const [hasError, setHasError] = useState(false);
    // const [documentName, setDocumentName] = useState('');
    // const [isSubmitClick, setIsSubmitClick] = useState(false);

    // Step 1: Define the state for form data
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
        scheduleType: '',
        gstPercentage: 0
    });

    const [formError, setFormError] = useState<any>({
        medicineName: false,
        // brandName: false,
        productType: false,
        doseFormId: false,
        strength: false,
        manufacturer: false,
        packSize: false,
        unitType: false,
        price: false,
        prescriptionReq: false,
        scheduleType: false,
        gstPercentage: false,
        weightage: false,
        // barcodeSKU:false
        // expiryDate: null,
    });

    const [isSubmitFormLoading, setIsSubmitFormLoading] = useState(false)


    // Store validation errors
    // const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);

    // Fetch existing medicine data if id is provided
    useEffect(() => {
        if (id) {
            const fetchMedicine = async () => {

                try {
                    setLoading(true); // Start loading
                    const response = await getMedicineById(id);
                    if (response) {
                        setFormData(response?.data);
                    }
                } catch (e: any) {
                    console.log("🚀 ~ fetchMedicine ~ e:", e)
                    toast.error("some thing went wrong ,login again")

                }
                finally {
                    setLoading(false); // Stop loading
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
            toast.error(error?.msg || "Fail to fetch dose form")
        }
    }

    // Step 3: Handle form submission
    const handleSubmit = async () => {

        // e.preventDefault();
        const updatedFormError = { ...formError };

        // if (formData.productType !== 'Drug') {
        //     updatedFormError.barcodeSKU = false;
        // } else {
        //     delete updatedFormError.barcodeSKU; // Remove barcodeSKU from formError
        // }
        const checkFormError = validateFormData(
            {
                ...formData,
            },
            updatedFormError
        );
        // checkFormError = {
        // 	...checkFormError,
        // 	employeeTPIN: !/^\d{10}$/.test(taxationDetails.employeeTPIN),
        // };

        setFormError(checkFormError);

        if (hasFormError(checkFormError)) {
            return;
        } else {


            try {

                const finalData = new FormData();

                setIsSubmitFormLoading(true)
                // Ensure price is a valid number (float)
                if (formData?.price) {
                    formData.price = parseFloat(formData.price.toString()); // Convert string to float
                }

                // Handle any invalid price (NaN or non-numeric)
                if (isNaN(formData?.price)) {
                    formData.price = 0;
                }

                if (!(formData?.image as any)?.length && fileList.length < 3) {
                    toast.error("upload minimum 3 images")
                    return
                }

                for (const [key, value] of Object.entries(formData)) {
                    finalData.append(key, value);
                }


                fileList.forEach((file) => {
                    finalData.append('files', file.originFileObj);
                });
                // finalData.append('files', file);

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
                    gstPercentage: 0
                    // expiryDate: null,
                });

            } catch (error) {
                console.error("Error submitting the form:", error);
                toast.error('Error adding medicine');
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
                    className="flex items-center text-blue-500 font-bold hover:text-blue-700"
                    onClick={() => navigate(-1)} // Assuming you're using React Router's `navigate`
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-2"
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
                doseFormToEdit={doseFormToEdit}
            />
        </div>
    );
};

export default AddMedicinePage;
