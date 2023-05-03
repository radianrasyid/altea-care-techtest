import {create} from 'zustand';
import {
    devtools,
    persist,
} from 'zustand/middleware';
import { doctorStore } from './types';
import { Doctor } from '@/entities/Doctor';
import { Hospital } from '@/entities/Hospital';
import { Specialization } from '@/entities/Specialization';
import { setPickedDoctor } from './functions';

export const useDoctorStore = create<doctorStore>()(
    devtools(
        persist(
            (set, get) => ({
                doctor_list: [] as Doctor[],
                specialization_list: [] as Specialization[],
                hospital_list: [] as Hospital[],
                isLoading: true as boolean,
                picked_doctor: [] as Doctor[],
                picked_hospital: {
                    id: '',
                    name: '',
                    image: {
                        size_formatted: '',
                        url: '',
                        formats: {
                            thumbnail: '',
                            large: '',
                            medium: '',
                            small: ''
                        }
                    },
                    icon: {
                        size_formatted: '',
                        url: '',
                        formats: {
                            thumbnail: '',
                            large: '',
                            medium: '',
                            small: '',
                        }
                    }
                },
                searchedName: '',
                searchedHospital: [] as Hospital[],
                searchedSpecialization: [] as Specialization[],
                resultFiltered: [] as Doctor[],
                setDoctorList: (data: any) => {
                    set((state) => ({
                        doctor_list: data,
                    }))
                },
                setHospitalList: (data: Hospital[] | undefined) => {
                    set((state) => ({
                        hospital_list: data,
                    }))
                },
                setSpecializationList: (data: Specialization[] | undefined) => {
                    set((state) => ({
                        specialization_list: data,
                    }))
                },
                setLoadingTrue: () => {
                    set((state) => ({
                        isLoading: true
                    }))
                },
                setLoadingFalse: () => {
                    set((state) => ({
                        isLoading: false,
                    }))
                },
                setSearchedHospital: (data: Hospital[]) => {
                    set((state) => ({
                        searchedHospital: data,
                        resultFiltered: setPickedDoctor(state, state.searchedName, data, state.searchedSpecialization)
                    }))
                },
                setSearchedName: (data: string) => {
                    set((state) => ({
                        searchedName: data,
                        resultFiltered: setPickedDoctor(state, data, state.searchedHospital, state.searchedSpecialization)
                    }))
                },
                setSearchedSpecialization: (data: Specialization[]) => {
                    set((state) => ({
                        searchedSpecialization: data,
                        resultFiltered: setPickedDoctor(state, state.searchedName, state.searchedHospital, data)
                    }))
                }
            }), {
                name: 'doctor',
            }
        ), {
            name: 'doctor',
            store: 'doctor',
            features: {
                dispatch: true,
                persist: true,
                jump: true
            },
            trace: true,
        }
    )
)