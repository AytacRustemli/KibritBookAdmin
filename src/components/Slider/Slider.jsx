import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import { BASE_URL, FILE_PATH } from '../../api/config';

const Slider = () => {
  const [photoUrl, setPhoto] = useState("");
  const [APIData, setAPIData] = useState([]);
  const navigate = useNavigate();

  const getSlider = async () => {
    axios.get(BASE_URL + "slider/getall").then((response) => {
      setAPIData(response.data);
    });
  };

  const setData = (data) => {
    let { id, photoUrl} = data;
    localStorage.setItem("ID", id);
    localStorage.setItem("photoUrl", photoUrl);
  };

  const onDelete = (id) => {
    fetch(`${BASE_URL}slider/remove/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        photoUrl: photoUrl
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        navigate('/slider')
      });
  };

  getSlider();

  return (
    <div id="slider" className="my-5">
      <Link to="/slider/create">
        <button className="btn btn-outline-success">Create</button>
      </Link>
      <Table singleLine className="my-4">
        <Table.Header>
          <Table.Row>
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
                  <Table.Cell>
                    <img width="50px" src={`${FILE_PATH}${data.photoUrl}`} alt="" />
                  </Table.Cell>
                  <Link to={`/slider/update/${data.id}`}>
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

export default Slider