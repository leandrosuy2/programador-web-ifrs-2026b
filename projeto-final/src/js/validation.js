const STATUSES = ['pendente', 'em andamento', 'concluida'];
const PRIORITIES = ['baixa', 'media', 'alta'];

function isValidDate(value) {
  if (value === '' || value === null || value === undefined) return true;
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function validateProject(project) {
  if (!project || typeof project !== 'object') return { valid: false, error: 'Projeto inválido.' };
  const title = typeof project.title === 'string' ? project.title.trim() : '';
  if (!title) return { valid: false, error: 'Informe o título do projeto.' };
  if (title.length > 100) return { valid: false, error: 'O título deve ter até 100 caracteres.' };
  if (!isValidDate(project.dueDate)) return { valid: false, error: 'Informe um prazo válido.' };
  const description = typeof project.description === 'string' ? project.description.trim() : '';
  if (description.length > 1000) return { valid: false, error: 'A descrição deve ter até 1000 caracteres.' };
  return { valid: true, value: { ...project, title, description, dueDate: project.dueDate || '' } };
}

function validateTask(task, projectIds) {
  if (!task || typeof task !== 'object') return { valid: false, error: 'Tarefa inválida.' };
  const title = typeof task.title === 'string' ? task.title.trim() : '';
  if (!title) return { valid: false, error: 'Informe o título da tarefa.' };
  if (title.length > 120) return { valid: false, error: 'O título deve ter até 120 caracteres.' };
  if (!projectIds.has(task.projectId)) return { valid: false, error: 'Selecione um projeto existente.' };
  if (!STATUSES.includes(task.status)) return { valid: false, error: 'Selecione um status válido.' };
  if (!PRIORITIES.includes(task.priority)) return { valid: false, error: 'Selecione uma prioridade válida.' };
  if (!isValidDate(task.dueDate)) return { valid: false, error: 'Informe um prazo válido.' };
  const description = typeof task.description === 'string' ? task.description.trim() : '';
  if (description.length > 1000) return { valid: false, error: 'A descrição deve ter até 1000 caracteres.' };
  return { valid: true, value: { ...task, title, description, dueDate: task.dueDate || '' } };
}

function validateBackup(payload) {
  if (!payload || typeof payload !== 'object' || payload.schemaVersion !== 1 || !payload.data) {
    return { valid: false, error: 'Arquivo incompatível: versão de dados não reconhecida.' };
  }
  const { projects, tasks } = payload.data;
  if (!Array.isArray(projects) || !Array.isArray(tasks)) return { valid: false, error: 'Arquivo inválido: projetos e tarefas devem ser listas.' };

  const projectIds = new Set();
  const normalizedProjects = [];
  for (const project of projects) {
    if (!project || typeof project.id !== 'string' || !project.id.trim() || projectIds.has(project.id)) {
      return { valid: false, error: 'Arquivo inválido: identificador de projeto ausente ou repetido.' };
    }
    const checked = validateProject(project);
    if (!checked.valid) return { valid: false, error: checked.error };
    projectIds.add(project.id);
    normalizedProjects.push(checked.value);
  }

  const taskIds = new Set();
  const normalizedTasks = [];
  for (const task of tasks) {
    if (!task || typeof task.id !== 'string' || !task.id.trim() || taskIds.has(task.id)) {
      return { valid: false, error: 'Arquivo inválido: identificador de tarefa ausente ou repetido.' };
    }
    const checked = validateTask(task, projectIds);
    if (!checked.valid) return { valid: false, error: checked.error };
    taskIds.add(task.id);
    normalizedTasks.push(checked.value);
  }

  return { valid: true, value: { projects: normalizedProjects, tasks: normalizedTasks } };
}

export { validateBackup, validateProject, validateTask };