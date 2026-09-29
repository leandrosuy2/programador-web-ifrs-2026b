const DATABASE_NAME = 'devtrack';
const DATABASE_VERSION = 1;

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains('projects')) database.createObjectStore('projects', { keyPath: 'id' });
      if (!database.objectStoreNames.contains('tasks')) {
        const taskStore = database.createObjectStore('tasks', { keyPath: 'id' });
        taskStore.createIndex('projectId', 'projectId', { unique: false });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function requestResult(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function transactionDone(transaction) {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error || new Error('A operação local foi cancelada.'));
  });
}

async function getAllData() {
  const database = await openDatabase();
  const transaction = database.transaction(['projects', 'tasks'], 'readonly');
  const done = transactionDone(transaction);
  const projectsRequest = requestResult(transaction.objectStore('projects').getAll());
  const tasksRequest = requestResult(transaction.objectStore('tasks').getAll());
  const [projects, tasks] = await Promise.all([projectsRequest, tasksRequest, done]).then((results) => results);
  database.close();
  return { projects, tasks };
}

async function saveRecord(storeName, record) {
  const database = await openDatabase();
  const transaction = database.transaction(storeName, 'readwrite');
  transaction.objectStore(storeName).put(record);
  await transactionDone(transaction);
  database.close();
}

async function deleteTask(taskId) {
  const database = await openDatabase();
  const transaction = database.transaction('tasks', 'readwrite');
  transaction.objectStore('tasks').delete(taskId);
  await transactionDone(transaction);
  database.close();
}

async function deleteProject(projectId) {
  const database = await openDatabase();
  const transaction = database.transaction(['projects', 'tasks'], 'readwrite');
  transaction.objectStore('projects').delete(projectId);
  const taskStore = transaction.objectStore('tasks');
  const cursorRequest = taskStore.index('projectId').openCursor(IDBKeyRange.only(projectId));
  cursorRequest.onsuccess = () => {
    const cursor = cursorRequest.result;
    if (cursor) {
      cursor.delete();
      cursor.continue();
    }
  };
  await transactionDone(transaction);
  database.close();
}

async function replaceAllData(data) {
  const database = await openDatabase();
  const transaction = database.transaction(['projects', 'tasks'], 'readwrite');
  const projectStore = transaction.objectStore('projects');
  const taskStore = transaction.objectStore('tasks');
  projectStore.clear();
  taskStore.clear();
  for (const project of data.projects) projectStore.put(project);
  for (const task of data.tasks) taskStore.put(task);
  await transactionDone(transaction);
  database.close();
}

export { deleteProject, deleteTask, getAllData, replaceAllData, saveRecord };