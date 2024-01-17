import Axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'

function Dashboard() {

    // const [data, setData] = useState();

    const getData = useCallback(() => {
          Axios.get(`http://localhost:5000/api/v1/admin/dashboard`)
          .then(response => {
              if (response.status !== 200) return;
              console.log(response.data);
              // setData(response.data);
          })
          ;
      }, []);

    useEffect(() => {
        getData();
    }, [getData])

    return (
      <div>Dashboard</div>
    )
}

export default Dashboard;