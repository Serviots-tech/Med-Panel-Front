/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { getMedicines, deleteMedicine } from '../services/medicine';
import { Medicine } from '../types/medicine';
import MedicineTable from '../components/MedicineTable';
import MedicineModal from '../components/MedicineModal';
import { TablePaginationConfig } from 'antd';
import { getApi } from '../apis';
// import { FilterValue, SorterResult } from 'antd/es/table/interface';

const MedicineListPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [doseFormData, setDoseFormData] = useState<any>()
    const [searchValue, setSearchValue] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    const [selectedField,setSelectedField]= useState('medicineName')

    const debounceDelay = 700;
    // const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setpageSize] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        const handler = setTimeout(() => {
          setDebouncedSearch(searchValue);
        }, debounceDelay);
      
        return () => clearTimeout(handler);
      }, [searchValue]);
      

    const handleSearch = (value: string) => {
        setSearchValue(value);
    };
    // Fetching the list of medicines
    const fetchMedicines = async () => {
        try {
            setIsLoading(true)
            const query = {
                currentPage,
                pageSize,
                search: searchValue,
                targetField: 'medicineName'
            }
            const response = await getMedicines(query);

            if (response && Array.isArray(response.data)) {
                setMedicines(response.data);
                setCurrentPage(response?.pagination?.page)
                setTotalRecords(response?.pagination?.totalRecords)
            } else {
                setMedicines([]);
                setCurrentPage(1)
                setTotalRecords(0)
            }
        } catch (error) {
            console.error("Error fetching medicines:", error);
        }
        finally {
            setIsLoading(false)
        }
    };

    // Fetch the medicines when the component is mounted or when page/pageSize changes
    useEffect(() => {
        fetchMedicines();
    }, [currentPage, pageSize, debouncedSearch]);


    // Handle opening the modal with medicine details
    const handleViewDetails = (medicine: Medicine) => {
        setSelectedMedicine(medicine);
        setIsModalOpen(true);
    };

    // Handle closing the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMedicine(null);
    };

    useEffect(() => {
        fetchDoseForms()
    }, [])

    const fetchDoseForms = async () => {
        try {
            const doseFoemData = await getApi('/dose-form/get-all')
            setDoseFormData(doseFoemData?.data?.data?.data?.data)
        }
        catch (error: any) {
            console.log("🚀 ~ fetchDoseForms ~ error:", error)
            // toast.error(error?.msg || "Fail to fetch dose form")
        }
    }

    // Handle deleting a medicine
    const handleDelete = async (medicine: Medicine) => {
        try {
            const isDeleted = await deleteMedicine(medicine.id);
            if (isDeleted) {
                setMedicines(medicines.filter(med => med.id !== medicine.id));
            }
        } catch (error) {
            console.error("Error deleting medicine:", error);
        }
    };

    // Handle page change
    const handlePageChange = (pagination: TablePaginationConfig,
        // filters: Record<string, FilterValue | null>,
        // sorter: SorterResult<Medicine>[],
    ) => {
        setCurrentPage(pagination?.current as number)
        setTotalRecords(pagination?.total as number)
        setpageSize(pagination?.pageSize as number)
    };

    return (
        <div className="max-w-8xl m-12 p-5">
            <h1 className="text-3xl font-bold text-center">All Medicine List</h1>
            <hr className='mt-5' />
            <div>
                {/* Medicine Table */}
                <MedicineTable
                    medicines={medicines}
                    isLoading={isLoading}
                    onViewDetails={handleViewDetails}
                    onDelete={handleDelete}
                    onAddNew={() => console.log("Add new medicine clicked")}
                    setMedicines={setMedicines}
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    totalRecords={totalRecords}
                    pagesize={pageSize}
                    searchValue={searchValue}
                    handleSearch={handleSearch}
                    setSelectedField={setSelectedField}
                    selectedField={selectedField}
                />

                {/* Modal for Medicine Details */}
                {isModalOpen && selectedMedicine && (
                    <MedicineModal
                        medicine={selectedMedicine}
                        onClose={closeModal}
                        doseFormData={doseFormData}
                    />
                )}
            </div>
        </div>
    );
};

export default MedicineListPage;
