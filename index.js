const textArea = document.getElementById("text_area");
const saveBtn = document.getElementById("save_btn");
const outputContainer = document.getElementById("output_container");
const deleteAllBtn = document.getElementById("delete_all_btn");

/* data */
const data = [];

/* Save the content of the text area and create a p element which contains this content once the Save button is clicked */
saveBtn.addEventListener("click", () => {
  const input = textArea.value;

  const newOutputElement = document.createElement("p");
  newOutputElement.innerText = input;

  const newEditIcon = document.createElement("i");
  newEditIcon.innerText = "edit";

  const newDeleteIcon = document.createElement("i");
  newDeleteIcon.innerText = "delete";

  outputContainer.append(newOutputElement, newEditIcon, newDeleteIcon);

  const newDataElement = { id: data.length, text: "" };
  newDataElement.text = input;
  data.push(newDataElement);
  console.log("new data element: ", newDataElement);
  console.log("data: ", data);
});

/* Delete all content of the output container when the Delete All button is clicked */
deleteAllBtn.addEventListener("click", () => {
  outputContainer.innerHTML = "";
});
