const BaseN = document.getElementById("BaseN")
const Base10 = document.getElementById("Base10")
const Base10Total = document.getElementById("Base10Total")
const User = document.getElementById("User")
const Board = document.querySelectorAll(".Board")
const PlayPause = document.querySelectorAll(".PlayPause")
const Play = document.getElementById("play");
const Pause = document.getElementById("pause");
const EditPlay = document.getElementById("editplay");
const SpeedValue = document.getElementById("SpeedValue")
const PowerN = document.getElementById("PowerN");
const Pencil = document.getElementById("edit");
const Slash = document.getElementById("editSlash");

var num = 1;
var base = 10;
var len = 0;
var previous = ["0"];
var running = true;
var speedtime = 100

function BaseConvertor(n, b){
    var m = [];
    while(n){
        m.push(`${n % b}`);
        n = Math.floor(n / b);
    }
    return m.reverse();
}

function OrderCard(l){
    for (let i = 0; i < l.length; i++) {
        document.getElementById(`${i + 1}`).innerText = l[i];
        document.getElementById(`P${i + 1}`).innerText = `${base} ^ ${len - i - 1}`;
    }
}

function AddCard(len){
    var element = document.createElement("div")
    element.id = len;
    element.className = "Board";
    element.innerText = "1";
    BaseN.appendChild(element);

    var element2 = document.createElement("div")
    element2.id = `P${len}`;
    element2.className = "Power";
    element2.innerText = `${base} ^ ${len}`;
    PowerN.appendChild(element2);

    var calc_width = Math.floor(100 / len);
    document.querySelectorAll(".Board").forEach(element => {
        element.style.width = `${calc_width}%`;
    })

    document.querySelectorAll(".Power").forEach(element => {
        element.style.width = `${calc_width}%`;
    })
}

function RemoveCards(){
    document.querySelectorAll(".Board").forEach(element=>{
        element.remove();
    })

    document.querySelectorAll(".Power").forEach(element=>{
        element.remove();
    })
}

function run(){
    if (running == true){
        l = BaseConvertor(num, base)
        if (l.length > len){
            while (l.length > len){
                len += 1;
                AddCard(len);
            }
        }
        OrderCard(l);
        previous = l;
        var total = `<b style="font-size: 200%;">`

        for(var i = 0; i < len; i++){
            total += l[i];
        }
        total += `<sub>${base}</sub> = ${num}<sub>10</sub></b>`; 
        Base10.innerHTML = total;
        num += 1
    }
    make();
}


function make(){
    setTimeout(run, (101 - speedtime) * 10);
}

function ChangeSpeed(){
    running = false;
    speedtime = SpeedValue.value;
    running = true;
}

function ChangeEdit(){
    if (User.value && window.getComputedStyle(SpeedValue).visibility == "visible"){
        Pencil.style.visibility = "hidden";
    }
    else{
        Pencil.style.visibility = "visible";
    }
}

function SelectiveNumber(){
    running = true;
    if(Base10.innerText.includes("=") == false){
        num = parseInt(Base10.innerText);
    }
    base = parseInt(User.value);
    len = 0;
    RemoveCards();
    run();
    running = false;
}

User.addEventListener("keyup", (e)=>{
    if(e.key == "Enter" && window.getComputedStyle(Pencil).visibility != "visible"){
        if (User.value && num == 1 && base == 10 && len == 0){
            document.getElementById("0").remove(); 
        }
        num = 0;
        len = 0;
        Base10.innerText = "";
        base = parseInt(User.value);
        running = true
        RemoveCards();
        if (base == 1 || base == 0){
            base = 10
        }
        Pause.style.visibility = "visible";
        Play.style.visibility = "hidden";
        run();
    }

    if(Base10.getAttribute("contenteditable") == "true" && window.getComputedStyle(Pencil).visibility == "visible"){
        console.log(User.value);
        if (e.key == "Enter" && User.value =="24e30"){
            fetch('https://api.countapi.xyz/get/differentbaseconvertor/visitorsvisiting')
                .then(res => res.json())
                .then(res=>{
                document.getElementById("0").innerText = res.value + " visits";
                Base10.innerText = "And Hoping For More!!";
                document.getElementById("00").innerText = "Website Visit Counter";})
        }
        if (User.value && Base10.innerText && Base10.innerText != "G I V E - N U M B E R"){
            EditPlay.style.visibility = "visible";
        }
        else{
            EditPlay.style.visibility = "hidden";
        }
    }
})

PlayPause.forEach(element => {
    element.addEventListener("click", e=>{
        if(element.id == "pause"){
            Pause.style.visibility = "hidden";
            Play.style.visibility = "visible";
            running = false;
            if(!(User.value)){
                Base10.innerText = "Enter Value and Tap Play ";
            }
        }
        else{
            Pause.style.visibility = "visible";
            Play.style.visibility = "hidden";
            running = true;
            if (User.value){
                if (base != User.value){
                    base = parseInt(User.value);
                    RemoveCards();
                    len = 0;
                    num = 0;
                    run();
                }
                else if (BaseN.innerText != "N U M B E R - B A S E*"){
                    run();
                }
                else{
                    base = parseInt(User.value);
                    RemoveCards();
                    run();
                }
            }
            else{
                Base10.innerText = "Enter Value and Tap Play";
            }
        }
    })
});

Pencil.addEventListener("click", e =>{
    if (Base10.getAttribute("contenteditable") == "false"){
        Base10.setAttribute("contenteditable", "true");
        running = false;
        Slash.style.opacity = "100%";
        Play.style.visibility = "hidden";
        Pause.style.visibility = "hidden";
        SpeedValue.style.opacity = "0%";
        setTimeout(() => {
            Slash.style.visibility = "visible";
            SpeedValue.style.visibility = "hidden";
        }, 1000);
        Base10.setAttribute("type", "number");
        Base10.innerText = "G I V E - N U M B E R";
        Base10.style.backgroundColor = "White"; 
        Base10.style.color = "black";
        Base10.style.borderRadius = "10vh 10vh 1vh 10vh";
        Base10.addEventListener("click", ()=>{
            if(Base10.innerText == "G I V E - N U M B E R"){
                Base10.innerText = "";
            }
        })
    }    
    else{
        Base10.setAttribute("contenteditable", "false");
        Slash.style.opacity = "0%";
        Play.style.visibility = "visible";
        EditPlay.style.visibility = "hidden";
        setTimeout(() => {
            Slash.style.visibility = "hidden";
        }, 1000);
        SpeedValue.style.visibility = "visible";
        SpeedValue.style.opacity = "100%";
        Base10.innerText = "N U M B E R*";
        Base10.style.backgroundColor = "#ff9f0f";
        Base10.style.color = "white";
        Base10.style.borderRadius = "1vh";
    }
    if (PowerN.innerText != "P O W E R*"){
        RemoveCards();
        var element = document.createElement("div");
        element.id = "0";
        element.className = "Power";
        element.innerText = "P O W E R*";
        PowerN.appendChild(element);

        var element2 = document.createElement("div");
        element2.id = "0";
        element2.className = "Board";
        element2.style = "font-size: 80%; color: rgb(207, 207, 207);";
        element2.innerText=  "N U M B E R - B A S E*";
        BaseN.appendChild(element2);
        User.value = "";
    }
    
})

Base10.addEventListener("keyup", e => {
    if(e.key == "Enter" || e.key == "Backspace" || (e.key >= "0" && e.key <= "9")){
        if (e.key == "Enter" && Base10.innerText != ""){ 
            SelectiveNumber();
        }
        if (e.key == "Backspace" && Base10.innerText.includes("=")){
            Base10.innerText = "";
        }
        if (User.value && Base10.innerText && Base10.innerText != "G I V E - N U M B E R"){
            EditPlay.style.visibility = "visible";
        }
        else if(User.value || Base10.innerText || Base10.innerText != "G I V E - N U M B E R"){
            EditPlay.style.visibility = "hidden";
        }
    }
    else if(e.key.length === 1){
        Base10.innerText = Base10.innerText.substring(0, Base10.innerText.length - 1);
    }
})

EditPlay.addEventListener("click", ()=>{
    SelectiveNumber();
})

Slash.addEventListener("click", ()=>{
    Pencil.click();
})

const Intro = document.getElementById("Intro")
const Skip = document.querySelectorAll("#Skip")
const Parts = document.querySelectorAll(".Parts")
const Arr = ["Intro", "inputbase", "inputnumber", "Speed", "Convertor", "PlayStop"]
const Forward = document.querySelectorAll("#forward")
const Backward = document.querySelectorAll("#backward")

var pointer = 0;

Skip.forEach(element=>{
    element.addEventListener("click", ()=>{
        Parts.forEach(element => {
            var Elem = document.getElementById(element.id);
            if(window.getComputedStyle(Elem).visibility == "visible"){
                Elem.style.animation = "show 1s ease";
                setTimeout(() => {
                    element.remove();
                }, 1000);
            }
            else{
                element.remove();
            }
        });
        if(pointer == 0){
            Intro.style.animation = "show 1s ease";
            setTimeout(() => {
                Intro.remove();
            }, 1000);
        }
        else{
            Intro.remove();
        }
    })
})

Forward.forEach(element=>{
    element.addEventListener("click", ()=>{
        var num = pointer;
        setTimeout(() => {
            document.getElementById(Arr[num]).style.visibility = "hidden";
        }, 1000);
        document.getElementById(Arr[pointer + 1]).style.visibility = "visible";
        document.getElementById(Arr[pointer + 1]).style.animation = "forward 1s ease";
        pointer += 1;
        if (pointer == 5){
            document.getElementById("play1").style.visibility = "visible";
            document.getElementById("pause1").style.visibility = "visible";
        }
    })
})

Backward.forEach(element=>{
    element.addEventListener("click", ()=>{
        var num = pointer;
        document.getElementById(Arr[pointer - 1]).style.visibility = "visible";
        document.getElementById(Arr[num]).style.animation = "backward 1s ease";
        setTimeout(() => {
            document.getElementById(Arr[num]).style.visibility = "hidden";
        }, 1000);
        if (pointer == 5){
            document.getElementById("play1").style.visibility = "hidden";
            document.getElementById("pause1").style.visibility = "hidden";
        }
        pointer -= 1;
    })
})

fetch('https://api.countapi.xyz/update/differentbaseconvertor/visitorsvisiting/?amount=1')