import ItemCard from "../components/ItemCard";

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

export default function EquipmentsContent({ equipments }: Props) {
  if (!equipments) {
    return null;
  }

  return (
    <>
      {equipments.map((equipment) => (
        <ItemCard
          key={equipment.ID}
          id={equipment.ID}
          type="equipments"
          name={equipment.Name}
          image={equipment.ImageURL}
          status={equipment.Status}
          bookingStart={
            equipment.Begin.Valid ? new Date(equipment.Begin.Time) : undefined
          }
          bookingEnd={
            equipment.End.Valid ? new Date(equipment.End.Time) : undefined
          }
        />
      ))}
    </>
  );
}
