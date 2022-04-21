
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



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

There are many great README templates available on GitHub; however, I didn't find one that really suited my needs so I created this enhanced one. I want to create a README template so amazing that it'll be the last one you ever need -- I think this is it.

Here's why:
* Your time should be focused on creating something amazing. A project that solves a problem and helps others
* You shouldn't be doing the same tasks over and over like creating a README from scratch
* You should implement DRY principles to the rest of your life :smile:

Of course, no one template will serve all projects since your needs may be different. So I'll be adding more in the near future. You may also suggest changes by forking this repo and creating a pull request or opening an issue. Thanks to all the people have contributed to expanding this template!

Use the `BLANK_README.md` to get started.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [React.js](https://reactjs.org/)
* [Create-React-App](https://create-react-app.dev/)
<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these steps.

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

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
5. Enter your Civic Data API key in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```
5. Enter your Google Maps API key in the script tag in the index.html
   ```html
   <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE&libraries=places"></script>
   ```
6. npm run server to view a local copy
    ```sh
    npm run server
    ```
7. To deploy for production npm run build
    ```sh
    npm run build
    ```
<p align="right">(<a href="#top">back to top</a>)</p>



## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

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
