import { Outlet } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";
import Header from "./Header";
import Loader from "./Loader";
import { Suspense } from "react";

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}
