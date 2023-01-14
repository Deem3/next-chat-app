'use client'
import React from "react";
import Image from "next/image";
import {useSignInWithGoogle} from 'react-firebase-hooks/auth'
import {auth} from '../../pages/api/firebase'
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false)
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const router = useRouter()
    const handleClick = () => {
        setIsLoading(true)
        signInWithGoogle("", {})
            .then(()=>{
                setIsLoading(false)
                router.push('/')
            })
            .catch((error)=>{
                console.log(error)
                setIsLoading(false)
            })
    }
  return (
    <div className="h-screen w-screen bg-slate-700 flex justify-center items-center">
      <div className="h-96 w-96 bg-slate-400 rounded-xl shadow-lg">
        <div className="container w-fit mx-auto mt-12 cursor-pointer">
          <button disabled={isLoading} onClick={()=>handleClick()}>
          <Image src="/g.png" width={200} height={200} alt="google" />
          <div className="flex justify-center">
            <p className="text-2xl font-semibold text-slate-700 mt-4">Sign In With Google</p>
          </div>
          </button>
        </div>
      </div>
    </div>
  );
}
