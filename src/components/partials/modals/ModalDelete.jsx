import { queryData } from '@/components/helpers/queryData'
import { setIsDelete, setMessage, setSuccess } from '@/components/store/StoreAction'
import { StoreContext } from '@/components/store/StoreContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MessageCircleQuestion, Trash2, X } from 'lucide-react'
import React from 'react'

const ModalDelete = ({ endpoint, queryKey }) => {
  const {store, dispatch} = React.useContext(StoreContext)
  const handleClose = () => dispatch(setIsDelete(false))

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) => queryData(endpoint, "delete", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [queryKey] });

      if (data.success) {
        dispatch(setIsDelete(false));
        dispatch(setSuccess(true));
        dispatch(setMessage('Record Successfully Deleted'))
      } else {
        // setIsError(true)
        // setMessage('Delete failed!')
      }
      
    },
  });

  const handleDelete = async () => {
    mutation.mutate();
  };


  

  return (
    <>
     <div className='modal fixed top-0 left-0 w-full'>
        <div className="backdrop w-full h-screen bg-primary bg-opacity-80"></div>
            <div className="modal-main absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[420px]
             bg-white m-1.5 rounded-md overflow-hidden">
              <div className="modal-header bg-alert flex justify-between p-2">
               <div className='flex gap-2 items-center'>
               <Trash2/>
               <h4 className='font-normal mb-0'>Delete</h4>
               </div>
               <button onClick={handleClose}><X/></button>
              </div>
              <div className="modal-body h-[min(20vh,130px)] p-4 flex flex-col">
                <div className='grow overflow-y-auto grid place-items-center place-self-start'>
                <p className='text-wrap'>You are about to delete this record, are you sure you want to proceed?</p>
                </div>
                <div className="modal-action flex justify-end gap-2">
                    <button className='btn btn-alert' onClick={handleDelete}>Delete</button>
                    <button className='btn btn-outline' onClick={handleClose}>Discard</button>
                </div>
              </div>
            </div>
    </div> 
    </>
  )
}

export default ModalDelete
