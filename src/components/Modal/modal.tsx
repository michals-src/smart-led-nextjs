import { ReactNode } from 'react'
import { Box } from '../'
import { XMarkIcon } from '@heroicons/react/24/solid'

type TModal = {
    title?: string;
    children?: ReactNode;
}

const Modal = ({ title, children }: TModal) => {

    return (
        <div className='fixed top-0 left-0 bottom-0 right-0 z-30 bg-[#000000AF]'>
            <div className='p-10 max-w-md mx-auto h-full'>
                <Box bgSolid='#18181b' className=' w-full h-full overflow-auto'>
                    <div className='relative' >
                        <div className="sticky top-0 left-0 p-8 z-10" style={{
                            background: 'linear-gradient(to bottom, #18181b 50%, #00000000 100%)'
                        }}>
                            <div className='flex flex-row flex-nowrap'>
                                <div>{title}</div>
                                <div className='w-auto ml-auto'>
                                    <div className='table p-2 bg-[#555555] rounded-full shadow-lg cursor-pointer'>
                                        <XMarkIcon className='w-4 h-4 text-white' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='p-8 relative z-[9]' >
                            {children}
                        </div>
                    </div>
                </Box>
            </div>
        </div>
    )
}

export default Modal