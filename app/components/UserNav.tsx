// "use client";
/* eslint-disable @next/next/no-img-element */
import { MenuIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu'
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Link from 'next/link';
import { createAirbnbHome } from '../actions';
// import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";

type Props = {}

const UserNav = async (props: Props) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser(); 

  const createHomewithId = createAirbnbHome.bind(null, {
    userId: user?.id as string,
  });

  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
                <MenuIcon className='w-6 h-6 lg:w-5 lg:h-5' />

                <img 
                  src={
                    user?.picture ?? 
                    "https://static.vecteezy.com/system/resources/previews/036/280/650/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                  } 
                  alt="Image of the user" 
                  className='rounded-full h-8 w-8 hidden lg:block'
                />
            </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className='w-[200px]'>
            {user ? (
              <>
                <DropdownMenuItem>
                  <form action={createHomewithId} className='w-full'>
                    <button type="submit" className='w-full text-start'>Airbnb your home</button>
                  </form>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href='/my-homes' className='w-full'>My Listings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href='/favorites' className='w-full'>My Favorites</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href='/reservations' className='w-full'>My Reservations</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogoutLink className='w-full'>Logout</LogoutLink>
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem>
                  <RegisterLink className='w-full'>Register</RegisterLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <LoginLink className='w-full'>Login</LoginLink>
                </DropdownMenuItem>
              </>
            )}
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserNav