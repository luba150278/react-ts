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
interface DataProps {
  users: AxiosProps[];
}

function App({ text, id = 1 }: AppProps): JSX.Element {
  const [users, setUsers] = useState<AxiosProps[]>([]);
  const [count, setCount] = useState<number>(0);

  const handlerClick = (): void => {
    setCount(count + 1);
  };
  const getUsers = async (): Promise<void> => {
    const res = await axios.get<DataProps>(
      "https://jsonplaceholder.typicode.com/users"
    );
    setUsers(res.data.users);
  };
  useEffect(() => {
    getUsers();
  }, []);

  console.log(users);
  return (
    <div className="App">
      <p id={id.toString()}>{text}</p>
      <Child handlerClick={handlerClick} count={count} />
      <ul>
        {users.map((item) => (
          <li>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
