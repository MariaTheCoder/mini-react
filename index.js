const textArea = document.getElementById("text_area");
const saveBtn = document.getElementById("save_btn");
const outputContainer = document.getElementById("output_container");
const deleteAllBtn = document.getElementById("delete_all_btn");

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
    const newOutputElement = createHTMLElement("input", textAreaContent, id);
    const saveEditIcon = createHTMLElement("i", "save", id);
    const newDeleteIcon = createHTMLElement("i", "delete", id);

    /* Add an event listeniner to the icon. When icon is clicked, get the element id from the html element and store it as a number. Then look for the object inside of the data array which has the same id number. When that object is found, alternate the proerty of inEditMode */
    saveEditIcon.addEventListener("click", () => {
      /* Get the current value of input field */
      const currentInput = newOutputElement.value;

      /* Find the data object with the same id as this icon and replace the value of property 'text' */
      const elementId = Number(saveEditIcon.getAttribute("element_id"));
      const found = data.find((e) => e?.id === elementId);
      found.text = currentInput;

      /* Remember to switch the value of inEditMode back before re-rendering */
      found.inEditMode = !found?.inEditMode;

      render();
    });

    /* Add an event listeniner to the icon. When icon is clicked, get the element id from the html element and store it as a number. Then look for the object inside of the data array which has the same id number. When that object is found, delete it from the data array and call the render function */
    newDeleteIcon.addEventListener("click", () => {
      const elementId = Number(newEditIcon.getAttribute("element_id"));

      const foundIndex = data.findIndex((e) => e?.id === elementId);
      data.splice(foundIndex, 1);

      render();
    });

    outputContainer.append(newOutputElement, saveEditIcon, newDeleteIcon);
  } else {
    const newOutputElement = document.createElement("p");
    newOutputElement.innerText = textAreaContent;
    newOutputElement.setAttribute("element_id", id);

    const newEditIcon = document.createElement("i");
    newEditIcon.innerText = "edit";
    newEditIcon.setAttribute("element_id", id);

    /* Add an event listeniner to the icon. When icon is clicked, get the element id from the html element and store it as a number. Then look for the object inside of the data array which has the same id number. When that object is found, alternate the proerty of inEditMode */
    newEditIcon.addEventListener("click", () => {
      const elementId = Number(newEditIcon.getAttribute("element_id"));

      const found = data.find((e) => e?.id === elementId);
      found.inEditMode = !found?.inEditMode;

      render();
    });

    const newDeleteIcon = document.createElement("i");
    newDeleteIcon.innerText = "delete";
    newDeleteIcon.setAttribute("element_id", id);

    /* Add an event listeniner to the icon. When icon is clicked, get the element id from the html element and store it as a number. Then look for the object inside of the data array which has the same id number. When that object is found, delete it from the data array and call the render function */
    newDeleteIcon.addEventListener("click", () => {
      const elementId = Number(newEditIcon.getAttribute("element_id"));

      const foundIndex = data.findIndex((e) => e?.id === elementId);
      data.splice(foundIndex, 1);

      render();
    });

    outputContainer.append(newOutputElement, newEditIcon, newDeleteIcon);
  }
}

function createHTMLElement(tag, value, id) {
  const HTMLElement = document.createElement(tag);

  if (tag === "input") {
    HTMLElement.value = value;
  } else {
    HTMLElement.innerText = value;
  }

  HTMLElement.setAttribute("element_id", id);

  return HTMLElement;
}
