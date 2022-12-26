import axios from "axios";
import {useRouter} from "next/router"
import { useState } from "react";
import {useForm} from "react-hook-form";
import {Spinner} from "@chakra-ui/react"



export default function Add(){

    //useform
    const {handleSubmit, register} = useForm();

    //router
    const router = useRouter();

    const[isLoading, setIsLoading] = useState(false)

    //submitform
    const submitForm = async(e)=>{
        try{
            setIsLoading(!isLoading)

            const request = {
                name : e.name
            }

            axios.post("https://family-asset.vercel.app/api/asset-records/add", request)
            .then((res)=>{
                if(res.status === 201){
                    setIsLoading(!isLoading)
                    router.push('/asset-records')
                }
            })
        }
        catch(error){
            
        }
    }

    return(
        <>
            <main className='min-w-full min-h-screen bg-gray-900' >
                <div className="container relative min-h-screen flex flex-col justify-center items-center max-w-lg mx-auto bg-slate-100">
                    {(isLoading) && (
                        <>
                            <div className="absolute bg-black w-full h-full opacity-[60%] flex justify-center items-center"></div>
                            <div className=" pb-2 pt-4 w-[220px] h-[150px] mx-auto bg-white opacity-[100%] absolute z-10 rounded-lg flex flex-col items-center justify-around gap-3">
                                <Spinner/>
                                <p className="font-semibold">Loading.. Please wait</p>
                                <button onClick={()=>{setIsLoading(!isLoading)}} className=" mt-2 w-[80px] h-[40px] bg-sky-600 text-white rounded">Close</button>
                            </div>
                        </>
                    )}
                    <div className="w-[360px] h-[220px] p-4 rounded-lg flex flex-col gap-4 justify-around items-center bg-gray-900 mx-auto">
                        <p className="text-white font-semibold text-2xl">Family Asset List</p>
                        <form action="" className="flex flex-col items-center" autoComplete="off" onSubmit={handleSubmit(submitForm)} >
                            <div className="flex flex-col gap-4 items-center mb-4">
                                <label htmlFor="name" className="text-lg text-white">Asset Name</label>
                                <input className="rounded h-8 p-2" type="text" name="name" 
                                {...register("name")}
                                />
                            </div>
                            <div className="flex gap-2">
                                <button type="submit" className="w-[100px] h-[40px] rounded-md bg-sky-500 text-white">Add Asset</button>
                                <button onClick={()=>{router.back()}} className="w-[50px] h-[40px] rounded-md bg-slate-300 text-black">Back</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}