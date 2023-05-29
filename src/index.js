import React, { useState } from "react"
import ReactDOM from "react-dom"

//In this project, we will use an input's value to search for users in GitHub using their username or email.

//const API_URL = "https://api.github.com";


// API call
// async function fetchResults(query) {
//     try {
//       const response = await fetch(`${API_URL}/search/users?q=${query}`);
//       const json = await response.json();
//       return json.items || [];
//     } catch (e) {
//       throw new Error(e);
//     }
//   }



// How to build it
// You will first store the value typed into the input in a 
// state value called query. After that, you will perform an 
// HTTP request to a GitHub API endpoint to then fetch the users'
// profile which once again uses the browser fetch API. 
// The request URL will use the input value.
// Once the results are fetched, we'll see how to display
// all the relevant info such as their name, avatar, and a link to go to their profile.

// A good way to extend this project would be to attempt to 
// allow search functionality as the user types instead of having to submit the form first.
//  Make sure to use a debounce function to ensure 
//  that you do not too many requests to the GitHub API and get a 429 error response (too many requests).


const GithubSearch = () => {




    const API_URL = "https://api.github.com";

    const [results, setResults] = useState([])
    const [x, setIt] = useState(0)

    async function fetchDetails(event){
        event.preventDefault();
        const details = event.target.input.value
        const SEARCH_URL = `${API_URL}/search/users?q=${details}`
    

        try {
              const response = await fetch(SEARCH_URL);
              const json = await response.json();
            
              
            //we will use the map here to display the results
            // console.log(json.items[0])
            //putting all the values into the array 
            setResults(json.items)
            // console.log(results)

        
            } 
            catch (e) {
              throw new Error(e);
            }

        
          

    }

    function temp() {
        setIt(1)
    }

    return (
        <div>
            <h1>Project 5: GitHub User Search</h1>
            <form onSubmit={fetchDetails}>
        
                <input type="text" name="input" required placeholder="Enter username..." />
                <button type="submit" onClick={temp}>Search</button>
            </form>

            {(results.length === 0 && x===1) ? 

            (
                <div>
                    <h2> Results: </h2>

                    <p>No Results found!</p>
                    <img src="https://st2.depositphotos.com/1967477/7519/v/950/depositphotos_75191371-stock-illustration-cartoon-dislike-smile-emoticon.jpg" alt="No result"></img>
                    </div>
            ) :

            (
                <div>
                    <h2>Results: </h2>

                    {/* we will use the map for the same */}
                    {results.map((users) => (
                        <div key={users.id}>
                            <a href={users.html_url}>{users.login}</a>
                            <br />
                            <img className="userimage" src={users.avatar_url} alt="User Avatar" />
                            <hr />
                        </div>
                    ))}
                </div>



            ) 
            
            }

        </div>
    );

};


ReactDOM.render(<GithubSearch />, document.getElementById("root"));


// debounce time:  4000ms when greater than 3 characters are entered 
//always check for the null objects in js 