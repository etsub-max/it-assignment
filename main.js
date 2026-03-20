let lang = "EN";
let balance = 1000000.00;
let history = [];
const correctPIN = "1216";
let attempts = 0;

// TRANSLATIONS
const text = {
  EN: { menu:"ATM Menu", balance:"Check Balance", deposit:"Deposit", withdraw:"Withdraw", borrow:"Borrow", history:"History", exit:"Exit", enter:"Enter amount:", current:"Balance", insufficient:"Insufficient funds!", thankYou:"Thank you for using LCCS Bank! Have a great day!" },
  AM: { menu:"ምርጫ", balance:"ቀሪ", deposit:"ገንዘብ አስገባ", withdraw:"ገንዘብ አውጣ", borrow:"ብድር ውሰድ", history:"ታሪክ", exit:"ውጣ", enter:"መጠን:", current:"ቀሪ", insufficient:"የበለጠ ገንዘብ የለም!", thankYou:"LCCS ባንክ ምርችሃዎ ስላረጉ እናመሰግናለን! መልካም ቀን ይሁንላችሁ!" },
  OR: { menu:"Filadhu", balance:"Haftee", deposit:"Galchi", withdraw:"Baasi", borrow:"Liqa", history:"Seenaa", exit:"Bahi", enter:"Maallaqa:", current:"Haftee", insufficient:"Maallaqa gahaa miti!", thankYou:"Galatoomi LCCS Bank fayyadamuuf! Guyyaa gaarii qabaadhu!" },
  TG: { menu:"ምርጫ", balance:"ሚዛን", deposit:"ኣእቱ", withdraw:"ኣውጽእ", borrow:"ብድር ውሰድ", history:"ታሪክ", exit:"ውፅእ", enter:"መጠን:", current:"ሚዛን", insufficient:"ገንዘብ ብትክክል ኣይቀርን!", thankYou:"LCCS ባንክ ኣገልግሎት ምግባርኩም ኣመሰግናለሁ! መልካም ቀን ኣሎኹም!" }
};

// START BUTTON
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("startBtn").addEventListener("click", () => show("pinScreen"));
});

// SCREEN SWITCH
function show(id){
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// PIN SUBMISSION
document.getElementById("pinBtn").addEventListener("click", () => {
  const pin = document.getElementById("pinInput").value;
  const msg = document.getElementById("pinMsg");

  if(pin === correctPIN){
    msg.innerText = "PIN correct! Welcome user!";
    attempts = 0;
    document.getElementById("pinInput").value = "";
    setTimeout(() => show("langScreen"), 1000);
  } else {
    attempts++;
    if(attempts < 3) msg.innerText = `Invalid PIN. Attempts left: ${3 - attempts}`;
    else {
      msg.innerText = "Too many wrong attempts. Wait 2 minutes.";
      document.getElementById("pinBtn").disabled = true;
      setTimeout(() => { attempts = 0; msg.innerText = ""; document.getElementById("pinBtn").disabled = false; }, 120000);
    }
  }
});

// LANGUAGE
function selectLang(l){
  lang = l; updateUI(); show("menuScreen");
}

// UPDATE UI
function updateUI(){
  const t = text[lang];
  document.getElementById("menuTitle").innerText = t.menu;
  document.getElementById("balanceBtn").innerText = t.balance;
  document.getElementById("depositBtn").innerText = t.deposit;
  document.getElementById("withdrawBtn").innerText = t.withdraw;
  document.getElementById("borrowBtn").innerText = t.borrow;
  document.getElementById("historyBtn").innerText = t.history;
  document.getElementById("exitBtn").innerText = t.exit;
}

// ATM FUNCTIONS
function getTimestamp(){ return new Date().toLocaleString(); }

function checkBalance(){ document.getElementById("output").innerText = `${text[lang].current}: ${balance} ETB`; }

function deposit(){
  let amt = prompt(text[lang].enter);
  if(!amt) return;
  amt = Number(amt); if(isNaN(amt) || amt <=0){ alert("Invalid amount"); return; }
  balance += amt;
  history.push(`Deposit: +${amt} ETB [${getTimestamp()}]`);
  showHistory();
}

function withdraw(){
  let amt = prompt(text[lang].enter);
  if(!amt) return;
  amt = Number(amt); if(isNaN(amt) || amt <=0){ alert("Invalid amount"); return; }
  if(amt > balance){ alert(text[lang].insufficient); return; }
  balance -= amt;
  history.push(`Withdraw: -${amt} ETB [${getTimestamp()}]`);
  showHistory();
}

function borrow(){
  let amt = prompt(text[lang].enter);
  if(!amt) return;
  amt = Number(amt); if(isNaN(amt) || amt <=0){ alert("Invalid amount"); return; }
  balance += amt;
  history.push(`Borrowed: +${amt} ETB [${getTimestamp()}]`);
  showHistory();
}

function showHistory(){
  if(history.length === 0) document.getElementById("output").innerText = "No transactions yet";
  else document.getElementById("output").innerHTML = history.join("<br>");
}

function exitATM(){
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const thankScreen = document.createElement("div");
  thankScreen.className = "screen active thank-you";
  thankScreen.innerHTML = `<h2>${text[lang].thankYou}</h2>`;
  document.querySelector(".atm").appendChild(thankScreen);
}