import React, { useState, useEffect } from "react";

import LiningImage from "../assets/straight-line.png";
import ClickableIcon from "../assets/clickable-icon.png";

import "./Advice.css";

function Advice() {
  // State to store advice data
  const [adviceData, setAdviceData] = useState({ id: "", advice: "" });

  // Function to fetch advice from the API
  const fetchAdvice = async () => {
    try {
      // Sending a GET request to the advice API
      const response = await fetch("https://api.adviceslip.com/advice");

      // Checking if the response is successful (status code 200)
      if (!response.ok) {
        throw new Error("Failed To Fetch Advice");
      }
      const data = await response.json(); // Parsing the JSON response
      setAdviceData({ id: data.slip.id, advice: data.slip.advice }); //Updating the adviceData state with fetched advice

      // Handling errors, if any occur during the fetc
    } catch (error) {
      console.error("Error fetching advice:", error);
    }
  };
  // Fetch advice when the component mounts
  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="centered-container">
      <main>
        <div className="advice-generator">
          {adviceData && (
            <div>
              <h2>ADVICE #{adviceData.id}</h2>
              <p>{adviceData.advice}</p>
            </div>
          )}
          <img className="line" src={LiningImage} alt="lining" />
          <img
            className="click"
            src={ClickableIcon}
            alt="icon"
            onClick={fetchAdvice}
          />
        </div>
      </main>
    </div>
  );
}

export default Advice;

/* Explanation:
  
  We import the necessary dependencies, including React, and two images
  , LiningImage and ClickableIcon, used later in the component.
  
  The Advice component is defined as a functional component.
  
  Inside the component, we declare a state variable adviceData 
  using the useState hook to manage the advice data fetched from the API.
   It's initialized as an empty object { id: "", advice: "" }.
  
  The fetchAdvice function is defined as an asynchronous function. 
  It uses the fetch API to make a GET request to the "https://api.adviceslip.com/advice" endpoint. 
  It checks if the response is OK (status code 200), parses the JSON response, 
  and updates the adviceData state with the fetched advice ID and text. 
  If an error occurs during the fetch, it's caught and logged.
  
  We use the useEffect hook to call the fetchAdvice function when the component mounts. 
  This ensures that advice is fetched once when the component is first rendered.
  
  In the component's JSX (return statement), there's a div element with the class "centered-container,
  " which centers its contents both horizontally and vertically on the page.
  
  Inside this div, there's a main element and a div element with the class "advice-generator."
   These elements structure the layout of the advice content.
  
  Within the "advice-generator" div, we conditionally render advice content.
   If adviceData has a value (i.e., advice has been fetched), 
   it displays the advice ID and text within a div.
  
  Two img elements are also present within the "advice-generator" div. 
  The first one (className="line") displays the "straight-line.png"
   image as a visual element, and the second one (className="click") 
  displays the "clickable-icon.png" image, which serves as an interactive element. 
  The onClick event handler is set on the clickable icon to trigger the fetchAdvice function when clicked. 
  */
