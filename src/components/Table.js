import React from 'react';
import { useState, useEffect } from "react";
import "./table.css"
import axios from 'axios'

const Table = ({ columns, filterField }) => {
    const [users, setUsers] = useState([]);
    const [usersPerPage, setUsersPerPage] = useState(4);
    const [currentPage, setcurrentPage] = useState(1);
    const [value, setValue] = useState("");
    const [sortValue, setSortValue] = useState("");

    const sortOptions = ["name", "username", "email"];

    const numberOfTotalPages = Math.ceil(users.length / usersPerPage);

    const IndexOflastTodo = currentPage * usersPerPage; // Last index of Totos
    const IndexOffirstTodo = IndexOflastTodo - usersPerPage; // Find out first Index of Page

    const visibleUsers = users.slice(IndexOffirstTodo, IndexOflastTodo)

    const pages = [...Array(numberOfTotalPages + 1).keys()].slice(1);



    useEffect(() => {
        loadUserData();
    }, [])

    const loadUserData = () => {
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then((res) => setUsers(res.data))
            .catch((err) => console.log(err))
    }

    const getCaps = (head, field) => {
        if (head) return head.toUpperCase();
        return field.toUpperCase();
    };


    const handleSearch = async (e) => {
        e.preventDefault();
        return await axios.get(`https://jsonplaceholder.typicode.com/users?q=${value}`)
            .then((response) => {
                setUsers(response.data);
                setValue("");
            })
            .catch((err) => console.log(err))
    }

    const handleReset = () => {
        loadUserData();
    }



    const prevHandler = () => {
        if (currentPage !== 1) setcurrentPage(currentPage - 1)
    }

    const nextHandler = () => {
        if (currentPage !== numberOfTotalPages) setcurrentPage(currentPage + 1)
    }


    // Handling Sorting
    const handleSort = async (e) => {
        let value = e.target.value;
        setSortValue(value);
        return await axios.get(`https://jsonplaceholder.typicode.com/users?_sort=${value}&_order=asc`)
            .then(res => {
                setUsers(res.data)
                setValue("")
            })
            .catch((err) => console.log(err))
    }

    return (
        <>
            <div className='topBar'>
                <div className='serachBar'>
                    <form onSubmit={handleSearch} >
                        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
                    </form>
                    <button type='submit'onClick={handleSearch}>Search</button>
                    <button onClick={() => handleReset()}>Reset</button>
                </div>
                <div className='sortingList'>
                    <h5>Sorting By: </h5>
                    <select style={{ width: "50%", borderRadius: "10px", height: "40px", paddingLeft: "15px" }}
                        onChange={handleSort}
                        value={sortValue.toUpperCase()}
                    >
                        <option>Please Select Value</option>
                        {sortOptions.map((item, index) => (
                            <option value={item} key={index}>{item}</option>
                        ))

                        }
                    </select>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        {columns &&
                            columns.map((head) => (
                                <th>
                                    {getCaps(head.header, head.field)}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>

                    {visibleUsers &&
                        visibleUsers.map((row) => (
                            <tr>
                                {columns.map((col) => (
                                    <td>{row[col.field]}</td>                                    
                                ))
                                }
                            </tr>
                        ))

                    }
                </tbody>
            </table>
            <div className='pagination'>

                <p><span onClick={prevHandler}>Prev </span>
                    {pages.map((page) =>
                        <span key={page}
                            onClick={() => setcurrentPage(page)}
                            className={`${currentPage === page ? "active" : ""}`}
                        >{`${page} | `}</span>)}<span onClick={nextHandler}> Next</span>
                </p>

            </div>
        </>
    );
}

export default Table;
