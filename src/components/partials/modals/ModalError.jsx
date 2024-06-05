import { CircleAlert, MessageCircleQuestion, Trash2, X } from 'lucide-react'
import React from 'react'

const ModalError = () => {
  return (
    <>
     <div className='modal fixed top-0 left-0 w-full'>
        <div className="backdrop w-full h-screen bg-primary bg-opacity-80"></div>
            <div className="modal-main absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[320px]
             bg-white m-1.5 rounded-md overflow-hidden">
              <div className="modal-body h-[min(22vh,350px)] p-4 flex flex-col">
                <div className='grow  grid place-items-center place-self-start'>
                <CircleAlert className='text-alert' size={50}/>
                <p className='text-wrap my-5 text-center'>You are about to delete this record, are you sure you want to proceed?</p>
                </div>
                <div className="modal-action flex justify-center gap-2">
                    <button className='btn btn-alert'>Okay</button>
                </div>
              </div>
            </div>
    </div> 
    </>
  )
}

export default ModalError
