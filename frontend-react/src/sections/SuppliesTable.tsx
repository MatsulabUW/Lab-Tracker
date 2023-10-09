import InventoryButton from "../components/InventoryButton";

type Supply = {
  ID: number;
  Name: string;
  ImageURL: string;
  Expires: string;
  Stock: number;
};

type Props = {
  supplies?: Supply[] | null;
};

export default function SuppliesTable({ supplies }: Props) {
  if (!supplies) {
    return null;
  }

  return (
    <table className="mt-3 w-100 pl-3">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-10 py-3">Name</th>
          <th className="px-10 py-3">Image</th>
          <th className="px-10 py-3">Expires</th>
          <th className="px-10 py-3">Stock</th>
          <th className="px-10 py-3">Add</th>
        </tr>
      </thead>
      <tbody>
        {supplies.map((supply) => (
          <tr key={supply.ID}>
            <td className="pr-10">{supply.Name}</td>
            <td className="pl-8">
              <img
                className="w-12 h-12"
                src={supply.ImageURL}
                alt={supply.Name}
              />
            </td>
            <td className="px-10">
              {new Date(supply.Expires).toLocaleDateString()}
            </td>
            <td className="px-20">{supply.Stock}</td>
            <td>
              <InventoryButton
                id={supply.ID}
                type="supplies"
                canAdd={supply.Stock > 0}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
