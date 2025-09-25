import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, addTodo, deleteTodo, updateTodo } from "./redux/todoSlice";
import './App.css'

function App() {
  const [userInput, setUserInput] = useState({ name: "", completed: false });
  const dispatch = useDispatch();
  const { list: task, loading, error } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAdd = () => {
    if (userInput.name.trim() !== "") {
      dispatch(addTodo(userInput));
      setUserInput({ name: "", completed: false });
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleUpdate = (item, completedValue) => {
    dispatch(updateTodo({ id: item.id, updatedTask: { ...item.userInput, completed: completedValue } }));
  };

  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <h1 className="text-center text-primary">Todo App (Redux)</h1>

      <div className="d-flex">
        <input
          type="text"
          value={userInput.name}
          onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
          className="form-control"
        />
        <button className="btn btn-primary ms-5" onClick={handleAdd}>
          ADD
        </button>
      </div>

      {loading && <p className="text-center mt-3">Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="card" style={{ width: "500px", height: "auto" }}>
          {task?.length > 0 ? (
            task.map((item) => (
              <div key={item.id} className="card-body">
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <h5 className="card-text">
                      <input
                        type="checkbox"
                        checked={item.userInput.completed}
                        onChange={(e) => handleUpdate(item, e.target.checked)}
                      />
                    </h5>
                    {item.userInput.completed ? (
                      <h5 className="card-title">
                        <del>Task: {item.userInput.name}</del>
                      </h5>
                    ) : (
                      <h5 className="card-title">Task: {item.userInput.name}</h5>
                    )}
                  </div>
                  <h5>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleDelete(item.id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </h5>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No tasks todo</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
