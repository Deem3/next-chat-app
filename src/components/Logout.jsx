"use client";
import React from "react";
import { auth } from "../pages/api/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
// react-icons
import { IoCaretBackCircleOutline } from "react-icons/io5";

export default function Logout() {
  const router = useRouter()
  const handleSignout = () => {
    signOut(auth).then(() => {
      console.log("logged out")
      router.push('/login')
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
    <div>
        <IoCaretBackCircleOutline onClick={() => handleSignout()} className="w-9 h-9 ml-8 cursor-pointer" />
    </div>
  );
}
