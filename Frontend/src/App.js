import { useState } from "react";
import { useReq } from "./Hooks/useReq";
import { AppBar } from "@mui/material";
import ButtonSet from "./Components/ButtonSet";
import Table from "./Components/Table";
import "./App.css";

const rows = [
  {
    id: 1,
    lastName: "Snow",
    firstName: "Jon",
    birthday: "1996-05-13",
    department: "HR",
  },
  {
    id: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    birthday: "1996-05-13",
  },
  {
    id: 3,
    lastName: "Lannister",
    firstName: "Jaime",
    birthday: "1996-05-13",
  },
  { id: 4, lastName: "Stark", firstName: "Arya", birthday: "1996-05-13" },
  {
    id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    birthday: "1996-05-13",
  },
  { id: 6, lastName: "Melisandre", firstName: null, birthday: "1996-05-13" },
  {
    id: 7,
    lastName: "Clifford",
    firstName: "Ferrara",
    birthday: "1996-05-13",
  },
  {
    id: 8,
    lastName: "Frances",
    firstName: "Rossini",
    birthday: "1996-05-13",
  },
  { id: 9, lastName: "Roxie", firstName: "Harvey", birthday: "1996-05-13" },
];

export default function App() {
  const [isLoading, setLoading] = useState(false);
  const [section, setSection] = useState("employees");
  const [isDeleteOff, setDeleteActive] = useState(true);
  const [tableData, setTableData] = useState(rows);

  const { get, add, edit, remove } = useReq(setLoading);


  return (
    <div className="App">
      <AppBar position="static">
        <h1>Employee Management System</h1>
      </AppBar>

      <ButtonSet {...{add, isLoading, setLoading, section, setSection, disabled: isDeleteOff}} />

      <Table {...{isLoading, tableData, setDeleteActive}} />
    </div>
  );
}
