import { useState } from "react";
import { useDispatch } from "react-redux";

import { useRouter } from "next/router";
import { login } from "../reducers/users";
import { Button, Modal } from "antd";

function SignUp() {
    const router = useRouter();

    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [signUpFirstName, setSignUpFirstName] = useState("");
    const [signUpUsername, setSignUpUsername] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");
    const [error, setError] = useState(null);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleRegister = () => {
        fetch("http://localhost:3000/users/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstname: signUpFirstName,
                username: signUpUsername,
                password: signUpPassword,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.result) {
                    dispatch(
                        login({ token: data.token, username: signUpUsername })
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
                Sign up
            </Button>

            <Modal
                title="Create your Hackatweet account"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                {error ? <p style={{ color: "red" }}>{error}</p> : null}

                <input
                    type="text"
                    placeholder="Firstname"
                    onChange={(e) => setSignUpFirstName(e.target.value)}
                    value={signUpFirstName}
                />
                <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setSignUpUsername(e.target.value)}
                    value={signUpUsername}
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    value={signUpPassword}
                />

                <button onClick={() => handleRegister()}>Sign up</button>
            </Modal>
        </>
    );
}
export default SignUp;
