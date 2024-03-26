// * Global Variables *************************************************************
// ********************************************************************************
const profileOverview = document.querySelector(".overview");
let username = "prime-mcgowan";
const repoListDisplay = document.querySelector(".repo-list");

// * Fetch API JSON Data *************************************************************
// ***********************************************************************************
const fetchProfileData = async function () {
  const profileInfo = await fetch(`https://api.github.com/users/${username}`);

  const info = await profileInfo.json();
  //   console.log(info);

  //call the function to display user info and give it the JSON data as an arguement
  displayProfileData(info);
};

//call the function
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
    <img alt="user avatar" src=${info.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${info.name}</p>
    <p><strong>Bio:</strong> ${info.bio}</p>
    <p><strong>Location:</strong> ${info.location}</p>
    <p><strong>Number of public repos:</strong> ${info.public_repos}</p>
  </div> `;

  //append the div to the "overview" element
  profileOverview.append(div);
  fetchRepos();
};

// * Fetch Repos ************************************************************************
// **************************************************************************************
const fetchRepos = async function () {
  const reposList = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated`
  );

  const repoData = await reposList.json();
  //   console.log(repoData);
  displayRepoInfo(repoData);
};

// * Display Info About Your Repos ******************************************************
// **************************************************************************************
const displayRepoInfo = function (repos) {
  for (let repo of repos) {
    let repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;

    repoListDisplay.append(repoItem);
  }
};
