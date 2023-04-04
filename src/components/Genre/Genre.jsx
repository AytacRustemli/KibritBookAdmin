import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import { BASE_URL } from '../../api/config';

const Genre = () => {
  const [Name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [APIData, setAPIData] = useState([]);
  const navigate = useNavigate();


  const getGenre = async () => {
    axios.get(BASE_URL + "genre/getall").then((response) => {
      setAPIData(response.data);
    });
  };

  const setData = (data) => {
    let { id, name, photo } = data;
    localStorage.setItem("ID", id);
    localStorage.setItem("Name", name);
    localStorage.setItem("Photo", photo);
  };


  const onDelete = (id) => {
    fetch(`${BASE_URL}genre/remove/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: Name,
        photo: photo
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        navigate('/genre')
      });
  };

  
  getGenre();
  

  return (
    <div id="genre" className="my-5">
      <Link to="/genre/create">
        <button className="btn btn-outline-success">Create</button>
      </Link>
      <Table singleLine className="my-4">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Photo</Table.HeaderCell>
            <Table.HeaderCell>Update</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {APIData &&
            APIData.map((data) => {
              return (
                <Table.Row>
                  <Table.Cell>{data.name}</Table.Cell>
                  <Table.Cell>
                    <img width="50px" src={data.photo} alt="" />
                  </Table.Cell>
                  <Link to={`/genre/update/${data.id}`}>
                    <Table.Cell>
                      <button
                        className="btn btn-outline-warning my-2"
                        onClick={() => setData(data)}
                      >
                        Update
                      </button>
                    </Table.Cell>
                  </Link>
                  <Table.Cell>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => onDelete(data.id)}
                    >
                      Delete
                    </button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    </div>
  )
}

export default Genre