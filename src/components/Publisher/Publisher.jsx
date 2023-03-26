import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import { BASE_URL, FILE_PATH } from '../../api/config';

const Publisher = () => {
  const [Name, setName] = useState("");
  const [photoURL, setPhoto] = useState("");
  const [publishDate,setPublishDate] = useState("");
  const [APIData, setAPIData] = useState([]);
  const navigate = useNavigate();

  const getPublisher = async () => {
    axios.get(BASE_URL + "publisher/getall").then((response) => {
      setAPIData(response.data);
    });
  };

  const setData = (data) => {
    let { id, name, photoURL, publishDate} = data;
    localStorage.setItem("ID", id);
    localStorage.setItem("Name", name);
    localStorage.setItem("PhotoURL", photoURL);
    localStorage.setItem("PublishDate",publishDate);
  };

  const onDelete = (id) => {
    fetch(`${BASE_URL}publisher/remove/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: Name,
        photoURL: photoURL,
        publishDate : publishDate
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        navigate('/publisher')
      });
  };

  getPublisher();

  return (
    <div id="publisher" className="my-5">
      <Link to="/publisher/create">
        <button className="btn btn-outline-success">Create</button>
      </Link>
      <Table singleLine className="my-4">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Photo</Table.HeaderCell>
            <Table.HeaderCell>PublishDate</Table.HeaderCell>
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
                  <Table.Cell>{data.publishDate}</Table.Cell>
                  <Link to={`/publisher/update/${data.id}`}>
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

export default Publisher;