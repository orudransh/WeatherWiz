const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");


//initially vairables need????
// Current tab is initially your weather 

let oldTab = userTab;
const API_KEY = "87e16c2a271734ace1123912abe9e600";
oldTab.classList.add("current-tab");
getfromSessionStorage();

function switchTab(newTab) {
    if(newTab != oldTab) {
        oldTab.classList.remove("current-tab");
        oldTab = newTab;
        oldTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")) {
            //If search form  container is invisible, if yes then make it visible
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else {
            //main pehle search wale tab pr tha, ab your weather tab visible karna h 
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            //ab main your weather tab me aagya hu, toh weather bhi display karna poadega, so let's check local storage first
            //for coordinates, if we haved saved them there.
            getfromSessionStorage();
        }
    }
}

userTab.addEventListener("click", () => {
    //pass clicked tab as input paramter
    switchTab(userTab);
});

searchTab.addEventListener("click", () => {
    //pass clicked tab as input paramter
    switchTab(searchTab);
});

//check if cordinates are already present in session storage
function getfromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates) {
        //agar local coordinates nahi mile
        grantAccessContainer.classList.add("active");
    }
    else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }

}

console.log('Hello Sharique ');

//const API_KEY = "87e16c2a271734ace1123912abe9e600";

function renderWeatherInfo(data) {
    //Function to render on Ui 
        let newPara = document.createElement('p');
        newPara.textContent = `${data?.main?.temp.toFixed(2)} °C`
    
        document.body.appendChild(newPara);
}

async function fetchWeatherDetails() {

    try {
        let city = "goa";  //Input city 

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();  //Converted into Json format 
    
        console.log("Weather data:-> " , data);

        renderWeatherInfo(data);
    }
    catch(err) {
        //handle the error here
    }
    //https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric

}

async function getCustomWeatherDetails() {
    //Try catch block if error found .
    try{
        let latitude = 11.6333;
        let longitude = 18.3333;
    
        let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    
        let data = await result.json();
    
        console.log(data);
    }
    catch(err) {
        console.log("Errror Found" , err);
    }

}


function switchTab(clickedTab) {

  apiErrorContainer.classList.remove("active");

  if (clickedTab !== currentTab) {
    currentTab.classList.remove("current-tab");
    currentTab = clickedTab;
    currentTab.classList.add("current-tab");

    if (!searchForm.classList.contains("active")) {
      userInfoContainer.classList.remove("active");
      grantAccessContainer.classList.remove("active");
      searchForm.classList.add("active");
    } 
    else {
      searchForm.classList.remove("active");
      userInfoContainer.classList.remove("active");
      //getFromSessionStorage();
    }

    // console.log("Current Tab", currentTab);
  }
}

function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        console.log("No geoLocation Support");
    }
}

function showPosition(position) {
    let lat = position.coords.latitude;
    let longi = position.coords.longitude;

    console.log(lat);
    console.log(longi);
}