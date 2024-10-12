import { useContext } from "react";
import Products from "../components/Products";
import Sidebar from "../components/Sidebar";
import { userContext } from "../App";

function Home() {
  const { isUserLoggedIn } = useContext(userContext);
  // console.log(isUserLoggedIn);
  return (
    <main className="flex flex-wrap h-full gap-2">
      <Sidebar />
      <Products />
    </main>
  );
}

export default Home;
