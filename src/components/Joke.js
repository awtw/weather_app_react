import React from 'react'

const Joke = props => (

    <div className="joke">
        <h5>Cheer ! Have a Joke !</h5>
        <h3 className="jokeTitle">{props.Joketitle}</h3>
        <h3 className="jokeAns">{props.JokeAns}</h3>
    </div>
)



export default Joke