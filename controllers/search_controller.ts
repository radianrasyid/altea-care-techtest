import { Doctor } from "@/entities/Doctor";
import { Hospital } from "@/entities/Hospital";
import { Specialization } from "@/entities/Specialization";
import { getAllDoctorData } from "@/packages/api";
import { useDoctorStore } from "@/zustand";

export async function FetchDoctorData(){
    try {
        const response = await getAllDoctorData();
        let result = await response.json();
        if(response.ok){

            let hospitalList: Hospital[] = [];
            let docSpecialization: Specialization[] = []
            
            result.data.map((item: Doctor) => {
                item.hospital.map((hospital: Hospital) => {
                    if(hospitalList.find(hos => hos?.id === hospital.id)) return null;
                    hospitalList.push(hospital);
                });
                if(docSpecialization.find(doc => doc?.id === item.specialization.id)) return null;
                docSpecialization.push(item.specialization);
            })

            return {
                hospitalList,
                docSpecialization,
                result: result.data
            };
        }
    } catch (error) {
        console.log('something went wrong', error);
    }
}