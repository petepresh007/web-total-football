import { Outlet } from "react-router-dom";
import { HeaderElement } from "./header";
import { Footer } from "./footer"
export const SharedLayout = () => {
    return (
        <>
            <HeaderElement />
            <div className="container">
                <Outlet />
            </div>
            <Footer />
        </>
    )
}