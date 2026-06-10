// import react from 'react'
import {useState} from 'react'

const Admin = () =>{
  const [size , setSize] = useState(280)
  const [accMenu, setAccMenu] = useState(false)
  return(
    <>
       <div>
        <aside 
        style={{ 
          width: size, 
        transition: '0.4s ease'
        }}
         className=" bg-sky-900 text-white border top-0 left-0 border-lg fixed h-full ">hello</aside>
        <section style={{
           marginLeft: size ,
            transition:'0.4s ease'}}
             className="h-screen bg-blue-100 ">
          <nav className="h-16 bg-white shadow flex items-center 
          justify-between px-6"> 
           <div className="text-xl items-center  flex gap-2 " >
            <button onClick={()=>setSize(size==280 ? 0 : 280)} className=" transform translate-0.5 duration-100  hover:text-gray-500" id="menu-btn"><i className="ri-menu-line text-xl"></i></button>
            <h1 className="font-semibold text-2xl ">JhalaCollection</h1>
           </div>
           <div>
            <button 
            className=' relative '>
              <img
               onClick={()=>{setAccMenu(!accMenu)}}  className=' h-19  '
               src='../images/avatar.png' >
                
               </img>

             {
              accMenu &&  <div className='absolute top-16 right-0 bg-white shadow-gray-400 shadow p-7 w-50'>
                <div>
                  <h1 className=' text-lg font-semibold'>admin</h1>
                  <p className='text-gray-500'>admin@gmail.com</p>
                  <div className='border h-px bg-gray-200 my-4 '/>
                </div>
                <button>
                <i className="ri-logout-circle-r-line mr-2" ></i>
                LogOut
                </button>
              </div>
             }

             
            </button>
           </div>
          </nav>
        </section>
       </div>
    </>
  )
}

export default Admin