let namess = document.querySelector(".names");
let emails = document.querySelector(".email");
let imgs = document.querySelector(".img");
let contacts = document.querySelector(".contact");
let submits = document.querySelector(".submit");
let formList = document.querySelector(".formlist");

submits.addEventListener("click", () => {
  if (
    !namess.value.trim() ||
    !emails.value.trim() ||
    !imgs.value.trim() ||
    !contacts.value.trim()
  ) {
    alert(" you should complete all fields");
    return;
  }
  let formObj = {
    names: namess.value,
    email: emails.value,
    img: imgs.value,
    contact: contacts.value,
    // submit: submits.value,
    // formlist: formList.value,
  };
  setItemToStorage(formObj);
  createElement();
  namess.value = "";
  emails.value = "";
  imgs.value = "";
  contacts.value = "";
  //   submits.value = "";
  //   formList.value = "";
});

function setItemToStorage(form) {
  if (!localStorage.getItem("form-data")) {
    localStorage.setItem("form-data", "[]");
  }
  let formu = JSON.parse(localStorage.getItem("form-data"));
  console.log(formu);
  formu.push(form);
  localStorage.setItem("form-data", JSON.stringify(formu));
}
createElement();

function createElement() {
  let newForm = JSON.parse(localStorage.getItem("form-data"));

  //   console.log(formList);
  formList.innerHTML = "";

  if (newForm !== null) {
    newForm.forEach((item, index) => {
      const card = document.createElement("div");
      card.innerHTML += `
      
      <li class='container'> ${item.names}</li>
      <li class='container'> ${item.email}</li>
      <img  class='container' width='150px'src=${item.img} alt="picture"/>
      <li class='container'> ${item.contact}</li>
      <div class="card__btn_row">
      <button class="remove container"  id=${index}>Delete</button>
      <button class="redac container" id=${index}>Edit</button>
      </div>
      `;

      formList.append(card);
    });

    let btnDelete = document.querySelectorAll(".remove");
    let btnEdit = document.querySelectorAll(".redac");

    btnDelete.forEach((item) => {
      item.addEventListener("click", (e) => {
        let index = e.target.id;
        deleteElement(index);
      });
    });

    btnEdit.forEach((item) => {
      item.addEventListener("click", (e) => {
        let index = e.target.id;
        editElement(index);
      });
    });
  }
}

function deleteElement(index) {
  let data = JSON.parse(localStorage.getItem("form-data"));
  data.splice(index, 1);
  localStorage.setItem("form-data", JSON.stringify(data));
  createElement();
  // console.log(data);
}
let mainModal = document.querySelector(".main-modal");
// let inpEdit = document.querySelector(".inp-edit");
let btnClose = document.querySelector(".btn-closer");
// let btnSave = document.querySelector(".btn-save");

let namesInpp = document.querySelector(".namesInp");
let emailInpp = document.querySelector(".emailInp");
let imgInpp = document.querySelector(".imgInp");
let contactInpp = document.querySelector(".contactInp");
let btnSaveInp = document.querySelector(".btn-saveInp");

function editElement(index) {
  mainModal.style.display = "block";
  let data = JSON.parse(localStorage.getItem("form-data"));

  namesInpp.value = data[index].names;
  emailInpp.value = data[index].email;
  imgInpp.value = data[index].img;
  contactInpp.value = data[index].contact;

  namesInpp.setAttribute("id", index);
  emailInpp.setAttribute("id", index);
  imgInpp.setAttribute("id", index);
  contactInpp.setAttribute("id", index);
  btnSaveInp.setAttribute("id", index);
}
btnClose.addEventListener("click", () => {
  mainModal.style.display = "none";
});

btnSaveInp.addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("form-data"));

  let index = namesInpp.id;
  // console.log(index);

  if (
    !namesInpp.value.trim() ||
    !emailInpp.value.trim() ||
    !imgInpp.value.trim() ||
    !contactInpp.value.trim()
  ) {
    alert("complete all fields");
    return;
  }
  let editedTask = {
    names: namesInpp.value,
    email: emailInpp.value,
    img: imgInpp.value,
    contact: contactInpp.value,
  };

  data.splice(index, 1, editedTask);
  localStorage.setItem("form-data", JSON.stringify(data));
  mainModal.style.display = "none";
  createElement();
  // console.log(editedTask);
});
