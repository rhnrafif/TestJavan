import {useState} from "react"
import axios from "axios";
import {useRouter} from "next/router"
import {useForm} from "react-hook-form";

export default function Add(){   
    
    //useform
    const {handleSubmit, register} = useForm();

    //router
    const router = useRouter();

    //submitform
    const submitForm = async(e)=>{
        try{
            const data = {
                name : e.name,
                asset : e.asset
            }

            axios.post("http://localhost:3000/api/family-asset/add", data)
            .then((res)=>{
                // if(res.status === 201){
                //     router.push('/family-asset')
                // }
            })
        }
        catch(error){
            console.error(error)
        }
    }

    return(
        <>
            <main className='min-w-full min-h-screen bg-slate-100 flex justify-center items-center' >
                <div className="w-[360px] h-[300px] p-4 rounded-lg flex flex-col gap-3 justify-around items-center bg-gray-900">
                    <p className="text-white font-semibold text-xl">Family Asset List</p>
                    <form action="" className="flex flex-col items-center" autoComplete="off" onSubmit={handleSubmit(submitForm)} >
                        <div className="flex flex-col gap-2 items-center mb-4">
                            <label htmlFor="name" className="text-base text-white">Name</label>
                            <input className="rounded h-8 p-2" type="text" name="name" 
                            {...register("name")}
                            />
                        </div>
                        <div className="flex flex-col gap-2 items-center mb-4">
                            <label htmlFor="name" className="text-base text-white">Asset</label>
                            <input className="rounded h-8 p-2" type="text" name="name" 
                            {...register("asset")}
                            />
                        </div>
                        <div className="flex gap-2">
                            <button type="submit" className="w-[100px] h-[40px] rounded-md bg-sky-500 text-white">Add Asset</button>
                            <button onClick={()=>{router.back()}} className="w-[50px] h-[40px] rounded-md bg-slate-300 text-black">Back</button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}