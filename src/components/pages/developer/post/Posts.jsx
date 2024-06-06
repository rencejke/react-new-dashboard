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
import { motion } from "framer-motion";
import Notification from "@/components/partials/Notification";
import ModalAddPost from "./ModalAddPost";

const Posts = () => {
   
  const [showNav, setShowNav] = React.useState(true);
  const [tableFilter, setTableFilter] = React.useState(false);
  const [toggleStatus, setToggleStatus] = React.useState(false);
  
  const handleSetShowNav = () => setShowNav(!showNav);
  const handleToggleStatus = () => setToggleStatus(!toggleStatus);
  const handleFilterTable = (filter) => setTableFilter(filter);

  


 
 
const springStatus = {
    type: "spring",
    stiffness: 700,
    damping: 20,
  };

  const springTable = {
    type: "spring",
    stiffness: 400,
    damping: 40,
    velocity: 100,
  };

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
              <button className="flex items-center gap-2 text-[12px] bg-accent px-4 py-2 rounded-md relative after:absolute after:content-[''] after:top-[3px] after:left-1/2 after:-translate-x-1/2 after:h-1/3 after:bg-gradient-to-b after:from-[#ffffff1c] after:to-transparent after:w-[95%] after:rounded-[3px] hover:after:from-[#ffffff25] bg-opacity-90 border-1 border-accent hover:bg-opacity-70 ">
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
                className="w-[min(30vw,300px)] block"
                required
                />
                <label htmlFor="search" className="opacity-20" ><Search />Search Keyword</label>
                 <small>*Reqwuired</small>

                </div>
               </form>
               </div>
             </div>

             <div className="flex-wrapper flex  gap-10">
        

              <motion.table className={` shrink-0 ${tableFilter === "all" ?  "start" : ""}`}
              
              layout transition={{
                type: "spring",
                stiffness: 700,
                damping: 60
              }}>
                <thead>
                  <tr>
                    <th className="w-[30px] text-center">#</th>
                    <th className="w-[80px] text-center">Status 1</th>
                    <th>Title</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="w-[30px] text-center">1</td>
                    <td className="text-center">
                      <button className={`${toggleStatus ? "active" : ""} toggle-status`}
                      data-ison={toggleStatus}  
                      onClick={handleToggleStatus}
                      ><motion.span layout transition={springStatus}></motion.span></button>
                      </td>
                    <td>Lorem ipsum dolor sit</td>
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
                          <button>
                            <Trash /> <span>Delete</span> 
                          </button>
                        </li>
                        </ul>
                          </div>

             
                        </div>

                    
                    </td>
                  </tr>
     

                </tbody>
              </motion.table>

              <motion.table className={` shrink-0 ${tableFilter === "active" ?  "center" : ""}`} layout transition={springTable} >
                <thead>
                  <tr>
                    <th className="w-[30px] text-center">#</th>
                    <th className="w-[80px] text-center">Status 2</th>
                    <th>Title</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="w-[30px] text-center">1</td>
                    <td className="text-center">
                      <button className={`${toggleStatus ? "active" : ""} toggle-status`}
                      data-ison={toggleStatus}  
                      onClick={handleToggleStatus}
                      ><motion.span layout transition={springTable} ></motion.span></button>
                      </td>
                    <td>Lorem ipsum dolor sit</td>
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
                          <button>
                            <Trash /> <span>Delete</span> 
                          </button>
                        </li>
                        </ul>
                          </div>

             
                        </div>

                    
                    </td>
                  </tr>
     

                </tbody>
              </motion.table>

              <motion.table className={` shrink-0 ${tableFilter === "inactive" ?  "end" : ""}`}
              
              layout transition={springTable} >
                <thead>
                  <tr>
                    <th className="w-[30px] text-center">#</th>
                    <th className="w-[80px] text-center">Status 3</th>
                    <th>Title</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="w-[30px] text-center">1</td>
                    <td className="text-center">
                      <button className={`${toggleStatus ? "active" : ""} toggle-status`}
                      data-ison={toggleStatus}  
                      onClick={handleToggleStatus}
                      ><motion.span layout transition={{
                        type: "spring",
                        stiffness: 700,
                        damping: 60
                      }}></motion.span></button>
                      </td>
                    <td>Lorem ipsum dolor sit</td>
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
                          <button>
                            <Trash /> <span>Delete</span> 
                          </button>
                        </li>
                        </ul>
                          </div>

             
                        </div>

                    
                    </td>
                  </tr>
     

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

      <ModalAddPost/>
        {/* <Notification/>             */}
      {/* <ModalConfirm/> */}
        {/* <ModalDelete/> */}
        {/* <ModalError/> */}
    </>
  );
};

export default Posts;
