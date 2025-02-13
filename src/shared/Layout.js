import { Footer } from "../components/Footer";
import Header from "../components/Header";

export const Layout = ({ children }) => {
    return (
        <div className="h-screen">
            <Header />
            <div className="mx-auto mt-10 max-w-7xl">{children}</div>
            {/* <Footer /> */}
        </div>
    );
};
