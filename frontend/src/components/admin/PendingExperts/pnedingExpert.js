import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axiox from '../../../api/axios'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Form} from "antd";
import {Typography} from '@mui/material';


function AdminPendingExpertInfoPage() {

    const [expertDetails, setExpertDetails] = useState([]);
    const [expert, setExpert] = useState([]);

    const CollectionCreateForm = ({open, onCreate, onCancel}) => {
        const [form] = Form.useForm();
    };

    const useStyles = makeStyles({
        table: {
            minWidth: 650
        }
    });

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        getAllUsers();
        async function getAllUsers() {
            const config = {
                headers: {
                    Accept: 'application/json',
                    Authorization: token,
                    'Content-Type': 'application/json'
                }
            };
            const response = await axiox.get('/admin/expertPending', config);
            setExpertDetails(response.data.details);
        }
    }, [expertDetails]);

    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const onCreate = (values) => {
        console.log("Received values of form: ", values);
        setOpen(false);
    };

    async function Accept(id) {
        const token = localStorage.getItem('adminToken');
        const config = {
            headers: {
                Accept: 'application/json',
                Authorization: token,
                'Content-Type': 'application/json'
            }
        };
        const data = await axiox.put(`/admin/accept/${id}`, config);
        console.log(data);
        // toast.success(`${data.data.details.name} is blocked!`)
        if (data.blocked) {
            setExpertDetails(data.details);
        }
    }


    return (
        <div className="mt-3 ml-10">
            <div>
                <CollectionCreateForm open={open}
                    onCreate={onCreate}
                    onCancel={
                        () => {
                            setOpen(false);
                        }
                    }/>
                <Link to={"/admin/expert"}>
                    {" "}
                    <Button className="bg-blue-600">Accepted</Button>
                </Link>
            </div>
            <div>
                <>
                    <Typography sx={
                            {flex: '1 1 100%'}
                        }
                        variant="h6"
                        id="tableTitle"
                        component="div">
                        Pending
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table className={
                                classes.table
                            }
                            aria-label="car table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Name
                                    </TableCell>
                                    <TableCell>
                                        Phone
                                    </TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody> {
                                expertDetails ?. map((car) => (
                                    <TableRow key={
                                        car.id
                                    }>
                                        <TableCell component="th" scope="row">
                                            {
                                            car.name
                                        } </TableCell>
                                        <TableCell>{
                                            car.phone
                                        }</TableCell>
                                        <TableCell>{
                                            car.address
                                        }</TableCell>
                                        <TableCell>
                                            <img className="w-14 h-12"
                                                src={
                                                    car.image
                                                }
                                                alt={
                                                    car.name
                                                }/>
                                        </TableCell>
                                        <TableCell>
                                            <button onClick={
                                                    () => Accept(car._id)
                                                }
                                                className="bg-lime-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                                Accept
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            } </TableBody>
                        </Table>
                    </TableContainer>
                </>
            </div>
        </div>
    );


}

export default AdminPendingExpertInfoPage;
