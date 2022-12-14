const billInput = document.querySelector('#bill-input');
const pplInput = document.querySelector('#number-people');
const optionWrapper = document.querySelector('.option-wrapper');
const options = optionWrapper.getElementsByClassName('tip-option');
// const tip1 = document.querySelector('#option-1');
// const tip2 = document.querySelector('#option-2');
// const tip3 = document.querySelector('#option-3');
// const tip4 = document.querySelector('#option-4');
// const tip5 = document.querySelector('#option-5');
const customTip = document.querySelector('#custom-tip');
const result1 = document.querySelector('#result-1');
const result2 = document.querySelector('#result-2');
const resetButton = document.querySelector('#reset-btn');
const labelPpl = document.querySelector('#label-people');
const inputWrapper = document.getElementsByTagName('input');


// function useValue(element) {
//     let inputValue = element.value;
// }
// billInput.onchange = useValue(billInput);
// pplInput.onchange = useValue(pplInput);
// customTip.onchange = useValue(customTip);
let bill = 0;
let ppl = 1;
let tip = 0;
let tipAmount = 0;
let total = 0;
const percent = {
    '5%': 0.05,
    '10%': 0.1,
    '15%': 0.15,
    '25%': 0.25,
    '50%': 0.5,
};

for(let i=0; i<inputWrapper.length; i++){
    inputWrapper[i].addEventListener('blur', function(){
        bill = Number(billInput.value);
        ppl = Number(pplInput.value);
        tip = Number(customTip.value)/100;
        console.log('blurEvent');
        console.log(bill, ppl, tip, tipAmount, total);
    })
}

for(let i=0; i<options.length; i++){
    options[i].addEventListener('click', function() {
        if(this.classList.contains("active")){
            this.classList.remove("active");
            this.parentElement.classList.remove("parent-active");
            console.log('tip button toggle off');
        }else {
            this.parentElement.classList.add("parent-active");
            for(let j=0; j<options.length; j++){
                if(options[j].classList.contains('active')){
                    options[j].classList.remove('active');
                }
            }            
            this.classList.add("active");
            tip = Number(percent[this.innerText]);
            console.log('tip button toggle on');
        }
    })
}
customTip.addEventListener('click', function(){
    customTip.parentElement.classList.add("parent-active");
    for(let j=0; j<options.length; j++){
        if(options[j].classList.contains('active')){
            options[j].classList.remove('active');
        }
    } 
    customTip.classList.add('active');
    tip = Number(customTip.value)/100;
    console.log('tip button custom');
})

resetButton.addEventListener('click', function(){
    bill = 0;
    ppl = 1;
    tip = 0;
    tipAmount = 0;
    total = 0;
    optionWrapper.classList.remove("parent-active");
    for(let j=0; j<options.length; j++){
        if(options[j].classList.contains('active')){
            options[j].classList.remove('active');
        }
    } 
    billInput.value = "";
    pplInput.value = "";
    customTip.value = "";
    console.log('reset button clicked');
})

const calcTip = function() {
    tipAmount = bill*tip/ppl;
    total = (bill/ppl) + tipAmount;
    // if(tip1.classList.contains("active") || tip1.siblings().classList.contains("active")){
    //     tipButtons.addClass("active");
    // } else tipButtons.removeClass("active");
    //console.log(optionWrapper.classList.contains("active"));
    if(optionWrapper.classList.contains("parent-active")){
        result1.innerText = `$${String(tipAmount)}`;
        result2.innerText = `$${String(total)}`;
    } else {
        result1.innerText = "$0.00";
        result2.innerText = "$0.00";
    }
}

//window.setInterval(calcTip, 200);
// while(true){
//     calcTip();
// }

const inputAlert = function() {
    if(pplInput.value === "" || pplInput.value == 0){
    let inputAlert = document.createElement('h3');
    inputAlert.classList.add('input-alert');
    inputAlert.innerText = "Can't be zero";
    document.getElementById('number-people').classList.add('alert-state');
    // if(tidak ada class input-alert maka appendChild)
    //document.getElementById('label-wrapper').appendChild(inputAlert);
    
}else calcTip();
}

// setInterval(inputAlert, 100);
setInterval(calcTip,100);

// tip1.addEventListener('click', ()=> {
//     tip1.classList.toggle("active");
//     if(tip1.classList.contains("active")){
//         tip = Number(percent[tip1.innerText]);
//     } else tip = 0;
// })
// tip2.addEventListener('click', ()=> {
//     tip2.classList.toggle("active");
//     if(tip2.classList.contains("active")){
//         tip = Number(percent[tip2.innerText]);
//     } else tip = 0;
// })
// tip3.addEventListener('click', ()=> {
//     tip3.classList.toggle("active");
//     if(tip3.classList.contains("active")){
//         tip = Number(percent[tip3.innerText]);
//     } else tip = 0;
// })
// tip4.addEventListener('click', ()=> {
//     tip4.classList.toggle("active");
//     if(tip4.classList.contains("active")){
//         tip = Number(percent[tip4.innerText]);
//     } else tip = 0;
// })
// tip5.addEventListener('click', ()=> {
//     tip5.classList.toggle("active").siblings().removeClass("active");
//     if(tip5.classList.contains("active")){
//         tip = Number(percent[tip5.innerText]);
//     } else tip = 0;
// })


