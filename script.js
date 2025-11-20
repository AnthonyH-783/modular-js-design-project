let stats = (function (){
  let num;
  // Caching HTML Elements
  let el = document.getElementById("stats");
  let template = el.querySelector("#stats-template").innerHTML;
  let wrapper = el.querySelector("#stats-wrapper");

  // Subscribe to pubsub peopleChanged event
  events.on("peopleChanged", setNum);

  // Render Function
  function _render(){
    wrapper.innerHTML = Mustache.render(template, {num_display: num});
  }
  _render(); // Initial render

  // Logic Function
  function setNum(num_people){
    num = num_people;
    _render();
  }
  function destroy(){
    el.remove();
    events.off("peopleChanged", setNum);
  }
  return {setNum, destroy};

})();



let people = (function () { // IIFE that modularzes code around people

    let people = ["Will", "Sarah"]; // Initial data state

    // Caching the DOM
    let el = document.getElementById("peopleModule");
    let button = el.querySelector("button");
    let input = el.querySelector("input");
    let ul = el.querySelector("ul");
    let template = el.querySelector("#people-template").innerHTML;

    // Adding Event Listeners
    button.addEventListener("click", addPerson);
    ul.addEventListener("click", deletePerson);

    // Rendering
    function _render(){
        ul.innerHTML = Mustache.render(template, {people: people});
        debugger;
        events.emit("peopleChanged", people.length);
    }
    // Initial Rendering
    _render();

    // Adding function
    function addPerson(event){
        let person = (typeof event === "string") ? event : input.value;
        if(person && person.length < 15){
          people.push(person);
          _render();
          input.value = "";
          
        }
    }
    // Delete function
    function deletePerson(event){
        let index;
        if(typeof event === "number"){
            index = event;
        }
        else{
            let li = event.target.closest("li");
            index = (Array.from(ul.children)).findIndex((node) => node === li);
        
        }
        people.splice(index, 1);
        _render();
       
    }

    return {addPerson, deletePerson};


})();

