import { createContext } from "react";

type EquipmentsContextType = {
  query: string;
  setQuery: (query: string) => void;
  category: { label: string; value: string };
  setCategory: (category: { label: string; value: string }) => void;
  status: ("available" | "in-use" | "maintenance" | "broken")[];
  toggleStatus: (
    status: "available" | "in-use" | "maintenance" | "broken"
  ) => void;
  before: string;
  setBefore: (before: string) => void;
  after: string;
  setAfter: (after: string) => void;
};

const EquipmentsContext = createContext<EquipmentsContextType>({
  query: "",
  setQuery: () => {},
  category: { label: "All", value: "All" },
  setCategory: () => {},
  status: [],
  toggleStatus: () => {},
  before: "",
  setBefore: () => {},
  after: "",
  setAfter: () => {},
});

export default EquipmentsContext;
