import { useState } from "react";
import supabase from "../supabase/config";

const initialUser = {
  user_name: "",
  image_url: "",
  age: 0,
  bootcamp: "",
};

const FormPage = () => {
  const [formData, setFormData] = useState(initialUser);

  const handleInput = (event) => {
    const field = event.target.name;
    const value = event.target.value;

    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data, error } = await supabase.from("users").insert([formData]);
    if (error) {
      console.log("Error creating the user: ", error);
      return;
    } else {
      console.log("User created! ");
      setFormData(initialUser);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="user_name">User name</label>
      <input
        onChange={handleInput}
        value={formData.user_name}
        type="text"
        name="user_name"
      />
      <label htmlFor="image_url">Picture (add url)</label>
      <input
        onChange={handleInput}
        value={formData.image_url}
        type="text"
        name="image_url"
      />
      <label htmlFor="age">Age</label>
      <input
        onChange={handleInput}
        value={formData.age}
        type="number"
        name="age"
      />
      <label htmlFor="bootcamp">Bootcamp</label>
      <input
        onChange={handleInput}
        value={formData.bootcamp}
        type="text"
        name="bootcamp"
      />
      <button type="submit">Create user</button>
    </form>
  );
};

export default FormPage;
