var btn = document.getElementById('btn')
var username = document.getElementById('name')
var email = document.getElementById('email')
var password = document.getElementById('password')
var upload = document.getElementById('image')
var img = document.getElementById('img')

var img_url
upload.onchange = (e) => {
  const picker = new FileReader()
  picker.readAsDataURL(e.target.files[0])
  picker.addEventListener('load', function (event) {
    console.log(event.target.result)
    img_url = event.target.result
    img.src = img_url
  })
}

btn.addEventListener('click', function () {

  var data = {
    name: username.value,
    email: email.value,
    password: password.value,
    image: img_url,
  }
  localStorage.setItem('data', JSON.stringify(data))
  var user_info = {
    name: username.value,
    email: email.value,
    image:
      'https://img.freepik.com/free-photo/ai-nuclear-energy-background-future-innovation-disruptive-technology_53876-129783.jpg?w=740&t=st=1674485752~exp=1674486352~hmac=0357c7f670e307f9754e360787e13f15c3fde1c77b66fedbe3eab5a3a24a4ed3',
    device: navigator.userAgent,
    status: '1',
  }

  async function postData() {
    const response = await fetch(
      'http://localhost/personal-blog/server/users/create-new.php',
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(user_info),
      },
    )
    return response.json()
  }
  postData().then((response) => {
    console.log(response)
    sessionStorage.setItem('info', JSON.stringify(user_info))
  })

  username.value = ''
  email.value = ''
  image.value = ''
  password.value = ''
})
