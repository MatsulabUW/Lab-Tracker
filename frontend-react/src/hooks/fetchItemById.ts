const fetchItemById = async (item: { id: number; type: string }) => {
  const API = `http://localhost:8080/${item.type}/${item.id}`;
  try {
    const res = await fetch(API, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export default fetchItemById;