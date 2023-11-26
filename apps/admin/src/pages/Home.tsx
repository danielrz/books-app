import useUserDetails from "../hooks/useUserDetails";
import { Button } from "@mui/material";

function Home() {

  const { userDetails, signOut } = useUserDetails();

  return (
    <>
      <h1>My Books App</h1>
      <div>Welcome</div>
      <div>{userDetails?.email}</div>
      <div>{userDetails?.firstName}</div>
      <div>{userDetails?.lastName}</div>
      <div>
        <Button variant="contained" color="primary" onClick={() => signOut()}>
          Sign Out
        </Button>
      </div>
    </>
  )
}

export default Home