import ItemCard from "../components/ItemCard";

type Supply = {
  ID: number;
  type: "supply";
  Name: string;
  ImageURL: string;
  Expires: string;
  Stock: number;
};

type Props = {
  supplies?: Supply[] | null; // 물음표 = optional하다.
};

export default function SuppliesContent({ supplies }: Props) {
  if (!supplies) {
    return null;
  }

  return (
    <>
      {supplies.map((supply) => (
        <ItemCard
          key={supply.ID}
          id={supply.ID}
          type="supplies"
          name={supply.Name}
          image={supply.ImageURL}
          expire={new Date(supply.Expires)}
          stock={supply.Stock}
        />
      ))}
    </>
  );
}
