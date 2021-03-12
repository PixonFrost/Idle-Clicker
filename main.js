// horny-on-main.js

const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});

const toggleLogPassword = document.querySelector('#toggleLogPassword');
const logPassword = document.querySelector('#logPassword');

toggleLogPassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = logPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    logPassword.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});

//!



//!

// var cookies = localStorage.getItem('cookieCount');
// console.log(typeof cookies);
// console.log(cookies);

// var cookies = Number(cookies);
// console.log(typeof cookies);
// console.log(cookies);

// if (cookies = null){
//     var cookies = 0;
//     console.log("your mum gay");
// }

// document.getElementById("cookies").innerHTML = cookies;

var cookies = 0;
var perClick = 1;

//*point generators
var cursors = 0;
var gen2 = 0;

//* manual point gain function, the clicking bit
function cookieClick(number){
    cookies = cookies + perClick; //*might have to change perClick here to number, just going along with things rn
    document.getElementById("cookies").innerHTML = cookies;
    console.log(cookies);
};

//* the function that determines how many points per second come from each gen tier
//* also determines the points per second element
function genTick(){
    cookiePrev = cookies;
    cookies = cookies + cursors;
    cookies = cookies + gen2;

    cookieNew = cookies - cookiePrev;

    document.getElementById("perSecond").innerHTML = cookieNew;
    document.getElementById("cookies").innerHTML = cookies;
    document.getElementById("cursors").innerHTML = cursors;
    document.getElementById("gen2").innerHTML = gen2;
}

//* buy generator tier 1 function
function buyCursor(){
    var cursorCost = Math.floor(10 * Math.pow(1.1,cursors));     //works out the cost of this cursor
    if(cookies >= cursorCost){                                   //checks that the player can afford the cursor
        cursors = cursors + 1;                                   //increases number of cursors
    	cookies = cookies - cursorCost;                          //removes the cookies spent
        document.getElementById('cursors').innerHTML = cursors;  //updates the number of cursors for the user
        document.getElementById('cookies').innerHTML = cookies;  //updates the number of cookies for the user
        localStorage.setItem('cursors', cursors);
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,cursors));       //works out the cost of the next cursor
    document.getElementById('cursorCost').innerHTML = nextCost;  //updates the cursor cost for the user
};

function buyGen2(){
    var gen2Cost = Math.floor(100 * Math.pow(1.1, cursors));
    if(cookies >= gen2Cost){
        gen2 = gen2 + 1;
        cookies = cookies - gen2Cost;
        document.getElementById('gen2').innerHTML = gen2;
        document.getElementById('cookies').innerHTML = cookies;
        localStorage.setItem('gen2', gen2);
    };
    var next2Cost = Math.floor(100 * Math.pow(1.1, gen2));
    document.getElementById('gen2Cost').innerHTML = next2Cost;
}
//* load save data
function loadSave(){
    cookies = Number(localStorage.getItem('cookieCount'));
    cursors = Number(localStorage.getItem('cursors'));
    gen2 = Number(localStorage.getItem('gen2'));

    document.getElementById("perSecond").innerHTML = cursors;
    document.getElementById("cookies").innerHTML = cookies;
    document.getElementById("gen2").innerHTML = gen2
}

function saveData(){
    localStorage.setItem('cookieCount', cookies);
    localStorage.setItem('cursors', cursors);
    localStorage.setItem('gen2', gen2);
}

//* game window interval bit
window.setInterval(function(){
    // cookieClick(cursors);
    genTick();
    saveData();

}, 1000);