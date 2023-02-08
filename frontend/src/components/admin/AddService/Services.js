import React, {useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {useSelector} from 'react-redux';
import { toast } from 'react-toastify';
import {
    Form,
    Input,
    Button,
    Upload
} from "antd";
import axios from "../../../api/axios";



function AdminAddService() {

    const category = useSelector((state) => state.admin.category);
    // console.log(category);
    const {TextArea} = Input;

    const [form] = Form.useForm();
    const [images, setImages] = useState([]);
    const [success, setsuccess] = useState(false)

    const handleChange = ({fileList}) => setImages(fileList);

    async function submit() {
        const values = form.getFieldsValue();
        // console.log(values);
        const formData = new FormData();
        images.forEach((image) => formData.append("image", image.originFileObj));
        const token = localStorage.getItem('adminToken');
        const config = {
            headers: {
                Accept: 'application/json',
                Authorization: token,
                'Content-Type': 'application/json'
            },
            values
        };
        const res = await axios.post("/admin/addService", config);
        if (res) {
            form.resetFields();
            setsuccess(true)
            setTimeout(() => {
                setsuccess(false)
            }, 5000);
        }
        
            toast.success("successfully added the Service")
 
    }

    return (
        <div className="mt-8 ml-8 bg-slate-100">
            <>
                <div className="w-48">
                    {
                    // success == true && showSuccessMsg("successfully updated the Service")
                } </div>
                <Form form={form}
                    onFinish={submit}
                    labelCol={
                        {span: 4}
                    }
                    wrapperCol={
                        {span: 14}
                    }
                    layout="horizontal"
                >
                    <Form.Item name="title" label="">
                        <TextArea placeholder="Title"
                            cols={100}/>
                    </Form.Item>


                    <Form.Item name="Price" label="">
                        <TextArea placeholder="Price"
                            cols={100}/>
                    </Form.Item>

                    <Form.Item name="note" label="">
                        <TextArea placeholder="note"
                            cols={100}
                            rows={5}/>
                    </Form.Item>
                    <Form.Item name="discription" label="">
                        <TextArea placeholder="discription"
                            cols={100}
                            rows={5}/>
                    </Form.Item>

                    <Form.Item name="image" label="">
                        <Upload name="images" valuePropName="fileList"
                            onChange={handleChange}
                            multiple
                            listType="picture-card">
                            <div>
                                <PlusOutlined/>
                                <div style={
                                    {marginTop: 8}
                                }>
                                    Upload
                                </div>
                            </div>
                        </Upload>
                    </Form.Item>
                    <Form.Item label="">
                        <Button htmlType="submit" className="bg-red-600">
                            Add Services
                        </Button>
                    </Form.Item>
                </Form>
            </>
        </div>
    );
}

export default AdminAddService;
