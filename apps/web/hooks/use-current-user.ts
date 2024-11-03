import { PrismaClient } from '@prisma/client';
import { useState } from "react"
import { useUserId } from './use-user-id';

const prismaClient = new PrismaClient()

export const useCurrentuser = async ()=>{
   const [userId,setUserId] = useUserId() 
   const user = await prismaClient.user.findFirst({

   })
}