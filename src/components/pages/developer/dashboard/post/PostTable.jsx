import SpinnerFetching from '@/components/spinners/SpinnerFetching'
import React from 'react'
import { motion } from 'framer-motion'
import { StoreContext } from '@/components/store/StoreContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryData } from '@/components/helpers/queryData';
import { FilePenLine, GripVertical, Search, Trash } from 'lucide-react';
import { springStatus, springTable } from '@/components/helpers/animations';
import TableLoader from '@/components/partials/TableLoader';
import ModalDelete from '@/components/partials/modals/ModalDelete';
import { setIsAdd, setIsDelete } from '@/components/store/StoreAction';



const PostTable = ({setItemEdit, isLoading, isFetching, post}) => {

const {store, dispatch} = React.useContext(StoreContext); 
const [id, setId] = React.useState('');
const [tableFilter, setTableFilter] = React.useState(false); 


const handleFilterTable = (filter) => setTableFilter(filter);

let counterAll = 1;
let counterActive = 1;
let counterInActive = 1;


const handlDelete = (item) => {
    dispatch(setIsDelete(true));
    setId(item.post_aid);
}


const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
}
//archiving table
const queryClient = useQueryClient();
 const mutation = useMutation({
    mutationFn: (values) => queryData( "/v1/post/active", "put", values),
    onSuccess: (data) => {
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: ['post'] });
      
    if (data.success) {
     dispatch(setIsActive(false))
      dispatch(setSuccess(true))
      dispatch(setMessage(`Record successfully`))
    } else {
      // setIsError(true)
      // setMessage(data.error)
    }
    
    },
});

    const handleConfirmed = async (id, isArchiving) => {
        mutation.mutate({
        id:id,
        isActive: !isArchiving === true ? 1 : 0,
    });
    };

    const handleDelete = (item) => 
    {
        dispatch(setIsDelete(true));
        setId(item.post_aid);
    }

    
//    get only the active and inactive in a table
   const getAllActive = () => !isLoading && post?.data?.filter((item) => item.post_is_active === 1) 
   const getAllInActive = () => !isLoading && post?.data.filter((item) => item.post_is_active === 0) 

    return (
    
   <>
    <div className="table-wrapper  mt-3 rounded-md">
    <div className="flex justify-between mb-3 items-center">

    {/* filter table */}
    <div className="filter">
     <ul className="flex gap-5">
     <li
         className={`p-2 text-sm ${
           tableFilter === "all" ? "opacity-100 text-accent" : "opacity-50"
         }`}
       ><button  onClick={()=> handleFilterTable("all")}>All</button> </li>
   <li
         className={`p-2 text-sm ${
           tableFilter === "active" ? "opacity-100 text-accent" : "opacity-50"
         }`}
       ><button onClick={()=> handleFilterTable("active")}>Active</button> </li>
   <li
         className={`p-2 text-sm ${
           tableFilter === "inactive" ? "opacity-100 text-accent" : "opacity-50"
         }`}
       > <button onClick={()=> handleFilterTable("inactive")}>Inactive</button> </li>
 </ul>
    </div>

    {/* search */}
    <div className="search">
  <form>
   <div className="input-wrapper">

   <input type="search" 
   id="search" 
   className="!w-[min(30vw,300px)]"
   required
   />
   <label htmlFor="search" className="opacity-20" ><Search/>Search Keyword</label>
    <small>*Required</small>
   </div>
  </form>
    </div>


    </div>
{isFetching && <SpinnerFetching/>}
<div className="flex-wrapper flex  gap-10">

    {/* all table */}
    <motion.table className={` shrink-0 ${tableFilter === "all" ?  "start" : ""}`}
  layout
  transition={springTable}>
   <thead>
     <tr>
       <th className="w-[30px] text-center">#</th>
       <th className="w-[80px] text-center ">Status</th>
       <th className=" ">Title</th>
       <th className=" ">Tag</th>
       <th className=" ">Category</th>
       <th className=" ">Published Date</th>
       <th></th>
     </tr>
   </thead>
   <tbody>

   {isLoading && ( 
   <tr>
       <td colSpan={9}>
           <TableLoader count="20" cols="4"/>
       </td>
   </tr>)
   }

   
 {post?.data.length === 0 && (
       <tr>
           <td colSpan={9}>
               No data
           </td>
       </tr>
   )}

     {post?.data.map((item, key) => (
     <tr key={key}>
       <td className="w-[30px] text-center">{counterAll++}</td>
       <td className="text-center">
         <button className={`${item.post_is_active  ? "active" : ""} toggle-status`}
         data-ison={item.post_is_active ? 1 : 0 }  
         onClick={()=> handleConfirmed(item.post_aid, item.post_is_active )}
         ><motion.span layout transition={springStatus}></motion.span></button>
         </td>
       <td>{item.post_title}</td>
       <td>{item.post_tag}</td>
       <td>{item.post_category}</td>
       <td>{item.post_publish_date}</td>
       <td>

           <div className="table-action ">
             <div>
               <div className="table-action-menu">
               <GripVertical/>
               </div>

               <ul>
           <li>
             <button onClick={()=>handleEdit(item)}>
               <FilePenLine /> <span>Edit</span>
             </button>
           </li>
           <li>
             <button onClick={()=>handleDelete(item)}>
               <Trash /> <span>Delete</span> 
             </button>
           </li>
           </ul>
             </div>
           </div>
       </td>
     </tr>))}
   </tbody>
    </motion.table>
    
    {/* active table */}
    <motion.table className={` shrink-0 ${tableFilter === "active" ?  "center" : ""}`}
        layout
        transition={springTable}>
   <thead>
     <tr>
      <th className="w-[30px] text-center">#</th>
       <th className="w-[80px] text-center ">Status</th>
       <th>Title</th>
       <th>Tag</th>
       <th>Category</th>
       <th>Published Date</th>
       <th></th>
     </tr>
   </thead>
   <tbody>

   {isLoading && ( 
   <tr>
       <td colSpan={9}>
           <TableLoader count="20" cols="4"/>
       </td>
   </tr>)
   }

   
    {getAllActive().length === 0 && (
       <tr>
           <td colSpan={9}>
               No data
           </td>
       </tr>
      )}

     {!isLoading && getAllActive().map((item, key) => (
     <tr key={key}>
       <td className="w-[30px] text-center">{counterActive++}</td>
       <td className="text-center">
         <button className={`${item.post_is_active  ? "active" : ""} toggle-status`}
         data-ison={item.post_is_active ? 1 : 0 }  
         onClick={()=> handleConfirmed(item.post_aid, item.post_is_active )}
         ><motion.span layout transition={springStatus}></motion.span></button>
         </td>
       <td>{item.post_title}</td>
       <td>{item.post_tag}</td>
       <td>{item.post_category}</td>
       <td>{item.post_publish_date}</td>
       <td>

           <div className="table-action ">
             <div>
               <div className="table-action-menu">
               <GripVertical/>
               </div>

               <ul>
           <li>
             <button>
               <FilePenLine /> <span>Edit</span>
             </button>
           </li>
           <li>
             <button onClick={()=>handlDelete(item)}>
               <Trash /> <span>Delete</span> 
             </button>
           </li>
           </ul>
             </div>
           </div>
       </td>
     </tr>))}
   </tbody>
    </motion.table>
    
      {/* InActive table */}
     <motion.table className={` shrink-0 ${tableFilter === "inactive" ?  "end" : ""}`}
        layout
        transition={springTable}>

   <thead>
     <tr>
       <th className="w-[30px] text-center">#</th>
       <th className="w-[80px] text-center ">Status</th>
       <th>Title</th>
       <th>Tag</th>
       <th>Category</th>
       <th>Published Date</th>
       <th></th>
     </tr>
   </thead>
   <tbody>

   {isLoading && ( 
   <tr>
       <td colSpan={9}>
           <TableLoader count="20" cols="4"/>
       </td>
   </tr>)
   }
 {post?.data.length === 0 && (
       <tr>
           <td colSpan={9}>
               No data
           </td>
       </tr>
   )}

     {!isLoading && getAllInActive().map((item, key) => (
     <tr key={key}>
       <td className="w-[30px] text-center">{counterInActive++}</td>
       <td className="text-center">
         <button className={`${item.post_is_active  ? "active" : ""} toggle-status`}
         data-ison={item.post_is_active ? 1 : 0 }  
         onClick={()=> handleConfirmed(item.post_aid, item.post_is_active )}
         ><motion.span layout transition={springStatus}></motion.span></button>
         </td>
       <td>{item.post_title}</td>
       <td>{item.post_tag}</td>
       <td>{item.post_category}</td>
       <td>{item.post_publish_date}</td>
       <td>

           <div className="table-action ">
             <div>
               <div className="table-action-menu">
               <GripVertical/>
               </div>

               <ul>
           <li>
             <button>
               <FilePenLine /> <span>Edit</span>
             </button>
           </li>
           <li>
             <button onClick={()=>handlDelete(item)}>
               <Trash /> <span>Delete</span> 
             </button>
           </li>
           </ul>
             </div>
           </div>     
       </td>
     </tr>))}
   </tbody>
    </motion.table>
</div>
</div>

{store.isDelete && <ModalDelete  queryKey="post" endpoint={`/v1/post/${id}`} />} 
   </>
  )
}

export default PostTable