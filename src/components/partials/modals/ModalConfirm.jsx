import { MessageCircleQuestion, X } from 'lucide-react'
import React from 'react'

const ModalConfirm = () => {
  return (
    <>
     <div className='modal fixed top-0 left-0 w-full'>
        <div className="backdrop w-full h-screen bg-primary bg-opacity-80"></div>
            <div className="modal-main absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[420px]
             bg-white m-1.5 rounded-md overflow-hidden">
              <div className="modal-header bg-accent flex justify-between p-2">
               <div className='flex gap-2 items-center'>
               <MessageCircleQuestion/>
               <h4 className='font-normal mb-0'>Confirm</h4>
               </div>
               <button><X/></button>
              </div>
              <div className="modal-body h-[min(20vh,130px)] p-4 flex flex-col">
                <div className='grow overflow-y-auto grid place-items-center place-self-start'>
                <p className='text-wrap'>You are about to archive this record, are you sure you want to proceed?</p>
                </div>
                <div className="modal-action flex justify-end gap-2">
                    <button className='btn'>Confirm</button>
                    <button className='btn btn-outline'>Discard</button>
                </div>
              </div>
            </div>
    </div> 
    </>
  )
}

export default ModalConfirm
