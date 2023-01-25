const form = document.querySelector('form')
const chatContainer = document.querySelector('#chat_container')
let loadInterval
var History = []

function loader(element) {
  element.textContent = ''
  loadInterval = setInterval(() => {
    element.textContent += '.'
    if (element.textContext === '....') {
      element.textContent = ''
    }
  }, 300)
}

function typeText(element, text) {
  let index = 0
  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index)
      index++
    } else {
      clearInterval(interval)
    }
  }, 20)
}

const synth = window.speechSynthesis
function AI_SPEAK(text) {
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'en-AU'
  utterance.rate=.6
  utterance.volume = 100
  // console.log(window.speechSynthesis.getVoices()[2])
  synth.speak(utterance)
}

function generateUniqueId() {
  const timestamp = Date.now()
  const randomNumber = Math.random()
  const hexadecimalString = randomNumber.toString(16)
  return `id-${timestamp}-${hexadecimalString}`
}
var image = JSON.parse(localStorage.getItem('data')).image
function chatStipe(isAi, value, uniqueId) {
  return `
  <div class="wrapper ${isAi && 'ai'}">
  
  <div class="chat">
  <div class="profile">
 
    <div class="img_box">
    <img src="${
      isAi ? './assets/ai.png' : './assets/user.png' ? image : image
    }" ${isAi ? "class='bot'" : "class='user'"} alt="${
    isAi ? 'bot' : 'user'
  }" ${isAi ? 'onclick="AI_SPEAK();"' : ''} />
  
    </div>
    </div>
  <div class="message" id=${uniqueId}>${value}</div>
  </div>
  </div>
 
  `
}

const handleSubmit = async (e) => {
  e.preventDefault()
  const data = new FormData(form)
  //********************************* */
  // console.log(data.get('prompt'))
  const NewData = [
    {
      date: new Date(),
      user_data: data.get('prompt'),
    },
  ]

  History.push(NewData)
  // History.push(new Date().getUTCDate())
  // History.push(data.get('prompt'))
  localStorage.setItem('Hs', JSON.stringify(History))
  // localStorage.setItem("History",JSON.stringify(data.get('prompt')))
  //********************************* */

  chatContainer.innerHTML += chatStipe(false, data.get('prompt'))
  form.reset()
  const uniqueId = generateUniqueId()
  chatContainer.innerHTML += chatStipe(true, ' ', uniqueId)
  chatContainer.scrollTop = chatContainer.scrollHeight
  const messageDiv = document.getElementById(uniqueId)
  loader(messageDiv)
  // fetch data from ai server
  const response = await fetch('http://localhost:5000/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      prompt: data.get('prompt'),
    }),
  })

  // console.log(JSON.stringify({ prompt: data.get('prompt') }))
  clearInterval(loadInterval)
  messageDiv.innerHTML = ''

  if (response.ok) {
    const data = await response.json()

    //********************************* */
    // localStorage.setItem("History",JSON.stringify(data.get('prompt')))
    // console.log(data.get('prompt'))
    const NewData = [
      {
        date: new Date(),
        bot_data: data.bot,
      },
    ]
    // console.log(data.bot)
    History.push(NewData)
    // History.push(data.bot)
    AI_SPEAK(data.bot)
    localStorage.setItem('Hs', JSON.stringify(History))
    //********************************* */

    const parseData = data.bot.trim()
    typeText(messageDiv, parseData)
  } else {
    const err = await response.text()

    messageDiv.innerHTML = 'Something is Wrong'
    alert(err)
  }
}
var audio = new Audio('./assets/nokia_notification.mp3')
audio.volume = 0.2
form.addEventListener('submit', handleSubmit)
form.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    handleSubmit(e)
    audio.play()
  }
})
