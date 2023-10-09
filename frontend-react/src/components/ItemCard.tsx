import InventoryButton from "./InventoryButton";

type Props = {
  // 공통
  id: number;
  type: string;
  name: string;
  image: string;
  // Supplies
  stock?: number;
  expire?: Date;
  // Equipments
  status?: "available" | "in-use" | "maintenance" | "broken";
  bookingStart?: Date;
  bookingEnd?: Date;
};

export default function ItemCard({
  id,
  type,
  name,
  image,
  stock,
  expire,
  status,
  bookingStart,
  bookingEnd,
}: Props) {
  return (
    <div className="w-full rounded-md bg-gray-200 p-3 flex flex-col">
      <p className="text-xl font-semibold">{name}</p>
      <img src={image} className="w-full aspect-square mt-3" />
      {stock && expire && (
        <>
          <p className="text-2xl my-3">{stock} Left</p>
          <p className="text-base">Expire: {expire.toLocaleString("en-US")}</p>
        </>
      )}
      {status && (
        <>
          {status === "available" ? (
            <p className="text-2xl my-3 text-lime-600">{status}</p>
          ) : (
            <>
              <p className="text-2xl my-3 text-red-600">{status}</p>
              {status !== "broken" && (
                <>
                  <p className="text-base">
                    Begin: {bookingStart?.toLocaleString("en-US")}
                  </p>
                  <p className="text-base">
                    End: {bookingEnd?.toLocaleString("en-US")}
                  </p>
                </>
              )}
            </>
          )}
        </>
      )}
      <div className="mt-auto pt-3">
        <InventoryButton
          id={id}
          type={type}
          canAdd={
            (status && status === "available") || (stock && stock > 0) || false
          }
        />
      </div>
    </div>
  );
}
