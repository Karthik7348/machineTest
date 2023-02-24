import { useEffect } from 'react';
import { useState, useRef } from 'react';
import '../styles/employee-list.css';
import { Icon } from '@iconify/react';


const EmployeeList = () => {
    let [employee, setEmployee] = useState([])
    let [count, setCount] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    let refer = useRef("")

    useEffect(() => {
        let fetchData = async () => {
            let response = await fetch('http://localhost:9000/getEmployeeDetails')
            let data = await response.json()
            setEmployee(data)
        }
        fetchData()
    }, [])


    let remove = (id) => {
        fetch(`http://localhost:9000/getEmployeeDetails/${id}`, {
            method: "DELETE"
        })
    }


    return (
        <div>
            <div className='d-flex justify-content-center gap-3 m-4'>
                <div><p>Total count:{employee.length}</p></div>
                <div><a href="/signup">create employee</a></div>
            </div>
            
                <div class="input-group flex-nowrap d-flex justify-content-center ">
                    <input type="text" placeholder="name" onChange={(e) => setSearchTerm(e.target.value)}/>
                    <span class="input-group-text" id="addon-wrapping"><Icon icon="ic:outline-search" /></span>
                </div>
           
            <div className="employee-list d-flex justify-content-center m-5">
                <table className=''>
                    <tr>
                        <th>Unique ID</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile No</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Course</th>
                        <th>Create Date</th>
                        <th>Action</th>
                    </tr>

                    {employee.filter(value => {
                        if (searchTerm == "") {
                            return value
                        } else if (value.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return value
                        }
                    }).map((x) => (
                        <tr>
                            <td>{++count}</td>
                            <td>Image</td>
                            <td>{x.name}</td>
                            <td>{x.Email}</td>
                            <td>{x.MobileNo}</td>
                            <td>{x.Designation}</td>
                            <td>{x.Gender}</td>
                            <td>{x.Course}</td>
                            <td><img src={x.Img} alt="" /></td>
                            <td><a href="">Edit</a>-<a href="" onClick={() => remove(x._id)}>Delete</a></td>
                        </tr>
                    ))
                    }
                </table>
            </div>
        </div>
    );
}

export default EmployeeList;