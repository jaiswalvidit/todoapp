import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../App.css";
import "./Todo.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getLocalItems = () => {
  let list = localStorage.getItem("lists");
  console.log(JSON.parse(list));
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

const Todo = () => {
  const [data, setData] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [toggle, setToggle] = useState(true);
  const [editItemId, setEditItemId] = useState(null);

  const addItem = () => {
    if (!data) {
      toast.error("Enter the field data!!!");
    } else if (data && !toggle) {
      setItems(
        items.map((elem) =>
          elem.id === editItemId ? { ...elem, name: data } : elem
        )
      );
      setToggle(true);
      setData("");
      setEditItemId(null);
      toast.success("Item updated successfully");
    } else {
      const adddata = {
        id: new Date().getTime().toString(),
        name: data,
      };
      setItems([...items, adddata]);
      setData("");
      toast.success("Item added successfully");
    }
  };

  const deleteItem = (id) => {
    const updatedList = items.filter((elem) => id !== elem.id);
    setItems(updatedList);
    toast.success("Item deleted successfully");
  };

  const deleteAll = () => {
    setItems([]);
    localStorage.removeItem("lists");
  };

  const editItem = (id) => {
    let newData = items.find((elem) => elem.id === id);
    setToggle(false);
    setData(newData.name);
    setEditItemId(id);
  };

  const updateLocalStorage = (updatedItems) => {
    localStorage.setItem("lists", JSON.stringify(updatedItems));
  };

  useEffect(() => {
    updateLocalStorage(items);
  }, [items]);

  return (
    <>
      <div className="container mt-5 border-radius-10 max-width-600 mx-auto">
        <div className="card bg-danger text-light text-center">
          <div className="card-body">
            <h1 className="card-title fs-1 text-info text-center  my-3">Todo List</h1>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Write your task here"
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
              <div className="input-group-append justify-content-center">
                <button
                  className={`btn ${
                    toggle ? "btn-info" : "btn-warning"
                  } fs-3 text-light`}
                  onClick={addItem}
                >
                  {toggle ? "Add" : "Update"}
                </button>
              </div>
            </div>
            <div className="list-group">
              {Array.isArray(items) &&
                items.map((elem) => (
                  <div
                    key={elem.id}
                    className="list-group-item fs-4 d-flex justify-content-between align-items-center"
                  >
                    {elem.name}
                    <div>
                      <i
                        className="fas fa-edit mx-4 text-info"
                        title="Edit Item"
                        onClick={() => editItem(elem.id)}
                      ></i>
                      <i
                        className="fas fa-trash-alt text-danger"
                        title="Delete Item"
                        onClick={() => deleteItem(elem.id)}
                      ></i>
                    </div>
                  </div>
                ))}
            </div>
            {items.length > 0 && (
              <button className="btn btn-primary mt-3" onClick={deleteAll}>
                Delete All
              </button>
            )}
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </>
  );
};

export default Todo;
