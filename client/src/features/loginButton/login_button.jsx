import { useAuth } from "../../features/auth/AuthContext"; 
// AuthContext maintains whether or not the user had been logged in  

function LoginButton() {
    const { loggedIn, setLoggedIn } = useAuth();
    
  return (
    <>
            {loggedIn ? (
            <button onClick={() => {
            localStorage.removeItem("token");
            setLoggedIn(false);
            }}>
            Logout
            </button>
        ) : (
            <a href="/login">Login</a>
        )}
    </>

  );
}
export default LoginButton; 












