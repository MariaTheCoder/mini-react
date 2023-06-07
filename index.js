const textArea = document.getElementById("text_area");
const saveBtn = document.getElementById("save_btn");

saveBtn.addEventListener("click", () => {
  const input = textArea.value;

  console.log("new text input was loaded: ", input);
});
