import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import ToggleViewButton from "../components/ToggleViewButton";
import SuppliesContext from "../provider/SuppliesProvider";
import SuppliesContent from "./SuppliesContent";
import SuppliesFilter from "./SuppliesFilter";
import SuppliesTable from "./SuppliesTable";

export default function SuppliesSection() {
  const [query, setQuery] = useState<string>("");
  const [category, setCategory] = useState<{ label: string; value: string }>({
    label: "All",
    value: "",
  });
  const [status, setStatus] = useState<
    ("expired" | "out-of-stock" | "need-to-order")[]
  >([]);
  const [before, setBefore] = useState<string>("");
  const [after, setAfter] = useState<string>("");
  const [isGridView, setIsGridView] = useState<boolean>(true);

  const { data, isLoading } = useQuery(
    ["supplies", query, category.value, status.join(","), before, after],
    async () => {
      const url = new URL("http://localhost:8080.supplies");
      url.searchParams.append("query", query);
      url.searchParams.append("category", category.value);
      url.searchParams.append("status", status.join(","));
      url.searchParams.append(
        "expiresBefore",
        before ? new Date(before).toISOString() : ""
      );
      url.searchParams.append(
        "expiresAfter",
        after ? new Date(after).toISOString() : ""
      );

      const res = await axios.get(url.toString());

      return res.data;
    }
  );

  const toggleStatus = (
    target: "expired" | "out-of-stock" | "need-to-order"
  ) => {
    if (status.includes(target)) {
      setStatus(status.filter((s) => s !== target));
    } else {
      setStatus([...status, target]);
    }
  };

  return (
    <SuppliesContext.Provider
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
        <SuppliesFilter />
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
              <SuppliesContent supplies={data?.supplies} />
            </section>
          ) : (
            <SuppliesTable supplies={data?.supplies} />
          )}
        </div>
      </div>
    </SuppliesContext.Provider>
  );
}
