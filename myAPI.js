const baseURL = 'https://api.coinbase.com/v2';
const secret = 'lY6joMhBd5BXK1AzGFeUMQDbjcFWdNEKIdziOOPUTXwQ+NkIqwKPCjiYZD4qhhpAkCXXCVeSOx8fi/xkc0+5tQ==';
const key = 'ca5c81209c121836126ebad8226b1685';
let url;

//SEARCH FORM
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');

const section = document.querySelector('section');


searchForm.addEventListener('submit', fetchCrypto);


function fetchCrypto(e){  
    e.preventDefault(); 
    fetch(`${baseURL}/currencies`)
        .then(responseCrypto => responseCrypto.json())
        .then(jsonOne => {
            fetchExchange(jsonOne)
        })
        
}

function fetchExchange(currency){
    let jsonOne = currency
    fetch(`${baseURL}/exchange-rates`)
    .then(responseExchange => responseExchange.json())
    .then(jsonTwo => {
        displayCrypto(jsonOne, jsonTwo)
    })
}

function displayCrypto(jsonOne, jsonTwo){
    console.log(jsonOne)
    console.log(jsonTwo)
    while (section.firstChild){            
        section.removeChild(section.firstChild);
    }
    let cryptoName = jsonOne.data;
    let exchangeRate = jsonTwo.data.rates;
    console.log(exchangeRate, cryptoName)
    
    if (cryptoName.length === 0) {
        console.log('no results')
    } else {
        for ( let i = 0; i < cryptoName.length; i++){

            let article = document.createElement('article');
            let clearfix = document.createElement('div');
            clearfix.setAttribute('class', 'clearfix');
            let span = document.createElement('span');

                var elementArr = new Array()

            span.textContent += `Currency: ${cryptoName[i].name} -- Abbrev: ${cryptoName[i].id} -- Exchange Rate:  `;
            for (const value in exchangeRate) {

                var element = exchangeRate[value];
                elementArr.push(element)
            }
              span.textContent += elementArr[i]

            article.appendChild(span);
            article.appendChild(clearfix);
            section.appendChild(article);
        }
    }
    
}
