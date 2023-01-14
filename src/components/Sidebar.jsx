import React from "react";
import getOtherEmails from "@/utils/getOtherEmails";
import { useRouter } from "next/navigation";
// firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/pages/api/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, addDoc } from "firebase/firestore";
import { store } from "@/pages/api/firebase";
// icons
import { IoCaretBackCircleOutline } from "react-icons/io5";
// chackra
import { Avatar } from "@chakra-ui/react";
import Logout from "./Logout";


export default function Sidebar() {
  const [user] = useAuthState(auth);
  const router = useRouter()
  const [snapshot, loading, error] = useCollection(collection(store, "chats"));
  const chats = snapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const redirect = (id) => {
    router.push(`/chat/${id}`)
  }

  const chatExists = email => chats?.find(chat => (chat.users.includes(user.email) && chat.users.includes(email)))

  const chatList = () => {
    return chats?.filter(chat=>chat.users.includes(user.email))
    .map((chat) => (
      <div key={Math.random()} className="flex items-center p-3 hover:bg-gray-100 cursor-pointer" onClick={()=> redirect(chat.id)}>
        <img src="" className="w-12 h-12 bg-gray-400 rounded-full mx-2" />
        <p>{getOtherEmails(chat.users, user)}</p>
      </div>
    ));
  };

  const newChat = async () => {
    const input = prompt('Enter email of chat reciever')
    if(!chatExists(input) && (input != user.email)){
      await addDoc(collection(store, "chats"), { users: [user.email, input]})
    }
  }

  if (user) {
    return (
      <div className="flex flex-col w-[300px] h-screen border-r-2 border-gray-200">
        <div className="flex h-[81px] w-full items-center justify-center border-b-2 border-gray-200 p-3">
          <div className="flex items-center">
            <img
              src={user.photoURL}
              className="w-10 h-10 bg-gray-400 rounded-full"
            />
            <p className="text-2xl">{user.displayName}</p>
          </div>
          <Logout />
        </div>
        <button onClick={()=>newChat()} className="bg-gray-200 m-5 p-4 rounded-md">New Chat</button>
        <div className="flex flex-col overflow-scroll scrollbar-hide flex-1">
          {chatList()}
        </div>
      </div>
    );
  }
}
