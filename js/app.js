// * Global Variables *************************************************************
// ********************************************************************************
const profileOverview = document.querySelector("overview");
let username = "prime-mcgowan";

// * Fetch API JSON Data *************************************************************
// ***********************************************************************************
const fetchProfileData = async function () {
  const profileInfo = await fetch(`https://api.github.com/users/${username}`);

  const info = await profileInfo.json();
  console.log(info);
};
fetchProfileData();

// * Fetch & Display User Information ***************************************************
// **************************************************************************************
// JSON data (info) is being accepted as a parameter
const displayProfileData = function (info) {
  //create a new div
  let div = document.createElement("div");
  //give the div a class of "user-info"
  div.classList.add("user-info");
  //populate the div with important elements - grab using dot notation
  div.innerHTML = `  <figure>
    <img alt="user avatar" src=${info.avatar_ul} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${info.login}</p>
    <p><strong>Bio:</strong> ${info.bio}</p>
    <p><strong>Location:</strong> ${info.location}</p>
    <p><strong>Number of public repos:</strong> ${info.public - repos}</p>
  </div> `;

  //append the div to the "overview" element
  profileOverview.append(div);
};
