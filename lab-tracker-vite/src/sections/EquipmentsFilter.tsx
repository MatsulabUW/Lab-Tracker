import classNames from "classnames";
import { useContext } from "react";
import Select from "react-select";
import EquipmentsContext from "../provider/EquipmentsProvider";

const options = [
  { label: "All", value: "" },
  { label: "Fridge", value: "Fridge" },
  { label: "Cell Culture", value: "Cell Culture" },
  { label: "ETC", value: "ETC" },
];

export default function EquipmentsFilter() {
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
  } = useContext(EquipmentsContext);

  return (
    <section className="mt-6 w-full lg:w-[320px] rounded-md shadow-lg p-6">
      <h2 className="text-2xl font-bold">Equipments</h2>

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
        <label className="text-lg block text-gray-900">Type</label>
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
              status.includes("available")
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-black"
            )}
            onClick={() => toggleStatus("available")}
          >
            Available
          </button>
          <button
            className={classNames(
              "w-full p-3 rounded-md",
              status.includes("in-use")
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-black"
            )}
            onClick={() => toggleStatus("in-use")}
          >
            In Use
          </button>
          <button
            className={classNames(
              "w-full p-3 rounded-md",
              status.includes("maintenance")
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-black"
            )}
            onClick={() => toggleStatus("maintenance")}
          >
            Maintenance
          </button>
          <button
            className={classNames(
              "w-full p-3 rounded-md",
              status.includes("broken")
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-black"
            )}
            onClick={() => toggleStatus("broken")}
          >
            Broken
          </button>
        </div>
      </div>

      <div className="mt-3">
        <label className="block text-lg text-gray-900">Available Before</label>
        <input
          type="date"
          value={before}
          onChange={(evt) => setBefore(evt.currentTarget.value)}
          className="w-full rounded-md p-2 border border-gray-300 focus:outline-none focus:border-blue-300"
        />
      </div>

      <div className="mt-3">
        <label className="block text-lg text-gray-900">Available After</label>
        <input
          type="date"
          value={after}
          onChange={(evt) => setAfter(evt.currentTarget.value)}
          className="w-full rounded-md p-2 border border-gray-300 focus:outline-none focus:border-blue-300"
        />
      </div>
    </section>
  );
}
