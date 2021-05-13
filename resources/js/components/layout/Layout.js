import React from "react";

const Layout = ({ title = "Cuppa Caffeine Tracker", className, children }) => {
    return (

        <div>
            <div className="container">
                <h1 className="display-3 mt-5">Cuppa Caffeine Tracker</h1>
            </div>
            <div className={className}>{children}</div>
            <div className="mt-3 p-2">
                <p style={{ textAlign: "center" }}>Copyright &copy; 2021</p>
            </div>
        </div>
    )
}
export default Layout;
