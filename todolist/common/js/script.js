var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
	todo : [],
	complete: []
};
var index = 0;

var removeIco = '<i class="far fa-trash-alt"></i>';
var completeIco = '<i class="far fa-check-circle"></i>';
var starIco = '<i class="far fa-star"></i>';

renderTodoList();
/* click 했을 경우 */
document.getElementById('addItem').addEventListener('click', function(e) {
	var value = document.getElementById('item').value;
	if(value) {
		addItem(value);
	}
});
/* enter 했을 경우  */
document.getElementById('item').addEventListener('keyup', function(e) {
	var value = this.value;
	if(e.code === 'Enter' || e.code === 'NumpadEnter' && value) {
		addItem(value);
	}
});
/* 버튼 클릭 및 Enter 키 입력시 input 데이터 저장 */
function addItem(value) {
	addItemList(value);
	data.todo.push(value);

	document.getElementById('item').value = '';
	document.getElementById('item').focus();
	
	dataObjectUpdate();

}
/* 초기 localStorage 리스트 렌더링 */
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

/* localStorage 데이터 저장 */
function dataObjectUpdate() {
	localStorage.setItem('todoList', JSON.stringify(data));
}

/* 리스트 추가 */
function addItemList(val, complete) {
	var todo = (complete) ? document.getElementById('complete') : document.getElementById('todo');
	var list = document.createElement('li');
	list.innerText = val;

	var star = document.createElement('button');
	star.classList.add('star');
	star.innerHTML = starIco;

	star.addEventListener('touchend', function(e) {
		this.classList.toggle('on');
	});

	var starButton = document.createElement('div');
	starButton.classList.add('starButton');

	starButton.appendChild(star);

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

	if(todo.id === 'complete') {
		complete.classList.add('on');
	}

	buttons.appendChild(remove);	
	buttons.appendChild(complete);

	list.appendChild(starButton);
	list.appendChild(buttons);
	
	todo.insertBefore(list, todo.childNodes[0]);
}

/* complete 리스트 추가 */
function completeItem() {
	
	var complete = document.getElementById('complete');
	var list = this.parentNode.parentNode;
	var parent = list.parentNode;
	var id = parent.id;
	var value = list.innerText;
	
	this.classList.toggle('on');

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
/* 리스트 제거 */
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
