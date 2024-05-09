import "./HomePage.css";

const HomePage = ({ users }) => {
  return (
    <>
      <h1>Our clients:</h1>
      {users.map((user) => {
        return (
          <div key={user.id} className="card">
            <img src={user.image_url} alt={user.user_name} />
            <h4>{user.user_name}</h4>
            <p>Age: {user.age}</p>
            <p>Bootcamp: {user.bootcamp}</p>
          </div>
        );
      })}
    </>
  );
};

export default HomePage;
