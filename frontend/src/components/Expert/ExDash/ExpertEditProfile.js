import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function ProfileEdit() {
  const location = useLocation();
  let cont = location.state;
  const user = useSelector((state) => state.admin.expertDetails)

  // console.log("contractor", cont);

  let [name, setName] = useState(cont.name || "");
  let [address, setAddress] = useState(cont.phone || "");
  let [city, setCity] = useState(cont.phone || "");

  let [result, setResult] = useState("");
  const [previewSource,setPreviewSource] = useState('')
  const [insertImage, setinsertImage] = useState("");

  let [loading, setLoading] = useState(false);
  const navigate = useNavigate()


  const handleSubmit = (e) =>{
    e.preventDefault()
    if(!previewSource) return;
    uploadImage(previewSource)
  }

  const uploadImage = async (base64EncodedImage) =>{
   const data = base64EncodedImage
    // console.log(data);
    // console.log(base64EncodedImage);
    try {
        const config = {
            headers: {
                Accept: 'application/json',
                Authorization: user,
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.post('/expert/edit-profile',{data,name,address,city},config)
        setResult("Updated")
        navigate('/experts/dashboard')
        toast.success(res.data.msg)
    } catch (error) {
        console.log(error);
    }
  }

 const handleFileInputChnage =(e)=>{
    const files = e.target.files[0]
    const fileSize = files.size / 1024 / 1024;
    if (fileSize > 2) {
     toast.error("File size must be less than 2 MB");
      setPreviewSource("");
      return;
    }
    previewFile(files)
 }

 const previewFile = (file) =>{
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () =>{
        setPreviewSource(reader.result)
    }
 }

  
  

  return (
    <div>
      <div className="min-h-screen p-3 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            {result ? (
              <h2 className="font-semibold text-xl text-gray-600 mb-5  ">
                Updated Sucessfully
              </h2>
            ) : (
              <h2 className="font-semibold text-xl text-gray-600 mb-5 ">
                Edit-Profile
              </h2>
            )}

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 ">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-bold text-lg  ">Personal Details</p>
                  <p>Please fill out all the fields.</p>
                  <div className="mt-10">
                    <div class="relative w-44 h-36 ">
                        { previewSource ?
                        <img
                        class="rounded-full border border-gray-100 shadow-sm"
                        style={{height:"150px"}}
                        src={previewSource}
                        alt="user pic"
                      />:
                      <img
                      class="rounded-full border border-gray-100 shadow-sm"
                      style={{height:"150px"}}
                      src={cont.image}
                      alt="user pic"
                    />

                        }
                      <div className="flex justify-center flex-wrap mt-5 ">
                        <input
                          type="file"
                          name="image"
                          multiple
                           value={insertImage}
                          onChange={handleFileInputChnage}
                          

                        />
                        {loading ? (
                          <div role="status">
                            <svg
                              aria-hidden="true"
                              class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                            <span class="sr-only">Loading...</span>
                          </div>
                        ) : (
                          ""
                        )}
                       
                      </div>
                      {/* <div class="absolute top-0 right-0 h-6 w-6 my-1 border-4 border-white rounded-full bg-green-400 z-2"></div> */}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <form
                    onSubmit={handleSubmit}
                  >
                    <div className="grid gap-4 gap-y-2 text-sm  grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5">
                        <label htmlFor="full_name">Full Name</label>
                        <input
                          type="text"
                          name="full_name"
                          id="full_name"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          defaultValue={cont.name}
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label htmlFor="email">Address</label>
                        <input
                          type="text"
                          name="email"
                          id="email"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          onChange={(e) => {
                            setAddress(e.target.value);
                          }}
                          defaultValue={cont.address}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="state">City</label>
                        <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                          <input
                            name="number"
                            id="number"
                            placeholder="State"
                            className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                            defaultValue={cont.serviceLocation}
                            onChange={(e) => {
                              setCity(e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className="md:col-span-5 text-right">
                        <div className="inline-flex items-end">
                          <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* <a href="https://www.buymeacoffee.com/dgauderman" target="_blank" className="md:absolute bottom-0 right-0 p-4 float-right">
      <img src="https://www.buymeacoffee.com/assets/img/guidelines/logo-mark-3.svg" alt="Buy Me A Coffee" className="transition-all rounded-full w-14 -rotate-45 hover:shadow-sm shadow-lg ring hover:ring-4 ring-white">
    </a> */}
        </div>
      </div>
    </div>
  );
}

export default ProfileEdit;
