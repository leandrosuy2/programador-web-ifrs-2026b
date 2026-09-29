import { getProgress, getSummary } from './metrics.js';
import { deleteProject, deleteTask, getAllData, replaceAllData, saveRecord } from './storage.js';
import { validateBackup, validateProject, validateTask } from './validation.js';

const state = { projects: [], tasks: [], projectFilter: 'all', statusFilter: 'all', search: '' };
const projectDialog = document.querySelector('#project-dialog');
const taskDialog = document.querySelector('#task-dialog');
const projectForm = document.querySelector('#project-form');
const taskForm = document.querySelector('#task-form');
const projectList = document.querySelector('#project-list');
const taskBody = document.querySelector('#task-body');
const appMessage = document.querySelector('#app-message');
const selectedProjectEdit = document.querySelector('#edit-project-button');
const selectedProjectDelete = document.querySelector('#delete-project-button');

function announce(message, kind = 'success') {
  appMessage.textContent = message;
  appMessage.dataset.kind = kind;
}

function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function selectedProjectTasks() {
  if (state.projectFilter === 'all') return state.tasks;
  return state.tasks.filter((task) => task.projectId === state.projectFilter);
}

function renderSummary() {
  const summary = getSummary(state.projects, state.tasks);
  document.querySelector('#project-count').textContent = summary.projectCount;
  document.querySelector('#task-count').textContent = summary.taskCount;
  document.querySelector('#completed-count').textContent = summary.completedCount;
  document.querySelector('#overall-progress').textContent = `${summary.percentage}%`;
  const selected = selectedProjectTasks();
  const progress = getProgress(selected);
  const project = state.projects.find((item) => item.id === state.projectFilter);
  document.querySelector('#selected-project-name').textContent = project ? project.title : 'Todos os projetos';
  document.querySelector('#selected-progress').textContent = `${progress.percentage}%`;
  document.querySelector('#progress-meter').value = progress.percentage;
}

function renderProjects() {
  projectList.replaceChildren();
  const projectFilter = document.querySelector('#project-filter');
  const taskProject = document.querySelector('#task-project');
  const currentFilter = state.projectFilter;
  projectFilter.replaceChildren(new Option('Todos', 'all'));
  taskProject.replaceChildren(new Option('Selecione um projeto', ''));

  for (const project of state.projects) {
    projectFilter.add(new Option(project.title, project.id));
    taskProject.add(new Option(project.title, project.id));
    const item = document.createElement('li');
    const button = makeElement('button', 'project-choice');
    button.type = 'button';
    button.dataset.projectId = project.id;
    button.setAttribute('aria-current', String(currentFilter === project.id));
    button.append(makeElement('span', '', project.title));
    const count = state.tasks.filter((task) => task.projectId === project.id).length;
    button.append(makeElement('small', '', `${count} ${count === 1 ? 'tarefa' : 'tarefas'}`));
    item.append(button);
    projectList.append(item);
  }

  projectFilter.value = state.projects.some((project) => project.id === currentFilter) ? currentFilter : 'all';
  state.projectFilter = projectFilter.value;
  document.querySelector('#project-empty').hidden = state.projects.length > 0;
  document.querySelector('#new-task-button').disabled = state.projects.length === 0;
}

function visibleTasks() {
  const normalizedSearch = state.search.trim().toLocaleLowerCase('pt-BR');
  return state.tasks.filter((task) => {
    const matchesProject = state.projectFilter === 'all' || task.projectId === state.projectFilter;
    const matchesStatus = state.statusFilter === 'all' || task.status === state.statusFilter;
    const matchesSearch = !normalizedSearch || task.title.toLocaleLowerCase('pt-BR').includes(normalizedSearch);
    return matchesProject && matchesStatus && matchesSearch;
  });
}

function renderTasks() {
  taskBody.replaceChildren();
  const tasks = visibleTasks();
  const emptyState = document.querySelector('#task-empty');
  emptyState.hidden = tasks.length > 0;
  emptyState.textContent = state.tasks.length === 0 ? 'Crie um projeto e uma tarefa para começar.' : 'Nenhuma tarefa corresponde aos filtros.';

  for (const task of tasks) {
    const project = state.projects.find((item) => item.id === task.projectId);
    const row = document.createElement('tr');
    const titleCell = document.createElement('td');
    titleCell.append(makeElement('span', 'task-title', task.title));
    if (task.description) titleCell.append(makeElement('span', 'task-description', task.description));
    row.append(titleCell, makeElement('td', '', project?.title || 'Projeto removido'));
    row.append(makeElement('td', '', task.dueDate ? new Date(`${task.dueDate}T00:00:00`).toLocaleDateString('pt-BR') : '—'));
    const priority = makeElement('td', 'priority', { baixa: 'Baixa', media: 'Média', alta: 'Alta' }[task.priority]);
    priority.dataset.priority = task.priority;
    row.append(priority);

    const statusCell = document.createElement('td');
    const statusSelect = document.createElement('select');
    statusSelect.setAttribute('aria-label', `Status de ${task.title}`);
    statusSelect.dataset.action = 'status';
    statusSelect.dataset.taskId = task.id;
    for (const [value, label] of [['pendente', 'Pendente'], ['em andamento', 'Em andamento'], ['concluida', 'Concluída']]) {
      statusSelect.add(new Option(label, value));
    }
    statusSelect.value = task.status;
    statusCell.append(statusSelect);
    row.append(statusCell);

    const actions = makeElement('td', 'row-actions');
    const editButton = makeElement('button', '', 'Editar');
    editButton.type = 'button';
    editButton.dataset.action = 'edit';
    editButton.dataset.taskId = task.id;
    const removeButton = makeElement('button', 'delete-button', 'Excluir');
    removeButton.type = 'button';
    removeButton.dataset.action = 'delete';
    removeButton.dataset.taskId = task.id;
    actions.append(editButton, removeButton);
    row.append(actions);
    taskBody.append(row);
  }
}

function render() {
  renderProjects();
  renderTasks();
  renderSummary();
  updateProjectActions();
}

function openProjectForm(project) {
  projectForm.reset();
  projectForm.elements.id.value = project?.id || '';
  projectForm.elements.title.value = project?.title || '';
  projectForm.elements.description.value = project?.description || '';
  projectForm.elements.dueDate.value = project?.dueDate || '';
  document.querySelector('#project-dialog-title').textContent = project ? 'Editar projeto' : 'Novo projeto';
  projectDialog.showModal();
}

function openTaskForm(task) {
  if (!state.projects.length) {
    announce('Crie um projeto antes de cadastrar tarefas.', 'error');
    return;
  }
  taskForm.reset();
  taskForm.elements.id.value = task?.id || '';
  taskForm.elements.title.value = task?.title || '';
  taskForm.elements.projectId.value = task?.projectId || (state.projectFilter !== 'all' ? state.projectFilter : '');
  taskForm.elements.description.value = task?.description || '';
  taskForm.elements.priority.value = task?.priority || 'media';
  taskForm.elements.dueDate.value = task?.dueDate || '';
  taskForm.elements.status.value = task?.status || 'pendente';
  document.querySelector('#task-dialog-title').textContent = task ? 'Editar tarefa' : 'Nova tarefa';
  taskDialog.showModal();
}

projectForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(projectForm);
  const id = formData.get('id') || crypto.randomUUID();
  const existing = state.projects.find((project) => project.id === id);
  const result = validateProject({
    id,
    title: formData.get('title'),
    description: formData.get('description'),
    dueDate: formData.get('dueDate'),
    createdAt: existing?.createdAt || new Date().toISOString(),
  });
  if (!result.valid) return announce(result.error, 'error');
  try {
    await saveRecord('projects', result.value);
    projectDialog.close();
    await refresh();
    announce(existing ? 'Projeto atualizado.' : 'Projeto criado.');
  } catch {
    announce('Não foi possível salvar o projeto neste navegador.', 'error');
  }
});

taskForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(taskForm);
  const id = formData.get('id') || crypto.randomUUID();
  const existing = state.tasks.find((task) => task.id === id);
  const result = validateTask({
    id,
    projectId: formData.get('projectId'),
    title: formData.get('title'),
    description: formData.get('description'),
    priority: formData.get('priority'),
    dueDate: formData.get('dueDate'),
    status: formData.get('status'),
    createdAt: existing?.createdAt || new Date().toISOString(),
  }, new Set(state.projects.map((project) => project.id)));
  if (!result.valid) return announce(result.error, 'error');
  try {
    await saveRecord('tasks', result.value);
    taskDialog.close();
    await refresh();
    announce(existing ? 'Tarefa atualizada.' : 'Tarefa criada.');
  } catch {
    announce('Não foi possível salvar a tarefa neste navegador.', 'error');
  }
});

document.querySelector('#new-project-button').addEventListener('click', () => openProjectForm());
document.querySelector('#sidebar-new-project').addEventListener('click', () => openProjectForm());
document.querySelector('#new-task-button').addEventListener('click', () => openTaskForm());

document.querySelectorAll('[data-close-dialog]').forEach((button) => {
  button.addEventListener('click', () => document.getElementById(button.dataset.closeDialog).close());
});

projectList.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-project-id]');
  if (!button) return;
  state.projectFilter = button.dataset.projectId;
  document.querySelector('#project-filter').value = state.projectFilter;
  render();
});

document.querySelector('#project-filter').addEventListener('change', (event) => {
  state.projectFilter = event.currentTarget.value;
  render();
});
document.querySelector('#status-filter').addEventListener('change', (event) => {
  state.statusFilter = event.currentTarget.value;
  renderTasks();
});
document.querySelector('#search-filter').addEventListener('input', (event) => {
  state.search = event.currentTarget.value;
  renderTasks();
});

document.querySelector('#task-body').addEventListener('click', async (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const task = state.tasks.find((item) => item.id === button.dataset.taskId);
  if (!task) return;
  if (button.dataset.action === 'edit') openTaskForm(task);
  if (button.dataset.action === 'delete' && window.confirm(`Excluir a tarefa “${task.title}”?`)) {
    try {
      await deleteTask(task.id);
      await refresh();
      announce('Tarefa excluída.');
    } catch {
      announce('Não foi possível excluir a tarefa.', 'error');
    }
  }
});

document.querySelector('#task-body').addEventListener('change', async (event) => {
  const select = event.target.closest('select[data-action="status"]');
  if (!select) return;
  const task = state.tasks.find((item) => item.id === select.dataset.taskId);
  if (!task) return;
  try {
    await saveRecord('tasks', { ...task, status: select.value });
    await refresh();
    announce('Status atualizado.');
  } catch {
    announce('Não foi possível atualizar o status.', 'error');
  }
});

selectedProjectEdit.addEventListener('click', () => {
  const project = state.projects.find((item) => item.id === state.projectFilter);
  if (project) openProjectForm(project);
});

selectedProjectDelete.addEventListener('click', async () => {
  const project = state.projects.find((item) => item.id === state.projectFilter);
  if (!project) return;
  const taskCount = state.tasks.filter((task) => task.projectId === project.id).length;
  const detail = taskCount ? ` As ${taskCount} tarefas vinculadas também serão excluídas.` : '';
  if (!window.confirm(`Excluir o projeto “${project.title}”?${detail}`)) return;
  try {
    await deleteProject(project.id);
    state.projectFilter = 'all';
    await refresh();
    announce('Projeto e tarefas vinculadas excluídos.');
  } catch {
    announce('Não foi possível excluir o projeto.', 'error');
  }
});

function updateProjectActions() {
  const hasSelectedProject = state.projectFilter !== 'all' && state.projects.some((project) => project.id === state.projectFilter);
  selectedProjectEdit.hidden = !hasSelectedProject;
  selectedProjectDelete.hidden = !hasSelectedProject;
}

document.querySelector('#export-button').addEventListener('click', () => {
  const backup = { schemaVersion: 1, exportedAt: new Date().toISOString(), data: { projects: state.projects, tasks: state.tasks } };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `devtrack-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
  announce('Arquivo JSON exportado.');
});

document.querySelector('#import-button').addEventListener('click', () => document.querySelector('#import-file').click());
document.querySelector('#import-file').addEventListener('change', async (event) => {
  const [file] = event.currentTarget.files;
  if (!file) return;
  try {
    const backup = JSON.parse(await file.text());
    const result = validateBackup(backup);
    if (!result.valid) return announce(result.error, 'error');
    if (!window.confirm(`A importação substituirá os ${state.projects.length} projetos e ${state.tasks.length} tarefas atuais. Continuar?`)) return;
    await replaceAllData(result.value);
    state.projectFilter = 'all';
    state.statusFilter = 'all';
    state.search = '';
    document.querySelector('#filters-form').reset();
    await refresh();
    announce('Dados importados e validados.');
  } catch {
    announce('Não foi possível ler o arquivo. Escolha um JSON válido do DevTrack.', 'error');
  } finally {
    event.currentTarget.value = '';
  }
});

async function refresh() {
  const data = await getAllData();
  state.projects = data.projects.sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'));
  state.tasks = data.tasks.sort((a, b) => (a.dueDate || '9999').localeCompare(b.dueDate || '9999'));
  render();
}

try {
  await refresh();
} catch {
  announce('Não foi possível abrir o armazenamento. Use um navegador compatível em localhost ou HTTPS.', 'error');
}