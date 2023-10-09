import classnames from "classnames";
import { useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import LoginDialog from "../dialogs/LoginDialog";
import useDisclosure from "../hooks/useDisclosure";
import LoginDialogContext from "../provider/LoginDialogProvider";
import EquipmentsSection from "../sections/EquipmentsSection";
import SuppliesSection from "../sections/SuppliesSection";

function MainPage() {
  const [tab, setTab] = useState<"supplies" | "equipments">("supplies");
  const { isOpen, onOpen, onClose } = useDisclosure();

  //setTab("equipments");

  return (
    <LoginDialogContext.Provider value={{ onOpen }}>
      <div className="container mx-auto p-12">
        <Header />
        <SearchBar />
        <div className="w-full flex">
          <button
            onClick={() => setTab("supplies")}
            className={classnames(
              "flex-1 p-3 rounded-md",
              tab === "supplies"
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-black"
            )}
          >
            Supplies
          </button>
          <div className="w-3" />
          <button
            onClick={() => setTab("equipments")}
            className={classnames(
              "flex-1 p-3 rounded-md",
              tab === "equipments"
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-black"
            )}
          >
            Equipments
          </button>
        </div>
        {tab === "supplies" ? <SuppliesSection /> : <EquipmentsSection />}
      </div>
      <LoginDialog isOpen={isOpen} onClose={onClose} />
    </LoginDialogContext.Provider>
  );
}

export default MainPage;
