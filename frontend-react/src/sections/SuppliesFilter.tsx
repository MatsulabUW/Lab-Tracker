import classNames from "classnames";
import { useContext } from "react";
import Select from "react-select";
import SuppliesContext from "../provider/SuppliesProvider";

const options = [
  { label: "All", value: "" },
  { label: "DNA", value: "DNA" },
  { label: "RNA", value: "RNA" },
  { label: "Protein", value: "Protein" },
];

export default function SuppliesFilter() {
  const {
    query,
    setQuery,
    category,
    setCategory,
    status,
    toggleStatus,
    before,
    setBefore,
    after,
    setAfter,
  } = useContext(SuppliesContext);

  return (
    <section className="mt-6 w-full lg:w-[320px] rounded-md shadow-lg p-6">
      <h2 className="text-2xl font-bold">Supplies</h2>

      <div className="mt-3">
        <label className="block text-lg text-gray-900">Search</label>
        <input
          type="text"
          value={query}
          onChange={(evt) => setQuery(evt.currentTarget.value)}
          className="w-full rounded-md p-2 border border-gray-300 focus:outline-none focus:border-blue-300"
        />
      </div>

      <div className="mt-3">
        <label className="text-lg block text-gray-900">Category</label>
        <Select
          value={category}
          onChange={(value) =>
            setCategory(value || { label: "All", value: "All" })
          }
          options={options}
        />
      </div>

      <div className="mt-3">
        <label className="block text-lg text-gray-900">Status</label>
        <div className="flex flex-col">
          <button
            className={classNames(
              "w-full p-3 rounded-md",
              status.includes("expired")
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-black"
            )}
            onClick={() => toggleStatus("expired")}
          >
            Expired
          </button>
          <div className="h-1" />
          <button
            className={classNames(
              "w-full p-3 rounded-md",
              status.includes("out-of-stock")
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-black"
            )}
            onClick={() => toggleStatus("out-of-stock")}
          >
            Out of Stock
          </button>
          <div className="h-1" />
          <button
            className={classNames(
              "w-full p-3 rounded-md",
              status.includes("need-to-order")
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-black"
            )}
            onClick={() => toggleStatus("need-to-order")}
          >
            Need to Order
          </button>
        </div>
      </div>

      <div className="mt-3">
        <label className="block text-lg text-gray-900">Expire Before</label>
        <input
          type="datetime-local"
          value={before}
          onChange={(evt) => setBefore(evt.currentTarget.value)}
          className="w-full rounded-md p-2 border border-gray-300 focus:outline-none focus:border-blue-300"
        />
      </div>

      <div className="mt-3">
        <label className="block text-lg text-gray-900">Expire After</label>
        <input
          type="datetime-local"
          value={after}
          onChange={(evt) => setAfter(evt.currentTarget.value)}
          className="w-full rounded-md p-2 border border-gray-300 focus:outline-none focus:border-blue-300"
        />
      </div>
    </section>
  );
}
