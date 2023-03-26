import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import { BASE_URL, FILE_PATH } from '../../api/config';
import './author.scss';

const Author = () => {
  const [Name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [photoURL, setPhoto] = useState("");
  const [APIData, setAPIData] = useState([]);
  const navigate = useNavigate();

  const getAuthor = async () => {
    axios.get(BASE_URL + "author/getall").then((response) => {
      setAPIData(response.data);
    });
  };

  const setData = (data) => {
    let { id, name, photoURL, description } = data;
    localStorage.setItem("ID", id);
    localStorage.setItem("Name", name);
    localStorage.setItem("PhotoURL", photoURL);
    localStorage.setItem("Description", description);
  };

  const onDelete = (id) => {
    fetch(`${BASE_URL}author/remove/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: Name,
        photoURL: photoURL,
        description: description
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        navigate('/author')
      });
  };

  getAuthor();

  return (
    <div id="author" className="my-5">
      <Link to="/author/create">
        <button className="btn btn-outline-success">Create</button>
      </Link>
      <Table singleLine className="my-4">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Photo</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
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
                    <img width="50px" src={`${FILE_PATH}${data.photoURL}`} alt="" />
                  </Table.Cell>
                  <Table.Cell>{data.description}</Table.Cell>
                  <Table.Cell>
                    <Link to={`/author/update/${data.id}`}>
                      <button
                        className="btn btn-outline-warning my-2"
                        onClick={() => setData(data)}
                      >
                        Update
                      </button>
                    </Link>
                  </Table.Cell>
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

export default Author