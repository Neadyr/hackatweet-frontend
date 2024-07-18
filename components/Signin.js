import { useState } from "react";
import { useDispatch } from "react-redux";

import { useRouter } from "next/router";
import { login } from "../reducers/users";

import { Button, Modal } from "antd";

function Signin() {
    const router = useRouter();

    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [signInUsername, setSignInUsername] = useState("");
    const [signInPassword, setSignInPassword] = useState("");

    const [error, setError] = useState(null);

    console.log(signInUsername);
    console.log(signInPassword);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleConnection = () => {
        fetch("http://localhost:3000/users/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: signInUsername,
                password: signInPassword,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.result) {
                    dispatch(
                        login({ token: data.token, username: signInUsername })
                    );
                    router.push("/tweet");
                } else {
                    setError(data.error);
                }
            });
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Sign in
            </Button>

            <Modal
                title="Basic Modal"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                {error ? <p style={{ color: "red" }}>{error}</p> : null}

                <input
                    type="text"
                    onChange={(e) => setSignInUsername(e.target.value)}
                    value={signInUsername}
                />
                <input
                    type="password"
                    onChange={(e) => setSignInPassword(e.target.value)}
                    value={signInPassword}
                />
                <button onClick={() => handleConnection()}>Sign in</button>
            </Modal>
        </>
    );
}
export default Signin;
