import React, { useEffect, useState } from "react";
import "./style.css";
import { BiPlusMedical } from "react-icons/bi";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";

const getLocalData = () => {
  const lists = localStorage.getItem("myTodoApp");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [item, setItem] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);
  const addItem = () => {
    if (!inputData) {
      alert("plz fill the data");
    } else if (inputData && toggleButton) {
      setItem(
        item.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );
      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const newItem = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItem([...item, newItem]);
      setInputData("");
    }
  };

  const deleteItem = (index) => {
    const updateList = item.filter((elem) => {
      return elem.id !== index;
    });
    setItem(updateList);
  };

  const editItem = (index) => {
    const setEditData = item.find((elem) => {
      return elem.id === index;
    });
    setInputData(setEditData.name);
    setIsEditItem(index);
    setToggleButton(true);
  };
  const removeAll = () => {
    setItem([]);
    setInputData("");
  };

  useEffect(() => {
    localStorage.setItem("myTodoApp", JSON.stringify(item));
  }, [item]);

  return (
    <>
      <h2>add your list here 😎 </h2>
      <input
        type="text"
        placeholder="✍Add item"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      />
      {toggleButton ? (
        <button className="plus-btn">
          <AiTwotoneEdit onClick={addItem} />
        </button>
      ) : (
        <button className="plus-btn">
          <BiPlusMedical onClick={addItem} />
        </button>
      )}
      <div className="flex-container">
        {item.map((elem, index) => {
          return (
            <>
              <div className="show-items">
                <h4>{elem.name}</h4>
                <div className="todo-btn" key={index}>
                  <button>
                    <AiTwotoneEdit onClick={() => editItem(elem.id)} />
                  </button>
                  <button>
                    <AiFillDelete onClick={() => deleteItem(elem.id)} />
                  </button>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <button className="remove-btn" onClick={removeAll}>
        Remove All
      </button>
    </>
  );
};

export default Todo;



