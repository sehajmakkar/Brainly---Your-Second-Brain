import { useEffect, useState } from "react";
import axios from "axios";


function useContent() {

  const [contents, setContents] = useState([]);

  const fetchContents = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/content`, {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    });
    setContents(response.data.contents);
  };

  useEffect(() => {

    try {
      fetchContents();
    } catch (error) {
      console.log(error);
    }

  })


  return contents;
}

export default useContent