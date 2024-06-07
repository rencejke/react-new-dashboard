import ModalConfirm from "@/components/partials/modals/ModalConfirm";
import ModalDelete from "@/components/partials/modals/ModalDelete";
import ModalError from "@/components/partials/modals/ModalError";
import {
  Archive,
  ArchiveRestore,
  ChevronDown,
  CircleGauge,
  FilePenLine,
  GripVertical,
  Menu,
  Plus,
  Search,
  Trash,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Notification from "@/components/partials/Notification";
import ModalAddPost from "./ModalAddPost";
import { StoreContext } from "@/components/store/StoreContext";
import { setIsActive, setIsAdd, setIsDelete } from "@/components/store/StoreAction";
import { springStatus, springTable } from "@/components/helpers/animations";
import SpinnerFetching from "@/components/spinners/SpinnerFetching";
import useQueryData from "@/components/custom-hook/useQueryData";
import TableLoader from "@/components/partials/TableLoader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "@/components/helpers/queryData";


const Posts = () => {
  const {store, dispatch} = React.useContext(StoreContext);
  const [showNav, setShowNav] = React.useState(true);
  const [tableFilter, setTableFilter] = React.useState(false);
  const [toggleStatus, setToggleStatus] = React.useState(false);
  const [itemEdit, setItemEdit] = React.useState(null);
  const [isSearch, setIsSearch] = React.useState(false);
  const [keyword, setKeyword] = React.useState('');
  const [id, setId] = React.useState('');

  const handleSetShowNav = () => setShowNav(!showNav);
  // const handleToggleStatus = () => setToggleStatus(!toggleStatus);
  const handleFilterTable = (filter) => setTableFilter(filter);


  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  }


  let counter = 1;

  const handleEdit = (item) => {
      dispatch(setIsAdd(true));
      setItemEdit(item);
  }

  // archive is here
  const handleActive = (item) => {
      dispatch(setIsActive(true));
      setId(item.post_aid);
      setIsArchiving(0);
  }
  const handleRestore = (item) => {
      dispatch(setIsActive(true));
      setId(item.post_aid);
      setIsArchiving(1);
  }

  const handlDelete = (item) => {
      dispatch(setIsDelete(true));
      setId(item.post_aid);
  }


  const {
    isLoading,
    isFetching,
    error,
    data: post,
  } = useQueryData(
    isSearch ? "/v1/post/search" : "/v1/post", // endpoint
    isSearch ? "post" : "get", // method
    "post", // key
    {
        searchValue: keyword
    }
  );

   const getAllActive = () => !isLoading && post?.data?.filter((item) => item.post_is_active === 1) 
  const getAllInActive = () => !isLoading && post?.data.filter((item) => item.post_is_active === 0) 
    

 console.log(getAllActive() )

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








  return (
    <>
      <header className="bg-primary px-5 py-3  text-light border-b border-line">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center text-header">
          <button onClick={()=> handleSetShowNav()}>
          <Menu className="stroke-header" />
          </button>
            Logo Here!!
          </div>
          <div className="avatar flex items-center gap-2">
            <img
              src="https://via.placeholder.com/50x50"
              alt=""
              className="size-9 rounded-full"
            />
            <ChevronDown className="stroke-header" size="16" />
          </div>
        </div>
      </header>
      <main className="main-wrapper flex  ">
        <nav className={` ${showNav ? "w-[0px] md:w-[250px]" : "w-[250px] md:w-[0px]"} pt-3 h-[calc(100vh-65px)] bg-primary border-r border-line overflow-hidden 
        transition-all absolute md:static z-50`}>
          <ul className="h-full">
            <li className="nav-link mb-2 nav-link-active">
              <Link
                to="/"
                className="text-sm p-3 flex gap-3 items-center leading-none  "
              >
                <CircleGauge size="12" /> Dashboard
              </Link>
            </li>
            <li className="nav-link mb-2">
              <Link
                to="/"
                className="text-sm p-3 flex gap-3 items-center leading-none "
              >
                <CircleGauge size="12" /> Post
              </Link>
            </li>
            <li className="nav-link mb-2">
              <Link
                to="/"
                className="text-sm p-3 flex gap-3 items-center leading-none "
              >
                <CircleGauge size="12" /> Pages
              </Link>
            </li>
            <li className="nav-link mb-2">
              <Link
                to="/"
                className="text-sm p-3 flex gap-3 items-center leading-none "
              >
                <CircleGauge size="12" /> Team
              </Link>
            </li>
            <li className="nav-link mb-2">
              <Link
                to="/"
                className="text-sm p-3 flex gap-3 items-center leading-none "
              >
                <CircleGauge size="12" /> Services
              </Link>
            </li>
            <li className="nav-link  mb-2">
              <Link
                to="/"
                className="text-sm p-3 flex gap-3 items-center leading-none "
              >
                <CircleGauge size="12" /> Portfolio
              </Link>
            </li>
          </ul>
        </nav>
        <div className="px-5 py-3 pb-1 grow flex flex-col h-[calc()]">
          <div className=" grow">
            <div className="flex justify-between items-center w-full">
              <div>
                <h2 className="mb-0 font-sansRegular">Post</h2>
                <p className="text-xs text-body hidden md:block">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Labore, eos!
                </p>
              </div>
              <button className="btn" onClick={handleAdd}>
                <Plus size={14} /> Add
              </button>
            </div>

            <div className="table-wrapper  mt-3 rounded-md">

             <div className="flex justify-between mb-3 items-center">
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
               <div className="search">
               <form>
                <div className="input-wrapper">

                <input type="search" 
                id="search" 
                className="!w-[min(30vw,300px)]"
                required
                />
                <label htmlFor="search" className="opacity-20" ><Search />Search Keyword</label>
                 <small>*Reqwuired</small>

                </div>
               </form>
               </div>
             </div>
             {isFetching && <SpinnerFetching/>}
             <div className="flex-wrapper flex  gap-10">
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
                    <td className="w-[30px] text-center">{counter++}</td>
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
              <motion.table className={` shrink-0 ${tableFilter === "active" ?  "center" : ""}`}
              layout
               transition={{
                type: "spring",
                stiffness: 700,
                damping: 60
              }}>
                <thead>
                  <tr>
                    <th className="w-[30px] text-center">#</th>
                    <th className="w-[80px] text-center">Status</th>
                    <th className="w-[80px] text-center">Title</th>
                    <th className="w-[80px] text-center">Tag</th>
                    <th className="w-[80px] text-center">Category</th>
                    <th className="w-[80px] text-center">Published Date</th>
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
                    <td className="w-[30px] text-center">{counter++}</td>
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
              <motion.table className={` shrink-0 ${tableFilter === "inactive" ?  "end" : ""}`}
                layout
             transition={{
                type: "spring",
                stiffness: 700,
                damping: 60
              }}>
                <thead>
                  <tr>
                    <th className="w-[30px] text-center">#</th>
                    <th className="w-[80px] text-center">Status</th>
                    <th className="w-[80px] text-center">Title</th>
                    <th className="w-[80px] text-center">Tag</th>
                    <th className="w-[80px] text-center">Category</th>
                    <th className="w-[80px] text-center">Published Date</th>
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
                    <td className="w-[30px] text-center">{counter++}</td>
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
          </div>
          <footer className="border-t border-line border-opacity-40 opacity-20 flex justify-between py-1">
            <small className="text-[10px] uppercase font-sansThin">
              Count: 4
            </small>
          </footer>
        </div>
      </main>

    <AnimatePresence>
    {store.isAdd && <ModalAddPost itemEdit={itemEdit}/>}
      </ AnimatePresence>
      
      <AnimatePresence>
      {store.success && <Notification />}
      </AnimatePresence>

      {store.error && <ModalError />}
      {store.isDelete && <ModalDelete  queryKey="post" endpoint={`/v1/post/${id}`} />} 
        {/* <Notification/>             */}
      {/* <ModalConfirm/> */}
        {/* <ModalDelete/> */}
        {/* <ModalError/> */}
    </>
  );
};

export default Posts;
