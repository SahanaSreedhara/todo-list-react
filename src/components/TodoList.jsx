import React, { useState } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';


const TodoList = () => {
  let [item, setItem] = useState({task: "", complete: false});
  let [newItem, setNewItem] = useState([]);
  const [query, setQuery] = useState("")

  let inputValue = (ev) => {
    console.log(ev.target.value);
    let value = ev.target.value;
    setItem({task: value, complete: false});
  };

  let AddItem = () => {

    if (item.task === "") {
      alert("Task not entered. Enter a task!")
    }
    else {
      setNewItem((preval) => {
        return [...preval, item];
        // creates an array with previous value and the current entered value
      });
      // to make the input field empty
      setItem({task: "",complete: false})
    }

  };

  const Li = (props) => {
    
    const Delete = () => {
      console.log("delete")
      setNewItem((preval) => {
        return preval.filter((element, index) => {
          return index !== props.id
        })
      })
    }

    const Edit = () => {

      console.log("edit")
      console.log(props.id)

      // set the input field to edit
      setItem(newItem[props.id])
      let beforeEdit = newItem.filter((reffVal, i) => {
        if (i !== props.id)
          return reffVal
      })
      setNewItem(beforeEdit)

    }

    const Done =() =>{
      let taskDone = newItem.map((reffVal, i) => {
        return  i === props.id ? { ...reffVal, complete: !reffVal.complete } : { ...reffVal };
      });
      setNewItem(taskDone);
    }

    return (
      <div className="todo-list">
        <li className={props.stat ? "strike" : ""}>
          {props.val}
        </li>
        <div>
          <button title="Task Done" onClick={Done} className="done-button"><DoneIcon /></button>
          <button title="Edit task" onClick={Edit} className="edit-button"><EditIcon /></button>
          <button title="Delete task" onClick={Delete} className="delete-button"><DeleteOutlineIcon /></button>
        </div>
      </div>
    );
  };

  return (
    <>
      <h1>To-Do List</h1>
      <div className="todo-container">
        <div className="input-container">
          <div className="input-div">
            <input
              id="myInput"
              type="text"
              placeholder="What you up to?"
              name="todo"
              onChange={inputValue}
              value={item.task}
            />
          </div>
          <div>
            <button title="Add task" onClick={AddItem} className="add-button">
              <i className="fa fa-plus"></i>
            </button>
          </div>
        </div>

        {
          (newItem.length !== 0) ? (<div className="search-container">
          <input type="text" placeholder="Search for a task..." onChange={ev => setQuery(ev.target.value)} />
        </div>) : <div></div>
        }
        
        <div className="todo-list-div">
          {
          newItem.filter(reffVal => {
            if(query === ''){
              return reffVal
            }
            else if(reffVal.task.toLowerCase().includes(query.toLowerCase())){
              return reffVal
            }
          }).map((val, i) => {
            return (
              <>
                <Li key={i} val={val.task} id={i} stat={val.complete} />
              </>
            );
          })}
        </div>
      </div>
      <footer>
        <div className="footer-container">
          <p>Made with&nbsp;
            <span>❤️</span>
            &nbsp;in India by Sahana
          </p>
        </div>
      </footer>

    </>
  );
}

export default TodoList