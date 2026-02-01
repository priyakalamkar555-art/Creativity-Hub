function scrollToAbout() {
    const aboutSection = document.getElementById("about");
    aboutSection.scrollIntoView({ behavior: "smooth"});
    aboutSection.style.backgroundColor = "#fff0f5";
    setTimeout(() => {
        aboutSection.style.backgroundColor = "";
    },1500);
}

function scrollToHome() {
    const homeSection = document.getElementById("home");
    homeSection.scrollIntoView({ behavior: "smooth"});
    homeSection.style.backgroundColor = "#fff0f5";
    setTimeout(() => {
        homeSection.style.backgroundColor = "";
    },1500);
}



  
/*document.querySelectorAll('.img').forEach(img =>{
    img.onclick = () => {
        const modal = document.createElement('div');
        modal.innerHTML = '<img src ="${img.src}">';
        modal.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:black; display:flex; justify-content:center; align-items:center;"
        modal.onclick = () => modal.remove();
        document.body.appendChild(modal);
    };
});*/