import { useState, useEffect } from "react";
import { useReq } from "./Hooks/useReq";
import { AppBar } from "@mui/material";
import ButtonSet from "./Components/ButtonSet";
import Table from "./Components/Table";
import "./App.css";



export default function App() {
  const [isLoading, setLoading] = useState(false);
  const [section, setSection] = useState("employees");
  const [itemsToRemove, setItemsToRemove] = useState([]);
  const [editData, setEditData] = useState(true);
  const [tableData, setTableData] = useState([]);

  const { get, add, edit, remove } = useReq(setLoading);


  const editItem = async () => {
    const updatedData = await edit(section + editData.id, editData.data);
    setTableData(updatedData);
    setEditData(false);
  }

  const removeItems = async () => {
    const updatedData = await remove(section + '/' + itemsToRemove.join('-'));
    setTableData(updatedData);
    setItemsToRemove([]);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get(section);
        
        setTableData(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
  
    fetchData();
  }, [section])
  


  return (
    <div className="App">
      <AppBar position="static">
        <h1>Employee Management System</h1>
      </AppBar>

      <ButtonSet {...{add, isLoading, setLoading, section, setSection, setTableData, itemsToRemove, editData, editItem, removeItems}} />

      <Table {...{section, isLoading, tableData, setItemsToRemove, setEditData}} />
    </div>
  );
}
