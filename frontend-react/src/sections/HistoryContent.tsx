import { useEffect, useState } from "react";
import fetchItemById from "../hooks/fetchItemById";

type History = {
  ID: number;
  UserID: number;
  EqID?: number;
  SupId?: number;
  Duration?: number;
  Amount?: number;
  Date: string;
};

export default function HistoryContent() {
  const [historyData, setHistoryData] = useState<History[]>([]);
  const [itemData, setItemData] = useState<string>("");

  const fetchHistory = async () => {
    const API = `http://localhost:8080/users/history`;

    try {
      const res = await fetch(API, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await res.json();
      console.log(data);
      console.log(data.history);
      if (Array.isArray(data.history)) {
        setHistoryData(data.history);
      } else {
        console.error("data.history is not an array:", data.history);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHistory();
    fetchItemById({ id: 1, type: "equipments" }).then((data) => {
      console.log(data);
      setItemData(data);
    });
  }, []);

  return (
    <div className="mt-3">
      <table>
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Item</th>
            <th className="px-4 py-2">Option</th>
          </tr>
        </thead>
        <tbody>
          {historyData.map((data, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{data.ID}</td>
              <td className="border px-4 py-2">{data.Date}</td>
              <td className="border px-4 py-2">
                {data.EqID !== undefined
                  ? `Equipment: ${data.EqID}`
                  : `Supply: ${data.SupId}`}
              </td>
              <td className="border px-4 py-2">
                {data.EqID !== undefined
                  ? `Duration: ${data.Duration}`
                  : `Amount: ${data.Amount}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
