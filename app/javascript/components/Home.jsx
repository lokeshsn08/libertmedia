import React, { useState, useEffect } from 'react';
import Select from 'react-select'
const axios = require('axios').default;

 const Home = () => {
  const [singleusers, setSingleusers] = useState(''); 
  const [multipleusers, setmultipleusers] = useState([]); 
  const [allusers, setAllusers] = useState([]); 
  const [options, setOptions] = useState([]); 

 const onChangeGetDetail=(event)=>{
    setmultipleusers([])
    const value = event.value
    setSingleusers(value)
    getSeletedUsers([value])
}
const onChangeGetDetailMulltiple=(event)=>{
  setSingleusers('')
  setmultipleusers(event)
  const finalIds = []
   event.filter((data)=>{
     finalIds.push(data.value)
  })
  getSeletedUsers(finalIds)
}
const getSeletedUsers = (data)=>{
  axios.post('http://localhost:3000/getselectedusers',{
    users:data
  })
  .then(function (response) {
    setAllusers(response.data)
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}

  useEffect(() => {    
    axios.get('http://localhost:3000/allusers')
    .then(function (response) {
      setAllusers(response.data)
      response.data.map((data)=> {
        console.log(data.title)
        const passData =  { value:data.id, label: data.title }
        setOptions(options =>[...options,passData])
      })
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  },[]);
return(
  <div className="container">
    <div className="row mt-5 mb-5">
        <div className="jumbotron jumbotron-fluid bg-transparent">
          <div className="container secondary-color">
          <h1 className="display-4">Find User Details</h1>
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <label>Single Select</label>
                  <div className="col-md-6">
                    <Select 
                    onChange={onChangeGetDetail}
                    options={options} />
                  </div>
                  <div className="col-md-6">
                    <button className="btn btn-primary">Submit</button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <label>Multiple Select</label>
                  <div className="col-md-6">
                    <Select
                      isMulti
                      onChange={onChangeGetDetailMulltiple}
                      options={options}
                     />
                  </div>
                  <div className="col-md-6">
                    <button className="btn btn-primary">Submit</button>
                  </div>
                </div>
              </div>
            </div>

         
          <hr className="my-4" />
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Discription</th>
                <th scope="col">Company</th>
              </tr>
            </thead>
            <tbody>
              {
                allusers.map((data,i)=>{
                    return(
                    <tr key={i}>
                      <th scope="row">{data.id}</th>
                      <td>{data.title}</td>
                      <td>{data.discription}</td>
                      <td>{data.company}</td>
                    </tr>)
                })
              }
              
              
            </tbody>
          </table>
        </div>
        </div>
    </div>
  </div>
  )

  
}
export default Home