import { Navigate, Outlet } from "react-router";
import { ToastContainer, Bounce } from "react-toastify";
import { Heading, Footer } from "../components";
import { useAuth } from "../context";

const ProtectedLayout = () => {
  const { isLogIn } = useAuth();
  if (!isLogIn) {
    return <Navigate to="/signin" replace />;
  }
  return (
    <>
      <div>
        <Heading />
        <ToastContainer
          className="mt-16 text-lg"
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          limit={2}
          transition={Bounce}
        />
      </div>
      <main className=" w-full mx-auto p-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default ProtectedLayout;
