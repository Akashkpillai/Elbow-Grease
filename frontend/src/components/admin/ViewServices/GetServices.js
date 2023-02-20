import React, {useState, useEffect} from "react";
import {
    Button,
    Form,
    Input,
    Modal,
    Radio,
    Upload
} from "antd";
import axios from "../../../api/axios";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import { toast } from "react-toastify";

const useStyles = makeStyles({
    table: {
        minWidth: 650
    }
});

const CollectionCreateForm = ({open, onCreate, onCancel}) => {
    const [form] = Form.useForm();
};

function AdminServices() {
    const [cars, setcar] = useState([]);
    const token = localStorage.getItem('adminToken');
    
    useEffect(() => {
        async function getServices() {
            try {
                const config = {
                    headers: {
                      Accept: 'application/json',
                      Authorization:token,
                      'Content-Type': 'application/json',
                    },
                  };
                const auto = await axios.get("/admin/service",config);
                setcar(auto.data.details);
            } catch (error) {
                toast.error(error)
            }
        }
        getServices();
    },[]);

    async function deleteSer(id){
        console.log(id);
        const data = await axios.put(`/admin/delete_service/${id}`);
        console.log(data);
        setcar(data.data.details)
        toast.success("successfully delete the Service")
    }

    const classes = useStyles();
    
    const [open, setOpen] = useState(false);
    const onCreate = (values) => {
        console.log("Received values of form: ", values);
        setOpen(false);
    };

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
                <Link to={"/admin/addService"}>
                    {" "}
                    <Button className="bg-blue-600">Add Service</Button>
                </Link>
            </div>
            <div>
                <>
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
                                        Price
                                    </TableCell>
                                    <TableCell>Discription</TableCell>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody> {
                                cars?.map((car) =>(
                                    <TableRow key={
                                        car.id
                                    }>
                                        <TableCell component="th" scope="row">
                                            {
                                            car.title
                                        } </TableCell>
                                        <TableCell>{
                                            car.price
                                        }</TableCell>
                                        <TableCell>{
                                            car.discription
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
                                            <button  onClick={()=>deleteSer(car._id)}>
                                            <DeleteIcon/>
                                            </button >
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

export default AdminServices;
