'use client';
import {useRouter} from 'next/navigation';
import Image from 'next/image';



function Navbar(){

    const router = useRouter();


    return <nav className="px-4 py-2 flex flex-row justify-between items-center">
        <a href="/" className="text-xl font-bold flex items-center space-x-2">
         <Image 
          src="/GhostDrop-logo.png" // This path points to your public folder
          alt="GhostDrop Logo" 
          width={60} 
          height={60} 
        /><span className="text-2xl font-bold text-gray-800">
          GhostDrop
        </span>
        </a>
        <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 "  onClick={()=>router.push('/sign-in')}>Login</button>

    </nav>
}

export default Navbar;