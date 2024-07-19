import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function CreateTweet(props) {
    const user = useSelector((state) => state.user.value.token);
    const [createTweet, setCreateTweet] = useState("");
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    let lengthTweet = createTweet.length;

    function handleSumbitClick() {
        fetch(`http://localhost:3000/tweets/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: user,
                tweet: createTweet,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.result) {
                    setMessage(data.message);
                    setCreateTweet("");
                    props.changeState();
                } else {
                    setError(data.error);
                }
            });
    }

    return (
        <div>
            {error ? <p style={{ color: "red" }}>{error}</p> : null}
            {message ? <p style={{ color: "green" }}>{message}</p> : null}
            <input
                type="text"
                onChange={(e) => setCreateTweet(e.target.value)}
                value={createTweet}
                placeholder="What's up?"
            />
            <p>{lengthTweet} / 280</p>
            <button onClick={() => handleSumbitClick()}>Tweet</button>
        </div>
    );
}

export default CreateTweet;
