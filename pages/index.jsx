import Head from 'next/head'
import { BsPeopleFill} from "react-icons/bs"
import {GrMoney} from "react-icons/gr"
import {GiOpenTreasureChest} from "react-icons/gi"
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Family Asset App</title>
        <meta name="description" content="Create an asset list on the app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='min-w-full min-h-screen bg-gray-900'>
        
        <div className='container max-w-[380px] h-screen pt-12 mx-auto bg-slate-100'>
          <h3 className='text-lg font-semibold text-gray-900 text-center py-5'>Family Member Asset App</h3>
          <div className='w-[280px] h-[400px] rounded-lg flex flex-col mx-auto gap-4 items-center bg-gray-900'>
            <div className='mt-5 mb-5'>
              <p className='text-white text-lg'>Please choose your menu</p>
            </div>
            <div className=' w-[240px] flex flex-col gap-4 justify-center items-center'>
              <Link href={'/family-asset'} className='group text-black outline outline-1 outline-white rounded-lg bg-slate-200 p-2'>
                <div className='w-[140px] h-[70px] flex flex-col items-center gap-2'>
                  <GiOpenTreasureChest className='w-[40px] h-[40px]' /> 
                  <p className='text-sm group-hover:font-semibold'>All Member Assets</p>               
                </div>
              </Link>
              
              <Link href={'/member'} 
              className=' group text-black outline outline-1 outline-white rounded-lg bg-slate-200 p-2'>
                <div className='w-[140px] h-[70px] flex flex-col items-center gap-2'>
                  <BsPeopleFill className='w-[40px] h-[40px]' /> 
                  <p className='text-sm group-hover:font-semibold'>Member</p>               
                </div>
              </Link>

              <Link href={'/asset-records'} 
              className=' group text-black outline outline-1 outline-white rounded-lg bg-slate-200 p-2'>
                <div className='w-[140px] h-[70px] flex flex-col items-center gap-2'>
                  <GrMoney className='w-[40px] h-[40px]' /> 
                  <p className='text-sm group-hover:font-semibold'>Asset</p>               
                </div>
              </Link>             
              
            </div>              
          </div>            
        </div>        
      </main>
    </>
  )
}
