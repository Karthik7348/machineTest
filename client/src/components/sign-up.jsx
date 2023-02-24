import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/sign-up.css'

const SignUP = () => {
    let options = ["HR", "MANAGER", "SALES"]
    let [name, setName] = useState("")
    let [MobileNo, setNumber] = useState("")
    let [Gender, setGender] = useState("")
    let [Email, setEmail] = useState("")
    let [Img, setFile] = useState(null)
    let [Designation, setDesignation] = useState(options[0])
    const [Course, setSelectedCheckboxes] = useState([]);

    let navigate = useNavigate()

    let showdate = new Date()
    let [date, setDate] = useState(showdate.getDate() + '/' + showdate.getDay() + '/' + showdate.getFullYear())

    const handleCheckboxChange = (event) => {
        const checkboxValue = event.target.value;
        if (event.target.checked) {
            setSelectedCheckboxes([...Course, checkboxValue]);
        } else {
            setSelectedCheckboxes(
                Course.filter((value) => value !== checkboxValue)
            );
        }
    };


    let handleSubmit = (event) => {
        event.preventDefault()
        let data = { name, Email, MobileNo, Designation, Gender, Course, Img, date }
        console.log(data);
        fetch('/postEmployeeDetails', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.error(err));
        navigate('/login')
    }



    return (
        <div className="sign-up">
            <div className="sform">
                <div className="form-input">
                    <h1>SIGN UP</h1>
                    <form action="" onSubmit={handleSubmit}>
                        <div className="sname-input">
                            <label htmlFor="">NAME</label> <br />
                            <input type="text" placeholder="enter your name" required value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="semail-input">
                            <label htmlFor="">EMAIL</label> <br />
                            <input type="email" placeholder="enter email address" required value={Email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="sinput-number">
                            <label htmlFor="">MOBILE NUMBER</label> <br />
                            <input type="number" placeholder="enter your age" required value={MobileNo} onChange={(e) => setNumber(e.target.value)} />
                        </div>
                        <select
                            value={Designation}
                            onChange={e => setDesignation(e.target.value)}>
                            {options.map((x) => (
                                <option value={x}>
                                    {x}
                                </option>
                            ))}
                        </select>

                        <div>
                            <label htmlFor="">GENDER</label> <br />
                            <input type="radio" value="male" checked={Gender === "male"}
                                onChange={(e) => setGender(e.target.value)} name="gender" />
                            <label for="male">Male</label>

                            <input type="radio" value="female" checked={Gender === "female"}
                                onChange={(e) => setGender(e.target.value)} name="gender" />
                            <label for="female">Female</label>
                        </div>

                        <div className="sinput-course">
                            <label htmlFor="">COURSES</label><br />
                            <label>
                                <input
                                    type="checkbox"
                                    value="MCA"
                                    checked={Course.includes('MCA')}
                                    onChange={handleCheckboxChange}
                                />
                                MCA
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="BCA"
                                    checked={Course.includes('BCA')}
                                    onChange={handleCheckboxChange}
                                />
                                BCA
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="BSC"
                                    checked={Course.includes('BSC')}
                                    onChange={handleCheckboxChange}
                                />
                                BSC
                            </label>
                        </div>

                        <div>
                            <label htmlFor="">IMG UPLOAD</label><br />
                            <input type="text" value={Img} onChange={(e) => setFile(e.target.value)} />
                        </div>

                        <button>Sign up</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUP;