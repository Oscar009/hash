import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./login";
import Register from "./Register";
import DataBase from "./DataBase";

function App() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [accounts, setAccounts] = useState([
    { hash: "fflqhhpljo", name: "oscar" },
  ]);
  const [error, setError] = useState("");

  const handleUpdateFromApp = (field, value) => {
    if (field === "user") setUser(value);
    if (field === "password") setPassword(value);
  };

  const hashAlgorithm = () => {
    /* Variables locales */
    let asciiNumber = "";
    let half1 = 0;
    let half2 = 0;
    let auxPass = "";
    let modArit = 0;
    let aux = "";
    let auxHash = "";
    let hashS = "";
    /* Plegamiento al de la segunda mitad al inicio + password + primera mitad */
    for (let i = 0; i < password.length; i++) {
      if (i + 1 < password.length / 2) {
        half1 += password[i];
      } else {
        half2 += password[i];
      }
      if (i + 1 === password.length) {
        auxPass = half2 + password + half1;
      }
    }
    /* Convertir cada caracter en valor ascii y guardarlo en un string */
    for (let i = 0; i < auxPass.length; i++) {
      asciiNumber += auxPass.charCodeAt(i).toString();
    }
    /* Aritmetica modular de asciiNumber */

    modArit = asciiNumber % 104729;

    /* Convertir a caracteres el resultado */
    aux = modArit.toString() + asciiNumber.toString();
    for (let i = 0; i < aux.length; i++) {
      auxHash += String.fromCharCode(aux.charCodeAt(i) + aux.charCodeAt(i + 1));
    }

    /* Truncamiento a 10 caracteres el resultado */
    for (let i = 0; i < 20; i++) {
      if (i % 2 === 0) {
        hashS += auxHash.charAt(i);
      }
    }
    return hashS;
  };

  const validateFields = (process) => {
    if (password.length < 6) {
      setError("Se necesitan minimo 6 caracteres");
      return false;
    }
    let validateUser = accounts.find((account) => user === account.name);
    if (validateUser && process === "signUp") {
      setError("Cuenta duplicada");
      return false;
    }
    if (!validateUser && process === "signIn") {
      setError("Usuario no válido");
      return false;
    }
    return true;
  };

  const signUp = () => {
    if (validateFields("signUp")) {
      let myHash = hashAlgorithm();
      setAccounts(accounts.concat([{ hash: myHash, name: user }]));
      setError("Usuario registrado");
    }
  };

  const signIn = () => {
    if (validateFields("signIn")) {
      let myHash = hashAlgorithm();
      let hashExist = accounts.find(
        (account) => account.hash === myHash && account.name === user
      );
      if (hashExist) setError(`Bienvenido ${hashExist.name}`);
      else setError("Campos no válidos");
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "1rem",
        }}
      >
        <h1>Plataform</h1>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          margin: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Login
            user={user}
            password={password}
            handleUpdateFromApp={handleUpdateFromApp}
            signIn={() => {
              signIn();
            }}
            error={error}
          />
          <Register
            user={user}
            password={password}
            handleUpdateFromApp={handleUpdateFromApp}
            signUp={() => {
              signUp();
            }}
            error={error}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "2rem",
            paddingRight: "11rem",
            paddingLeft: "11rem",
          }}
        >
          <DataBase accounts={accounts} />
        </div>
      </div>
    </>
  );
}

export default App;
