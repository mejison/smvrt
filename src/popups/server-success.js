import WrapperModal from './wrapper.js'
import okSVG from '@/assets/ok.svg'

export default function ServerSuccess(props) {
    return (<WrapperModal icon={okSVG} open={props.open} {...props}>
                <p className='text-[14px] text-[#171717] mb-[14px]'>
                   {props.message}
                </p>
            </WrapperModal>);
}