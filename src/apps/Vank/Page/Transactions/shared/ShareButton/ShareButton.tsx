import { useState } from 'react'
import CustomButton from '../../../../../Shared/CustomButton/CustomButton'
import { Close2 } from '../../../../../../assets/Icon/Close2'
import { ShareCircle } from '../../../../../../assets/Icon/ShareCircle'
import whatsapp from "../../../../../../assets/Icon/WHATSAPP-ICON.png"
import email from "../../../../../../assets/Icon/GMAIL-ICON.png"
import image from "../../../../../../assets/Icon/JPG-ICON.png"
import copy from "../../../../../../assets/Icon/Iconcopy.png";


export const ShateButton = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>


      <CustomButton className="bg-[#FFED00] text-[#14181F] hover:bg-[#FFFF33] h-[36px] w-[160px] rounded-[50px] flex items-center justify-center py-[6px] group max-2xl:w-[50%] xl:max-2xl:w-[100%] xl:max-2xl:px-1 xl:max-2xl:h-[30px]"
        onclick={() => setVisible(visible ? false : true)}
        label={<label className="flex gap-2 text-center w-[80%] text-[#14181F] font-normal leading-[20.8px] cursor-pointer max-2xl:text-[12px] items-center justify-center   xl:max-2xl:w-[100%]">QR Sharing
          <span className="flex items-center justify-center">
            {visible ?
              <Close2 className='' />
              :
              <ShareCircle className={'group-hover:hidden  xl:max-2xl:w-[80%]'} />
            }
            <span className={`hidden ${visible ? 'hidden' : 'group-hover:block xl:max-2xl:px-[5px]'}`}>{'\u25B2'}</span></span></label>} />

            {visible &&
          <div className="bg-[#14181F] w-[396px] h-[259px] absolute -top-[0px] z-50 left-[50px] flex flex-col justify-centr items-center rounded-[32px] p-[24px]">
            
            <div className="w-full h-[21px]">
              <CustomButton onclick={()=>setVisible(false)} className="" label={'Back'}/>
            </div>
            <div className="h-[190px] w-[318px] flex flex-col items-center pt-[24px]  justify-between">

              <div className="w-full h-[78px] flex justify-between   items-center">
                <div className="flex flex-col-reverse items-center gap-[12px]">
                  <p className="peer text-[14px]">Whatsapp</p>
                  <div className="peer-hover:bg-[#5E6061] hover:bg-[#5E6061] rounded-full bg-[#3E4347] h-[48px] w-[48px] text-center flex items-center justify-center">
                      <img src={whatsapp}/>
                  </div>

                </div>

                <div className="flex flex-col-reverse items-center gap-[12px]">
                  <p className="peer text-[14px]">Gmail</p>
                  <div className="rounded-full bg-[#3E4347] hover:bg-[#5E6061] h-[48px] w-[48px] peer-hover:bg-[#5E6061] flex items-center justify-center">
                  <img src={email}/>
                  </div>
                </div>

                <div className="flex flex-col-reverse items-center gap-[12px]">
                  <p className="peer text-[14px]">Copy IMG</p>
                  <div className="rounded-full bg-[#3E4347] hover:bg-[#5E6061] h-[48px] w-[48px] peer-hover:bg-[#5E6061] flex items-center justify-center">
                  <img src={image}/>
                  </div>
                </div>
              </div>

                <div className="">
                  <CustomButton className="bg-[#3E4347] w-[134px] h-[36px] rounded-[50px] py-[6px] px-[18px] hover:bg-[#5E6061]"  label={<span className="flex">{'Copy Link'} <img src={copy} alt="" className="" /></span>}/>
                </div>
            </div>

          </div>
        }
    </div>
  )
}
