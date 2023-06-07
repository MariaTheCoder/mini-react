const textArea = document.getElementById("text_area");
const saveBtn = document.getElementById("save_btn");
const outputContainer = document.getElementById("output_container");

saveBtn.addEventListener("click", () => {
  const input = textArea.value;

  const newOutputElement = document.createElement("p");
  newOutputElement.innerText = input;
  outputContainer.appendChild(newOutputElement);
});
