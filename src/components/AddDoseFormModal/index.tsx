/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { postApi } from '../../apis';
import { Button, Modal } from 'antd';
import InputField from '../InputField';
import { invalidText, validateFormData } from '../../helpers/utils';

const AddDoseFormModal = ({ isAddDoseFormModalOpen, setIsAddDoseFormModalOpen, fetchDoseForms, doseFormToEdit }: { isAddDoseFormModalOpen: boolean, setIsAddDoseFormModalOpen: any, fetchDoseForms: () => void, doseFormToEdit: any }) => {

    const [loading, setLoading] = useState(false);

    const [hasError, setHasError] = useState(false);
    console.log("🚀 ~ hasError:", hasError)

    const [formData, setFormData] = useState<any>({
        name: doseFormToEdit ? doseFormToEdit?.name : ''
    })

    const [formError, setFormError] = useState<any>({
        name: false
    })

    const handleCancel = () => {
        setIsAddDoseFormModalOpen(false);
        setFormData({
            name: doseFormToEdit ? doseFormToEdit?.name : ''
        })
    };

    const handleSubmit = async () => {


        const updatedFormError = { ...formError };

        
        const checkFormError = validateFormData(
            {
                ...formData,
            },
            updatedFormError
        );

        setFormError(checkFormError);

        if (formData?.name) {
            try {
                setLoading(true);
                if (doseFormToEdit?.id) {
                    await postApi(`/dose-form/update`, { ...formData, id: doseFormToEdit?.id });
                    toast.success("Dose updated successfully");

                }
                else {
                    await postApi(`/dose-form/create`, { ...formData });
                    toast.success("Dose created successfully");
                }
            }
            catch (e: any) {
                toast.error(e?.response?.data?.message || "Fail to create dose,try again..")
            }
            finally {
                setLoading(false);
                fetchDoseForms()
                setIsAddDoseFormModalOpen(false); // Close modal after submit
                setFormData({
                    name: doseFormToEdit ? doseFormToEdit?.name : ''
                })
            }
        }
    };

    const handleChangeValue = (
        value: string | number | null | string[] | boolean,
        name: string,
        required: boolean,
        regex?: RegExp | null
    ) => {
        if (required && typeof value === 'string') {
            setHasError(invalidText(value));
        }
        if (required && Array.isArray(value) && value.length === 0) {
            setHasError(true);
        }

        if (typeof value === 'string' && regex) {
            const _regex = new RegExp(regex);
            setHasError(!_regex.test(value));
        }

        OnChange(value, name);
        // console.log("value",value)
    };

    const OnChange = (
        value: string | number | null | string[] | boolean,
        key: string,
    ) => {
        setFormData((prev: any) => {
            return {
                ...prev,
                [key]: value,
            };
        });
        const checkFormError = validateFormData(
            { [key]: value },
            { ...formError }
        );
        setFormError(checkFormError);
    };

    useEffect(() => {
        if (doseFormToEdit) {
            setFormData({
                name: doseFormToEdit ? doseFormToEdit?.name : ''
            })
        }

    }, [doseFormToEdit])

    return (
        <Modal
            title={`${doseFormToEdit ? "Edit" : "Add"} Dose Form`}
            visible={isAddDoseFormModalOpen}
            onCancel={handleCancel}
            footer={null}
            className="modal-container"
        >
            {/* <Col span={8}> */}
            <InputField
                name="name"
                value={formData.name}
                label="Dose Form"
                required={true}
                helperText={formError.name ? "Dose form name is required" : ""}
                placeholder="Enter dose form name"
                onChange={(value) => handleChangeValue(value, 'name', true)}
                isError={formError.name}
                disabled={false}
            />
            {/* </Col> */}

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                <Button
                    type="primary"
                    onClick={handleSubmit}
                    loading={loading}
                >
                    {doseFormToEdit ? 'Update' : 'Add'} Dose Form
                </Button>
            </div>
        </Modal>
    );
};

export default AddDoseFormModal;
