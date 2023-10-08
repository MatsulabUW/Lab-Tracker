import Header from "../components/Header";
import LoginDialog from "../dialogs/LoginDialog";
import useDisclosure from "../hooks/useDisclosure";
import LoginDialogContext from "../provider/LoginDialogProvider";
import HistoryContent from "../sections/HistoryContent";
import InventoryContent from "../sections/InventoryContent";

export default function InventoryPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <LoginDialogContext.Provider value={{ onOpen }}>
      <div className="container mx-auto p-12">
        <Header />
      </div>
      <div className="container mx-auto p-10">
        <h1 className="text-2xl font-bold">Inventory</h1>
        <InventoryContent />
        <hr className="my-10" />
        <h1 className="text-2xl font-bold">History</h1>
        <HistoryContent />
      </div>
      <LoginDialog isOpen={isOpen} onClose={onClose} />
    </LoginDialogContext.Provider>
  );
}
