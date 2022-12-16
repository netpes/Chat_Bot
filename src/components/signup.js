import "./signup.css";

export default function Signup() {
  return (
    <div className={"div_form"}>
      <form
        className={"modal-content animate"}
        method={"post"}
        action={"http://localhost:2000/signup"}
      >
        <div className="container">
          <label>Name:</label>
          <input type={"text"} name={"name"} />
          <label>Password:</label>
          <input type={"password"} name={"password"} />
          <label>Email:</label>
          <input type={"email"} name={"email"} />
          <button type={"Submit"}>Signup</button>
        </div>
      </form>
    </div>
  );
}
