export default function InventoryButton({
  id,
  type,
  canAdd,
}: {
  id: number;
  type: string;
  canAdd: boolean;
}) {
  function addItem(id: number, type: string): void {
    let items: { id: number; type: string }[] = JSON.parse(
      localStorage.getItem("selectedItems") || "[]"
    );
    const itemExists = items.some(
      (item) => item.id === id && item.type === type
    );
    if (!itemExists) {
      const item = {
        id: id,
        type: type,
      };
      items.push(item);
      localStorage.setItem("selectedItems", JSON.stringify(items));
      console.log(localStorage);
    } else {
      console.log("Item already exists in the inventory.");
    }
  }

  return (
    <button
      className={
        canAdd
          ? "bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 rounded"
          : "bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
      }
      onClick={() => {
        canAdd && addItem(id, type);
      }}
    >
      Add Inventory
    </button>
  );
}
