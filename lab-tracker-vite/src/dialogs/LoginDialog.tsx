import { useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LoginDialog({ isOpen, onClose }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const queryClient = useQueryClient();

  const onLogin = async (e: FormEvent) => {
    e.preventDefault(); // 새로고침 하지마라

    const res = await fetch("http://localhost:8080/session", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        Username: username,
        Password: password,
      }),
    });

    if (res.ok) {
      queryClient.invalidateQueries(["session"]);
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }
  return (
    <div className="flex justify-center items-center fixed w-screen h-screen bg-black bg-opacity-50 top-0 left-0">
      <div className="w-full max-w-[300px] md:max-w-[450px] mx-3 px-3 rounded-xl bg-white p-6">
        <h1 className="text-2xl text-center font-semibold">Login</h1>
        <form onSubmit={onLogin}>
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none shadow-sm focus:border-purple-600 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="****"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none shadow-sm focus:border-purple-600 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mt-3">
            <button
              type="submit"
              className="w-full p-2 rounded-md bg-purple-600 text-white"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
