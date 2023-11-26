import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "./components/core/Authenticator";
import LinkProvider from "./providers/linksProvider";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/core/Layout";
import routes from "./routes";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: routes
  }
])

function App() {
  return (
    <Authenticator>
      <LinkProvider>
        <RouterProvider router={router} />
      </LinkProvider>
    </Authenticator>
  );
}

export default App;
