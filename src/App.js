import { Form } from "./components/Form";

function App() {

  return (
    <div className="wrapper">
      <h3>My Todo List App</h3>
      <div className="form-and-todo-box">
        <Form/>
        <div style={{display:'flex',justifyContent:'flex-end'}}>
                  <button id="empty">
                      Empty Todo
                  </button>
                </div>
      </div>
    </div>
  );
}

export default App;