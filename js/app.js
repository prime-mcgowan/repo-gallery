// * Global Variables *************************************************************
// ********************************************************************************
const profileOverview = document.querySelector("overview");
let username = "prime-mcgowan";

// * Fetch API JSON Data *************************************************************
// ***********************************************************************************
const githubProfileData = async function () {
  const profileInfo = await fetch(`https://api.github.com/users/${username}`);

  const info = await profileInfo.json();
  console.log(info);
};
githubProfileData();
