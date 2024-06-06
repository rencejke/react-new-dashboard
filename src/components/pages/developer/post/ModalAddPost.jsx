import { ChevronLeft, X } from 'lucide-react'
import React from 'react'



const ModalAddPost = () => {

    const [isOpen, setIsOpen] = React.useState(false);

const handleShowBody = () => setIsOpen(!isOpen);

  return (
    <div className="modal fixed top-0 left-0 w-full z-50">
    <div className="backdrop w-full h-screen bg-primary bg-opacity-80 -z-1"></div>
    <div className={`isolate modal-main m-1.5 absolute top-0 right-0  w-full ${isOpen ? "max-w-[1100px]" : "max-w-[420px]"} h-[calc(100vh-10px)] rounded-md bg-secondary`}>
       
       <button className='toggle-content absolute top-1/2 right-[calc(100%-20px)] z-[10] bg-tableHead rounded-full size-10 -translate-y-1/2 z-[-1]'
       onClick={handleShowBody}
       >

        <ChevronLeft className={`${isOpen ? "rotate-180" : ""} transition-all`}/>

       </button>
      <div className="modal-header bg-tableHead flex justify-between p-2">
        <div className="flex gap-2 items-center">
          <h4 className="font-normal mb-0">New Post</h4>
        </div>
        <button>
          <X />
        </button>
      </div>
      <div className="modal-body h-[calc(100vh-120px)] p-4 bg-secondary ">
        <div className="input-wrapper mb-4">
          <input type="text" id="title" required />
          <label htmlFor="title ">Title</label>
        </div>
        <div className="flex gap-5 h-full">
          <div className={`info shrink-0 ${isOpen ? "basis-1/3" : "basis-full"}`}>
            <img
              src="https:via.placeholder.com/300x200"
              alt=""
              className="mb-2"
            />

            <div className="input-wrapper ">
              <input type="text" id="tag" required />
              <label htmlFor="tag ">Tag</label>
            </div>

            <div className="input-wrapper ">
              <input type="text" id="category" required />
              <label htmlFor="category ">Category</label>
            </div>

            <div className="input-wrapper ">
              <input type="date" id="date" required />
              <label htmlFor="date ">Date</label>
            </div>
          </div>
          <div className="content  basis-2/3">
            <div className="input-wrapper h-full">
              <textarea required className="max-h-[1200px] h-full"></textarea>
              <label htmlFor="date ">Body</label>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-action flex justify-start gap-2 p-4">
        <button className="btn btn-alert">Delete</button>
        <button className="btn btn-outline">Discard</button>
      </div>
    </div>
  </div>
  )
}

export default ModalAddPost
