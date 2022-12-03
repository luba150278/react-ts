import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import Child from "./components/child/Child";
import AppProps from "./interface/interfaces";

interface GeoProps {
  lat: string;
  lng: string;
}
interface AddressProps {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoProps;
}
interface AxiosProps {
  id: number;
  name: string;
  username: string;
  email: string;
  address: AddressProps;
}


function App({ text, id = 1 }: AppProps): JSX.Element {
  const [users, setUsers] = useState<AxiosProps[]>([]);
  const [count, setCount] = useState<number>(0);

  const handlerClick = (): void => {
    setCount(count + 1);
  };
  const getUsers = async (): Promise<void> => {
    //Робимо деструктурізацію response (відповіді): data це одне з полей у відповіді сервера. Там ще є status, headers...
    const { data } = await axios.get<AxiosProps[]>(
      "https://jsonplaceholder.typicode.com/users"
    );

    setUsers(data);
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="App">
      <p id={id.toString()}>{text}</p>
      <Child handlerClick={handlerClick} count={count} />
      <ul>
        {users.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
