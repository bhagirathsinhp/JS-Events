const button = document.querySelector("button");

const buttonClickHandler = (event) => {
  // event.target.disabled = true;
  console.log(event);
};

// button.onclick = buttonClickHandler;

const moreBtnClickHandler = () => {
  console.log("This was Clicked");
};

const boundFn = buttonClickHandler.bind(this);

// button.addEventListener("click", buttonClickHandler);

// setTimeout(() => {
//   button.removeEventListener("click", buttonClickHandler);
// }, 2000);

// buttons.forEach((btn) => {
//   btn.addEventListener("mouseenter", buttonClickHandler);
// });

// window.addEventListener("scroll", (event) => {
//   console.log(event);
// });

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(event);
});

const div = document.querySelector("div");
div.addEventListener("click", (event) => {
  console.log("Clicked DIV");
  console.log(event);
});

button.addEventListener("click", (event) => {
  event.stopPropagation();
  console.log("Clicked Button");
  console.log(event);
  console.log(this);
});

// const listItems = document.querySelectorAll("li");
// listItems.forEach((listItem) => {
//   listItem.addEventListener("click", (event) => {
//     event.target.classList.toggle("highlight");
//   });
// });
const list = document.querySelector("ul");
list.addEventListener("click", (event) => {
  // console.log(event.currentTarget);
  // event.target.closest("li");
  event.target.closest("li").classList.toggle("highlight");
  form.submit();
});
