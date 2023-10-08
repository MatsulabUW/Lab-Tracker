import InventoryButton from "../components/InventoryButton";

type Equipment = {
  ID: number;
  Name: string;
  ImageURL: string;
  Status: "available" | "in-use" | "maintenance" | "broken";
  Begin: {
    Time: string;
    Valid: boolean;
  };
  End: {
    Time: string;
    Valid: boolean;
  };
};

type Props = {
  equipments?: Equipment[] | null;
};

export default function EquipmentsTable({ equipments }: Props) {
  if (!equipments) {
    return null;
  }

  return (
    <table className="mt-3 w-100 pl-3">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-6 py-3">Name</th>
          <th className="px-6 py-3">Image</th>
          <th className="px-6 py-3">Status</th>
          <th className="px-12 py-3">Begin</th>
          <th className="px-12 py-3">End</th>
          <th className="px-10 py-3">Add</th>
        </tr>
      </thead>
      <tbody>
        {equipments.map((equipment) => (
          <tr key={equipment.ID}>
            <td className="pr-10">{equipment.Name}</td>
            <td>
              <img
                className="w-12 h-12"
                src={equipment.ImageURL}
                alt={equipment.Name}
              />
            </td>
            <td
              className={
                equipment.Status === "available"
                  ? "text-lime-500"
                  : "text-red-600"
              }
            >
              {equipment.Status}
            </td>
            <td className="px-10">
              {equipment.Begin.Valid
                ? new Date(equipment.Begin.Time).toLocaleString()
                : ""}
            </td>
            <td className="px-10">
              {equipment.End.Valid
                ? new Date(equipment.End.Time).toLocaleString()
                : ""}
            </td>
            <td>
              <InventoryButton
                id={equipment.ID}
                type="equipments"
                canAdd={equipment.Status === "available"}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
