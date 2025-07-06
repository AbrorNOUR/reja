console.log("Frontend JS ishga tushdi");

function itemTemplate(item) {
    return ` <li
              class="list-group-item list-group-item-info d-flex align-items-center justify-content-between">
                <span class="item-text">${item.reja}</span>
                <div>
                  <button 
                    data-id="${item._id}"
                    class="edit-me btn btn-secondary btn-sm mr-1">
                     Ozgartirish
                  </button>
                <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Ochirish</button>
              </div>
            </li>`;
}

let createField = document.getElementById("create-field")

// Create oper
document.getElementById("create-form").addEventListener("submit", function (e) {
    e.preventDefault();

axios
    .post("/create-item", {reja: createField.value})
    .then((response) => {
        document.getElementById("item-list").insertAdjacentHTML("beforeend", itemTemplate(response.data))
     createField.value = "";
     createField.focus();
    })
    .catch((err) => {
        console.log("Iltimos qaytadan harakat qiling");
    });

});

// Checkbox oper
document.addEventListener('change', function(e){
    if (e.target.classList.contains('complete-checkbox')){
        const checkbox = e.target;
        const id = checkbox.getAttribute('data-id');
        const completed = checkbox.checked;
        axios
      .post("/checkbox-item", { id: id, completed: completed })
      .then(() => {
        const textEl = checkbox.closest("li").querySelector(".item-text");
        if (completed) {
          textEl.classList.add("text-decoration-line-through", "text-muted");
        } else {
          textEl.classList.remove("text-decoration-line-through", "text-muted");
        }
      })
      .catch(() => {
        alert("Somthing went wrong in checkbox part!");
      });
  }
});


document.addEventListener("click", function(e) {
    // Delete oper
    console.log(e.target);
    if(e.target.classList.contains("delete-me")) {
        if(confirm("Aniq ochirmoqchimisz?")) {
            axios
            .post("/delete-item", { id: e.target.getAttribute("data-id") })
            .then((response) => {
                console.log(response.data);
                e.target.parentElement.parentElement.remove();
            })
            .catch((err) => {
                console.log("Iltimos qaytadan harakat qiling");
            });
        }
    }

    // edit oper
    if(e.target.classList.contains("edit-me")) {
        let userInput = prompt(
            "O'zgartirish kiriting",
             e.target.parentElement.parentElement.querySelector(".item-text").innerHTML);
        if(userInput) {
            axios.post("/edit-item", {
                id: e.target.getAttribute("data-id"),
                new_input: userInput,
            }).then(response => {
                console.log(response.data);
                e.target.parentElement.parentElement.querySelector(
                    ".item-text"
                ).innerHTML = userInput;
            })
            .catch(err => {
                console.log("Iltimos qaytadan harakat qiling");
            });
        }
    }
});

// Delete all
document.getElementById("clean-all").addEventListener("click",function(){
    axios.post("/delete-all", { delete_all: true}).then(response =>{
        alert(response.data.state);
        document.location.reload();
    })
})