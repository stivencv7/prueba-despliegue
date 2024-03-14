import CustomButton from '../../../../../Shared/CustomButton/CustomButton'
import { IconCopy } from '../../../../../../assets/Icon/IconCopy';
export const ButtonCopy = ({textCopy,classNameBtnCopy,text}:{textCopy?:any,classNameBtnCopy?:any,text?:any}) => {

    //funcion que permite copiar el texto
    const copyToClipboard = () => {
        navigator.clipboard.writeText(textCopy).then(() => {
            console.log('Texto copiado al portapapeles');
        }).catch(err => {
            console.error('Error al copiar el texto al portapapeles:', err);
        });
    };

    return (

        <CustomButton className={classNameBtnCopy}
            label={<span className="flex gap-2"onClick={() => copyToClipboard()}>
            <p className="">{text} </p><IconCopy/></span>} />

    )
}
