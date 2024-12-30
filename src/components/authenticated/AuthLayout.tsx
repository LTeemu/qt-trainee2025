import { Outlet } from 'react-router-dom';
import Header from './AuthHeader';
import Footer from './AuthFooter';
import AuthSidebar from './AuthSidebar';
const AuthLayout = () => {
  return (
    <div className="flex flex-1 flex-col min-h-[100dvh] overflow-hidden">
      <Header />

      <main className="flex-col pb-4 flex flex-1 pt-10 sm:px-8 px-4 sm:flex-row">
        <AuthSidebar />

        <div className="p-0 flex flex-1 mt-6 sm:mt-0">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AuthLayout;
