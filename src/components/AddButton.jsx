import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AddButton() {
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState({ name: '', password: '' });

  const biodata = [
    { id: 0, name: 'Vidit', age: 21 },
    { id: 1, name: 'Vidit', age: 21 },
    { id: 2, name: 'Vidit', age: 21 }
  ];

  const handleDecClick = () => {
    if (count !== 0) {
      setCount(count - 1);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted successfully!!!!');
    setFormData({ name: '', password: '' });
  };

  return (
    <>
      <div className="container-fluid">
        <p className="text-center">AddButton</p>
        <form action="" className="card m-5 p-3 text-center" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              placeholder="Name"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              placeholder="Password"
              required
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>

      {/* {console.log(biodata.size())} */}
      {
  biodata.map((curelem) => {
    return (
      <div className="div" key={curelem.id}>
        {curelem.id} - {curelem.name}
      </div>
    );
  })
}

      <button className="btn" onClick={() => setCount(count + 1)}>
        Increase Count
      </button>
      <button className="btn" onClick={handleDecClick}>
        Decrease Count
      </button>
      <p>Count: {count}</p>
    </>
  );
}
