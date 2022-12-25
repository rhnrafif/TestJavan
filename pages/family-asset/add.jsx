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
            await axios.get(`https://dummyjson.com/products/search?q=${e.asset}`)
            .then(async(res)=>{

                let dataPrice = res.data.products;

                let price = 0;
                if(dataPrice.length != 0){
                    for(let i = 0; i < dataPrice.length; i++){
                        if(dataPrice[i].title === e.asset){
                            price = dataPrice[i].price 
                        }
                    }                    
                }else{
                    price = 0
                }

                await axios.post(`http://localhost:3000/api/member/add-member/${e.name}`).then(()=>{})
                await axios.post(`http://localhost:3000/api/asset-records/add-asset/${e.asset}`).then(()=>{})

                const data = {
                name : e.name,
                asset : e.asset,
                price : price
                }

                await axios.post("http://localhost:3000/api/family-asset/add", data)
                .then((res)=>{
                    if(res.status === 201){
                        router.push('/family-asset')
                    }
                })
            })           
        }
        catch(error){
           
        }
    }

    return(
        <>
            <main className='min-w-full min-h-screen bg-gray-900 ' >
                <div className="container min-h-screen flex flex-col justify-center items-center max-w-lg mx-auto bg-slate-100">
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
                </div>
            </main>
        </>
    )
}