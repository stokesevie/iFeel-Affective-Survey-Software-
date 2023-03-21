<!-- App Icon -->
<div align="center">
<p align="center">
    <img alt="Icon" src="src/frontend/assets/icon.png" height="200px">
    <h2>iFeel</h2>
</p>
<p align="center">
    iFeel is an application developed for the purpose of studying students affective states during CS1 labs. 
</p>
</div>

## Requirements
<table>
<tbody>
    <tr>
        <td><b>Key Dependencies - frontend</b></td>
        <td>
        <a href="https://reactnative.dev/"><img alt="ReactNative" src="https://img.shields.io/badge/-React%20Native-20232A?&logo=react&style=for-the-badge"></a>
        <a href="https://expo.dev/"><img alt="Expo" src="https://img.shields.io/badge/-Expo-000000?&logo=expo&style=for-the-badge"></a>
        <a href="https://www.javascript.com/"><img alt="JavaScript" src="https://img.shields.io/badge/-JavaScript-yellow?&logo=javascript&style=for-the-badge"></a>
        <a href="https://www.npmjs.com/"><img alt="npm" src="https://img.shields.io/badge/-npm-red?&logo=npm&style=for-the-badge"></a>
        <a href="https://jestjs.io/"><img alt="jest" src="https://img.shields.io/badge/-jest-green?&logo=jest&style=for-the-badge"></a>
    <tr>
        <td><b>Key Dependencies - backend</b></td>
        <td>
        <a href="https://www.django-rest-framework.org/"><img alt="rest" src="https://img.shields.io/badge/-django_rest-red?&logo=django&style=for-the-badge"></a>
        <a href="https://www.djangoproject.com/"><img alt="django" src="https://img.shields.io/badge/-django-black?&logo=django&style=for-the-badge"></a>
        <a href="https://jwt.io/introduction/"><img alt="JSON Web Tokens" src="https://img.shields.io/badge/-JSON_Web_Tokens-black?&logo=JSON_Web_Tokens&style=for-the-badge"></a>
</tbody>
</table>

The project is developed using a django backend and react native js frontend. For steps detailing installation see below.

## Installation
- Navigate to source folder with 'cd src'
- Backend
    - Navigate to backend directory with 'cd backend '
    - To set up the backend development run 
        - 'python -m pip install --upgrade pip'
        - 'pip install -r requirements.txt'
    - To work on the development database locally, run 
        - 'python manage.py runserver'
- Frontend
    - Navigate to frontend directory with 'cd frontend '
    - To set up frontend development server, run
        - 'npm i '
        - 'npm start'

## Usage
- Once the app is running with the default data, you can log in with the following credentials 
    - Student: `1234567s` password: `testpassword`
    - Tutor: `1234567t` password: `testpassword`
- See `requirements/UserGuide.pdf` for a comprehensive user guide. 

## Code


- [`.`](#) Root of the repository
- [`.github/workflows`](/.github/workflows/) GitHub actions
- [`/dissertation`](/dissertation/) contains dissertation files
- [`src`](/src/) Contains source code, config files and package files for the app
- [`src/frontend`](/src/frontend/) Contains the front end code for the app
    - [`src/frontend/assets`](/src/frontend/assets/) Contains the assets used in the app
    - [`src/frontend/components`](/src/frontend/components/) Contains the code for components used in the app
    - [`src/frontend/screens`](/src/frontend/screens/) Contains the code for the screens of the app
- [`src/backend`](/src/backend/) Contains the back end code for the app
    - [`src/backend/assets`](/src/backend/db/) Contains the models for the data and tests
    - [`src/backend/components`](/src/backend/backend/) Contains the url API endpoints for requests
- [`.gitignore`](/.gitignore) The git ignore file used
- [`timelog.md`](/timelog.md) Timelog detailing the work done on certain days

## Testing
GitHub actions ensures that tests are run following each push to the repository. There are actions that ensure the app can be published successfully,  that the code works as expected for frontend and that the code works as expected for the backend.
- To run tests for backend after project set up
    - 'cd backend'
    - 'python manage.py test'
- To run tests for frontend after project set up
    - 'cd frontend'
    - 'npm test'
These tests ensure that screens and components are working as expected, that screens are working as expected and that requests made with REST API work as expected.

## Contact

If you have any questions about the product please contact me at 2444030s@student.gla.ac.uk

