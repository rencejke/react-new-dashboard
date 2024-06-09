import ModalError from "@/components/partials/modals/ModalError";
import {
  ChevronDown,
  CircleGauge,
  Menu,
  Plus,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Notification from "@/components/partials/Notification";
import ModalAddPost from "./ModalAddPost";
import { StoreContext } from "@/components/store/StoreContext";
import {setIsAdd} from "@/components/store/StoreAction";
import useQueryData from "@/components/custom-hook/useQueryData";;
import PostTable from "./PostTable";


const Posts = () => {
  const {store, dispatch} = React.useContext(StoreContext); 
  const [showNav, setShowNav] = React.useState(true);       
  // const [toggleStatus, setToggleStatus] = React.useState(false);
  const [itemEdit, setItemEdit] = React.useState(null);
  const [isSearch, setIsSearch] = React.useState(false);
  const [keyword, setKeyword] = React.useState('');

  const handleSetShowNav = () => setShowNav(!showNav);
  // const handleToggleStatus = () => setToggleStatus(!toggleStatus);



  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
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

         <PostTable isLoading={isLoading} post={post} isFetching={isFetching} setItemEdit={setItemEdit}/>
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
    </>
  );
};

export default Posts;
