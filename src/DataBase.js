import React, { useEffect, useState } from "react";

const DataBase = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(props.accounts);
  }, [props.accounts]);

  return (
    <div>
      {users.length > 0 && (
        <div>
          <table class="table" style={{border: '1px solid'}}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Hash</th>
                <th scope="col">Name</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => {
                return (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{user.hash}</td>
                    <td>{user.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DataBase;
