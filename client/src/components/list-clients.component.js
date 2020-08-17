import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../App.css';

const Client = props => (
  <tr className="table-container">
    <td>{props.client.name}</td>
    <td>{props.client.lastn}</td>
    <td>{props.client.email}</td>
    <td>{props.client.mobileno}</td>
    <td>{props.client.project}</td>
    <td className="options-client">
      <Link to={"http://localhost:5000/edit/" + props.client._id}>Edit</Link> | <a href="#" onClick={() => {
          props.deleteClient(props.client._id)}}>Delete</a>
    </td>
  </tr>
)
export default class ListClients extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clients: [] 
    }
  }

  componentDidMount() {
    axios.get('/')
      .then(res => {
        this.setState({
          clients: res.data
        })
      })
      .catch(err => console.log(err))
  }
  deleteClient = (id) => {
    axios.delete('/' + id)
      .then(res => console.log(res.data))
    this.setState({
      // return no equals to id deleted
      clients: this.state.clients.filter(el => el._id !== id)
    })
  }
  clientList = () => {
    return this.state.clients.map(client => {
      return <Client 
        client={client} 
        deleteClient={this.deleteClient} 
        key={client._id}
      />
    })
  }

  render() {
    return (
      <div className="list-clients">
        <h2>Clients</h2>
        <table className="table">
          <thead className="thead-light thead-back">
            <tr className="title-clients">
              <th>Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Mobile No.</th>
              <th>Project</th>
            </tr>
          </thead>
          <tbody>
            { this.clientList() }
          </tbody>

        </table>
      </div>
    )
  }
}