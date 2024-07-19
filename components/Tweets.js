import Tweet from "./Tweet";
import CreateTweet from "./CreateTweet";
import { useState, useEffect } from "react";

const Tweets = () => {
    const [dataTweets, setDataTweets] = useState([]);
    const [message, setMessage] = useState(null);
    const [change, setChange] = useState(true);

    if (change) {
        changeState();
        setChange(false);
    }

    function changeState() {
        fetch("http://localhost:3000/tweets")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.result) {
                    setDataTweets(data.properData);
                } else {
                    setMessage(data.message);
                }
            });
    }

    const tweets = dataTweets.map((data, i) => {
        return (
            <Tweet
                key={i}
                firstName={data.firstName}
                userName={data.userName}
                creationDate={data.creationDate}
                tweet={data.tweet}
                likes={data.like}
                changeState={changeState}
            />
        );
    });

    return (
        <div>
            <section>
                <CreateTweet />
            </section>
            <section>
                {message ? <p>{message}</p> : null}
                {tweets}
            </section>
        </div>
    );
};

export default Tweets;
