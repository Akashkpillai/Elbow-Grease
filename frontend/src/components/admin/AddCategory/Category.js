import React, {useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';
import axiox from '../../../api/axios'
import {toast} from 'react-toastify'
import {
    Button,
    Card,
    CardContent,
    Grid,
    TextField,
    Typography
} from '@mui/material'
import {useDispatch} from 'react-redux'

import {categoryDetails} from '../../Redux/adminReducer'


function Category() {

    const [category, setCategory] = useState();
    const [getCat, setGetCat] = useState([]);
    const [validation, setValidation] = useState()

    const dispatch = useDispatch();


    const categoryChage = (e) => {
        setCategory(e.target.value)
        console.log(category);
    }

    const submitCat = async (e) => {
        e.preventDefault()
        try {
            const res = await axiox.post('/admin/addcategory', {category})
            console.log(res);
            const msg = res.data.msg
            toast.success(msg)
        } catch (error) {
            const msg = error.response.data.msg
            console.log(msg);
            toast.error(msg)
        }
    }

    async function deleteCat(id) {
        try {
            const data = await axiox.delete(`/admin/delete-category/${id}`)
            toast.success(data.data.msg)
        } catch (error) {
            const msg = error.response.data.msg
            toast.error(msg)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        getAllCategory();
        async function getAllCategory() {
            const config = {
                headers: {
                    Accept: 'application/json',
                    Authorization: token,
                    'Content-Type': 'application/json'
                }
            };
            const response = await axiox.get('/admin/category', config);    
            const data = response.data.details
            localStorage.setItem('Category', data);
            dispatch(categoryDetails(data))
            setGetCat(response.data.details)
        }
    }, [getCat, dispatch])

    const columns = [
        {
            name: 'Category',
            selector: (row) => row.category
        }, {
            name: 'Action',
            selector: (row) => {
                return (
                    <div>
                        <button onClick={
                                () => deleteCat(row._id)
                            }
                            className='bg-red-600 hover:bg-slate-500'>
                            Delete
                        </button>
                    </div>
                );
            }
        },
    ];
    return (
        <div>
            <Card style={
                {
                    maxWidth: 550,
                    margin: '1rem 0rem 0rem 20rem',
                    padding: '20px 5px',
                    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)"
                }
            }>
                <Typography gutterBottom align='center' fontSize='30px' variant='body2' color='green' margin='10px 0px 0px 0px' component='h2'>Add Category</Typography>
                <h1 className='text-center text-red-600'>
                    {validation}</h1>
                <CardContent>
                    <form onSubmit={submitCat}>
                        <Grid>
                            <Grid>
                                <TextField type='text'
                                    value={category}
                                    onChange={categoryChage}
                                    placeholder='Category'
                                    variant='outlined'
                                    fullWidth
                                    required/>
                            </Grid>
                            <Grid xs={12}
                                item>
                                <Button type='submit' variant='contained' fullWidth color='success'>Submit</Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>


            <DataTable className='ml-5' title="All Category"
                columns={columns}
                data={getCat}
                pagination
                fixedHeader
                fixedHeaderScrollHeight="450px"
                selectableRowsHighlight
                highlightOnHover/>
        </div>
    )
}

export default Category
