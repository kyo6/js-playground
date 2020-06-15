function Parent() {
  this.name = 'Parent';
  this.colors = ['red']
}

Parent.prototype.getName = function() {
  return this.name;
}

function Child (){
  this.age = 18
}

Child.prototype = new Parent();

var child = new Child();
console.log(child.getName())
