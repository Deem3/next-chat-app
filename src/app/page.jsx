'use client'
import React from 'react'
import {auth} from '../pages/api/firebase'
import { useEffect } from 'react'
import Logout from '../components/Logout'
import { useRouter } from 'next/navigation'
// components
import Sidebar from '@/components/Sidebar'

export default function Pnpmage() {
  const router = useRouter()
  const user = auth.currentUser
  useEffect(()=>{
    if(!user){
      router.push('/login')
    }
  },[])
  if(user){
  return (
    <div>
    <Sidebar/>
    </div>
  )
}
}
