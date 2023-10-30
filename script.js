// GSAP ANIMATIONS

let tl = gsap.timeline()

tl.from("#header", {
    y: 12,
    opacity: 0,
    delay: .5,
    // stagger: 1,
    // duration: 1,
})

tl.from("#searchContainer, #searchBtn", {
    y: 12,
    opacity: 0,
    stagger: .25,
    duration: .5
})







function  searchUser(){
    
    let searchBtn = document.querySelector("#searchBtn")
    let userName = document.querySelector("#userName").value
    let profile = document.querySelector("#profile")
    let errorText = document.querySelector("#errorText")

    profile.innerHTML = ''
    userName.textContent = ''
    errorText.textContent = ''

    fetch(`https://api.github.com/users/${userName}`, {
        headers: {
            // Authorization: `token ${token}`,
            // userAgent: 'request'
        }
    })
        .then(response =>{
            if(!response.ok){
                throw new Error(`${response.status} !`)
            }
            return response.json();
        })
        .then(data =>{

            let userDetails = {
                avatar: data.avatar_url || '',
                userName: data.login || '',
                fullName: data.name || '',
                bio: data.bio || '',
                repos: data.public_repos || '',
                followers: data.followers || '',
                following: data.following || '',
                accountURL: data.html_url || ''

            };
            
            displayProfile(userDetails);

        })
        .catch(error =>{
            errorText.textContent = `Error: ${error.message}`
        })

        // console.log(`${userDetails.name}`)

}




function displayProfile(user){
    let profile = document.querySelector("#profile")
    let userName = document.querySelector("#userName").value

    if(!userName){
        profile.innerHTML = ``;

    }
    else

    profile.innerHTML = `
        <img src="${user.avatar}">
        <h2 style="margin-top: 20px">${user.userName}</h2>
        <p>${user.fullName}</p>
        <p>${user.bio}</p>
        <p><span>Repositories:</span> ${user.repos}</p>
        <p><span>Followers:</span> ${user.followers}</p>
        <p><span>Following:</span> ${user.following}</p>
        <a href="${user.accountURL}" target="_blank" id="profileLink">View Github Account <i class="ri-external-link-line"></i></a>

    
    `;

    profile.style.display = 'block';

    console.log("disp fn working...")



    // ------------------------------------------------
    // Profile GSAP Animations
    let tl = gsap.timeline()

    tl.from("#profile", {
        y:-40,
        // scale: 0,
        opacity: 0,
        duration: .4,
        // delay: .2
    })

    tl.from("#profile img",{
        y: 10,
        opacity:0,
        // scale: 0,
    })

    tl.from("#profile h2",{
        y: 10,
        opacity: 0,
    })
    
    tl.from("#profile p, #profile a",{
        x: 15,
        opacity: 0,
        stagger: .2
    })

    tl.from("#errorText",{
        y:20,
        opacity: 0,
    })
    
    


    // Profile Link Hover

    let profileLink = document.querySelector("#profileLink")
    
    profileLink.addEventListener("mouseover", function(){
        profileLink.style.color = "blue"
    })
    
    profileLink.addEventListener("mouseout", function(){
        profileLink.style.color = "rgb(21, 131, 168)"
    })
}
