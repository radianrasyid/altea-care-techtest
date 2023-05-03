import { useDoctorStore } from "@/zustand";
import React, { useState } from "react";
import {
    Listbox,
    Transition,
} from '@headlessui/react'
import { Hospital } from "@/entities/Hospital";
import { Specialization } from "@/entities/Specialization";
import MultipleSelection from "./multipleSelection";

const SearchBox: React.FC = () => {

    let state = useDoctorStore(state => state);
    const {
        setSearchedHospital,
        setSearchedSpecialization,
        setSearchedName,
    } = useDoctorStore();

    const [selectedPeople, setSelectedPeople] = useState<any>([]);
    const [selectedSpec, setSelectedSpec] = useState<any>([]);
    const [isOpenSpec, setIsOpenSpec] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    function isSelected(value:any) {
        return selectedPeople.find((el: Hospital) => el.id === value.id) ? true : false;
      }
    
      function handleSelect(value: any) {
        if (!isSelected(value)) {
          const selectedPersonsUpdated = [
            ...selectedPeople,
            state.hospital_list.find((el) => el.id === value.id)
          ];
          setSelectedPeople(selectedPersonsUpdated);
          setSearchedHospital(selectedPersonsUpdated);
        } else {
          handleDeselect(value);
        }
        setIsOpen(true);
      }
    
      function handleDeselect(value: any) {
        const selectedPersonsUpdated = selectedPeople.filter((el: Hospital) => el.id !== value.id);
        setSelectedPeople(selectedPersonsUpdated);
        setSearchedHospital(selectedPersonsUpdated);
        setIsOpen(true);
      }

      function isSelectedSpec(value:any) {
        return selectedSpec.find((el: Specialization) => el.id === value.id) ? true : false;
      }

      function handleSelectSpec(value: any) {
        if (!isSelectedSpec(value)) {
          const selectedSpecUpdate = [
            ...selectedSpec,
            state.specialization_list.find((el) => el.id === value.id)
          ];
          setSelectedSpec(selectedSpecUpdate);
          setSearchedSpecialization(selectedSpecUpdate);
        } else {
          handleDeselectSpec(value);
        }
        setIsOpenSpec(true);
      }

      function handleDeselectSpec(value: any) {
        const selectedSpecUpdated = selectedSpec.filter((el: Specialization) => el.id !== value.id);
        setSelectedSpec(selectedSpecUpdated);
        setSearchedSpecialization(selectedSpecUpdated);
        setIsOpenSpec(true);
      }

    return(
        <div className="shadow-lg rounded-lg">
            <div className="ps-5 pt-5">
                <span className="text-lg font-bold uppercase">Doctor Finder</span>
            </div>
            <div className="grid grid-cols-3">
            <div className="flex items-center justify-center p-12">
            <div className="w-full max-w-xs mx-auto">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="username">
                Nama Dokter
            </label>
            <input className="appearance-none border-gray-300 border rounded-md w-full py-2 px-3 text-grey-900 text-sm font-normal leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Nama Dokter"
            onKeyUp={(e) => setSearchedName(e.currentTarget.value)}
            />
            </div>
            </div>

                {/* HOSPITAL PICK */}
                <div className="flex items-center justify-center p-12">
                <div className="w-full max-w-xs mx-auto">
                    <MultipleSelection
                    dataArr={state.hospital_list || []}
                    handleSelect={handleSelect}
                    isSelected={isSelected}
                    label="Rumah Sakit"
                    onClickForm={() => {
                        setIsOpen(!isOpen);
                    }}
                    open={isOpen}
                    value={selectedPeople}
                    placeholder="Pilih rumah sakit"
                    />
                </div>
                </div>

                {/* SPECIALIZATION PICK */}
                <div className="flex items-center justify-center p-12">
                <div className="w-full max-w-xs mx-auto">
                    <MultipleSelection
                    dataArr={state.specialization_list || []}
                    handleSelect={handleSelectSpec}
                    isSelected={isSelectedSpec}
                    label="Spesialis"
                    onClickForm={() => {
                        setIsOpenSpec(!isOpenSpec)
                    }}
                    open={isOpenSpec}
                    value={selectedSpec}
                    placeholder="Pilih spesialis dokter"
                    />
                </div>
                </div>
            </div>
        </div>
    )
}

export default SearchBox;