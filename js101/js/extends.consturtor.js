function Parent(name) {
  this.name = name;
  this.colors = ['red']
}

Parent.prototype.getName = function() {
  console.log(this.name)
  return this.name;
}

function Child(name){
  Parent.call(this, name)
  this.age = 18
}

const child = new Child('Child');
console.log(child)
child.getName()
