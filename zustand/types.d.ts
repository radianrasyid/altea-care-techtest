import { doctor } from "@/entities/Doctor";
import { Hospital, hospital } from "@/entities/Hospital";
import { Specialization } from "@/entities/Specialization";

export interface doctorStore{
    doctor_list: doctor[];
    hospital_list: hospital[];
    specialization_list: Specialization[];
    picked_doctor: doctor[];
    picked_hospital: hospital;
    isLoading: boolean;
    searchedName: string,
    searchedHospital: Hospital[],
    searchedSpecialization: Specialization[],
    resultFiltered: any[],
    setSearchedHospital: (data: Hospital[]) => void,
    setSearchedSpecialization: (data: Specialization[]) => void,
    setSearchedName: (data: string) => void,
    setDoctorList: (data: doctor[] | Promise<doctor[]>) => void;
    setHospitalList: (data: hospital[] | undefined) => void;
    setSpecializationList: (data: Specialization[] | undefined) => void;
    setLoadingTrue: () => void;
    setLoadingFalse: () => void;
}