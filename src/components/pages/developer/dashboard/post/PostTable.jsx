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
import { GrAscend, GrDescend } from 'react-icons/gr';


import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { DebouncedInputSearch, Filter } from '@/components/helpers/functions';



const PostTable = ({setItemEdit, isLoading, isFetching, post}) => {

  
  const {store, dispatch} = React.useContext(StoreContext); 
  const [id, setId] = React.useState('');
  const [tableFilter, setTableFilter] = React.useState(false); 
  const columnHelper = createColumnHelper();

  
  const [data, setData] = React.useState(!isLoading && post?.data)
  
  //for searching keywords 
  const [globalFilter, setGlobalFilter] = React.useState("");
  
  //   for chain(multiple) filtering 
  const [columnFilters, setColumnFilters] = React.useState([]);



  React.useEffect(() => {
    if(!isLoading) {
      setData(post?.data)
    }  
  }, [isLoading])

const columns = [
  columnHelper.accessor("count", {
      header: "#",
      cell: (row) => {
        return row.row.index + 1;
      },
    }),
    
  columnHelper.accessor("post_title", {
    header: "title",
  }),
  columnHelper.accessor('post_image', {
    header:  "image",
  }),
  columnHelper.accessor("post_tag", {
    header: "tag",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("post_category", {
    header: "Category",
  }),
  columnHelper.accessor("post_is_active", {
    header: "Active",
  }),
  columnHelper.accessor("post_publish_date	", {
    header: "Published Date",
  }),

  columnHelper.accessor("action", {
      header: "Action",
      cell: (row) => (
        <>
          <button
            type="button"
            className="tooltip"
            data-tooltip="Restore"
            onClick={() => handleSomething(row.row.original)}
          >
            Edit
          </button>
        </>
      ),
    }),
]

const handleSomething = (row) => console.log(row)

const table = useReactTable({
  data,
  columns,
  state: {
      globalFilter,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
});


//react table






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
   const getAllActive = () => !isLoading && post?.data.filter((item) => item.post_is_active === 1) 
   const getAllInActive = () => !isLoading && post?.data.filter((item) => item.post_is_active === 0) 

    return (
    
   <>
  {isLoading && <h2>Loading</h2>}

  <div className="search">
         
         {/* delay the search */}
        <DebouncedInputSearch
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          className="text-sm shadow-sm border border-block"
          placeholder="Type your keyword"
        />
      </div>

  {!isLoading && (<table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
               <th key={header.id} data-sort={header.column.getCanSort()}>
               {header.isPlaceholder ? null : (
                 <div
                   {...{
                     className: header.column.getCanSort()
                       ? "cursor-pointer flex gap-2 items-center "
                       : "",
                     onClick: header.column.getCanSort()
                       ? header.column.getToggleSortingHandler()
                       : null,
                   }}
                 >
                   {flexRender(
                     header.column.columnDef.header,
                     header.getContext()
                   )}
                    {header.column.getCanFilter() &&
                    header.column.id !== "action" && (
                      <Filter column={header.column} table={table} />
                    )}
                   {
                     {
                       asc: <GrAscend />,
                       desc: <GrDescend />,
                     }[header.column.getIsSorted()]
                   }
                 </div>
               )}
             </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        
      </table>) }



{store.isDelete && <ModalDelete  queryKey="post" endpoint={`/v1/post/${id}`} />} 
   </>
  )
}

export default PostTable