import Image from "next/image";
import React from "react";
import parse from 'html-react-parser';

interface Props{
    img: any,
    name: string,
    hospital: string,
    specialization: string,
    about: string,
    priceFormatted: string,
    price: number,
}

const DoctorCard: React.FC<Props> = ({
    img,
    name,
    hospital,
    specialization,
    about,
    priceFormatted,
    price,
}) => {
    return(
        <>
            <div className="rounded-lg shadow-lg p-2 border border-slate-100">
                <div className="grid grid-flow-col auto-rows-max gap-10">
                    <div className="flex justify-center align-middle">
                        <img src={img} alt="test" />
                    </div>
                    <div>
                        <div>
                            <div className="mb-0">
                                <span className="font-bold">{name}</span>
                            </div>
                            <div className="mb-3">
                                <span>{`${hospital} - ${specialization}`}</span>
                            </div>
                            <div>
                                <span className="w-10 text-xs">{parse(about)}</span>
                            </div>
                        </div>
                        <div className="flex justify-end mt-10">
                            <div className="bg-green-400 w-fit p-2 rounded-md">
                                <span className="text-neutral-700">{priceFormatted}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DoctorCard;