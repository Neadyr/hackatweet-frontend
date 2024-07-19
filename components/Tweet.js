const Tweet = (props) => {
    console.log(props);
    return (
        <article>
            <h3>
                {props.firstName}
                <span>
                    @{props.userName} - {props.creationDate}
                </span>
            </h3>
            <p>{props.tweet}</p>
            <div>{props.likes}</div>
        </article>
    );
};

export default Tweet;
