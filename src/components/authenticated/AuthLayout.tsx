import { Outlet } from "react-router-dom";
import Header from "./AuthHeader";
import Footer from "./AuthFooter";
import AuthSidebar from "./AuthSidebar";
const AuthLayout = () => {
  return (
    <div className="flex flex-1 flex-col min-h-[100dvh] overflow-hidden">
      <Header />

      <main className="flex-col pb-4 flex flex-1 pt-10 px-8 sm:flex-row">
        <AuthSidebar />

        <div className="p-2 flex flex-1">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AuthLayout;
