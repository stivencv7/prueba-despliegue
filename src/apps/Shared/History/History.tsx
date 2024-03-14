import { useEffect, useState } from "react"
import CustomButton from "../CustomButton/CustomButton";
import { historyVankPayList } from "../../service/ServiceVankPay/ServiceHistoryVanKPay";

export const History = ({ moreStyle, value,onClickBlack}: { moreStyle: any,value:any,onClickBlack:any}) => {
    
    const [title,setTitle]=useState('');

    const [history,setHistory]=useState([{
        nameBeneficiary:'',
        fecha:'',
        amount:'',
        asset:'',
        banco:''
    }]);

    const getListHistory=()=>{
        const history=historyVankPayList();
        console.log(history)
        setHistory(history);
    }

    useEffect(()=>{
        if(value==1){
            setTitle('Deposit History')
            setHistory([])

        }else if(value==4){
            setTitle('VankPay History')
            getListHistory()     
        }
    },[value])
    
    return (
        <div className={`dark:bg-[#191E25] w-[590px] h-full   rounded-[32px] p-[36px] ${moreStyle}`}>
            <div className="h-[73px] flex flex-col gap-[32px]">
                <div><CustomButton onclick={onClickBlack} label={'Back'} className="text-[#9D9DA2] text-[16px]"/></div>
                <h1 className="text-body">{title}</h1>
            </div>
            <div className="mt-10 w-full flex flex-col gap-5  h-[300px]">
                {
                    history.map((item,index)=>(
                        <div className="flex gap-5  ">
                            <div>
                                <div className="text-[14px] font-normal text-body leading-[18.2px]">{item.nameBeneficiary}</div>
                                <div className="text-[12px] font-normal text-[#9D9DA2]">{item.fecha}</div>
                            </div>
                            <div>
                                <div className="text-[12px] font-bold text-body leading-[15.6px]">$ {item.amount}</div>
                                <div className="text-[12px] font-normal text-[#9D9DA2]">{item.banco}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
