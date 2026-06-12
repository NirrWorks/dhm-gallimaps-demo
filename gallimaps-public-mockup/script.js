const weather=document.querySelector("#weather");
const forecast=document.querySelector("#forecast");
weather.addEventListener("click",()=>forecast.classList.toggle("open"));
