import { act, useState } from "react";
import { useContentStore } from "../store/content";
import NavBar from "../components/NavBar";
import { Search } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";

const SearchPage = () => {
  const [activeTap, setActiveTap] = useState("movie");
  const [searchTerm, setSearchTerm] = useState("");

  const [results, setResults] = useState([]);
  const { contentType, setContentType } = useContentStore();

  const handleTabClick = (tab) => {
    setActiveTap(tab);
    tab === "movie" ? setContentType("movie") : setContentType("tv");
    setResults([]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/v1/search/${activeTap}/${searchTerm}`);
      setResults(res.data.content);
    } catch (error) {
      if (error.response.status === 404) {
        toast.error(
          "Nothing found, make sure you are searching under the right category."
        );
      } else {
        toast.error("An error occured, please try again later.");
      }
    }
  };
  return (
    <div className="bg-black min-h-screen text-white">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center gap-3 mb-4">
          <button
            className={`py-2 px-4 rounded cursor-pointer ${
              activeTap === "movie" ? "bg-red-600" : "bg-gray-800"
            } hover:bg-red-700`}
            onClick={() => handleTabClick("movie")}
          >
            Movies
          </button>

          <button
            className={`py-2 px-4 rounded cursor-pointer ${
              activeTap === "tv" ? "bg-red-600" : "bg-gray-800"
            } hover:bg-red-700`}
            onClick={() => handleTabClick("tv")}
          >
            Tv Shows
          </button>

          <button
            className={`py-2 px-4 rounded cursor-pointer ${
              activeTap === "person" ? "bg-red-600" : "bg-gray-800"
            } hover:bg-red-700`}
            onClick={() => handleTabClick("person")}
          >
            Person
          </button>
        </div>

        <form
          className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={"search for a " + activeTap}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />

          <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded">
            <Search className="w-6 h-6" />
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((item) => {
            if (!item.poster_path && !item.profile_path) return null;
            return (
              <div key={item.id} className="bg-gray-800 p-4 rounded">
                {activeTap === "person" ? (
                  <Link
                    // TODO to={"/actor/" + item.name}
                    className="flex flex-col items-center"
                  >
                    <img
                      src={ORIGINAL_IMG_BASE_URL + item.profile_path}
                      alt={item.name}
                      className="max-h-96 rounded mx-auto"
                    />
                    <h2 className="mt-2 text-xl font-bold">{item.name}</h2>
                  </Link>
                ) : (
                  <Link
                    to={"/watch/" + item.id}
                    onClick={() => setContentType(activeTap)}
                  >
                    <img
                      src={ORIGINAL_IMG_BASE_URL + item.poster_path}
                      alt={item.title || item.name}
                      className="w-full h-auto rounded"
                    />
                    <h2 className="mt-2 text-xl font-bold">
                      {item.title || item.name}
                    </h2>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
