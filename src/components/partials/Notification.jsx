import { Info, X } from 'lucide-react'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { StoreContext } from '../store/StoreContext'
import { setSuccess } from '../store/StoreAction'

const Notification = () => {
  const {store, dispatch} = React.useContext(StoreContext)
  

  function close () {
    setTimeout(()=>{
      dispatch(setSuccess(false))
    },2500)
  }

 close ()

  return (
    <motion.div className='fixed bottom-5 right-5 z-[50] min-w-[300px] p-4 
     rounded-md bg-accent
     flex justify-between items-center'
     
     initial={{ y:10, opacity: 0}}
     animate={{ y:0, opacity: 1}}
     exit={{ y:-10, opacity: 0}}
     >
    <p className='mb-0 text-sm text-white'>{store.message}</p>
   <button> <X size={14}/></button>

   <span className='absolute -top-2 -left-2 size-6 grid place-content-center bg-white rounded-full'><Info className='text-accent' size={18}/></span>
    </motion.div>
  )
}

export default Notification