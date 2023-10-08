import { useEffect, useState } from "react";
import fetchItemById from "../hooks/fetchItemById";

export default function InventoryContent() {
  const [items, setItems] = useState<{ id: number; type: string }[]>([]);
  const [fetchedData, setFetchedData] = useState<any[]>([]);
  const [inputs, setInputs] = useState<{ count: number }[]>([]);

  useEffect(() => {
    const storedItems = JSON.parse(
      localStorage.getItem("selectedItems") || "[]"
    );
    setItems(storedItems);
    setInputs(storedItems.map(() => ({ count: 1 })));
  }, []);

  useEffect(() => {
    const fetchAllData = async () => {
      const fetchedData = await Promise.all(
        items.map((item) => fetchItemById(item))
      );
      setFetchedData(fetchedData);
    };

    fetchAllData();
  }, [items]);

  const checkOutData = async (id: number, type: string, input: number) => {
    const API = `http://localhost:8080/${type}/checkout`;
    let bodyParams;
    if (type === "supplies") {
      bodyParams = { itemID: id, count: input };
    } else {
      bodyParams = { itemID: id, duration: input };
    }
    try {
      const res = await fetch(API, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(bodyParams),
      });
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await res.json();
      console.log(data);
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (index: number, value: number) => {
    setInputs((prevInputs) => {
      const newInputs = [...prevInputs];
      newInputs[index] = { count: value };
      return newInputs;
    });
  };

  return (
    <div className="mt-3">
      <table>
        <thead>
          <tr>
            <th className="px-10 py-3">Item</th>
            <th className="px-30 py-3">Option</th>
            <th className="px-30 py-3">Remove</th>
            <th className="px-30 py-3">Submit</th>
          </tr>
        </thead>
        <tbody>
          {fetchedData.map((data, index) => (
            <tr key={items[index].id + "_" + items[index].type}>
              <td className="px-10">
                {items[index].type === "supplies"
                  ? data.supplies.Name
                  : data.equipment.Name}
              </td>
              <td className="px-20 py-3">
                {items[index].type === "supplies" ? (
                  <div className="flex gap-3">
                    <label>Amount:</label>
                    <input
                      className="w-full rounded-md p-2 border border-gray-300 focus:outline-none focus:border-blue-300"
                      type="number"
                      value={inputs[index].count}
                      onChange={(evt) =>
                        handleInputChange(index, Number(evt.target.value))
                      }
                    />
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <>
                      <label>Duration:</label>
                      <input
                        className="w-full rounded-md p-2 border border-gray-300 focus:outline-none focus:border-blue-300"
                        type="number"
                        value={inputs[index].count}
                        onChange={(evt) =>
                          handleInputChange(index, Number(evt.target.value))
                        }
                      />
                    </>
                  </div>
                )}
              </td>
              <td>
                <button
                  className="bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 rounded"
                  onClick={() => {
                    const updatedItems = items.filter(
                      (_, idx) => idx !== index
                    );
                    setItems(updatedItems);
                    localStorage.setItem(
                      "selectedItems",
                      JSON.stringify(updatedItems)
                    );
                  }}
                >
                  X
                </button>
              </td>
              <td>
                <button
                  className="bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 rounded"
                  onClick={() =>
                    checkOutData(
                      items[index].id,
                      items[index].type,
                      inputs[index].count
                    )
                  }
                >
                  Submit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
