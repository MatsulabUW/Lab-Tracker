import { HiViewGrid, HiViewList } from "react-icons/hi";

type Props = {
  isGridView: boolean;
  setIsGridView: (isGridView: boolean) => void;
};

export default function ToggleViewButton({ isGridView, setIsGridView }: Props) {
  return (
    <div className="w-100 flex justify-content-end">
      <button onClick={() => setIsGridView(true)}>
        <HiViewGrid />
      </button>
      <button onClick={() => setIsGridView(false)}>
        <HiViewList />
      </button>
    </div>
  );
}
