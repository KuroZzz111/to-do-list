const inputTask = document.getElementById('input-task');
const tombol = document.getElementById('btn-add');
const listTasks = document.getElementById('list-tasks');

const totalTasks = document.getElementById('total-tasks');
const completedTasks = document.getElementById('completed-tasks');
const pendingTasks = document.getElementById('pending-tasks');
const amountTasks = document.getElementById('amount-tasks');
const emptyMessage = document.getElementById('empty-message');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


function tambahTugas() {
const taskText = inputTask.value.trim();

  
if (taskText === '') {
alert('Kamu belum memasukkan to do list!');
return;
}

const task = {
id: Date.now(),
text: taskText,
completed: false
};

tasks.push(task);

inputTask.value = '';

simpanData();
tampilkanTugas();
}


function tampilkanTugas() {
listTasks.innerHTML = '';

tasks.forEach(function(task) {

const li = document.createElement('li');
li.classList.add('task-item');

if (task.completed) {
    li.classList.add('done');
}

const checkbox = document.createElement('input');
checkbox.type = 'checkbox';
checkbox.classList.add('task-check');
checkbox.checked = task.completed;

const taskName = document.createElement('span');
taskName.classList.add('task-name');
taskName.textContent = task.text;

const deleteButton = document.createElement('button');
deleteButton.classList.add('delete-btn');
deleteButton.textContent = 'Delete';

      
checkbox.addEventListener('change', function() {
task.completed = checkbox.checked;

if (task.completed) {
li.classList.add('done');
} else {
li.classList.remove('done');
}

simpanData();
updateStatistik();
});

       
deleteButton.addEventListener('click', function() {
li.remove();

tasks = tasks.filter(function(item) {
return item.id !== task.id;
});

simpanData();
tampilkanTugas();
});

li.append(checkbox);
li.append(taskName);
li.append(deleteButton);

listTasks.append(li);
});

updateStatistik();
}


function simpanData() {
localStorage.setItem('tasks', JSON.stringify(tasks));
}


function updateStatistik() {
const total = tasks.length;

const selesai = tasks.filter(function(task) {
    return task.completed;
}).length;

const belumSelesai = total - selesai;

totalTasks.textContent = total;
completedTasks.textContent = selesai;
pendingTasks.textContent = belumSelesai;
amountTasks.textContent = total;

    
if (total === 0) {
        emptyMessage.style.display = 'block';
} else {
        emptyMessage.style.display = 'none';
}
}


tombol.addEventListener('click', tambahTugas);


inputTask.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        tambahTugas();
    }
});


tampilkanTugas();