var websiteNameInput = document.getElementById("name");
var websiteURLInput = document.getElementById("url");
var modalContainerBox = document.querySelector(".modalContainer");
// var addBtn = document.getElementById("addBtn");
var linksList;

if (localStorage.getItem("linksList") == null) {
  linksList = [];
} else {
  linksList = JSON.parse(localStorage.getItem("linksList"));
  display(linksList);
}

function addLink() {
  if (
    websiteNameInput.classList.contains("is-valid") &&
    websiteURLInput.classList.contains("is-valid")
  ) {
    var link = {
      name: websiteNameInput.value,
      url: websiteURLInput.value,
    };

    linksList.push(link);
    localStorage.setItem("linksList", JSON.stringify(linksList));
    display(linksList);
    clearForm();
  } else {
    // modalContainerBox.classList.add("show");
    modalContainerBox.classList.remove("d-none");
  }
}

function clearForm() {
  websiteNameInput.value = null;
  websiteURLInput.value = null;

  websiteNameInput.classList.remove("is-valid");
  websiteURLInput.classList.remove("is-valid");

  modalContainerBox.classList.add("d-none");

  // modalContainerBox.classList.remove("show");
  // modalContainerBox.classList.add("d-none");
}

function deleteLink(deletedIndex) {
  linksList.splice(deletedIndex, 1);
  localStorage.setItem("linksList", JSON.stringify(linksList));
  document.getElementById("websiteContainer").innerHTML = "";
  display(linksList);
}

function display(arr) {
  var itemBlock = "";

  for (var i = 0; i < arr.length; i++) {
    itemBlock += `
        <tr>
            <td>${i}</td>
            <td>${linksList[i].name}</td>
            <td>
                <button class="btn lilac-color-bg text-white" onclick="visitURL(${i})"><i class="fa-solid fa-eye"></i> Visit</button>
            </td>
            <td>
                <button class="btn btn-danger" onclick="deleteLink(${i})"><i class="fa-solid fa-trash"></i> Delete</button>
            </td>
        </tr>
        `;
  }
  document.getElementById("websiteContainer").innerHTML = itemBlock;
}

function validateIndex(element) {
  var regex = {
    name: /^[A-Z][a-z0-9]{2,10}$/,
    url: /^(https:\/\/|http:\/)?(www\.)?([A-Za-z0-9-])+(\.[a-zA-Z0-9]{2,})?\.(com|net|org|edu)(\.[a-zA-Z0-9]{2,})?(\/?\w{0,}){0,}([?#].*)?$/,
  };
  if (regex[element.id].test(element.value) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.add("d-none");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.remove("d-none");
  }
}

function visitURL(index) {
  var url = linksList[index].url;
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }
  window.open(url, "_blank");
}

function closeModal() {
  modalContainerBox.classList.add("d-none");
}
