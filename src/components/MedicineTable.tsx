/* eslint-disable @typescript-eslint/no-explicit-any */
import { EyeIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/16/solid';
import { Button, DatePicker, Table } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ConfirmDeleteModal from '../components/buttons/ConfirmDeleteModal';
import { deleteMedicine } from '../services/medicine';
import { Medicine } from '../types/medicine';
import { PermissionContext } from './AuthLayout';
import AddUserModal from './AddUserModal';
import './MedicineTable.css';
import { SearchOutlined } from '@ant-design/icons';
import SearchComponent from './SearchComponent';
import SelectDropdown from './SelectDropdown';
import dayjs from 'dayjs';

interface MedicineTableProps {
    medicines: Medicine[];
    onViewDetails: (medicine: Medicine) => void;
    onDelete: (medicine: Medicine) => Promise<void>;
    onAddNew: () => void;
    setMedicines: React.Dispatch<React.SetStateAction<Medicine[]>>;
    handlePageChange: (
        pagination: any,  // This is the pagination configuration object
        filters: any,  // This is for column filters
        sorter: any,  // This is for sorting columns

    ) => void;
    currentPage: number;
    totalRecords: number;
    pagesize: number;
    isLoading: boolean;
    searchValue: string
    handleSearch: any;
    setSelectedField: any;
    selectedField: string;
    selectedUser: string | null;
    setSelectedUser: any;
    userOptions: any;
    setSelectedDate: any;
    seletedDate: any;
    setDebouncedSearch: any;
    setSearchValue: any
}

const MedicineTable: React.FC<MedicineTableProps> = ({ medicines, setDebouncedSearch, setSearchValue, seletedDate, setSelectedDate, userOptions, selectedUser, setSelectedUser, setSelectedField, selectedField, searchValue, handleSearch, onViewDetails, isLoading, onAddNew, setMedicines, handlePageChange, currentPage, totalRecords, pagesize }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [medicineToDelete, setMedicineToDelete] = useState<Medicine | null>(null);
    const navigate = useNavigate();
    const context = useContext(PermissionContext);

    const [isDeleteLoading, setIsDeleteLoading] = useState(false)

    const [tableHeight, setTableHeight] = useState(0);

    useEffect(() => {
        const updateTableHeight = () => setTableHeight(window.innerHeight * 0.6);

        updateTableHeight();
        window.addEventListener('resize', updateTableHeight);

        return () => window.removeEventListener('resize', updateTableHeight);
    }, []);


    const handleDeleteClick = (medicine: Medicine) => {
        setMedicineToDelete(medicine);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {

        try {
            setIsDeleteLoading(true)
            if (medicineToDelete) {
                const isDeleted = await deleteMedicine(medicineToDelete.id);
                toast.success("Medicine deleted successfully");
                if (isDeleted) {
                    setMedicines((prevMedicines) =>
                        prevMedicines.filter((item) => item.id !== medicineToDelete.id)
                    );
                }
            }
        } catch (e: any) {
            console.log("🚀 ~ handleConfirmDelete ~ e:", e)

        } finally {
            setIsDeleteLoading(false)
            setIsModalOpen(false);
            setMedicineToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setIsModalOpen(false);
        setMedicineToDelete(null);
    };

    // Columns for the Ant Design Table
    const columns = [
        {
            title: 'Sr. No.',
            dataIndex: 'index',
            key: 'index',
            width: 80,
            render: (_text: string, _record: Medicine, index: number) => index + 1,
        },
        {
            title: 'Medicine Name',
            dataIndex: 'medicineName',
            key: 'medicineName',
            sorter: () => { return null as any },

        },
        {
            title: 'Weightage',
            dataIndex: 'weightage',
            key: 'weightage',
            sorter: () => { return null as any },

        },
        {
            title: 'Pack Size',
            dataIndex: 'packSize',
            key: 'packSize',
            sorter: () => { return null as any },
        },
        {
            title: 'Product Type',
            dataIndex: 'productType',
            key: 'productType',
            sorter: () => { return null as any },
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter: () => { return null as any },
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, medicine: Medicine) => (
                <div className="flex justify-center space-x-2">
                    <Button
                        className='cursor-pointer'
                        icon={<EyeIcon className="h-8 w-8" />}
                        onClick={() => onViewDetails(medicine)}
                        type="link"
                    >
                    </Button>
                    {context.userRole === "ADMIN" && <Link to={`/add-medicine/${medicine.id}`}>
                        <Button
                            className='cursor-pointer'
                            icon={<PencilIcon className="h-8 w-8" />}
                            type="link"
                        >
                        </Button>
                    </Link>
                    }
                    {context.userRole === "ADMIN" && <Button
                        className='cursor-pointer'
                        icon={<TrashIcon className="h-8 w-8" />}
                        onClick={() => handleDeleteClick(medicine)}
                        type="link"
                        danger
                    >
                    </Button>}
                </div>
            ),
        },
    ];

    return (
        <div className="p-4">

            <div className="flex justify-between mb-4">
                <div>
                    <Button
                        type="primary"
                        icon={<PlusIcon className="h-5 w-5 mr-2" />}
                        onClick={() => {
                            onAddNew();
                            navigate('/add-medicine');
                        }}
                    >
                        Add New Medicine
                    </Button>
                </div>

                <div className="flex space-x-4">
                    {context.userRole === "ADMIN" && (
                        <>

                            <Button
                                type="primary"
                                onClick={() => {
                                    setIsAddUserModalOpen(true)
                                }}
                            >
                                Add User
                            </Button>
                            <Button
                                type="primary"
                                onClick={() => {
                                    navigate('/dose-form')
                                }}
                            >
                                Dose Form
                            </Button>
                        </>
                    )}
                    <Button
                        type="primary"
                        onClick={() => {
                            localStorage.removeItem("accessToken");
                            navigate("/login");
                            toast.success("User logged out successfully.")
                        }}
                    >
                        Log out
                    </Button>
                </div>

            </div>
            <div className="flex justify-between mb-4"><div>
                <Button
                    type="primary"
                    onClick={() => {
                        setSearchValue('');
                        setDebouncedSearch('');
                        setSelectedField('medicineName')
                        setSelectedUser(context.userRole !== "ADMIN" ? null : context?.userId)
                        setSelectedDate(dayjs().startOf("day"))
                    }}
                >
                    clear
                </Button>
            </div>

                <div className="flex space-x-4">
                    <>
                        <>
                            <DatePicker
                                picker="date"
                                format="DD/MM/YYYY"
                                style={{ width: 200, height: 40 }}
                                onChange={(value) => setSelectedDate(value ? dayjs(value).startOf("day") : null)}
                                value={seletedDate}
                                allowClear={true}
                            />
                            <SelectDropdown
                                placeholder="Select User"
                                options={userOptions}
                                value={selectedUser as string}
                                onChange={(value: any) => {
                                    setSelectedUser(value)
                                }}
                                size="large"
                                required={true}
                                helperText="Unit is required"
                                label=""
                                disabled={context.userRole !== "ADMIN" ? true : false}
                                isError={false}
                            />
                        </>

                        <SelectDropdown
                            placeholder="Select Unit"
                            options={[
                                { label: 'Medicine Name', value: 'medicineName' },
                                // { label: 'Brand Name', value: 'brandName' },
                                { label: 'Product Type', value: 'productType' },
                                { label: 'Weightage', value: 'weightage' },
                                { label: 'Manufacturer', value: 'manufacturer' },
                                { label: 'Pack ', value: 'packSize' },
                                { label: 'Unit Type', value: 'unitType' },
                                { label: 'Price', value: 'price' },
                                { label: 'Route of Administration', value: 'routeOfAdministration' },
                                { label: 'Side Effects', value: 'sideEffects' },
                                { label: 'Barcode SKU', value: 'barcodeSKU' },
                                { label: 'NDC', value: 'ndc' },
                                { label: 'Schedule Type', value: 'scheduleType' },
                                { label: 'GST Percentage', value: 'gstPercentage' },
                                { label: 'Salt Composition', value: 'saltComposition' },
                            ]}
                            value={selectedField}
                            onChange={(value: any) => {

                                setSelectedField(value)
                            }}
                            size="large"
                            required={true}
                            helperText="Unit is required"
                            label=""
                            disabled={false}
                            isError={false}
                        />
                        <SearchComponent
                            className='w-96'
                            placeHolder={`Search ${selectedField}...`}
                            suffixIcon={<SearchOutlined />}
                            handleChange={handleSearch}
                            value={searchValue}
                            size="large"
                        />
                    </>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={medicines}
                loading={isLoading}
                rowKey="id"
                onChange={handlePageChange}
                pagination={{
                    total: totalRecords,
                    pageSize: pagesize,
                    current: currentPage,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '50'],
                }}
                scroll={{
                    y: tableHeight,
                    x: 'max-content',
                }}
                bordered
                className="custom-table"
            />


            {/* Confirmation Modal */}
            <ConfirmDeleteModal
                open={isModalOpen}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                isDeleteLoading={isDeleteLoading}
                itemName={medicineToDelete?.medicineName || ""}
            />
            <AddUserModal
                isAddUserModelOpen={isAddUserModalOpen}
                setIsAddUserModelOpen={setIsAddUserModalOpen}
            />
        </div>
    );
};

export default MedicineTable;

