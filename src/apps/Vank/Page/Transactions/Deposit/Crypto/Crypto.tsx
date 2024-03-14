import { useState } from 'react'
import { SectionCardBTC } from './SectionCardBTC/SectionCardBTC'
import imgBitcoin from '../../../../../../assets/Icon/Bitcoin.jpeg'
import imgEth from '../../../../../../assets/Icon/eth.jpeg'
import imgUsdt from '../../../../../../assets/Icon/usdt.jpeg'

export const Crypto = () => {
  const [value, setValue] = useState(0);
  return (
    <div className='h-full w-full flex flex-col justify-between relative '>

      <SectionCardBTC img={imgEth} title={'Ethereum ETH'} subTitle={'ETH'} onClick={() => setValue(() => value == 0 ? 1 : 0)}
        moreStyleCard={`${value == 1 ? 'h-full w-full absolute z-10 xl:max-2xl:h-full' : 'h-[120px]  hover:h-[130px] hover:bg-[#5E6061]  xl:max-2xl:hover:h-[100px]'}`}
        btnOnClick={() => setValue(() => value == 0 ? 1 : 0)} btnLabel={`${value == 1 ? '\u25B2' : '\u25BC'}`}
        contentStyle={`${value == 1 ? 'block' : 'hidden'}`}
      />

      <SectionCardBTC img={imgBitcoin} title={'Bitcoin BTC'} subTitle={'BTC'}  onClick={() => setValue(() => value == 0 ? 2 : 0)}
        moreStyleImg={''} moreStyleCard={`${value == 2 ? 'h-full  w-full absolute xl:max-2xl:h-full ': 'h-[120px]  hover:h-[130px] hover:bg-[#5E6061]  xl:max-2xl:hover:h-[100px]'}`}
        btnOnClick={() => setValue(() => value == 0 ? 2 : 0)} btnLabel={`${value == 2 ? '\u25B2' : '\u25BC'}`}
        contentStyle={`${value == 2 ? 'block' : 'hidden'}`}
      />

      <SectionCardBTC img={imgUsdt} title={'Tether USDT'} subTitle={'USDT'}  onClick={() => setValue(() => value == 0 ? 3 : 0)}
        moreStyleCard={`${value == 3 ? 'h-full  w-full absolute xl:max-2xl:h-full' : 'h-[120px]  hover:h-[130px] hover:bg-[#5E6061]  xl:max-2xl:hover:h-[100px]'}`}
        btnOnClick={() => setValue(() => value == 0 ? 3 : 0)} btnLabel={`${value == 3 ? '\u25B2' : '\u25BC'}`} 
        contentStyle={`${value == 3 ? 'block' : 'hidden'}`}
        />
        
    </div>
  )
}
