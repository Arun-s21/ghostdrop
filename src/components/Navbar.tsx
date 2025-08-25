'use client';
import {useRouter} from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { AxiosError } from 'axios';
import { useEffect,useState } from 'react';





export default function Navbar(){
const router = useRouter();
const[isLoggedIn,setIsLoggedIn] = useState(false);
const [isLoading,setIsLoading] = useState(true);



useEffect(()=>{
const checkLoginStatus=async()=>{


try{
      await axios.get('/api/me');
      setIsLoggedIn(true);
  }catch(err){
    const error = err as AxiosError;
    console.log('Error occured while validating the token for navbar', error);
    setIsLoggedIn(false);
    setIsLoading(false);
  }
  finally{
    setIsLoading(false);
  }

  


}
checkLoginStatus();
},[]);        //this use effect only runs once and makes a request to a secure endpoint which checks if the token is correct or not
              //if it is correct i.e no error occurs while requesting the api, it sets isLoggedIn to true
              //if error occurs then isLoggedIn and isLoading is set to false 

    
//creating the signout function for the signout button conditional render


  const handleSignOut=async()=>{
    try{
      await axios.get('/api/sign-out');
      alert('Log out successful, Now redirecting...');
      setIsLoggedIn(false);
      router.replace('/');                                  //redirecting to homepage after sign out

    }
    catch(err){
      const error = err as AxiosError;
      console.log('Error occurred while signing out ',error);
      alert('Some unexpected error occurred while signing out');
    }




  }






    return( 
    <nav className="px-4 py-2 flex flex-row justify-between items-center">
        <Link href="/" className="text-xl font-bold flex items-center space-x-2">
         <Image 
          src="/GhostDrop-logo.png" // This path points to your public folder
          alt="GhostDrop Logo" 
          width={60} 
          height={60} 
        /><span className="text-2xl font-bold text-gray-800">
          GhostDrop
        </span>
        </Link>
        <div>
                    
      {/* //if logged in, then render a sign out button */}
      {isLoading? null : isLoggedIn ? (                           //first check if the api response is loading,until it is true render nothing i.e null because we dont want it to show or flash any button for a split second while the api is checking the token and isLoading is set to true, as it becomes false check isLoggedIn 
       <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="font-semibold cursor-pointer text-gray-600 hover:text-gray-900">
              Dashboard
            </Link>
            <button
              onClick={handleSignOut}
              className="px-3 py-1 cursor-pointer bg-red-600 text-white rounded-md hover:bg-red-800 "

            >
              Sign Out
            </button>
          </div>


      ):(
         // If logged out, show the Login button
          <button
            onClick={() => router.push('/sign-in')}
            className="bg-blue-600 text-white cursor-pointer px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
          >
            Login
          </button>
         


      )}



        </div>

    </nav>

    );
}

