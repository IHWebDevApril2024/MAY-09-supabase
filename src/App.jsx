import { Routes, Route, Link } from "react-router-dom";
import FormPage from "./pages/FormPage";
import HomePage from "./pages/HomePage";
import "./App.css";
import { useEffect, useState } from "react";
import supabase from "./supabase/config";

function App() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  const getUsers = async () => {
    const { data, error } = await supabase.from("users").select();
    // const { data, error } = await supabase.from("users").delete().eq("user_name", "Mica");
    if (error) {
      console.log("There was an error: ", error);
      return;
    } else {
      console.log("Data fetched successfully: ", data);
      setUsers(data);
    }
  };

  const getSearch = async () => {
    const { data, error } = await supabase
      .from("users")
      .select()
      .ilike("user_name","%"+ query + "%");
    if (error) {
      console.log("There was an error: ", error);
      return;
    } else {
      console.log("Query fetched successfully: ", data);
      setUsers(data);
    }
  };

  const handleSearch = (e) => {
    const searchWord = e.target.value;
    setQuery(searchWord);
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (query.length === 0) {
      getUsers();
      return;
    }
    getSearch();
  }, [query]);

  return (
    <>
      <Link to="/">Home</Link>
      <span> || </span>
      <Link to="/create">New user</Link>
      <div>
        <input onChange={handleSearch} type="text" /> <span>🔍</span>
      </div>
      <Routes>
        <Route path="/" element={<HomePage users={users} />} />
        <Route path="/create" element={<FormPage />} />
      </Routes>
    </>
  );
}

export default App;
