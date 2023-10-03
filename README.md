# CausalFunnel Full Stack Developer Assignment: Simple Quiz Application

## Overview

Welcome to my submission for the CausalFunnel Full Stack Developer Intern position. I have created a Simple Quiz Application based on the provided requirements. This application is designed to showcase my full-stack development skills, attention to detail, and commitment to delivering quality work.

## Application Features

### Quiz Layout & Flow

1. **Start Page:** Users begin by submitting their email address.

2. **Quiz Questions:** The application displays a total of 15 questions fetched from the Open Trivia Database API. A timer is shown at the top of the page, counting down from 30 minutes. The quiz will auto-submit when the timer reaches zero.

### Navigation

3. **Question Navigation:** Users can easily navigate to a specific question using intuitive controls.

4. **Overview Panel:** An overview panel provides a summary of the quiz progress, indicating:
   - Which questions the user has visited.
   - Which questions have been attempted.

### End of Quiz

5. **Report Page:** After completing the quiz or when the timer expires, users are directed to a report page. This report displays each question alongside the user's answer and the correct answer, making it easy to compare.


## Tech Stack & Packages Used

- **React.js:** A powerful JavaScript library for building interactive user interfaces.
- **Vite:** A fast and efficient build tool that serves as the development environment for this project. 

- **Tailwind CSS:** A utility-first CSS framework that simplifies the styling process and ensures consistent design across the application. 

- **Axios:** A promise-based HTTP client for making API requests.

- **React Router DOM:** A library for handling routing in single-page applications.

- **React Slick and Slick Carousel:** React Slick (v0.29.0) is used to create a smooth and interactive question carousel. 

- **React Countdown and React Countdown Circle Timer:** These libraries (v2.3.5 and v3.2.1, respectively) are used to implement the countdown timer, ensuring users are aware of the time remaining during the quiz.

- **React Icons:** A library that provides a wide selection of icons for use in the user interface. 

## Assumptions

I have made the following assumptions while developing this application:

- Users have access to modern web browsers.
- User email addresses will be submitted but not stored or used for any purpose beyond this assignment.
- There is no negative marking scheme

## Challenges Faced

During the development process, I encountered several challenges and addressed them effectively:

- **API Integration:** When fetching quiz questions from an external API, there were challenges in dealing with asynchronous operations and decoding HTML Unicode in the fetched data. <br />
 **Solution:**  To overcome this, I used React's state for efficient state management and integrated the ```he``` package from npm to decode HTML Unicode, ensuring the data's correctness.

- **Responsive Design:** Achieving a seamless user experience on various devices demanded careful styling and responsive design techniques.
  **Solution:**  To address this, I implemented a toggle feature that minimizes the navigation panel for mobile screens, significantly improving the application's responsiveness and user-friendliness..

- **State Management:** Managing the application's state, including user data, quiz progress, and timers, was achieved using React's state and context API.<br/>
**Solution:** I used React's built-in tools to manage the app's data and made sure everything worked smoothly. This made it easier to handle the app's functions and data, and it helped things run more efficiently.
  
## Bonus 

While implementing the core requirements, I have also incorporated additional features to enhance the user experience:

- **Responsive Design:** The application is fully responsive and compatible with the latest versions of major browsers, including Chrome, Firefox, Safari, and Edge.

- **Smooth Transitions:** I have added smooth transitions and animations when navigating between questions to improve the overall user experience.

## Project Setup

To run this project locally, you will need Node.js and npm (Node Package Manager) installed on your computer. Follow these steps:

- Clone the repository: <br />
   ``` git clone https://github.com/omkar-here/Quiz-App.git```
- Install dependencies: <br />
      ``` npm install``` or ```npm i ```
- Navigate to Quiz-App Folder <br />
    ```cd '.\Quiz App\'```
- Start the development server: <br/>
```npm run dev```
- Go this URL to see the running site <br />
```https://localhost:5173/```

## Submission

I have hosted the application on [Netlify](https://www.netlify.com/) for easy access. You can find the live application [here](https://causalfunnel-quiz-app.netlify.app/).

The source code is available in this [GitHub repository](https://github.com/omkar-here/Quiz-App).

Feel free to explore and interact with the quiz application, and I look forward to discussing it further in the next steps of the evaluation process.

Thank you for considering my application.

Best regards,<br />
<strong>Omkar Anabathula</strong>

