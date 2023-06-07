import { test } from "./test.js";

const textArea = document.getElementById("text_area");
const saveBtn = document.getElementById("save_btn");
const outputContainer = document.getElementById("output_container");
const deleteAllBtn = document.getElementById("delete_all_btn");

test();

/* data */
let data = [
  { id: 0, text: "Hello ", inEditMode: false },
  { id: 1, text: "world!", inEditMode: false },
];

/* Build a grid based on the content of the constant variable 'data'. This render function should be called whenever changes are made to the data array above */
render();

/* Save the content of the text area and create a p element which contains this content once the Save button is clicked */
saveBtn.addEventListener("click", () => {
  const input = textArea.value;
  textArea.value = "";

  addNewDataToBackend(input);

  render();
});

/* Delete all content of the output container when the Delete All button is clicked */
deleteAllBtn.addEventListener("click", () => {
  data = [];

  render();
});

function render() {
  /* Start by deleteing all current content of the output container */
  outputContainer.innerHTML = "";

  console.log("data: ", data);

  /* Look into the data array and do the following: 
      If the array is empty, then display a message inside of the output container explaining so 
      If the array is not empy, run createGridItem on each object's value of the text property */
  if (data.length === 0) {
    outputContainer.innerText = "Currently no data";
  }
  data.map((obj) => createGridItem(obj?.id, obj?.text, obj?.inEditMode));
}

function addNewDataToBackend(textAreaContent) {
  const newDataElement = {
    id: data[data.length - 1].id + 1,
    text: "",
    inEditMode: false,
  };

  newDataElement.text = textAreaContent;
  data.push(newDataElement);

  console.log("new data element: ", newDataElement);
}

function createGridItem(id, textAreaContent, inEditMode) {
  if (inEditMode === true) {
    const textOutputElement = createHTMLElement("input", textAreaContent, id);
    const saveIcon = createHTMLElement("i", "💾", id);
    const deleteIcon = createHTMLElement("i", "❌", id);

    /* Add an event listeniner to the icon. When icon is clicked, get the element id from the html element and store it as a number. Then look for the object inside of the data array which has the same id number. When that object is found, alternate the proerty of inEditMode */
    saveIcon.addEventListener("click", () => {
      saveEditToBackend(textOutputElement, saveIcon, "data-element_id");

      render();
    });

    /* Add an event listeniner to the icon. When icon is clicked, get the element id from the html element and store it as a number. Then look for the object inside of the data array which has the same id number. When that object is found, delete it from the data array and call the render function */
    deleteIcon.addEventListener("click", () => {
      deleteOneElementFromBackend("data-element_id", editIcon, data);

      render();
    });

    outputContainer.append(textOutputElement, saveIcon, deleteIcon);
  } else {
    const textOutputElement = createHTMLElement("p", textAreaContent, id);
    const editIcon = createHTMLElement("i", "✏️", id);
    const deleteIcon = createHTMLElement("i", "❌", id);

    /* Add an event listeniner to the icon. When icon is clicked, get the element id from the html element and store it as a number. Then look for the object inside of the data array which has the same id number. When that object is found, alternate the proerty of inEditMode */
    editIcon.addEventListener("click", () => {
      toggleEditMode(editIcon, "data-element_id", data);

      render();
    });

    /* Add an event listeniner to the icon. When icon is clicked, get the element id from the html element and store it as a number. Then look for the object inside of the data array which has the same id number. When that object is found, delete it from the data array and call the render function */
    deleteIcon.addEventListener("click", () => {
      deleteOneElementFromBackend("data-element_id", editIcon, data);

      render();
    });

    outputContainer.append(textOutputElement, editIcon, deleteIcon);
  }
}

function toggleEditMode(icon, id_attribute_name, data) {
  const elementId = Number(icon.getAttribute(id_attribute_name));

  const found = data.find((e) => e?.id === elementId);
  found.inEditMode = !found?.inEditMode;
}

function saveEditToBackend(textElement, icon, id_attribute_name) {
  /* Get the current value of input field */
  const currentInput = textElement.value;

  /* Find the data object with the same id as this icon and replace the value of property 'text' */
  const elementId = Number(icon.getAttribute(id_attribute_name));
  const found = data.find((e) => e?.id === elementId);
  found.text = currentInput;

  /* Remember to switch the value of inEditMode back before re-rendering */
  found.inEditMode = !found?.inEditMode;
}

function deleteOneElementFromBackend(id, icon, data) {
  const elementId = Number(icon.getAttribute(id));

  const foundIndex = data.findIndex((e) => e?.id === elementId);
  data.splice(foundIndex, 1);
}

function createHTMLElement(tag, value, id) {
  const HTMLElement = document.createElement(tag);

  if (tag === "input") {
    HTMLElement.value = value;
  } else {
    HTMLElement.innerText = value;
  }

  HTMLElement.setAttribute("data-element_id", id);

  return HTMLElement;
}
