/* eslint-disable @typescript-eslint/no-explicit-any */
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/16/solid';
import { Button, Table } from 'antd';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import ConfirmDeleteModal from '../../buttons/ConfirmDeleteModal';
import { deleteApiWithData } from '../../../apis';
import AddDoseFormModal from '../../AddDoseFormModal';

interface DoseFormTableProps {
    doseForm: any[];
    handlePageChange: (
        pagination: any,  // This is the pagination configuration object
        filters: any,  // This is for column filters
        sorter: any,  // This is for sorting columns

    ) => void;
    currentPage: number;
    totalRecords: number;
    pagesize: number;
    isLoading: boolean;
    fetchDoseForms:()=>void
}

const DoseFormTable: React.FC<DoseFormTableProps> = ({ doseForm, isLoading, handlePageChange, currentPage, totalRecords, pagesize,fetchDoseForms }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddDoseFormModalOpen, setIsAddDoseFormModalOpen] = useState(false);
    const [doseFormToDelete, setDoseFormToDelete] = useState<any>(null);
    const [doseFormToEdit, setDoseFormToEdit] = useState<any>(null);

    const [isDeleteLoading, setIsDeleteLoading] = useState(false) 


    const handleDeleteClick = (doseForm: any) => {
        setDoseFormToDelete(doseForm);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {

        try {
            setIsDeleteLoading(true)
            if (doseFormToDelete) {
                await deleteApiWithData('/dose-form', { id: doseFormToDelete.id });
                toast.success("DoseForm deleted successfully");
               fetchDoseForms()
            }
        } catch (e: any) {
            toast.error(e?.response?.data?.message ||"Fail to delete")
            console.log("🚀 ~ handleConfirmDelete ~ e:", e)

        } finally {
            setIsDeleteLoading(false)
            setIsModalOpen(false);
            setDoseFormToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setIsModalOpen(false);
        setDoseFormToDelete(null);
    };

    // Columns for the Ant Design Table
    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
            render: (_text: string, _record: any, index: number) => index + 1,
        },
        {
            title: 'DoseForm Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, doseForm: any) => (
                <div className="flex justify-center space-x-2">
                        <Button
                            icon={<PencilIcon className="h-5 w-5" />}
                            type="link"
                            onClick={()=>{setIsAddDoseFormModalOpen(true);setDoseFormToEdit(doseForm)}}
                        >
                        </Button>
                        <Button
                        icon={<TrashIcon className="h-5 w-5" />}
                        onClick={() => handleDeleteClick(doseForm)}
                        type="link"
                        danger
                    >
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="p-4">
            {/* Add New Button */}
            <div className="flex justify-between mb-4">
                <div>
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

            </div>


            {/* Ant Design Table */}
            <Table
                columns={columns}
                dataSource={doseForm ?? []}
                loading={isLoading}
                rowKey="id"
                onChange={handlePageChange}
                pagination={{
                    total: totalRecords,
                    pageSize: pagesize,
                    current: currentPage,
                    showSizeChanger: true,
                    pageSizeOptions: ['20', '50'],
                }}
                bordered // Adds border around the table
                className="custom-table" // Custom class for additional styles
            />


            {/* Confirmation Modal */}
            <ConfirmDeleteModal
                open={isModalOpen}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                isDeleteLoading={isDeleteLoading}
                itemName={doseFormToDelete?.name || ""}
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

export default DoseFormTable;

