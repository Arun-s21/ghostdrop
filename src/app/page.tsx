import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
    <h1 className="text-4xl font-bold">Welcome to GhostDrop</h1>
    <p className="text-center mt-3">It is an anonymous messaging app where you can share the links 
      with your friends and they can message you
    </p>
    <button className="hover:bg-blue-700 px-4 py-2 text-white rounded-md bg-red-600">Lets Begin</button>
    </div>
  );
}
