
<br />
<div align="center">
  <h1 align="center">League of Women Voters Representative Finder</h1>

  <p align="center">
    <a href="https://league-of-women-voters-app.vercel.app/">Demo Deployed With Vercel</a>
    ·
    <a href="https://www.lwvwashco.org/representatives">Live Deployment</a>
  </p>
</div>


<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



## About The Project
This app was made for the Women Voters League of Maryland to allow users to find the contact information for all of their local representatives based on their address. This app is currently being deployed across multiple counties Women League of Voters sites in Maryland. See: (https://www.lwvwashco.org/representatives) for an example. 

## Features
Shows the following contact details for representatives filtered on Local State or Federal level
* Name
* Address (if available)
* Phone Number (if available) with direct phone link
* Email (if available) - with direct mailto tag
* Office
* Photo(if available)
* Social Media Channels(if available) - Youtube/Twitter/Facebook with direct links

App is responsive for mobile

Minimal CSS stylings are used for this demo version.
* In deployment non-structural CSS design is done by League of Women Voters

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [React.js](https://reactjs.org/)
* [Create-React-App](https://create-react-app.dev/)
<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these steps.

### Installation


1. Get a Civic Data API See: https://developers.google.com/maps/documentation/embed/get-api-key
2. Get a Google Maps API See:  https://developers.google.com/civic-information/docs/using_api  (Notice they can be the same api-key if you restrict your api-key. However as Google Maps API key requires you to include it in an src tag, you may wish to have a separate key restricted to just Google Maps API. See https://cloud.google.com/docs/authentication/api-keys for best practices and management of api keys)
3. Clone the repo
   ```sh
   git clone https://github.com/Michael-Subbarao/League-of-Women-Voters-App.git
   ```
4. Install NPM packages
   ```sh
   npm i
   ```
5. Create `.env` (or `.env.local`) in root folder and add your Civic Data API key as follows
   ```env
   REACT_APP_API_KEY=YOUR_API_KEY_HERE
   ```
5. Enter your Google Maps API key in the script tag in the index.html
   ```html
   <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE&libraries=places"></script>
   ```
6. npm run start to view a local copy
    ```sh
    npm run start
    ```
7. To deploy for production npm run build and add your api key into the environment where it is deployed
    ```sh
    npm run build
    ```
<p align="right">(<a href="#top">back to top</a>)</p>



## Contributing

If you have a suggestion that would make this project better, please fork the repo and create a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/FeatureName`)
3. Commit your Changes (`git commit -m 'Added feature'`)
4. Push to the Branch (`git push origin feature/FeatureName`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Michael Subbarao - [LinkedIn](https://www.linkedin.com/in/michael-subbarao-661a6b229/) - Subbarao.michael@gmail.com

Project Link: [Repo Link](https://github.com/Michael-Subbarao/League-of-Women-Voters-App)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments
* [Axios](https://axios-http.com/docs/intro)
* [use-places-autocomplete](https://www.npmjs.com/package/use-places-autocomplete)
* [@reach/combobox](https://www.npmjs.com/package/@reach/combobox)
