import DoctorCard from '@/components/doctorCard';
import SearchBox from '@/components/search_box';
import { FetchDoctorData } from '@/controllers/search_controller'
import useStore from '@/packages/helpers/useStore';
import { useDoctorStore } from '@/zustand'
import { useRouter } from 'next/router';
import React, { Suspense, useEffect, useState } from 'react'
import {
    AiOutlineLoading
} from 'react-icons/ai'

const DoctorSearch: React.FC = () => {
    const router = useRouter();
    const state = useDoctorStore(state => state);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const {
        setDoctorList,
        setHospitalList,
        setSpecializationList,
        setLoadingTrue,
        setLoadingFalse,
        setSearchedHospital,
        setSearchedName,
        setSearchedSpecialization,
    } = useDoctorStore();

    useEffect(() => {
        if(router.isReady){
            setIsLoading(true);
            setLoadingTrue();
            FetchDoctorData().then((res) => {
                setDoctorList(res?.result);
                setHospitalList(res?.hospitalList);
                setSpecializationList(res?.docSpecialization);
                setSearchedHospital([]);
                setSearchedSpecialization([]);
                setSearchedName('');
                setIsLoading(false);
                setLoadingFalse();
            });
        }
    }, [router.isReady, setDoctorList, setHospitalList, setLoadingFalse, setLoadingTrue, setSearchedHospital, setSearchedName, setSearchedSpecialization, setSpecializationList])

    return(
        <div>
                <div className='p-5'>
                    <SearchBox/>
                </div>
                {
                    isLoading ? (
                        <div className='flex justify-center align-middle h-full'>
                            <AiOutlineLoading className='animate-spin' />
                        </div>
                    ) : (
                        <div className='grid grid-cols-2 gap-2'>
                    {
                        state?.resultFiltered.map((item, index) => {
                            let image = item.photo.formats.thumbnail;
                            return(
                                <>
                                    <div className='p-5'>
                                        <DoctorCard key={index + 1}
                                        img={image}
                                        about={item.about_preview}
                                        hospital={item.hospital[0].name}
                                        specialization={item.specialization.name}
                                        name={item.name}
                                        price={item.price.raw}
                                        priceFormatted={item.price.formatted}
                                        />
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
                    )
                }
            </div>
    )
}

export default DoctorSearch;
