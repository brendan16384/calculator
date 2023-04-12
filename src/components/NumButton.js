import React from "react";

function NumButton(props) {
    let n = props.num;
    return(
        <button onClick = {event => props.func(n)} type="button">
            {n}
        </button>
    );
}

export default NumButton;