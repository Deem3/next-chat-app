"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
// firebase
import { auth } from "@/pages/api/firebase";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { store } from "@/pages/api/firebase";
import {
  collection,
  orderBy,
  query,
  doc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
// components
import Sidebar from "@/components/Sidebar";
// Chackra
import { Avatar } from "@chakra-ui/react";
import getOtherEmails from "@/utils/getOtherEmails";

const Topbar = ({ email }) => {
  return (
    <div className="bg-gray-100 h-[81px] w-full flex items-center p-5">
      <Avatar src="" className="w-12 h-12 bg-gray-400 rounded-full mr-3" />
      <h1 className="text-xl">{email}</h1>
    </div>
  );
};

const Bottombar = ({ path, user }) => {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    await addDoc(collection(store, `chats/${path}/messages`), {
      text: input,
      sender: user.email,
      timestamp: serverTimestamp(),
    });
    setInput("");
  };
  return (
    <form className="flex p-3 border-t-2" onSubmit={(e) => sendMessage(e)}>
      <input
        type="text"
        autoComplete="off"
        className="w-full h-[48px] focus:outline-blue-500"
        placeholder="Type a message"
        onChange={(e) => setInput(e.target.value)}
        as="form"
        value={input}
      />
      <button type="submit" hidden>
        Submit
      </button>
    </form>
  );
};

export default function Page() {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const pathName = usePathname();
  const path = pathName.split("/")[2];
  const User = auth.currentUser;
  useEffect(()=>{
    if(!User){
      router.push('/login')
    }
  })
  const q = query(
    collection(store, `chats/${path}/messages`),
    orderBy("timestamp")
  );
  const [messages] = useCollectionData(q);

  const [chat] = useDocumentData(doc(store, "chats", path));

  const getMessages = () =>
    messages?.map((msg) => {
      const sender = msg.sender === user.email;
      const className = sender
        ? "bg-green-100 rounded-t-xl rounded-l-xl self-end"
        : "bg-blue-100 rounded-b-xl rounded-r-xl";
      return (
        <div
          key={Math.random()}
          className={`w-fit min-w-[100px] p-3 m-1 ${className}`}
        >
          <p>{msg.text}</p>
        </div>
      );
    });

  if (User) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Topbar email={getOtherEmails(chat?.users, user)} />

          <div className="flex flex-1 flex-col pt-4 mx-5 overflow-scroll scrollbar-hide">
            {getMessages()}
          </div>

          <Bottombar path={path} user={user} />
        </div>
      </div>
    );
  }
}
