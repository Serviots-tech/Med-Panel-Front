/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { MedicineFormInput } from '../types/medicine';
import { Button } from 'antd';

interface MedicineFormProps {
    formData: MedicineFormInput;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    errors: any;
    isSubmitFormLoading: boolean;
    isLoading: boolean;
}

export const MedicineForm: React.FC<MedicineFormProps> = ({ formData, handleChange, handleSubmit, errors, isSubmitFormLoading, isLoading }) => {

    return (
        <div>
            {isLoading ? (
                <div className="spinner">
                    {/* Replace with an actual spinner component */}
                    Loading data...
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                        <div className="col-span-1">
                            <label htmlFor="medicineName" className="block text-sm font-medium   text-gray-700 mb-2">Medicine Name</label>
                            <input
                                type="text"
                                name="medicineName"
                                id="medicineName"
                                value={formData.medicineName}
                                onChange={handleChange}
                                placeholder="Medicine Name"
                                className={`border p-2 w-full rounded-md ${errors.medicineName ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.medicineName && (
                                <p className="text-red-500 text-xs mt-1">{errors.medicineName}</p>
                            )}
                        </div>

                        {/* Brand Name */}
                        <div className="col-span-1">
                            <label htmlFor="brandName" className="block text-sm font-medium   text-gray-700 mb-2">Brand Name</label>
                            <input
                                type="text"
                                name="brandName"
                                id="brandName"
                                value={formData.brandName}
                                onChange={handleChange}
                                placeholder="Brand Name"
                                className={`border p-2 w-full rounded-md ${errors.brandName ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.brandName && (
                                <p className="text-red-500 text-xs mt-1">{errors.brandName}</p>
                            )}
                        </div>

                        {/* Generic Name */}
                        <div className="col-span-1">
                            <label htmlFor="GenericName" className="block text-sm font-medium   text-gray-700 mb-2">Generic Name</label>
                            <input
                                type="text"
                                name="GenericName"
                                id="GenericName"
                                value={formData.GenericName}
                                onChange={handleChange}
                                placeholder="Generic Name"
                                className={`border p-2 w-full rounded-md ${errors.GenericName ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.GenericName && (
                                <p className="text-red-500 text-xs mt-1">{errors.GenericName}</p>
                            )}
                        </div>

                        {/* Strength */}
                        <div className="col-span-1">
                            <label htmlFor="strength" className="block text-sm font-medium   text-gray-700 mb-2">Strength</label>
                            <input
                                type="text"
                                name="strength"
                                id="strength"
                                value={formData.strength}
                                onChange={handleChange}
                                placeholder="Strength"
                                className={`border p-2 w-full rounded-md ${errors.strength ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.strength && (
                                <p className="text-red-500 text-xs mt-1">{errors.strength}</p>
                            )}
                        </div>

                        {/* Drug Category */}
                        <div className="col-span-1">
                            <label htmlFor="drugCategory" className="block text-sm font-medium   text-gray-700 mb-2">Drug Category</label>
                            <select
                                name="drugCategory"
                                id="drugCategory"
                                value={formData.drugCategory}
                                onChange={handleChange}
                                className={`border p-2 w-full rounded-md ${errors.drugCategory ? 'border-red-500' : ''}`}
                                required
                            >
                                <option value="Select">Select</option>
                                <option value="Antibiotic">Antibiotic</option>
                                <option value="Painkiller">Painkiller</option>
                                <option value="Vitamin">Vitamin</option>
                                <option value="Antifungal">Antifungal</option>
                                <option value="Antiviral">Antiviral</option>
                            </select>
                            {errors.drugCategory && (
                                <p className="text-red-500 text-xs mt-1">{errors.drugCategory}</p>
                            )}
                        </div>

                        {/* Dosage Form */}
                        <div className="col-span-1">
                            <label htmlFor="dosageForm" className="block text-sm font-medium   text-gray-700 mb-2">Dosage Form</label>
                            <select
                                name="dosageForm"
                                id="dosageForm"
                                value={formData.dosageForm}
                                onChange={handleChange}
                                className={`border p-2 w-full rounded-md ${errors.dosageForm ? 'border-red-500' : ''}`}
                                required
                            >
                                <option value="Select">Select</option>
                                <option value="Tablet">Tablet</option>
                                <option value="Capsule">Capsule</option>
                                <option value="Liquid">Liquid</option>
                                <option value="Ointment">Ointment</option>
                                <option value="Injection">Injection</option>
                            </select>
                            {errors.dosageForm && (
                                <p className="text-red-500 text-xs mt-1">{errors.dosageForm}</p>
                            )}
                        </div>

                        {/* Manufacturer */}
                        <div className="col-span-1">
                            <label htmlFor="manufacturer" className="block text-sm font-medium   text-gray-700 mb-2">Manufacturer</label>
                            <input
                                type="text"
                                name="manufacturer"
                                id="manufacturer"
                                value={formData.manufacturer}
                                onChange={handleChange}
                                placeholder="Manufacturer"
                                className={`border p-2 w-full rounded-md ${errors.manufacturer ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.manufacturer && (
                                <p className="text-red-500 text-xs mt-1">{errors.manufacturer}</p>
                            )}
                        </div>

                        {/* Pack Size */}
                        <div className="col-span-1">
                            <label htmlFor="packSize" className="block text-sm font-medium   text-gray-700 mb-2">Pack Size</label>
                            <input
                                type="text"
                                name="packSize"
                                id="packSize"
                                value={formData.packSize}
                                onChange={handleChange}
                                placeholder="Pack Size"
                                className={`border p-2 w-full rounded-md ${errors.packSize ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.packSize && (
                                <p className="text-red-500 text-xs mt-1">{errors.packSize}</p>
                            )}
                        </div>

                        {/* Price */}
                        <div className="col-span-1">
                            <label htmlFor="price" className="block text-sm font-medium   text-gray-700 mb-2">Price</label>
                            <input
                                type="number"
                                name="price"
                                id="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="Price"
                                step="0.01"
                                className={`border p-2 w-full rounded-md ${errors.price ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.price && (
                                <p className="text-red-500 text-xs mt-1">{errors.price}</p>
                            )}
                        </div>

                        {/* Route of Administration */}
                        <div className="col-span-1">
                            <label htmlFor="routeOfAdministration" className="block text-sm font-medium   text-gray-700 mb-2">Route of Administration</label>
                            <input
                                type="text"
                                name="routeOfAdministration"
                                id="routeOfAdministration"
                                value={formData.routeOfAdministration}
                                onChange={handleChange}
                                placeholder="Route of Administration"
                                className={`border p-2 w-full rounded-md ${errors.routeOfAdministration ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.routeOfAdministration && (
                                <p className="text-red-500 text-xs mt-1">{errors.routeOfAdministration}</p>
                            )}
                        </div>

                        {/* Therapeutic Class */}
                        <div className="col-span-1">
                            <label htmlFor="TherapeuticClass" className="block text-sm font-medium   text-gray-700 mb-2">Therapeutic Class</label>
                            <input
                                type="text"
                                name="TherapeuticClass"
                                id="TherapeuticClass"
                                value={formData.TherapeuticClass}
                                onChange={handleChange}
                                placeholder="Therapeutic Class"
                                className={`border p-2 w-full rounded-md ${errors.TherapeuticClass ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.TherapeuticClass && (
                                <p className="text-red-500 text-xs mt-1">{errors.TherapeuticClass}</p>
                            )}
                        </div>

                        {/* Indications */}
                        <div className="col-span-1">
                            <label htmlFor="indications" className="block text-sm font-medium   text-gray-700 mb-2">Indications</label>
                            <textarea
                                rows={1}
                                name="indications"
                                id="indications"
                                value={formData.indications}
                                onChange={handleChange}
                                placeholder="Indications"
                                className={`border p-2 w-full rounded-md ${errors.indications ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.indications && (
                                <p className="text-red-500 text-xs mt-1">{errors.indications}</p>
                            )}
                        </div>

                        {/* Side Effects */}
                        <div className="col-span-1">
                            <label htmlFor="sideEffects" className="block text-sm font-medium   text-gray-700 mb-2">Side Effects</label>
                            <textarea
                                rows={1}
                                name="sideEffects"
                                id="sideEffects"
                                value={formData.sideEffects}
                                onChange={handleChange}
                                placeholder="Side Effects"
                                className={`border p-2 w-full rounded-md ${errors.sideEffects ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.sideEffects && (
                                <p className="text-red-500 text-xs mt-1">{errors.sideEffects}</p>
                            )}
                        </div>

                        {/* Contraindications */}
                        <div className="col-span-1">
                            <label htmlFor="contraindications" className="block text-sm font-medium   text-gray-700 mb-2">Contraindications</label>
                            <textarea
                                rows={1}
                                name="contraindications"
                                id="contraindications"
                                value={formData.contraindications}
                                onChange={handleChange}
                                placeholder="Contraindications"
                                className={`border p-2 w-full rounded-md ${errors.contraindications ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.contraindications && (
                                <p className="text-red-500 text-xs mt-1">{errors.contraindications}</p>
                            )}
                        </div>

                        {/* Storage Conditions */}
                        <div className="col-span-1">
                            <label htmlFor="storageConditions" className="block text-sm font-medium   text-gray-700 mb-2">Storage Conditions</label>
                            <textarea
                                rows={1}
                                name="storageConditions"
                                id="storageConditions"
                                value={formData.storageConditions}
                                onChange={handleChange}
                                placeholder="Storage Conditions"
                                className={`border p-2 w-full rounded-md ${errors.storageConditions ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.storageConditions && (
                                <p className="text-red-500 text-xs mt-1">{errors.storageConditions}</p>
                            )}
                        </div>

                        {/* Shelf Life */}
                        <div className="col-span-1">
                            <label htmlFor="shelfLife" className="block text-sm font-medium   text-gray-700 mb-2">Shelf Life</label>
                            <input
                                type="text"
                                name="shelfLife"
                                id="shelfLife"
                                value={formData.shelfLife}
                                onChange={handleChange}
                                placeholder="Shelf Life"
                                className={`border p-2 w-full rounded-md ${errors.shelfLife ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.shelfLife && (
                                <p className="text-red-500 text-xs mt-1">{errors.shelfLife}</p>
                            )}
                        </div>

                        {/* Prescription Required */}
                        <div className="col-span-1">
                            <label htmlFor="prescriptionReq" className="block text-sm font-medium   text-gray-700 mb-2">Prescription Required</label>
                            <select
                                name="prescriptionReq"
                                id="prescriptionReq"
                                value={formData.prescriptionReq}
                                onChange={handleChange}
                                className={`border p-2 w-full rounded-md ${errors.prescriptionReq ? 'border-red-500' : ''}`}
                                required
                            >
                                <option value="Select">Select</option>
                                <option value="YES">YES</option>
                                <option value="NO">NO</option>
                            </select>
                            {errors.prescriptionReq && (
                                <p className="text-red-500 text-xs mt-1">{errors.prescriptionReq}</p>
                            )}
                        </div>

                        {/* Approval Info */}
                        <div className="col-span-1">
                            <label htmlFor="approvalInfo" className="block text-sm font-medium   text-gray-700 mb-2">Approval Info</label>
                            <select
                                name="approvalInfo"
                                id="approvalInfo"
                                value={formData.approvalInfo}
                                onChange={handleChange}
                                className={`border p-2 w-full rounded-md ${errors.approvalInfo ? 'border-red-500' : ''}`}
                                required
                            >
                                <option value="Select">Select</option>
                                <option value="FDA">FDA</option>
                                <option value="EMA">EMA</option>
                            </select>
                            {errors.approvalInfo && (
                                <p className="text-red-500 text-xs mt-1">{errors.approvalInfo}</p>
                            )}
                        </div>

                        {/* Barcode SKU */}
                        <div className="col-span-1">
                            <label htmlFor="barcodeSKU" className="block text-sm font-medium   text-gray-700 mb-2">Barcode SKU (Unique)</label>
                            <input
                                type="text"
                                name="barcodeSKU"
                                id="barcodeSKU"
                                value={formData.barcodeSKU || ''}
                                onChange={handleChange}
                                placeholder="Barcode SKU (Unique)"
                                className={`border p-2 w-full rounded-md ${errors.barcodeSKU ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.barcodeSKU && (
                                <p className="text-red-500 text-xs mt-1">{errors.barcodeSKU}</p>
                            )}
                        </div>

                        {/* Batch Number */}
                        <div className="col-span-1">
                            <label htmlFor="batchNumber" className="block text-sm font-medium   text-gray-700 mb-2">Batch Number</label>
                            <input
                                type="text"
                                name="batchNumber"
                                id="batchNumber"
                                value={formData.batchNumber}
                                onChange={handleChange}
                                placeholder="Batch Number"
                                className={`border p-2 w-full rounded-md ${errors.batchNumber ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.batchNumber && (
                                <p className="text-red-500 text-xs mt-1">{errors.batchNumber}</p>
                            )}
                        </div>

                        {/* Drug Interactions */}
                        <div className="col-span-1">
                            <label htmlFor="interactions" className="block text-sm font-medium   text-gray-700 mb-2">Drug Interactions</label>
                            <textarea
                                rows={1}
                                name="interactions"
                                value={formData.interactions}
                                onChange={handleChange}
                                placeholder="Drug Interactions"
                                className={`border p-2 w-full rounded-md ${errors.interactions ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.interactions && (
                                <p className="text-red-500 text-xs mt-1">{errors.interactions}</p>
                            )}
                        </div>

                        {/* Country of Origin */}
                        <div className="col-span-1">
                            <label htmlFor="countryOfOrigin" className="block text-sm font-medium   text-gray-700 mb-2">Country of Origin</label>
                            <input
                                type="text"
                                name="countryOfOrigin"
                                value={formData.countryOfOrigin}
                                onChange={handleChange}
                                placeholder="Country of Origin"
                                className={`border p-2 w-full rounded-md ${errors.countryOfOrigin ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.countryOfOrigin && (
                                <p className="text-red-500 text-xs mt-1">{errors.countryOfOrigin}</p>
                            )}
                        </div>

                        {/* NDC */}
                        <div className="col-span-1">
                            <label htmlFor="ndc" className="block text-sm font-medium   text-gray-700 mb-2">NDC</label>
                            <input
                                type="text"
                                name="ndc"
                                value={formData.ndc}
                                onChange={handleChange}
                                placeholder="NDC"
                                className={`border p-2 w-full rounded-md ${errors.ndc ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.ndc && (
                                <p className="text-red-500 text-xs mt-1">{errors.ndc}</p>
                            )}
                        </div>

                        {/* Distributor */}
                        <div className="col-span-1">
                            <label htmlFor="distributor" className="block text-sm font-medium   text-gray-700 mb-2">Distributor</label>
                            <input
                                type="text"
                                name="distributor"
                                value={formData.distributor}
                                onChange={handleChange}
                                placeholder="Distributor"
                                className={`border p-2 w-full rounded-md ${errors.distributor ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.distributor && (
                                <p className="text-red-500 text-xs mt-1">{errors.distributor}</p>
                            )}
                        </div>

                        {/* Special Considerations */}
                        <div className="col-span-1">
                            <label htmlFor="specialConsiderations" className="block text-sm font-medium   text-gray-700 mb-2">Special Considerations</label>
                            <textarea
                                rows={1}
                                name="specialConsiderations"
                                value={formData.specialConsiderations}
                                onChange={handleChange}
                                placeholder="Special Considerations"
                                className={`border p-2 w-full rounded-md ${errors.specialConsiderations ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.specialConsiderations && (
                                <p className="text-red-500 text-xs mt-1">{errors.specialConsiderations}</p>
                            )}
                        </div>


                    </div>
                    <div className="flex justify-center">
                        <Button
                            htmlType="submit"
                            type='primary'
                            loading={isSubmitFormLoading}
                        // className="bg-blue-500 text-white p-2 rounded-md w-full max-w-xs hover:bg-blue-600"
                        >
                            {formData.id ? 'Update' : 'Add'} Medicine
                        </Button>
                    </div>
                </form>
            )
            };
        </div>
    );

}