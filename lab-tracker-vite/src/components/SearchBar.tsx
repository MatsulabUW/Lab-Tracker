import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <form className="block w-full my-3 rounded-lg shadow-lg p-6">
      <label htmlFor="search" className="text-lg text-gray-900">
        Search
      </label>
      <div className="relative">
        <div className="absolute w-7 h-full flex justify-center items-center">
          <FaSearch className="w-3 h-3 fill-gray-400" />
        </div>
        <input
          placeholder="Search"
          className="w-full p-2 pl-7 text-sm rounded-md border border-gray-300 focus:outline-none focus:border-blue-300"
        />
      </div>
    </form>
  );
}
