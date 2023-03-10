import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiox from '../../../api/axios'
function AdminUserInfoPage() {
  const [userDetails, setUserDetails] = useState([]);


  const token = localStorage.getItem('adminToken');
  async function getAllUsers() {
    const config = {
        headers: {
          Accept: 'application/json',
          Authorization:token,
          'Content-Type': 'application/json',
        },
      };
  const response = await axiox.get('/admin/allusers',config);
  setUserDetails(response.data.details);
}

  useEffect(() => {
    getAllUsers();
  }, []);

  async function block(id) {
    const token = localStorage.getItem('adminToken');
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization:token,
        'Content-Type': 'application/json',
      },
    };
    const data = await axiox.put(`/admin/block/${id}`,config);
    toast.success(`${data.data.details.name} is blocked!`)
    getAllUsers()
    if (data.blocked) {
      setUserDetails(data.userDetails);
    }
  }

  async function unblock(id) {
    const token = localStorage.getItem('adminToken');
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization:token,
        'Content-Type': 'application/json',
      },
    };
    const data = await axiox.put(`/admin/unblock/${id}`,config);
    // console.log(data.data.details.name);
    toast.success(`${data.data.details.name} is unblocked!`)
    getAllUsers()
    if (data.blocked) {
      setUserDetails(data.userDetails); 
    }
  }



  const columns = [
    {
      name: 'Name',

      selector: (row) => row.name,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
    },
    {
      name: 'Mobile',
      selector: (row) => row.phone,
    },
    {
      name: 'Action',
      selector: (row) => {
        return (
          <div>
            {row.blockStatus ? (
              
                <button
                
                  onClick={()=>unblock(row._id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  Unblock
                </button>

            ) : (
              <button
                onClick={() => block(row._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Block
              </button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="mx-auto ">

    

        <DataTable
          title="All Users"
          columns={columns}
          data={userDetails}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="450px"
          selectableRowsHighlight
          highlightOnHover
        />
      </div>
    </div>
  );
}

export default AdminUserInfoPage;
