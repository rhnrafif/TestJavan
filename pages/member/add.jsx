export default function Add(){

    return(
        <>
            <main className='min-w-full min-h-screen bg-slate-100 flex justify-center items-center' >
                <div className="w-[400px] h-[240px] p-4 rounded-lg flex flex-col gap-4 justify-around items-center bg-gray-900">
                    <p className="text-white font-semibold text-2xl">Member List</p>
                    <form action="" className="flex flex-col items-center" autoComplete="off">
                        <div className="flex flex-col gap-4 items-center mb-4">
                            <label htmlFor="name" className="text-lg text-white">Member Name</label>
                            <input className="rounded h-8 p-2" type="text" name="name" />
                        </div>
                        <button className="w-[100px] h-[40px] rounded-md bg-slate-100">Add Member</button>
                    </form>
                </div>
            </main>
        </>
    )
}