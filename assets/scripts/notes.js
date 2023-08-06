// WORKING WITH EVENTS....


// 1. Module Introduction...

// We will learn about event beyond click listeners.
// Events are an important thing in JS - beyond just browsers but every JS scope..
// In this module - we will focus on browser side JS.


--------------------------------------------------------------------------------------------------


// 2. Introduction to Events in JavaScript...

// Core idea behind events exists in most programming languages.
// Idea is that we can run code upon certain events = like clicking a button, an upload finishing, video playback etc - lot of events that should trigger the code to run.

// Could also think about more abstract events that could happen on a server like an incoming request or some scheduled task which should run every x hour triggered by some timer.

// So the exact implementation defers between browser side and server side(nodeJS).
// On browser side - we can add event listener to a DOM node.
// In nodeJS - we often see on or once as methods we chain on some object which then allow us to listen to certain events.

// The general idea is the same - event often or typically transfer data.

// In this module we will take a look at which data is being transported and we will get that data - the object that is created for each event automatically as an arg passed into the function you register as a event listener.
// We ignored that arg - that object. But we get it automatically.

// An event typically comes with some data which describes the event which might hold metadata which basically helps us interact with that event and run some code based on it.

// In browser context we have certain events we can listen to - a click on a button or a click on anything else, a right click or a double click, hovering over something or moving the mouse button away from something.

// We have an event constructor function - a core event object with some core functionality which all events share.
// Then we have specialized event constructor functions - MouseEvent, DragEvent etc. which are based on that core event with help of prototype which hold additional info that only makes sense for certain events..
// For eg : we have MouseEvent - that might yield coordinates of mouse button when the event occurred.
// It might also hold Event Target which describes the element in DOM on which the event was triggered or which was responsible for this event.
// Event target is actually exposed by that core event object and shared amongst all events - which is not the same for coordinates as it is specific to the MouseEvent.

// DragEvent will hold extra data which we attach to a drag and drop interaction.
// It also has an Event Target.

// There are way more events with way more data but also has some common things such as Event Target.
// They also have their special kind of data too.

// We can learn more about event with MDN.
// We can also find detailed reference of the objects and methods and properties.


----------------------------------------------------------------------------------------------------------


// 3. Different Ways of Listening to Events...

// We will work on a project alongside our Project which we did on last modules..
// We see a button on the page.
// We haven't add any listener to the button.

// There are various ways of adding a listener to this button - the oldest and not so much use way is to set 'onclick' to HTML code.
<button onclick='alert("Hello There")'>Click Me</button>

// The onclick is one of the ON attributes which we get in HTML - in there we can add a function that we defined in events.js or anything we wanna call - we called the alert method.
// Although we should not use this approach as it will make our project much harder to work with...
// DON'T MIX HTML-HTML ATTRIBUTES AND JS CODE, NOT RECOMMENDED.

// We should register events in our JS file.
// In event.js = we get access of the button.

const button = document.querySelector('button')
// We have another way of setting an event listener on click which is similar to what we learned right above.

// We set a value - a property to the onclick.
// We set this equal to some code that is to be executed.
button.onclick = function(){};
// This always should be set equal to a function, could be anonymous, also be pointing at a name or an arrow function...
const buttonClickHandler = () => {
  alert ('Button was Clicked');
}
// We will point this function on our onclick.
button.onclick = buttonClickHandler;
// We don't execute it with () as it will have to be executed when and only the button is clicked..
// We click on the button and we can see the alert.

// The downside of onclick is that we can only attach one function to it's button or anything that it is attached to. For eg: we have 2 functions we wanna run on it, we can't assign it to button.onclick.
// If we have 2 functions: the 2nd function we add now...
const moreBtnClickHandler = () => {
  console.log('This was clicked')
}

button.onclick = buttonClickHandler;
button.onclick = moreBtnClickHandler;
// And if we run this - the 1st won't run as 2nd function overwrote the value of the 1st.
// Ofcourse we can create a 3rd function which call these both functions which we assign to onclick but that gets cumbersome as we don't have control over when and which handler we wanna use.

// So this method is not recommended - the recommended is to use addEventListener() as we can add multiple event listeners to the same element.
// We also have a remove event listener() which helps us remove a listener on the element.


-------------------------------------------------------------------------------------------------


// 4. Removing Event Listeners...

// We will add an event listener.
button.addEventListener('click')
// Now in place of click, we can also add dblclick, rightclick or contextmenu, etc. we will see these options on autocompletion.
// Here we wanted to use click so we added it.

// The 2nd arg is the function that should be executed when the click occurs.
// Here, we point at those functions - we go with buttonClickHandler....
button.addEventListener('click', buttonClickHandler)
// We see the work in page.
// Now we wanna remove this event listener.
// We use removeEventListener().
// We set a timer - 2secs - to remove this listener...
// We set it to the element which we assigned the event listener.

setTimeout(()=>{
  button.removeEventListener('click', buttonClickHandler)
}, 2000)
// Here we added the same function which we added to add event listener.
// It's SUPER IMPORTANT TO ADD THE EXACT SAME FUNCTION OBJECT.
// We will learn about pitfalls we could face with remove event listener right here.

// So now we reload and click on the button right away it works but if we wait for 2 secs - it won't work..
// This is how we can get rid of event listener..

// We will now learn about the pitfalls of remove Event listener.
// We remove an eventlistener not with some ID that's returned by add event listener - which we pass to remove event listener. 
// But by specifying the exact same listening setup as we have in add EL (event listener - we will call it EL from now).

// IMP - We cannot use anonymous function or arrow function with no preassigned name to it on the remove EL.
// It's cause both the function objects that we have on add and remove EL are DIFFERENT OBJECTs.
// So it is mandatory to store that function in a const when then holds the address of this function.
// And then we use that const to remove EL.

// The similar pitfall is if we BIND(THIS) or pass in some arg.
// Bind creates a new function object - therefore we create a new function object on both the EL.
// We wanna BIND(THIS) - we have to store it in a function.

const boundFn = buttonClickHandler.bind(this);

button.addEventListener('click', boundFn);

setTimeout(() => {
  button.removeEventListener("click", boundFn);
}, 2000);

// Thus it works.


------------------------------------------------------------------------------------------------------


// 5. The "event" Object....

// Let's have a look at that event object which is core behind event driven code.
// Whatever causes an event typically also provides us some data along with such an event to describe it, to give us some extra metadata or to give some extra methods to control how the event listener behaves thereafter.

// On buttonClickHandler we will accept an arg.
const buttonClickHandler = (event) => {
  console.log(event);  
};
// And also we will directly point our buttonclickhandler to the remove and add EL...
// So now if we click on the button we get a mouseEvent or click on firefox.
// It has bunch of properties and bunch of methods.

// We have bunch of properties which describes the event. For Eg: the altkey property says false cause the alt key wasn't pressed while clicking, we have similar properties for ctrl key too in there.

// We see such properties in there.
// We also have clientX and clientY - these are exact coordinates of where the pointer curson was when I clicked. The coordinates changes acc. to our pointer place of clicking.

// We can check the MDN for the properties for what each does.
// The offsetX and offsetY are the coordinates for inside the button when clicked.

// In there we see one very imp property - target.
// Every event has this - it describes which element caused this event.
// Target here gives us access to button DOM element.
// This can be useful - which will give us direct access to the DOM element.

// We look at the example regarding target.
// We add another button in HTML.
// Then we use querySelectorAll to select all the buttons and change the name of const to buttons.
const buttons = document.querySelectorAll('button')
// We comment out removeEL and AddEL.
buttons.forEach(btn => {
  btn.addEventListener('click', buttonClickHandler)
})

// And as we reload and click on either of the buttons to trigger the event.
// Let's say we want to disable the button which we clicked. It would be pretty hard to do this without knowing on which button we clicked - we would have to probably create two different methods or functions which we assign as listeners which would be cumbersome.

// With event target - we type this in buttonClickHandler 
 
const buttonClickHandler = (event) => {
  event.target.disabled = true;
  console.log(event);
};

// Button has disable property.
// Now we click on the button once - we see the event object but we cannot click on it twice as it was disabled....
// We see disabled attribute on the button.


------------------------------------------------------------------------------------------------


// 6. Supported Event Types...

// We have more than just click events.
// We can register them inside our EL.
// For eg: mouseenter - this will be triggered when mouse enters the button.
// We comment out the disabled buttons and then look at the work this does...

buttons.forEach((btn) => {
  btn.addEventListener("mouseenter", buttonClickHandler);
});
// Thus the event is triggered as much times as we move our mouse on it but if we keep it on the button it doesn't enter more event in console.

// If we inspect the event now - we see relatedTarget property.
// This tells us which element the cursor was on before moving it on the button - here it is div which surrounds the buttons.
// If we move the cursor faster - the relatedTarget property will show html rather than div cause browser can't register it if we move it very fast.

// We can register events on any DOM elements, on any HTML element and not just only on button.

// We can register event to the overall window. 
// For eg: to listen to scroll events.
// To demonstrate this we will add a section in HTML with ID - long-one.
<section id='long-one'></section>
// In CSS we will add selector with height of 3000px making it a big invisible section with scrolling..

// Let's see how to listen to scroll events.
// On event.js = we type window.addEventListener('scroll') - we register scroll event.

window.addEventListener('scroll');
// In here we can output the event object.
window.addEventListener('scroll', event => {
  console.log(event)
});

// Now we scroll - we see lot of events are entered for each time we scroll.
// Therefore we must be careful with it as it occurs to many times which can make things complex and slow down our page.
// It targets the entire document.

// We can do some fun with it for eg - we could calculate how far the user is away from the bottom so that we can add more content to the bottom when the user is close to the bottom - this provides such as INFINITE Scroll feeling.

// In the folder, there's a dummy infinite scroll code snippet note which we could use.

// NOw as we know what events are - how do we know which events exist on which element. For eg: we have scroll event here which we can listen to on a window, can we also listen to that on a button though?
// We can type 'scroll' in EL therefore we can listen to it there.

// IMP - Almost all DOM Elements support all events..
// MDN is the place to look into it.
// For eg - we go to button MDN, on HTML Element page of it - we see various ON listeners.
// We can listen to ON any element which is based on HTML Element.


----------------------------------------------------------------------------------------------


// 7. Working with "preventDefault()"...

// Let's comment out the listeners example...
// Let's dive into another kind of event.
// For this we will add FORM element below div in HTML.
// In there we will add a label and input.
<form action=''>
  <label for='title'>Title</label>
  <input type='text' id='title'></input>
  <button type='submit'>Submit</button>
</form>

// We will get the button.
// We get the form in which we can enter something and press submit.
// The page reloads when hit submit!
// It reloaded cause the default behavior of form with submit button is to send form data to the server.
// Here we don't have any server - but eventually we have to get the user input to that server to store it in a database and so.

// Often when we use HTML, we wanna prevent sending data to server always when the button is pressed.
// Instead we wanna step in with JS and validate the user input before and then we take it and send it with help of JS - we will learn about this is HTTP module.

// We wanna listen to that form submission.
// We select our form with queryselector.

const form = document.querySelector('form');
// So on form we add EL, and add submit event which is special for form elements.
form.addEventListener('submit', (event)=>{console.log(event)})

// Now in the webpage we reload and press submit and we see the logged in data but it disappears in a sec.
// It's cause we send the data to server automatically, reloads the page.

// Now we do what we haven't done before.
// The event object gives us methods to control the events.
// There we got a method which we call before console.

form.addEventListener('submit', (event)=>{
  event.preventDefault();
  console.log(event)
})
// This preventDefault() exists on any event object on JS.

// It prevents the default behaviour the browser would apply for this event otherwise.
// The default behavior depends on the type of events.
// Here submit's default behavior is to submit that form to a server.
// For link - it's default is to go to a link.

// Now we can implement our own logic rather than our default behavior.
// Now we can see the event object being logged in the console.

// We use this method to avoid default behavior and override it.


-------------------------------------------------------------------------------------------------------


// 8. Understanding "Capturing" & "Bubbling" Phases..

// How does the events behave exactly?

// Our events in JS, in browser side JS has 2 phases through which they run essentially and where they trigger our EL.
// BUBBLING & CAPTURING Phase.

// Let's say we have a button in a div which is in a section.
// We click that button, what happens is that the browser runs through 2 phases where it checks for listeners to that event.

// 1st: it runs through a phase which is called capturing phase.
// 2nd: it runs through a phase called bubbling phase.

// Capturing phase goes from outside to inside - section to div to button.
// A click event on such nested button here cannot be listened to with EL on button but also with an EL on that section.
// Browser on the capturing phase checks if we got a capturing EL on let's say the section registered.
// It would then run it's function before any EL registered on button, because it's from outside to inside.
// And the section is outside of the button.

// The bubbling is the opposite phase.
// It will go from inside to outside.
// All EL we add with AddEL are by default registered in bubbling phase.
// If we have an EL on the button and on the section, the button EL will run first and the section EL will run second.

// We can do interesting things with bubbling and capturing which we will learn..


-----------------------------------------------------------------------------------------------------


// 9. Event Propagation & "stopPropagation()"...

// Let's make sure we fully understand what's happening.
// We will use our buttons - just the first button we find here.
const button = document.querySelector('button')
button.addEventListener('click', event=>{
  console.log(event)
})

// We will also get the access of div in which the button is there.
const div = document.querySelector('div')
div.addEventListener('click', event=>{
  console.log('Clicked DIV')
  console.log(event)
})
// We consoled clicked div to differentiate with clicked button.

button.addEventListener('click', event=>{
  console.log('Clicked Button')
  console.log(event)
})

// It doesn't matter if we add div's listener before or after the button's.

// Now if we click on the button - we see button and div are executed on after another respectively.
// Capturing phase is totally ignored as AddEL are registered as bubbling phase - which goes from inside to outside, thus executing button and then div.

// So it goes from the event to all it's ancestors and checks if there are EL on them, and if there - it executes them..

// We could switch to Capturing phase as we add 3rd argument to the ELs.
// On div we add a 3rd parameter and if we set it to true, the default is false. But if it's set to be true - we are telling the browser this EL should be part of the capturing phase.
div.addEventListener("click", (event) => {
  console.log("Clicked DIV");
  console.log(event);
}, true);

// We don't have to switch all EL to capturing phase as we have div.
// Now when we reload and click on the button, div EL is to be executed first and then button's.
// Div is registered as capturing phase which goes from outside to inside.

// This can be useful to switch the order.
// Also useful if we have ancestor elements on EL and we wanna execute the ancestor first.. We remove true here as we don't have any work for it.

// Having multiple listeners on same event because the event doesn't trigger on the element itself but also on the ancestors - that's called Propagation.

// The event propagates up - bubbles up or in capture phase it kinda goes from outside to inside = but basically means event occurs on all ancestors or as least we can listen on all ancestors.

// We can prevent this however.
// We have listener on div & we want to react on click on div and not on button.
// To make sure event on button doesn't propagate - we use event.stopPropagation() in the event function of EL.
button.addEventListener("click", (event) => {
  event.stopPropagation();
  console.log("Clicked Button");
  console.log(event);
});
// It's not the same as prevent default as this stops default behavior browser might perform.
// Stop propagation won't stop default behavior.
// This will stop the trigger on ancestor button.

// We also have -
event.stopImmediatePropagation() // if we have multiple event listeners on same element.
// So after the first EL on button, other listeners on it wouldn't run anymore.

// Not all events propagates.
// For eg: mouse move events doesn't propagate.
// If we use mouseenter as event - and move the cursor on div and then on button - both will trigger as they do normally - there won't be any propagation where an ancestor is triggered.
// It's just common sense.
// And if we wanna make sure the event doesn't propagate - we can listen to that event on console where we get it's event object.
// In there - we can see if the bubble property is false or not.
// And hence if not - then we won't have to call stop propagation.


---------------------------------------------------------------------------------------------------------


// 10. Using Event Delegation...

// With event propagation we can do many things.
// We can implement a pattern called event delegation.
// In HTML, we have ul or any list data where this pattern shines.
// We quickly add some styles.
// Now we wanna click on these items and color the clicked item Red.
// If it's red, we wanna remove the color.

// There are 2 possible approaches.
// 1 is to select all li and add multiple listeners.
// We use forEach for it.
// Then there we use target.classList because event target is a DOM Element so we have classList property available.
const listItems = document.querySelectorAll("li");
listItems.forEach(listItem => {
  listItems.addEventListener('click', event => {
    event.target.classList.toggle('highlight')
  })
}) 

// We add this highlight css class in CSS..
// Thus we register multiple click listeners on all the elements.
// Now we can click them and toggle our color.
// Disadvantage to it is - it's very cumbersome to add multiple listeners.
// Additionally it can get bad performance and memory management.

// Let's have the look at alternative approach - delegate pattern.
// Here instead of adding multiple listeners on each list items - we take advantage of event propagation.
// We get access to entire list.
const list = document.querySelector('ul')
// Since events bubble up - we can also listen to a click on the list when we actually clicked on a listitem.
// Here we copy the logic.
list.addEventListener('click', event => {
  event.target.classList.toggle('highlight');
})
// Even if listener is regestered on list, event target will refer to the actual target on which we clicked which in this example is our list item.

// So now we got one EL instead of multiple ELs.
// We are taking advantage of event propagation.
// We are adding EL to the next higher element - here's it's ul instead of every child element.
// This is Event DELEGATION pattern.

// Event delegation can get messy sometimes...
// If we have title (heading) h and p tag in the all the li.
// We can see that if we click on the title area, only that becomes red - and if we click on paragraph area - it becomes red and if we click somewhere outside on the list - the whole list item becomes red.
// So there's inconsistancies.
// Event target is the actual DOM element we clicked and that's the lowest possible element.

// Coloring or using event target here is not helping.
// We have another property here.

console.log(event.currentTarget);
// This is diff from event target.
// If we click somewhere on the list.
// It will show the entire unordered list.
// Current target is the element on which we added the listener.
// Current target refers to list element.

// But it's still not the list item - it's list we clicked upon.
// We can use a combination of Event target and DOM traversal to get access of our list.
// We know that our list item is inside our ul. 
// It's either list item - the h2 tag or the p tag.
// We learned about a specific method - we access event.target which is some DOM object inside of our list ===
event.target.closest();

// Closest() exists on all DOM objects and it traverses up in the ancestor tree.
// There we can select a closest element with certain CSS selector - by ID - by Tag - by Class.
// Here we are looking for closest('li').
event.target.closest('li');

// Closest() does include this element on what we call it - itself.
// So if we clicked on the list item (li) it would give the li itself.
// If h2 clicked - inside of li, it will give closest li ancestor which is the li.
// It always gives us the closest li which we need here.

// Therefore we can now call classList toggle on the closest list item.
event.target.closest('li').classList.toggle("highlight");
// This will always select the whole list item and not the individual tags.


-----------------------------------------------------------------------------------------------


// 11. Triggering DOM Events Programmatically...

// We learned a lot about events - how to listen to them, how to work with event object, what we can get out of the event object and about event delegation pattern.

// Sometimes we don't just want to listen to an event but also wanna trigger an event programmatically.
// We will learn how it works.

// If we click any list item - we also wanna trigger a click event on the button.

// From inside list EL we wanna trigger button EL.

// Ofcourse we can store the event function in some name (the function in button EL) and then call it from list EL. But let's say we don't have that option...

// As we are in MAX's world - he is notoriously known to change script on the go - so now we take the example of forms - well it's a better suited example here though.
// Let's say we click list item and from that we want our form to be submitted.

// We need access to the element which we want the event to be triggered.
// Here it's - form.
// We will call FORM element in list EL.
// We will add the event that is to be listened - can be click, mouseenter but here for form - it's submit and add it as a method.

list.addEventListener("click", (event) => {
  // console.log(event.currentTarget);
  // event.target.closest("li");
  event.target.closest("li").classList.toggle("highlight");
  form.submit()
});

// This methods exists for all the DOM elements if we want them to trigger event programmatically.
// This works, but...

// The preventDefault method isn't working here from the form element EL.
// Now if we trigger a submit event listener programmatically - the submit EL is skipped.
// Now if we - button.click() in list EL - this will trigger the button EL and we will see a dummy mouse event being executed in console.
// But it isn't the case with submit.

// Submit EL is bypassed.
// To work around it - we could select the submit button from the DOM and use click() on that button.
// THis will do the same as the user clicked the submit button which will then trigger the Submit EL and allow us to preventDefault().


-----------------------------------------------------------------------------------------------------


// 12.  Event Handler Functions & "this"..

// NOTE about THIS.
// THIS is bound to something else - to event source inside of an EL function.
// Therefore we had to use BIND or the arrow function to make sure THIS points to the right thing.
// Let's see an example.

// We console log THIS on button EL.
// We use an arrow function in there.
button.addEventListener("click", (event) => {
  event.stopPropagation();
  console.log("Clicked Button");
  console.log(event);
  console.log(this);
});
// It consoles the window object here.
// Arrow function ignores all binding to THIS when the function gets called and here the thing calling the function is Browser.

// If we call the function normally - THIS points to the button tag here.
// In the end THIS points to event.target here - basically the element on which we registered the EL.
// We can see the example for it in list EL - as in there when we call normal function and console THIS, it will point to entire ul which is the current target..

// We learned how THIS works and how we can override what it can point toward.


-------------------------------------------------------------------------------------------------


// 13. Drag & Drop - Theory...

// Let's learn how to implement the Drag & Drop behavior.

// First we need to make sure of the steps where we make elements dragable and droppable on webpage or somewhere else and make something happen.

// We need to mark elements as 'draggable' - with this attribute or setting this property True in DOM.
// Next is to listen to Drag Start event on element which is draggable.
// This will be triggered whenever the user starts dragging the event.
// In EL - we can interact with event object to describe the drag operation - if we are copying or moving - which will affect the display of cursor and so on for example.
// We can append data to the event because a drag and drop is combination of different events and to make sure they work together.

// We also have to tell JS where the item can be dropped.
// User can drop it anywhere but we don't support it to be dropped anywhere on our page - so to mark the droppable areas.
// We have to add EL to the element on which other element can be dropped.

// We add listener to accept drop via - 'dragenter' and 'dragover' events.
// We can omit the dragenter but we will need to set dragover event.
// Both will be triggered when the item is dragged over that element.
// Difference is 'dragover' also triggers for child elements of the element. Dragenter won't trigger there.

// We have to call preventDefault() to EL where we set these events.
// Because the default is always that the drop operation is cancelled - not allowed on element.
// We use preventDefault() to allow drop operation.

// We can optionally listen to 'dragleave' event if we wanna update the UI.

// We listen to drop event on the same element where we listen to drag enter and drag over.
// The drop event will only be triggered if we prevented the default in dragenter and dragover - and the item is dropped onto that same element.

// In that drop event we can do whatever we wanna do like update UI, update some data, move element on the UI and anything like that.
// When we make an element draggable, User will see the drag event visually but technically it isn't moving in the DOM - we have to do that programmatically through JS if we wanna update DOM after performing the operation.

// Optional - we can listen to 'dragend' event - not on the place it was dropped but on the dragged element itself and there we could also then update UI or some user data.
// Dragend event is always fired even if the drop is cancelled.
// So if element was dropped in an invalid area - we will get some property on event object whether the drop was successful or not..


-------------------------------------------------------------------------------------------------


// 14. Configuring Draggable Elements....

// Supported Data types link..
// https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Recommended_drag_types

// Possible 'effectAllowed' Values link..
// https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/effectAllowed

// We are back on the Project...
// We implement the drag and drop.
// We also will disable the analytics by commenting it's code...

// We go to HTML page of the project and in the list item (li) which we wanna drag and add:
draggable='true';
// We do it for all the li in the index.html.

// Once we do it and reload we can drag the projects around.
// Dropping won't do anything yet but we get the transparent visual feedback.

// Next step is to listen to dragstart event.
// We wanna do it on the item we are dragging - so project item in app.js.

// We create a drag method to listen to it and call it in the constructor - this.connectDrag().

// In connectDrag we add EL.
// We get the element by get element with this.id cause we have element id stored in ID property of this class..
// Then add EL to it.
connectDrag(){
  document.getElementById(this.id).addEventListener('dragstart', event => {})
}
// We get event object in the function and in there we can configure the drag event.
// We can configure the data we wanna append or which kinda operation it is so that the browser can display the currect cursor and we can also change the preview image when we drag something.
// By default it's the preview of the DOM element but we can point it to any image we want.

// In the end of this module we have articles regarding things we can do with drag and drop.

// Now in the function we append some data.
// We append the ID of the element we are dragging, so that when we drop it somewhere - we can extract the ID from the event object and do something with that.
// Otherwise we won't know which kind of element was dragged in the place we dropped.

connectDrag(){
  document.getElementById(this.id).addEventListener('dragstart', event => {
    event.dataTransfer.setData();
  })
}
// As it is drag event - on event object we will have data transfer with setData() method.
// On setData() we can set data of diff types.
// The link to see what kind of data we can set in the method is on the top of this lecture - supported data links..
// We can add plain text identified with 'text/plain' identifier and then any text of our choice.
// We can attach links, html-xml content and much more.
// And what we attach here - we can set it to the drop point so we can check that the user don't drop any droppable data there.

// Here we go with plain text...
// And we pass this.id as it's just a string...
connectDrag(){
  document.getElementById(this.id).addEventListener('dragstart', event => {
    event.dataTransfer.setData('text/plain', this.id);
  })
}
// We can also set another property on data tranfer = effectAllowed.
// Here we describe which kind of drag and drop operation is getting performed.
// The values we can add to it are in the other link mentioned above.
// We can have a move operation or a copy operation and so on..
// The browser cursor should be updated accordingly.

// We go for regular - move in the effect.
connectDrag(){
  document.getElementById(this.id).addEventListener('dragstart', event => {
    event.dataTransfer.setData('text/plain', this.id);
    event.dataTransfer.effectAllowed = 'move'
  })
}
// With this the drag event is configured.
// Next step - to make a certain part of our page a drop zone.


-------------------------------------------------------------------------------------------


// 15. Marking the "Drop Area"...

// To mark something as drop zone we need to add an EL and prevent the default.
// Now when we drag an element, we wanna drop it into the list.
// That's why we work with the project list.

// We add a new method - connectDroppable(){} and trigger it inside of the constructor.
// We get access to the list with the same const from constructor and remove li from it and get access to ul. This get's us access to the list element and not the section.
connectDroppable(){
  const list = document.querySelectorAll(`#${this.type}-projects ul`);
}

// In here we can add event listener, 2 of them - dragenter and dragover..
// We will pass in events in both and the difference is when they are triggered regarding nested child elements.
// We need drag over listener as in there we need to call event prevent default - for drag enter it's optional but we will do both.
connectDroppable(){
  const list = document.querySelector(`#${this.type}-projects ul`);
  list.addEventListener('dragenter', event => {
    event.preventDefault()
  });
  list.addEventListener('dragover', event => {
    event.preventDefault()
  });
}

// With preventDefault we would be able to drop our element and the drop event would be triggered.
// If we don't do this, we can drop it there but the event won't trigger.
// We also will check the type of what is dragged over.
// We use types in data transfer which is an array that exists in there.
// We use [0] to have a look at the first element.
// We check if that's text/plain and if it is we prevent the default.
  list.addEventListener('dragenter', event => {
    if(event.dataTransfer.types[0] === 'text/plain'){
      event.preventDefault()
    }
    
  });
// If we drag anything here - as in this page we can't drag anything as nothing else is marked draggable but in other apps where other things are also marked draggable - we might wanna add such extra check to make sure we are only accepting the right kinda data to be dragged.

// Side note we can't access the data here as we can only access the type of it.
// We can't read the ID in the if check.
// We will able to get that data in the drop event and that is the place where we update our UI..

// We wanna add some effect to the dragged event for user to see.
// In the dragenter EL we will add a new classname and style it in CSS...
  list.addEventListener('dragenter', event => {
    if(event.dataTransfer.types[0] === 'text/plain'){
      event.preventDefault()
      list.parentElement.classList.add('droppable')
    }
    
  });
// The problem here is that the background doesn't get unmarked!
// We also updated the style in the IF check cause that is the only condition under which we should be able to drop something there.

// Now we change the style again after the item leaves the box.
// We will add another EL for it - dragleave.
// We remove the droppable class here.
list.addEventListener('dragleave', event => {
  list.parentElement.classList.remove("droppable");
})
// Now with just this, we can see in the page that we are still on the list then too the background color is removed - as soon as the curson moves on any child item the color is removed.
// Same for the bottom list - the background gets unmarked when on other item.

// The issue here is that the DragLeave event fires when we leave the list and here we enter the child item of the list.
// We add a if check.
// We will make sure that the class is removed only when we leave into a non-child item.

// For that we use event.relatedTarget in the if condition.
// It will point the element we moved to as it also exists for dragleave.
list.addEventListener('dragleave', event => {
  if(event.relatedTarget){
    list.parentElement.classList.remove("droppable");
  }
})
// So when we leave the unordered list here - the cursor is now somewhere else, the somewhere else element will be the related target.

// Now we check if the related target is inside of the list - in that case do we want to remove the class or not..
// We use closest() to select the closest ul with our querySelector.
// As we use THIS inside the handler function - we make sure we use an arrow function or bind() to it. 

list.addEventListener('dragleave', event => {
  if(event.relatedTarget.closest(`#${this.type}-projects ul`)){
    list.parentElement.classList.remove("droppable");
  }
})

// We check if the related target has the ancestor which is the list - and if it has such an ancestor we know we're still in the list.
// And if we don't find the ancestor for the related target we know we are out of the list.

// So we will check we are not inside of the list and then only we will use the remove class..
list.addEventListener('dragleave', event => {
  if(event.relatedTarget.closest(`#${this.type}-projects ul`) !== list){
    list.parentElement.classList.remove("droppable");
  }
})

// Now we make sure when we drop the item we also move it.


-----------------------------------------------------------------------------------------------------


// 16. Dropping & Moving Data + Elements...

// We will add another EL to react to drop event.
// We add it to the list as it's the area we drop.
// We can extract any data from the event object which we added in the drag start - so the data we passed in the connectDrag() can now be extracted in the drop event. 
list.addEventListener('drop', event => {
  const prjId = event.dataTransfer.getData('text/plain')
})

// Now we make sure we can add the data from one list to another.
// We don't need the list to be placed in the same project it was picked from - so we use an if check for it.
list.addEventListener('drop', event => {
  const prjId = event.dataTransfer.getData('text/plain');
  if(this.projects.find(p => p.id === prjId){
    return;
  })
})

// Now if we dropped the project from one list to another - then we need to add it to the other list and remove it from the list it was picked from.
// But the projects we can interact from are only the projects - the dragged project is not part of and we have ID of the dragged project.

// We trigger click on the finish or activate button whiwh will move the project to the next list.

// We use document to get the ID which is prjId which is assigned as the ID to the HTML elements.
// Inside of the project we selected we will get access the button.
// Then we call click.

list.addEventListener('drop', event => {
  const prjId = event.dataTransfer.getData('text/plain');
  if(this.projects.find(p => p.id === prjId){
    return;
  })
  document.getElementById(prjId).querySelector('button:last-of-type').click();

})
// What we wanna make happen is that when we drop the project list onto the other list - we want the finish or activate button to be clicked for us. 
// So that the project moves in realtime as when we drag it, it isn't really moving, the UI makes it look that way cause we are in a sense dragging it.

// We remove the droppable styling here.
list.addEventListener('drop', event => {
  const prjId = event.dataTransfer.getData('text/plain');
  if(this.projects.find(p => p.id === prjId){
    return;
  }
  document.getElementById(prjId).querySelector('button:last-of-type').click();
  list.parentElement.classList.remove('droppable')
  // event.preventDefault()
})
// We can use preventDefault here but it isn't required but we can do it if there is some default behavior for dropping something here.
// For eg: we would be dropping some image somewhere else & browser might then typically load that image full screen - so we can omit that image to be added here.

// So here we can add items to other project lists.

// We also take a look at the dragend event which we don't need here but we will take a look into.

// We listen to dragend on the item where we listen to the dragstart.
// There on projectItem - we create a const and add the document.getElementById(this.id);
// We create a new EL for dragend and console the event object in there.
  connectDrag() {
    const item = document.getElementById(this.id);
    item.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", this.id);
      event.dataTransfer.effectAllowed = "move";
    });
    item.addEventListener('dragend', event =>{
      console.log(event);
    })
  }

// Here the target is the element itself but for the list where we added our ELs the target would be the list itself.
// It's the list that triggers the event in the end.
// In the dragend we can also pass around some data - in datatransfer we can see dropeffect - 'move'.
// This shows us the drop succeeded cause if the drop doesn't succeed - we will see dropeffect: 'none'.
// We can also run any logic in the dragend like update the UI or move some data around.


-----------------------------------------------------------------------------------------------------


// WRAP UP....
// There is a firefox code adjustment note in the folder to refer to.
// I gotta come back to it cause my health was bit under when I was studying this module..

Events (MDN): https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events

Events Reference (MDN): https://developer.mozilla.org/en-US/docs/Web/Events

Event Object (MDN): https://developer.mozilla.org/en-US/docs/Web/API/Event

MDN Drag & Drop: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API