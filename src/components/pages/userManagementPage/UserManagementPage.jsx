import React from "react";
import NavigationBar from "../../layout/navigationbar/NavigationBar.jsx";
import NewAccountForm from "../../forms/newAccountForm/NewAccountForm.jsx";

function UserManagementPage() {
    return (
        <>
            <header>
                <NavigationBar />
            </header>

            <main>
                <section>
                    <NewAccountForm
                        endpoint="http://localhost:8080/users/admin"
                        title="Nieuw admin account aanmaken"
                    />
                </section>
            </main>
        </>
    );
}

export default UserManagementPage;
