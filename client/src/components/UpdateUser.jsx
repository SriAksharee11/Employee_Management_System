import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from "./navbar";

function UpdateUser() {
    const { id } = useParams(); // To get the user id from URL params
    const [f_Id, setFId] = useState('');
    const [f_Name, setFName] = useState('');
    const [f_Email, setFEmail] = useState('');
    const [f_Designation, setFDesignation] = useState('');
    const [f_Gender, setFGender] = useState('');
    const [f_Course, setFCourse] = useState({
        MCA: false,
        BCA: false,
        BSC: false,
    });
    const [createDate, setCreateDate] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/getUser/${id}`);
                const userData = response.data;
                setFId(userData.f_Id);
                setFName(userData.f_Name);
                setFEmail(userData.f_Email);
                setFDesignation(userData.f_Designation);
                setFGender(userData.f_Gender);
                setCreateDate(userData.createDate);

                // Set the selected courses based on the user's data
                const courseData = userData.f_Course.split(', ').reduce((acc, course) => {
                    acc[course] = true;
                    return acc;
                }, {});
                setFCourse(courseData);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, [id]); // Effect runs only once when the component mounts

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
            f_Designation,
            f_Gender,
            f_Course: selectedCourses.join(", "),
            createDate,
        };

        try {
            const response = await axios.put(`http://localhost:3001/updateUser/${id}`, formData);
            console.log(response.data);
            navigate('/employee-list');
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <>
            <Navbar />
            <div style={styles.usersContainer}>
                <div style={styles.innerContainer}>
                    <form onSubmit={submitForm}>
                        <h2>Update Employee</h2>

                        {/* Id */}
                        <div className="mb-2">
                            <label htmlFor="f_Id">Id</label>
                            <input
                                type="number"
                                className="form-control"
                                value={f_Id}
                                disabled
                            />
                        </div>

                        {/* Name */}
                        <div className="mb-2">
                            <label htmlFor="f_Name">Name</label>
                            <input
                                type="text"
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
                                className="form-control"
                                value={f_Email}
                                onChange={(e) => setFEmail(e.target.value)}
                            />
                            {errors.f_Email && <small style={{ color: 'red' }}>{errors.f_Email}</small>}
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

                        <button type="submit" className="btn btn-success">Update</button>
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

export default UpdateUser;
