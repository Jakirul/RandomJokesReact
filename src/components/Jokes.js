import React, {useState} from 'react'
import axios from 'axios'
import './Jokes.css'

const Jokes = () => {

    const [jokes, setJokes] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);

    const onTitleClick = (index) => {
        setActiveIndex(index)
    };

    const jokesArray = async () => {
        const joke = await axios.get('https://official-joke-api.appspot.com/random_joke');
        // pushes a new joke to the end of the jokes array
        setJokes(jokes => [...jokes, joke.data]) 
    }
   
    const joke1 = jokes.map((joke, index) => {
        const active = index == activeIndex ? 'active' : '';

        return (
            <React.Fragment key={index}>
                <div 
                    className={`title ${active}`}
                    onClick={() => onTitleClick(index)}>
                    <i className="dropdown icon"></i>
                    {joke.setup}
                </div>
                <div className={`content ${active}`}>
                    <p>{joke.punchline}</p>
                </div>
            </React.Fragment>
        );
    })

    return (
        <div className="app">
            
            <h1>Joke Generator - React JS</h1>

            <form onSubmit={(e) => jokesArray(e.preventDefault())}>
                <button className="positive ui button">New Joke</button>
            </form>
            
            <div className="inner ui styled accordion" style={{marginTop: '10px'}}>
                {joke1}
            </div>
           
        </div>
    )
}

export default Jokes
