var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
	todo : [],
	complete: []
};


var removeIco = '<i class="far fa-trash-alt"></i>';
var completeIco = '<i class="far fa-check-circle"></i>';

renderTodoList();

document.getElementById('addItem').addEventListener('click', function(e) {
	console.log('click');
	var value = document.getElementById('item').value;
	if(value) {
		addItem(value);
	}
});

document.getElementById('item').addEventListener('keyup', function(e) {
	var value = this.value;
	if(e.code === 'Enter' || e.code === 'NumpadEnter' && value) {
		addItem(value);
	}
});

function addItem(value) {
	addItemList(value);
	data.todo.push(value);

	document.getElementById('item').value = '';
	document.getElementById('item').focus();
	
	dataObjectUpdate();

}
function renderTodoList() {
	if(!data.todo.length && !data.complete.length) return;

	for(var i=0; i<data.todo.length; i++) {
		var value = data.todo[i];
		addItemList(value);
	}
	
	for(var j=0; j<data.complete.length; j++) {
		var value = data.complete[j];
		addItemList(value, true);
	}
}

function dataObjectUpdate() {
	localStorage.setItem('todoList', JSON.stringify(data));
}

function addItemList(val, complete) {
	var todo = (complete) ? document.getElementById('complete') : document.getElementById('todo');
	var list = document.createElement('li');
	list.innerText = val;

	var remove = document.createElement('button');
	remove.classList.add('remove');
	remove.innerHTML = removeIco;

	remove.addEventListener('click', removeItem);

	var complete = document.createElement('button');
	complete.classList.add('complete');
	complete.innerHTML = completeIco;

	complete.addEventListener('click', completeItem);

	var buttons = document.createElement('div');
	buttons.classList.add('buttons');

	buttons.appendChild(remove);	
	buttons.appendChild(complete);
	
	list.appendChild(buttons);
	todo.insertBefore(list, todo.childNodes[0]);
}

function completeItem() {
	var complete = document.getElementById('complete');
	var list = this.parentNode.parentNode;
	var parent = list.parentNode;
	var id = parent.id;
	var value = list.innerText;

	var target = (id === 'todo') ? document.getElementById('complete') : document.getElementById('todo');

	if (id === 'todo') {
		data.todo.splice(data.todo.indexOf(value), 1);
		data.complete.push(value);
	} else {
		data.todo.push(value);
		data.complete.splice(data.complete.indexOf(value), 1);
	}

	dataObjectUpdate();

	parent.removeChild(list);
	target.appendChild(list);

}

function removeItem() {
	var list = this.parentNode.parentNode;
	var parent = list.parentNode;
	var id = parent.id;
	var value = list.innerText;

	var target = (id === 'todo') ? document.getElementById('complete') : document.getElementById('todo');

	if (id === 'todo') {
		data.todo.splice(data.todo.indexOf(value), 1);
	} else {
		data.complete.splice(data.complete.indexOf(value), 1);
	}
	dataObjectUpdate();
	parent.removeChild(list);
}