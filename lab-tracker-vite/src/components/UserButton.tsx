import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useRef } from "react";
import { BiUser } from "react-icons/bi";
import useDisclosure from "../hooks/useDisclosure";
import useOutsideClick from "../hooks/useOutsideClick";
import LoginDialogContext from "../provider/LoginDialogProvider";

export default function UserButton() {
  const buttonRef = useRef<HTMLDivElement>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onOpen: onLoginDialogOpen } = useContext(LoginDialogContext);
  const { data, isLoading } = useQuery(["session"], async () => {
    const res = await fetch("http://localhost:8080/users", {
      credentials: "include",
    });

    if (!res.ok) {
      return null;
    }

    return (await res.json()).user;
  });

  useOutsideClick(buttonRef, onClose);

  const queryClient = useQueryClient();
  const onLogout = async () => {
    await fetch("http://localhost:8080/session", {
      method: "DELETE",
      credentials: "include",
    });
    queryClient.invalidateQueries(["session"]);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return (
      <>
        <button
          className="rounded-md text-white px-4 py-2 bg-purple-600 focus:bg-purple-700"
          onClick={onLoginDialogOpen}
        >
          Login
        </button>
        <button
          className="rounded-md text-white px-4 py-2 bg-purple-600 focus:bg-purple-700"
          //onClick={onSignInDialogOpen}
        >
          SignIn
        </button>
      </>
    );
  }

  return (
    <div className="relative" ref={buttonRef}>
      <div className="flex flex-row rounded-md text-white px-4 py-2 bg-purple-600">
        <BiUser className="fill-white mt-1 mr-1" />
        <p className="cursor-pointer" onClick={onOpen}>
          {data.Username}
        </p>
      </div>
      <nav
        className={`absolute top-[32px] right-0 z-10 bg-white border border-gray-300 rounded-md ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <a className="block p-2" href="/">
          Home
        </a>
        <a className="block p-2" href="/inventory">
          Inventory
        </a>
        <button onClick={onLogout} className="block p-2">
          Logout
        </button>
      </nav>
    </div>
  );
}
