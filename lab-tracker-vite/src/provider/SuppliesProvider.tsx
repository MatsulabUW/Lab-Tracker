// context = collection of state
// provider = provides context

import { createContext } from "react";

type SuppliesContextType = {
  query: string;
  setQuery: (query: string) => void;
  category: { label: string; value: string };
  setCategory: (category: { label: string; value: string }) => void;
  status: ("expired" | "out-of-stock" | "need-to-order")[];
  toggleStatus: (status: "expired" | "out-of-stock" | "need-to-order") => void;
  before: string;
  setBefore: (before: string) => void;
  after: string;
  setAfter: (after: string) => void;
};

const SuppliesContext = createContext<SuppliesContextType>({
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

export default SuppliesContext;
