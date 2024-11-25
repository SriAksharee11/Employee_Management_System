import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar";


const generateRandomId = () => Math.floor(Math.random() * 90000) + 10000;

function EmployeeList() {
    const [users, setUsers] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001')
            .then(result => setUsers(result.data))
            
            .catch(err => console.log(err));
            console.log(users)
    }, []);

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/deleteUser/' + id)
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => console.log(err));
    };

    const filteredUsers = users.filter(user => {
        return (
            (user.f_Name && user.f_Name.toLowerCase().includes(searchKeyword.toLowerCase())) ||
            (user.f_Email && user.f_Email.toLowerCase().includes(searchKeyword.toLowerCase())) ||
            (user.f_Id && user.f_Id.toLowerCase().includes(searchKeyword.toLowerCase()))
        );
    });

    return ( 
        <>
        <Navbar />
        <div style={styles.usersContainer}>
            <div style={styles.innerContainer}>
                <h1 className="text-center">EMPLOYEE LIST</h1>

                
                <div style={styles.createButtonContainer}>
                    <Link to="/create" className="btn btn-success">Create Employee</Link>
                </div>

              
                <div className="d-flex justify-content-between mb-3">
                    <h5>Total Count: {users.length}</h5>
                    <div className="d-flex align-items-center">
                        <label htmlFor="search" style={styles.label}>Search:</label>
                        <input
                            type="text"
                            id="search"
                            placeholder="Enter search keyword"
                            className="form-control"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            style={styles.searchInput}
                        />
                    </div>
                </div>

              
                <table className="table">
                    <thead>
                        <tr>
                            <th> ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            {/* <th>Mobile No</th> */}
                            <th>Designation</th>
                            <th>Gender</th>
                            <th>Course</th>
                            <th>Create Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={index}>
                                <td>{user.f_Id || generateRandomId()}</td> {/* Generate unique ID if not present */}
                                <td>{user.f_Name}</td>
                                <td>{user.f_Email}</td>
                                {/* <td>{user.f_Mobile}</td> */}
                                <td>{user.f_Designation}</td>
                                <td>{user.f_Gender}</td>
                                <td>{user.f_Course}</td>
                                <td>{user.f_CreateDate}</td>
                                <td>
                                    <Link to={`/update/${user._id}`} className="btn btn-warning">Edit</Link>
                                    <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
        backgroundColor: '#220e24'
    },
    innerContainer: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '16px'
    },
    createButtonContainer: {
        display: 'flex',
        justifyContent: 'flex-end', 
        marginBottom: '10px'
    },
    label: {
        marginRight: '10px',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    searchInput: {
        width: '300px',
    }
};

export default EmployeeList;






// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// // Function to generate a random unique ID (4-5 digits)
// const generateRandomId = () => Math.floor(Math.random() * 90000) + 10000;

// function EmployeeList() {
//     const [users, setUsers] = useState([]);
//     const [searchKeyword, setSearchKeyword] = useState('');

//     useEffect(() => {
//         axios.get('http://localhost:3001')
//             .then(result => setUsers(result.data))
//             .catch(err => console.log(err));
//     }, []);

//     const handleDelete = (id) => {
//         axios.delete('http://localhost:3001/deleteUser/' + id)
//             .then(res => {
//                 console.log(res);
//                 window.location.reload();
//             })
//             .catch(err => console.log(err));
//     };

//     const filteredUsers = users.filter(user => {
//         return (
//             (user.name && user.name.toLowerCase().includes(searchKeyword.toLowerCase())) ||
//             (user.email && user.email.toLowerCase().includes(searchKeyword.toLowerCase())) ||
//             (user._id && user._id.toLowerCase().includes(searchKeyword.toLowerCase()))
//         );
//     });

//     return ( 
//         <div style={styles.usersContainer}>
//             <div style={styles.innerContainer}>
//                 <h1 className="text-center">EMPLOYEE LIST</h1>

//                 {/* Create Employee Button on the Right */}
//                 <div style={styles.createButtonContainer}>
//                     <Link to="/create" className="btn btn-success">Create Employee</Link>
//                 </div>

//                 {/* Total Count and Search */}
//                 <div className="d-flex justify-content-between mb-3">
//                     <h5>Total Count: {users.length}</h5>
//                     <div className="d-flex align-items-center">
//                         <label htmlFor="search" style={styles.label}>Search:</label>
//                         <input
//                             type="text"
//                             id="search"
//                             placeholder="Enter search keyword"
//                             className="form-control"
//                             value={searchKeyword}
//                             onChange={(e) => setSearchKeyword(e.target.value)}
//                             style={styles.searchInput}
//                         />
//                     </div>
//                 </div>

//                 {/* Table displaying employee data */}
//                 <table className="table">
//                     <thead>
//                         <tr>
//                             <th>Unique ID</th>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Mobile No</th>
//                             <th>Designation</th>
//                             <th>Gender</th>
//                             <th>Course</th>
//                             <th>Create Date</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredUsers.map((user, index) => (
//                             <tr key={index}>
//                                 <td>{user._id || generateRandomId()}</td> {/* Generate unique ID if not present */}
//                                 <td>{user.name}</td>
//                                 <td>{user.email}</td>
//                                 <td>{user.mobileNo}</td>
//                                 <td>{user.designation}</td>
//                                 <td>{user.gender}</td>
//                                 <td>{user.course}</td>
//                                 <td>{user.createDate}</td>
//                                 <td>
//                                     <Link to={`/update/${user._id}`} className="btn btn-warning">Edit</Link>
//                                     <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }

// const styles = {
//     usersContainer: {
//         display: 'flex',
//         height: '100vh',
//         justifyContent: 'center',
//         alignItems: 'center',
//         background: 'linear-gradient(to right, #a1c4fd, #c2e9fb)' // Mild gradient background
//     },
//     innerContainer: {
//         width: '80%',
//         backgroundColor: 'white',
//         borderRadius: '8px',
//         padding: '16px'
//     },
//     createButtonContainer: {
//         display: 'flex',
//         justifyContent: 'flex-end', // Align Create Employee button to the right
//         marginBottom: '10px'
//     },
//     label: {
//         marginRight: '10px',
//         fontWeight: 'bold',
//         alignSelf: 'center'
//     },
//     searchInput: {
//         width: '300px', // Adjust the width as needed
//     }
// };

// export default EmployeeList;


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// function EmployeeList() {
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         axios.get('http://localhost:3001')
//             .then(result => setUsers(result.data))
//             .catch(err => console.log(err));
//     }, []);

//     const handleDelete = (id) => {
//         axios.delete('http://localhost:3001/deleteUser/' + id)
//             .then(res => {
//                 console.log(res);
//                 window.location.reload();
//             })
//             .catch(err => console.log(err));
//     };

//     return ( 

        
//         <div style={styles.usersContainer}>

//             <div style={styles.innerContainer}>
//             <h1 className="text-center" >EMPLOYEE LIST</h1>
//                 <Link to="/create" className="btn btn-success mb-3">Add+</Link>
//                 <table className="table">
//                     <thead>
//                         <tr>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Age</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map((user, index) => (
//                             <tr key={index}>
//                                 <td>{user.name}</td>
//                                 <td>{user.email}</td>
//                                 <td>{user.age}</td>
//                                 <td>
//                                     <Link to={`/update/${user._id}`} className="btn btn-success">Update</Link>
//                                     <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }

// const styles = {
//     usersContainer: {
//         display: 'flex',
//         height: '100vh',
//         justifyContent: 'center',
//         alignItems: 'center',
//         background: 'linear-gradient(to right, #a1c4fd, #c2e9fb)' // Mild gradient background
//     },
//     innerContainer: {
//         width: '50%',
//         backgroundColor: 'white',
//         borderRadius: '8px',
//         padding: '16px'
//     }
// };

// export default EmployeeList;


