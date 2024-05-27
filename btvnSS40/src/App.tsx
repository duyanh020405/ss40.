import React, { useState } from 'react';
import './App.css';

interface User {
  name: string;
  date: string;
  email: string;
  address: string;
  show: string;
  block: boolean;
}

export default function App() {
  const [list, setList] = useState<User[]>([]);
  const [searchResult, setSearchResult] = useState<User | null>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const add = () => {
    const name = prompt("name:");
    const date = prompt("date:");
    let email = prompt("email:");
    const address = prompt("address:");

    while (email && !validateEmail(email)) {
      email = prompt("nhập lại email:");
    }

    if (name && date && email && address) {
      const newUser: User = {
        name,
        date,
        email,
        address,
        show: "Dang hoat dong",
        block: false,
      };
      setList([...list, newUser]);
    }
  };

  const sua = (find: string) => {
    const index = list.findIndex(item => item.name === find);
    if (index !== -1) {
      const check = confirm(`Ban muon sua thong tin ${list[index].name}?`);
      if (check) {
        const name = prompt("new name:", list[index].name);
        const date = prompt("new date:", list[index].date);
        let email = prompt("new email:", list[index].email);
        const address = prompt("new address:", list[index].address);

        while (email && !validateEmail(email)) {
          email = prompt("email cho đúng vào :", list[index].email);
        }

        if (name && date && email && address) {
          const updatedUser: User = {
            ...list[index],
            name,
            date,
            email,
            address,
          };
          const updatedList = list.map((item, idx) => idx === index ? updatedUser : item);
          setList(updatedList);
        }
      }
    }
  };

  const find = () => {
    const emailInput = (document.getElementById("find") as HTMLInputElement).value;
    const foundUser = list.find(user => user.email === emailInput);
    setSearchResult(foundUser || null);
  };

  const chan = (index: number) => {
    const updatedList = list.map((user, idx) => 
      idx === index ? { ...user, block: !user.block, show: user.block ? "Dang hoat dong" : "Bi chan" } : user
    );
    setList(updatedList);
  };

  const deleteUser = (index: number) => {
    const updatedList = list.filter((_, idx) => idx !== index);
    setList(updatedList);
  };

  return (
    <div className="app-container">
      <h5>Employees:</h5>
      <button className="add-button" onClick={add}>Add Employee</button>
      {list.map((user, index) => (
        <div key={index} className='nhap'>
          <p>Name: {user.name}</p>
          <p>Date: {user.date}</p>
          <p>Email: {user.email}</p>
          <p>Show: {user.show}</p>
          <p>Address: {user.address}</p>
          <div className="button-group">
            <button onClick={() => chan(index)} className={`block-button ${user.block ? 'blocked' : 'unblocked'}`}>
              {user.block ? "Unblock" : "Block"}
            </button>
            <button onClick={() => sua(user.name)} className="change-button">Change</button>
            <button onClick={() => deleteUser(index)} className="delete-button">Delete</button>
          </div>
        </div>
      ))}
      <div className="search-container">
        <input type="text" id="find" placeholder="nhap email muon tim:" />
        <button onClick={find}>Find</button>
        {searchResult && (
          <div className="search-result">
            <h5>Search Result:</h5>
            <p>Name: {searchResult.name}</p>
            <p>Date: {searchResult.date}</p>
            <p>Email: {searchResult.email}</p>
            <p>Show: {searchResult.show}</p>
            <p>Address: {searchResult.address}</p>
          </div>
        )}
      </div>
    </div>
  );
}

