console.log('Client side JS file loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => { //e = event
    e.preventDefault() //prevents the browser from refreshing when submitting a form

    const location = search.value //get text entered by user

    message1.textContent = 'Loading...'
    message2.textContent = ''


    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                message1.textContent = data.error
            } else{
                message1.textContent = data.location
                message2.textContent = data.forecast
            } 
        })  
    })
})