const pages = ["home","workouts","library","progress"];
const workouts = {
  full:{title:"Full Body Basics",items:["Bodyweight squat — practice a comfortable range","Wall push-up — use a stable wall","Bird-dog — move slowly and stay balanced"]},
  upper:{title:"Upper Body Basics",items:["Wall push-up — controlled pushing movement","Shoulder rolls — gentle shoulder mobility","Arm circles — small, comfortable circles"]},
  lower:{title:"Lower Body Basics",items:["Sit-to-stand — use a stable chair","Standing calf raise — hold support if needed","Supported balance — stand near a stable surface"]},
  mobility:{title:"Mobility & Reset",items:["Gentle shoulder rolls","Comfortable standing side reach","Easy ankle circles"]}
};
let selectedWorkout = null;
function showPage(name){
  pages.forEach(p=>{document.getElementById("page-"+p).classList.toggle("active",p===name)});
  document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("active",t.dataset.page===name));
  window.scrollTo({top:0,behavior:"smooth"});
}
function getCount(){return Number(localStorage.getItem("nexfitSessions")||0)}
function updateCount(){
  document.getElementById("home-count").textContent=getCount()+" sessions";
  document.getElementById("progress-count").textContent=getCount();
}
function toast(message){
  const el=document.getElementById("toast");el.textContent=message;el.classList.add("show");
  clearTimeout(window.nexfitToast);window.nexfitToast=setTimeout(()=>el.classList.remove("show"),2400);
}
document.querySelectorAll("[data-page]").forEach(el=>el.addEventListener("click",()=>showPage(el.dataset.page)));
document.querySelectorAll("[data-go]").forEach(el=>el.addEventListener("click",()=>showPage(el.dataset.go)));
document.querySelectorAll("[data-start]").forEach(el=>el.addEventListener("click",()=>{
  selectedWorkout=el.dataset.start;const w=workouts[selectedWorkout];const panel=document.getElementById("workout-detail");
  panel.classList.remove("hidden");
  panel.innerHTML=`<h3>${w.title}</h3><p class="muted">Try these movements at a comfortable pace. Rest when you need to.</p><ul>${w.items.map(x=>`<li>${x}</li>`).join("")}</ul><button class="primary-btn" id="complete-workout">Mark session complete ✓</button>`;
  document.getElementById("complete-workout").addEventListener("click",()=>{
    localStorage.setItem("nexfitSessions",String(getCount()+1));updateCount();toast("Session added to your progress. Nice work!");panel.classList.add("hidden");
  });
  panel.scrollIntoView({behavior:"smooth",block:"center"});
}));
document.getElementById("reset-progress").addEventListener("click",()=>{
  if(confirm("Reset the session count saved on this device?")){localStorage.removeItem("nexfitSessions");updateCount();toast("Local progress reset.");}
});
document.getElementById("year").textContent=new Date().getFullYear();
updateCount();
