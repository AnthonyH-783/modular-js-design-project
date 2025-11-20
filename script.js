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
    }
    // Initial Rendering
    _render();

    // Adding function
    function addPerson(event){
        let person = (typeof event === "string") ? event : input.value;
        people.push(person);
        _render();
        input.value = "";   
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