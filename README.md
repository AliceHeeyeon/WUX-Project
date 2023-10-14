# Class Projects App - WUX PROJECT :computer: :man_student:

### :writing_hand: This application provides a streamlined solution for accessing, organizing, and managing student projects. Its key features include:

-User Authentication: Secure sign-up and login system to ensure authorized access.\*

_-Project Showcase: Intuitive interface for presenting a variety of class web projects._

_-Efficient Search: Search bar for quick identification of specific projects._

_-Smart Filters: Sort projects by usernames for personal views or display all projects._

_-Users can add, edit, or delete projects as needed._

### This project focuses on creating a backend and frontend.

## Backend Summary of the WUX PROJECT, including the components and packages used:

1. **Express js Server Setup.**

- utilized Express js for building the backend server).
- Nodemon integration for automatic server restarts.

2. **MongoDB Integration:**

- connection to [MongoDB](https://www.mongodb.com) for data storage.
- utilized Mongoose to define schemas and models.

3. **Routes and Controllers:**

- Defined API endpoints in routes.
- Created controller functions in controllers to handle API requests.

4. **Testing with [Postman](https://www.postman.com/).**

5. **Utilized the "multer" package for handling file uploads.**

## Frontend Summary of the WUX PROJECT

### npm packages

**react-router-dom**

_Provides routing capabilities for React applications, allowing navigation between different components and pages._

**react**

_The core library for building user interfaces in React applications. React allows developers to create reusable UI components and manage the state of these components efficiently._

**react-loader-spinner**

_This package is used to show a loading spinner while waiting for data to be fetched from the server or during operations._

**axios**

_It is used to send HTTP requests to fetch data from the server, for example, news articles, to display on the app._

**Date-fns**

_It is a JavaScript library for formatting and manipulating dates._

**react-cions**

_React Icons is a popular library that provides a collection of customizable, SVG-based icons for use in React applications._

**Swal (sweetalert2)**

_The npm package sweetalert2 is a popular library for creating customizable and stylish alert and modal dialogs in web applications._

## :dizzy: The dynamic api call with code snippet and explanation how these work in the app.

_Example with the Search bar_

**A search input element is provided where users can type in keywords to search for projects.
The value of the input is controlled by the searchTerm state.
The onChange event handler handleSearchTermChange is triggered whenever the user types, updating the searchTerm state accordingly.**

```javascript
import React, { useState } from "react";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="home">
      <div className="settings-filters">
        {/* ... other filter options ... */}

        <form id="search-bar">
          <input
            type="text"
            placeholder="Search by keyword"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <button id="search-bar-btn">Search</button>
        </form>
      </div>
      {/* Other rendering and project mapping */}
    </div>
  );
};

export default Home;
```

**The dynamic API call is made using the Axios library and the useEffect hook.**

```javascript
useEffect(() => {
  const fetchProjects = async () => {
    try {
      // axios call
      const response = await axios.get("http://localhost:4000/api/projects");

      if (response.status === 200) {
        //setProjects(response.data)
        dispatch({ type: "SET_PROJECTS", payload: response.data });
        console.log(response.data);

        const uniqueUserUsernames = [
          ...new Set(response.data.map((project) => project.user_id)),
        ];
        setUserUsernames(uniqueUserUsernames);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };
  fetchProjects();
}, [dispatch]);
```

**The useEffect hook is used to fetch project data when the component mounts ([] as the dependency array means it runs once).
Inside the effect, an asynchronous function fetchProjects is defined.
The axios.get method fetches project data from 'http://localhost:4000/api/projects'.
If the response status is 200 (OK), the fetched data is dispatched to the context's state using dispatch.
Unique user usernames are extracted from the fetched data and stored in the userUsernames state.
If an error occurs during the API call, it's logged to the console.
The dynamic API call fetches and updates project data, enabling the app to display and interact with this data dynamically.**

### WUX PROJECT Mockups

![desktop mockup](./frontend/public/readme/mockup-wuxproject.png)
![desktop main](./frontend/public/readme/desktop-main.png)
![desktop details](./frontend/public/readme/desktop-details.png)
![project tablet](./frontend/public/readme/tablet-wux.png)
![project mobile](./frontend/public/readme/mobile-wux.png)

**For our project, we utilize various tools such as VS Code, Terminal, Figma, and Chrome Dev.**

_VS Code (Visual Studio Code) provides extensible platform for writing and editing code._

_Terminal allows user to execute commands and navigate through the file system using text-based commands._

_Figma provides a wide range of design and prototyping features, enabling designers to create their designs seamlessly. Figma allowed us to create mockups for our project._

_Chrome DevTools allows us to inspect and debug web app, modify styles in real-time, and troubleshoot our web application._

### Developed by Yoobee College students Alice Kim, Maria Stromova, Ryan Gudsell, and Yasser Saeed.
