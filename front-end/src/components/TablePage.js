import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TablePage() {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://13.233.89.137:3000/submission');
        setTableData(response.data); 
        setIsLoading(false);
      } catch (error) {
        console.error('Error:', error); 
        setIsLoading(false); 
      }
    };

    fetchData();
  }, []); 

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Preferred Language</th>
              <th>Stdin</th>
              <th>Submitted at</th>
              <th>Source Code</th>
              <th>Output</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index}>
                <td>{item.userName}</td>
                <td>{item.languagePref}</td>
                <td>{item.stdIn}</td>
                <td>{item.createdAt}</td>
                <td>{item.sourceCode}</td>
                <td>{item.stdOut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TablePage;
