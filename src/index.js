let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  const toyAddBttn = document.getElementsByClassName('add-toy-form')

  toyAddBttn[0].addEventListener('submit', test)
  function test (e) {
    e.preventDefault()
    let userAddedToy = {
      name: document.getElementsByClassName("input-text")[0].value,
      image: document.getElementsByClassName("input-text")[1].value,
      likes: 0
    }
    addNewToy(userAddedToy)
  }


  function getToys() {
    fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toys => toys.forEach(toy => renderToy(toy)))
  }

  getToys()

});

function renderToy(item) {
  let newItem = document.createElement('div')
  newItem.id = item.id
  newItem.className = 'card'
  newItem.innerHTML = `
    <h2>${item.name}</h2>
    <img src="${item.image}" class="toy-avatar">
    <p class="likes">${item.likes} Likes</p>
    <button id=${item.id} class='like-btn'>Like ❤️</button>
  `
  newItem.querySelector('.like-btn').addEventListener('click', () => {
    item.likes++
    newItem.querySelector('.likes').textContent = `${item.likes} Likes`
    updateLikes(newItem, item.likes)
  })

  document.getElementById("toy-collection").append(newItem)
}

function addNewToy(userAddedToy) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body:JSON.stringify(userAddedToy)
    })
    .then(res => res.json())
    .then(data => renderToy(data))
}

function updateLikes(item, newLikes) {
  fetch(`http://localhost:3000/toys/${item.id}`, {
    method: 'PATCH',
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": newLikes
    })})
    .then(res => res.json())
    .then(item => console.log(item))
}
