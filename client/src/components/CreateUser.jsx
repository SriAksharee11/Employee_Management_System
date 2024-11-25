import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from "./navbar";

function CreateUser() {
    const [f_Id, setFId] = useState('');
    const [f_Name, setFName] = useState('');
    const [f_Email, setFEmail] = useState('');
    const [f_MobileNo, setFMobileNo] = useState('');
    const [f_Designation, setFDesignation] = useState('');
    const [f_Gender, setFGender] = useState('');
    const [f_Course, setFCourse] = useState({
        MCA: false,
        BCA: false,
        BSC: false,
    });
    const [createDate] = useState(new Date().toLocaleDateString());
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        let valid = true;
        let validationErrors = {};

        if (!f_Name.trim()) {
            validationErrors.f_Name = "Name is required";
            valid = false;
        }

        if (!f_Email || !/\S+@\S+\.\S+/.test(f_Email)) {
            validationErrors.f_Email = "Valid email is required";
            valid = false;
        }

        if (!f_MobileNo || !/^\d+$/.test(f_MobileNo)) {
            validationErrors.f_MobileNo = "Mobile number must be numeric";
            valid = false;
        }

        if (!f_Designation.trim()) {
            validationErrors.f_Designation = "Designation is required";
            valid = false;
        }

        if (!f_Gender) {
            validationErrors.f_Gender = "Gender is required";
            valid = false;
        }

        if (!Object.values(f_Course).includes(true)) {
            validationErrors.f_Course = "At least one course should be selected";
            valid = false;
        }

        setErrors(validationErrors);
        return valid;
    };

    const submitForm = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        const selectedCourses = Object.keys(f_Course).filter((key) => f_Course[key]);
        const formData = {
            f_Id,
            f_Name,
            f_Email,
            f_MobileNo,
            f_Designation,
            f_Gender,
            f_Course: selectedCourses.join(", "),
            createDate,
        };

        try {
            const response = await axios.post("http://localhost:3001/createUser", formData);
            console.log(response.data);
            navigate('/employee-list');
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    return (
        <>
            <Navbar />
            <div style={styles.usersContainer}>
                <div style={styles.innerContainer}>
                    <form onSubmit={submitForm}>
                        <h2>Create Employee</h2>

                        {/* Name */}

                        <div className="mb-2">
                            <label htmlFor="f_Id">Id</label>
                            <input
                                type="number"
                                placeholder="Enter Id"
                                className="form-control"
                                value={f_Id}
                                onChange={(e) => setFId(e.target.value)}
                            />
                            {errors.f_Id && <small style={{ color: 'red' }}>{errors.f_Id}</small>}
                        </div>

                        <div className="mb-2">
                            <label htmlFor="f_Name">Name</label>
                            <input
                                type="text"
                                placeholder="Enter Name"
                                className="form-control"
                                value={f_Name}
                                onChange={(e) => setFName(e.target.value)}
                            />
                            {errors.f_Name && <small style={{ color: 'red' }}>{errors.f_Name}</small>}
                        </div>

                        {/* Email */}
                        <div className="mb-2">
                            <label htmlFor="f_Email">Email</label>
                            <input
                                type="email"
                                placeholder="Enter Email"
                                className="form-control"
                                value={f_Email}
                                onChange={(e) => setFEmail(e.target.value)}
                            />
                            {errors.f_Email && <small style={{ color: 'red' }}>{errors.f_Email}</small>}
                        </div>

                        {/* Mobile No */}
                        <div className="mb-2">
                            <label htmlFor="f_MobileNo">Mobile No</label>
                            <input
                                type="text"
                                placeholder="Enter Mobile Number"
                                className="form-control"
                                value={f_MobileNo}
                                onChange={(e) => setFMobileNo(e.target.value)}
                            />
                            {errors.f_MobileNo && <small style={{ color: 'red' }}>{errors.f_MobileNo}</small>}
                        </div>

                        {/* Designation */}
                        <div className="mb-2">
                            <label htmlFor="f_Designation">Designation</label>
                            <select
                                className="form-control"
                                value={f_Designation}
                                onChange={(e) => setFDesignation(e.target.value)}
                            >
                                <option value="">Select Designation</option>
                                <option value="HR">HR</option>
                                <option value="Manager">Manager</option>
                                <option value="Sales">Sales</option>
                            </select>
                            {errors.f_Designation && <small style={{ color: 'red' }}>{errors.f_Designation}</small>}
                        </div>

                        {/* Gender */}
                        <div className="mb-2">
                            <label>Gender</label>
                            <div>
                                <input
                                    type="radio"
                                    id="male"
                                    name="f_Gender"
                                    value="Male"
                                    checked={f_Gender === "Male"}
                                    onChange={() => setFGender("Male")}
                                />
                                <label htmlFor="male">Male</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="female"
                                    name="f_Gender"
                                    value="Female"
                                    checked={f_Gender === "Female"}
                                    onChange={() => setFGender("Female")}
                                />
                                <label htmlFor="female">Female</label>
                            </div>
                            {errors.f_Gender && <small style={{ color: 'red' }}>{errors.f_Gender}</small>}
                        </div>

                        {/* Courses */}
                        <div className="mb-2">
                            <label>Course</label>
                            {["MCA", "BCA", "BSC"].map((course) => (
                                <div key={course}>
                                    <input
                                        type="checkbox"
                                        id={course.toLowerCase()}
                                        checked={f_Course[course]}
                                        onChange={() => setFCourse({ ...f_Course, [course]: !f_Course[course] })}
                                    />
                                    <label htmlFor={course.toLowerCase()}>{course}</label>
                                </div>
                            ))}
                            {errors.f_Course && <small style={{ color: 'red' }}>{errors.f_Course}</small>}
                        </div>

                        {/* Create Date */}
                        <div className="mb-2">
                            <label htmlFor="createDate">Create Date</label>
                            <input
                                type="text"
                                className="form-control"
                                value={createDate}
                                disabled
                            />
                        </div>

                        <button type="submit" className="btn btn-success">Add</button>
                    </form>
                </div>
            </div>
        </>
    );
}

const styles = {
    usersContainer: {
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#220e24',
    },
    innerContainer: {
        width: '50%',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '16px',
    },
};

export default CreateUser;






































