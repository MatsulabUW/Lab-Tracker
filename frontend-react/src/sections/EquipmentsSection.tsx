import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import ToggleViewButton from "../components/ToggleViewButton";
import EquipmentsContext from "../provider/EquipmentsProvider";
import EquipmentsContent from "./EquipmentsContent";
import EquipmentsFilter from "./EquipmentsFilter";
import EquipmentsTable from "./EquipmentsTable";

export default function EquipmentsSection() {
  const [query, setQuery] = useState<string>("");
  const [category, setCategory] = useState<{ label: string; value: string }>({
    label: "All",
    value: "",
  });
  const [status, setStatus] = useState<
    ("available" | "in-use" | "maintenance" | "broken")[]
  >([]);
  const [before, setBefore] = useState<string>("");
  const [after, setAfter] = useState<string>("");
  const [isGridView, setIsGridView] = useState<boolean>(true);

  const { data, isLoading } = useQuery(
    ["equipments", query, category.value, status.join(","), before, after],
    async () => {
      const url = new URL("http://localhost:8080/equipments");
      url.searchParams.append("query", query);
      url.searchParams.append("type", category.value);
      url.searchParams.append("status", status.join(","));
      url.searchParams.append(
        "bookingStart",
        before ? new Date(before).toISOString() : ""
      );
      url.searchParams.append(
        "bookingEnd",
        after ? new Date(after).toISOString() : ""
      );
      const res = await axios.get(url.toString());
      return res.data;
    }
  );

  const toggleStatus = (
    target: "available" | "in-use" | "maintenance" | "broken"
  ) => {
    if (status.includes(target)) {
      setStatus(status.filter((s) => s !== target));
    } else {
      setStatus([...status, target]);
    }
  };

  return (
    <EquipmentsContext.Provider
      value={{
        query,
        setQuery,
        category,
        setCategory,
        status,
        toggleStatus,
        after,
        setAfter,
        before,
        setBefore,
      }}
    >
      <div className="flex flex-col lg:flex-row mt-3">
        <EquipmentsFilter />
        <div className="w-6" />
        <div className="flex flex-col">
          <ToggleViewButton
            isGridView={isGridView}
            setIsGridView={setIsGridView}
          />
          {isGridView ? (
            <section className="mt-6 lg:mt-0 flex-1 rounded-md grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {isLoading && (
                <div className="w-full h-[480px] flex justify-center items-center">
                  <p className="text-2xl font-bold text-gray-900">Loading...</p>
                </div>
              )}
              <EquipmentsContent equipments={data?.equipments} />
            </section>
          ) : (
            <EquipmentsTable equipments={data?.equipments} />
          )}
        </div>
      </div>
    </EquipmentsContext.Provider>
  );
}
