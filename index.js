const textArea = document.getElementById("text_area");
const saveBtn = document.getElementById("save_btn");
const outputContainer = document.getElementById("output_container");
const deleteAllBtn = document.getElementById("delete_all_btn");

/* data */
const data = [{ text: "Hello " }, { text: "world!" }];

/* Build a grid based on the content of the constant variable 'data' */
if (data.length === 0) {
  outputContainer.innerText = "Currently no data";
}
data.map((obj) => console.log(obj.text));

/* Save the content of the text area and create a p element which contains this content once the Save button is clicked */
saveBtn.addEventListener("click", () => {
  const input = textArea.value;

  createGridItem(input);

  addNewDataToBackend(input);
});

/* Delete all content of the output container when the Delete All button is clicked */
deleteAllBtn.addEventListener("click", () => {
  outputContainer.innerHTML = "";
});

function addNewDataToBackend(textAreaContent) {
  const newDataElement = { id: data.length, text: "" };

  newDataElement.text = textAreaContent;
  data.push(newDataElement);

  console.log("new data element: ", newDataElement);
  console.log("data: ", data);
}

function createGridItem(textAreaContent) {
  const newOutputElement = document.createElement("p");
  newOutputElement.innerText = textAreaContent;

  const newEditIcon = document.createElement("i");
  newEditIcon.innerText = "edit";

  const newDeleteIcon = document.createElement("i");
  newDeleteIcon.innerText = "delete";

  outputContainer.append(newOutputElement, newEditIcon, newDeleteIcon);
}
