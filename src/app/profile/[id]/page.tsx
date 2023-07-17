
export default function UserProfile({params}: any) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2 border border-white ">
      <h1 className="text-4xl font-bold">
        Profile Page
        <span className=" bg-white text-black font-bold p-2 rounded-md m-2 hover:animate-pulse cursor-pointer">
          {String(params.id).toUpperCase()}
        </span> 
      </h1>
    </div>
  )
}
