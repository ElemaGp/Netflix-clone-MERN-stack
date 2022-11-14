import "./listList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useContext } from "react";

import { useEffect } from "react";

import { ListContext } from "../../context/listContext/ListContext";
import { deleteList, getLists } from "../../context/listContext/apiCalls";

export default function ListList() {
  const {lists, dispatch} = useContext(ListContext);

  useEffect(()=>{
    getLists(dispatch); //getLists is the function of the "api calls" in "listContext" folder that handles axios fetching of the lists.
  },[dispatch]);

  const handleDelete = (id) => {
    deleteList(id, dispatch); //deleteLists is the function of the "api calls" in "listContext" folder that handles axios deleting of the lists.
  };



  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    { field: "title", headerName: "title", width: 250 },
    { field: "genre", headerName: "Genre", width: 150 },
    { field: "type", headerName: "type", width: 150 },
    
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={{pathname: "/list/1", list: params.row }}> {/* the "pathname" means that useLocation can be used so i can use the "list" values in the "/list" component where this links to. The ending part which says "list: params.row" means that the value of the "params.row" in this component can be carried into the component where this is linked to which is "/lists", and the "params.row" will be brought in there using useLocation and it'll be called "list" there. Then you can do "const list = location.list" there, and have access to the lists properties eg. list.title, list.genre etc */}
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={lists}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}
