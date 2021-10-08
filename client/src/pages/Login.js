export default function Start() {
  function handleOnClick() {
    fetch("/google")
      .then(() => {
        console.log("HEY");
      })
      .then(() => {
        console.log("SUCCESS");
      })
      .catch(() => {
        console.log("THATS A HUGE ERROROA");
      });
  }
  return (
    <div>
      <nav>
        <ul>
          <li>
            <a href="/auth/logout">Login</a>
            <a href="/auth/login">Logout</a>
            <a href="/">Logout</a>
          </li>
        </ul>
      </nav>
      <h2>haha</h2>
      <button onClick={handleOnClick}>GOOGLE</button>
    </div>
  );
}
