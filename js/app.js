// * Global Variables *************************************************************
// ********************************************************************************
const profileOverview = document.querySelector(".overview");
let username = "prime-mcgowan";
const repoListDisplay = document.querySelector(".repo-list");
const repoSection = document.querySelector(".repos");
const individualRepoData = document.querySelector(".repo-data");
const backToGalleryButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

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
  filterInput.classList.remove("hide");
  for (let repo of repos) {
    let repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;

    repoListDisplay.append(repoItem);
  }
};

// * RepoListDisplay Click Event ************************************************************************
// ******************************************************************************************************
repoListDisplay.addEventListener("click", function (e) {
  //checkto see if the what was clicked on matches matches the name of the repo (h3)
  if (e.target.matches("h3")) {
    //create a variable to target the innerText where the event happens
    const repoName = e.target.innerText;
    fetchIndividualRepoInfo(repoName);
  }
});

// * Fetch Info for an Individual Repo ***********************************************************************
// ***********************************************************************************************************
const fetchIndividualRepoInfo = async function (repoName) {
  const request = await fetch(
    `https://api.github.com/repos/${username}/${repoName}`
  );

  const repoInfo = await request.json();
  //   console.log(repoInfo);

  //fetch data from languages_url
  const fetchLanguages = await fetch(repoInfo.languages_url);
  //save the JSON response from above
  const languageData = await fetchLanguages.json();

  //list of languages
  const languages = [];
  for (let language in languageData) {
    languages.push(language);
  }
  //   console.log(languages);
  displayIndividualRepoInfo(repoInfo, languages);
};

// * Display Info for an Individual Repo ***********************************************************************
// ***********************************************************************************************************
const displayIndividualRepoInfo = function (repoInfo, languages) {
  individualRepoData.innerHTML = "";
  individualRepoData.classList.remove("hide");
  repoSection.classList.add("hide");
  backToGalleryButton.classList.remove("hide");
  let div = document.createElement("div");
  div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${
      repoInfo.html_url
    }" target="_blank" rel="noreferrer noopener">
    View Repo on Github!</a>
    `;
  individualRepoData.append(div);
};

backToGalleryButton.addEventListener("click", function () {
  repoSection.classList.remove("hide");
  individualRepoData.classList.add("hide");
  backToGalleryButton.classList.add("hide");
});
