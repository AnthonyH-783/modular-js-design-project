
let people = (function() {
  
  let people = ["Will", "Laura"];
  //Caching the DOM, binding events, and rendering
  // DOM Caching
  let el = document.getElementById("peopleModule");
  let button = el.querySelector("button");
  let input = el.querySelector("input");
  let ul = el.querySelector("ul");
  let template = el.querySelector("#people-template").innerHTML;
  // Event Binding
  button.addEventListener("click", addPerson);
  ul.addEventListener("click", deletePerson);
  // Rendering
  function render(){
    ul.innerHTML = Mustache.render(template, {people: people});
  };

  // Initial rendering
  render();

  function addPerson(value){
    let name = (typeof value === 'string') ? value : input.value;
    people.push(name);
    render();
    input.value = "";
  };
  function deletePerson(event){
    let i;
    if(typeof event === "number"){
      i = event;
    }
    else{
      if(event.target.classList.contains("del")){
          let to_remove = event.target.closest("li");
          i = Array.from(ul.children).findIndex((node) => {
            return node === to_remove;
        });
      }
    }
    
    people.splice(i, 1);
    render();
  
              
};
return {addPerson, deletePerson};
})();
