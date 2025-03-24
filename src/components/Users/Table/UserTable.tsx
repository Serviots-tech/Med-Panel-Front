/* eslint-disable @typescript-eslint/no-explicit-any */
import {  PlusIcon, TrashIcon } from '@heroicons/react/16/solid';
import { Button, Table } from 'antd';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import ConfirmDeleteModal from '../../buttons/ConfirmDeleteModal';
import { deleteApiWithData } from '../../../apis';
import AddUserModal from '../../AddUserModal';
import { PermissionContext } from '../../AuthLayout';

interface UserTableProps {
    usersData: any[];
    handlePageChange: (
        pagination: any,  // This is the pagination configuration object
        filters: any,  // This is for column filters
        sorter: any,  // This is for sorting columns

    ) => void;
    currentPage: number;
    totalRecords: number;
    pagesize: number;
    isLoading: boolean;
    fetchUsers: () => void
}

const UsersTable: React.FC<UserTableProps> = ({ usersData, isLoading, handlePageChange, currentPage, totalRecords, pagesize, fetchUsers }) => {
    const context = useContext(PermissionContext);
    console.log("🚀 ~ context:", context)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<any>(null);

    const [isDeleteLoading, setIsDeleteLoading] = useState(false)


    const handleDeleteClick = (user: any) => {
        setUserToDelete(user);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {

        try {
            setIsDeleteLoading(true)
            if (userToDelete) {
                await deleteApiWithData('/user', { id: userToDelete.id });
                toast.success("user deleted successfully");
                fetchUsers()
            }
        } catch (e: any) {
            toast.error(e?.response?.data?.message || "Fail to delete")

        } finally {
            setIsDeleteLoading(false)
            setIsModalOpen(false);
            setUserToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setIsModalOpen(false);
        setUserToDelete(null);
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
            title: 'User Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, user: any) => (
                <div className="flex justify-center space-x-2">
                    <Button
                        icon={<TrashIcon className="h-5 w-5" />}
                        onClick={() => handleDeleteClick(user)}
                        type="link"
                        danger
                        disabled={user?.id === context?.userId}
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
                            setIsAddUserModalOpen(true)
                        }}
                    >
                        Add New User
                    </Button>
                </div>

            </div>


            {/* Ant Design Table */}
            <Table
                columns={columns}
                dataSource={usersData ?? []}
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
                itemName={userToDelete?.name || ""}
            />

            <AddUserModal
                isAddUserModelOpen={isAddUserModalOpen}
                setIsAddUserModelOpen={setIsAddUserModalOpen}
                fetchUsers={fetchUsers}
            />
        </div>
    );
};

export default UsersTable;

