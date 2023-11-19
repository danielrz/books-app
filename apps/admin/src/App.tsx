import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "./components/core/Authenticator";
import { Button } from "@mui/material";
import Header from "./components/core/Header";
import useUserDetails from "./hooks/useUserDetails";
import LinkProvider from "./providers/linksProvider";

function App() {
  const { userDetails, signOut } = useUserDetails();

  return (
    <Authenticator>
      <LinkProvider>
        <>
          <Header />
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
      </LinkProvider>
    </Authenticator>
  );
}

export default App;
