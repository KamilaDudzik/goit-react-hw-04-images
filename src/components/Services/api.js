import axios from "axios";

const API_URL = "https://pixabay.com/api/";
const KEY = "36354038-aa1773e88ccb2b59a1c57888b";

export const fetchImages = async (searchValue, page) => {
  const response = await axios.get(API_URL, {
    params: {
      key: KEY,
      q: searchValue,
      page: page,
      per_page: 12,
    },
  })
  return response.data
}