import ModalWrapper from '@/components/partials/modals/ModalWrapper';
import { ChevronLeft, X } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'
import { StoreContext } from '@/components/store/StoreContext';
import SpinnerButton from '@/components/spinners/SpinnerButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useUploadPhoto from '@/components/custom-hook/useUploadPhoto';
import { setError, setIsAdd, setMessage, setSuccess } from '@/components/store/StoreAction';
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { devBaseImgUrl } from '@/components/helpers/functions-general';
import { InputFileUpload, InputText, InputTextArea } from '@/components/helpers/FormInputs';
import { queryData } from '@/components/helpers/queryData';

const ModalAddPost = ({ itemEdit }) => {

    const {store, dispatch} = React.useContext(StoreContext);
    const [isOpen, setIsOpen] = React.useState(false);
    const handleShowBody = () => setIsOpen(!isOpen);
    const handleClose = () => dispatch(setIsAdd(false));


    const { uploadPhoto, handleChangePhoto, photo } = useUploadPhoto(
      `/v1/upload/photo`,
      dispatch
    );
    

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (values) =>
        queryData(
            itemEdit ? `/v1/post/${itemEdit.post_aid}` :`/v1/post`,
            itemEdit ? "put" : "post",
            values
        ),
   
        onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["post"] });
        if (data.success) {
            dispatch(setIsAdd(false));
            dispatch(setSuccess(true));
            dispatch(setMessage(`Successfuly Added.`));
        } else {
            dispatch(setError(true));
            dispatch(setMessage(data.error));
        } 
        },
    });

    
     const initVal  = {
          post_title : itemEdit ? itemEdit.post_title : "",
          post_tag : itemEdit ? itemEdit.post_tag : "",
          post_category : itemEdit ? itemEdit.post_category : "",
          post_publish_date : itemEdit ? itemEdit.post_publish_date : "", 
          post_article : itemEdit ? itemEdit.post_article : "",  
     }
       

     const yupSchema = Yup.object({
       
        post_title: Yup.string().required("Required"),
        post_tag: Yup.string().required("Required"),
        post_category: Yup.string().required("Required"),
        post_publish_date: Yup.string().required("Required"),
        post_article: Yup.string().required("Required"),
        

     })




  return (
   <ModalWrapper>
<motion.div
        className={`modal-main m-1.5 absolute top-0 right-0 w-full h-[calc(100vh-10px)] rounded-md bg-secondary isolate`}
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1, maxWidth: isOpen ? "900px" : "332px" }}
        exit={{ x: 20, opacity: 0 }}
        transition={{
          duration: 0.1,
        }}
      >
        <button
          className="toggle-content absolute top-1/2 -translate-y-1/2 right-[calc(100%-20px)] bg-tableHead size-10 rounded-full -z-[1]"
          onClick={handleShowBody}
        >
          <ChevronLeft
            className={`${isOpen ? "rotate-180" : ""}  transition-all`}
          />
        </button>
        <div className="modal-header bg-tableHead flex justify-between p-2">
          <div className="flex gap-2 items-center">
            <h4 className="font-normal mb-0">New Post</h4>
          </div>
          <button onClick={handleClose}>
            <X />
          </button>
        </div>

        {/* forms */}
        <div className="modal-body h-[calc(100vh-120px)] p-4 bg-secondary ">
              <Formik
               initialValues={initVal}
               validationSchema={yupSchema}
               onSubmit={async (values) => {
               uploadPhoto()
                mutation.mutate({...values, 
                    post_image:
                    (itemEdit && itemEdit.post_image === "") || photo
                    ? photo === null
                    ? itemEdit.post_image
                    : photo.name
                     : values.post_image,})
                    }}
                 >

                  {(props) => {
                  return (
                  <Form>
                <div className="input-wrapper ">
                <InputText
                label="Title"
                type="text"
                name="post_title"
                id="title"
                required
                />
                </div>

                  <div className="flex gap-5 h-full">
            <motion.div
              className={`info  shrink-0 ${
                isOpen ? "max-w-[900px]" : "max-w-[420px]"
              } `}
            >
                  {/* image upload */}
                  <div className="input-wrapper">
                            {photo || (itemEdit && itemEdit.post_image !== "") ? (
                        <img
                        src={
                        photo
                        ? URL.createObjectURL(photo) // preview
                        : itemEdit.post_image // check db
                        ? devBaseImgUrl + "/" + itemEdit.post_image
                        : null
                        }
                        alt="Photo"
                        className="rounded-tr-md rounded-tl-md h-[200px] max-h-[200px] w-full object-cover object-center m-auto"
                        />
                            ) : (
                        <span className="min-h-20 flex items-center justify-center">
                        <span className="text-accent mr-1">Drag & Drop</span>{" "}
                        photo here or{" "}
                        <span className="text-accent ml-1">Browse</span>
                        </span>
                        )}

                        {(photo !== null ||
                        (itemEdit && itemEdit.post_image !== "")) && (
                        <span className="min-h-10 flex items-center justify-center">
                            <span className="text-accent mr-1">Drag & Drop</span>{" "}
                            photo here or{" "}
                            <span className="text-accent ml-1">Browse</span>
                            </span>
            )}

            {/* <FaUpload className="opacity-100 duration-200 group-hover:opacity-100 fill-dark/70 absolute top-0 right-0 bottom-0 left-0 min-w-[1.2rem] min-h-[1.2rem] max-w-[1.2rem] max-h-[1.2rem] m-auto cursor-pointer" /> */}
                        <InputFileUpload
                        label="Photo"
                        name="photo"
                        type="file"
                        id="myFile"
                        accept="image/*"
                        title="Upload photo"
                        onChange={(e) => handleChangePhoto(e)}
                        onDrop={(e) => handleChangePhoto(e)}
                        className="opacity-0 absolute right-0 bottom-0 left-0 m-auto cursor-pointer h-full "
            />

                        </div>


              <div className="input-wrapper ">

                <InputText
                  label="Tag"
                  type="text"
                  name="post_tag"
                  id="tag"
                  required
                  />
              </div>

              <div className="input-wrapper ">
                <InputText
                label="Category"
                type="text"
                name="post_category"
                id="category"
                required
                />
                </div>

                <div className="input-wrapper ">
                <InputText
                label="Published Date"
                type="date"
                name="post_publish_date"
                id="publish_date"
                required
                />
                </div>
            </motion.div>
            <motion.div
              className={`content  ${isOpen ? "basis-[560px]" : "basis-0"}`}
            >
              <div className="input-wrapper h-full">
                <InputTextArea
                 label="Article"
                 type="text"
                 name="post_article"
                 className="max-h-[1200px] h-full" 
                 required
                />
              </div>
            </motion.div>
          </div>

          <div className="modal-action flex justify-start gap-2 p-4">
          <button className="btn btn-accent"  type="submit">{mutation.isPending ? <SpinnerButton/> : "Add"}</button>
          <button className="btn btn-outline" type='button' onClick={handleClose}>Discard</button>
        </div>

            </Form>)}}
            
            </Formik>
       
        </div>
        
      </motion.div>
    </ModalWrapper>
  )
}

export default ModalAddPost
