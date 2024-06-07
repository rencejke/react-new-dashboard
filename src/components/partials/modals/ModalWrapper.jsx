import React from 'react'
import { motion } from 'framer-motion'
import { springTable } from "@/components/helpers/animations";

const ModalWrapper = ({children}) => {
  return (
    <div className="modal fixed top-0 left-0 w-full z-50"
    >
    <motion.div className="backdrop w-full h-screen bg-primary bg-opacity-80 -z-1"
     initial ={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     exit={{ opacity: 0 }}
    transition={{ springTable }}
     

    ></motion.div>
    {children}
    </div>
  )
}

export default ModalWrapper