import { Doctor } from "@/entities/Doctor";
import { doctorStore } from "./types";
import { Hospital } from "@/entities/Hospital";
import { Specialization } from "@/entities/Specialization";

export const setPickedDoctor = (state: doctorStore, searchedName: string, searchedHospital: Hospital[], searchedSpecialization: Specialization[]) => {
    let rawData: Doctor[] = state.doctor_list;
    let filtered: any;
    let result = rawData.filter((doc) => {
        // return (searchedName.length == 0 ? doc.name.includes('') : doc.name.includes(searchedName)) || (searchedHospital.length == 0 ? [''].includes(doc.hospital[0].name) : searchedHospital.includes(doc.hospital[0].name)) || (searchedSpecialization.length == 0 ? [''].includes(doc.specialization.name) : searchedSpecialization.includes(doc.specialization.name));
        return doc.name.toLowerCase().includes(searchedName);
    })
    let result2: Doctor[];
    let result3: Doctor[];

    if(searchedHospital.length !== 0){
        result2 = searchedHospital.flatMap((item: Hospital) => {
            return result.filter((d: Doctor) => {
                return searchedHospital.length == 0 ? result : d.hospital[0].id.includes(item.id);
            })
        })
    }else{
        result2 = result;
    }

    if(searchedSpecialization.length !== 0){
        result3 = searchedSpecialization.flatMap((item) => {
            return result2.filter((d: Doctor) => {
                return searchedSpecialization.length == 0 ? result  : d.specialization.id.includes(item.id);
            })
        })
    }else{
        result3 = result2;
    }
    
    return result3;
}