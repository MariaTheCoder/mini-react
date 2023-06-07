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
  data.map((obj) => createGridItem(obj?.id, obj?.text));
}

function addNewDataToBackend(textAreaContent) {
  const newDataElement = { id: data.length, text: "", inEditMode: false };

  newDataElement.text = textAreaContent;
  data.push(newDataElement);

  console.log("new data element: ", newDataElement);
}

function createGridItem(id, textAreaContent) {
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

    console.log("found: ", found);
  });

  const newDeleteIcon = document.createElement("i");
  newDeleteIcon.innerText = "delete";
  newDeleteIcon.setAttribute("element_id", id);

  outputContainer.append(newOutputElement, newEditIcon, newDeleteIcon);
}
