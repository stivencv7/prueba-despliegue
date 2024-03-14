interface CustomTextAreaProps{
    classNameTextArea:any,
    classNameLabel:any,
    label:any,
    [key: string]: any; // Propiedades adicionales opcionales
}

export const CustomTextArea = ({classNameTextArea,classNameLabel,label,...rest}:CustomTextAreaProps) => {
  return (
    <div className="flex flex-col ">
        <label htmlFor="" className={classNameLabel}>{label}</label>
        <textarea  style={{resize:'none'}} className={`outline-none focus-visible:bg-[#4D5358] hover:bg-[#4D5358] hover:border-[2px] hover:border-[#6F6E64] focus-visible:border-[2px] bg-[--dark-gray] focus-visible:border-[#6F6E64] rounded-[10px] p-[13px] 
        ${classNameTextArea}`}
        {...rest}
        />
    </div>
  )
}
