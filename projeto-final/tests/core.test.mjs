import test from 'node:test';
import assert from 'node:assert/strict';
import { getProgress, getSummary } from '../src/js/metrics.js';
import { validateBackup, validateProject, validateTask } from '../src/js/validation.js';

test('project validation rejects blank titles and impossible dates', () => {
  assert.equal(validateProject({ title: '   ' }).valid, false);
  assert.equal(validateProject({ title: 'Plano', dueDate: '2026-02-30' }).valid, false);
  assert.equal(validateProject({ id: 'p1', title: '  Plano  ', dueDate: '' }).value.title, 'Plano');
});

test('task validation requires an existing project and supported values', () => {
  const projects = new Set(['p1']);
  assert.equal(validateTask({ title: 'Tarefa', projectId: 'missing', priority: 'media', status: 'pendente' }, projects).valid, false);
  assert.equal(validateTask({ title: 'Tarefa', projectId: 'p1', priority: 'media', status: 'pendente' }, projects).valid, true);
});

test('progress handles empty and partially completed task sets', () => {
  assert.deepEqual(getProgress([]), { completed: 0, total: 0, percentage: 0 });
  assert.equal(getProgress([{ status: 'concluida' }, { status: 'pendente' }]).percentage, 50);
  assert.deepEqual(getSummary([], []), { projectCount: 0, taskCount: 0, completedCount: 0, percentage: 0 });
});

test('backup validation rejects unknown versions and orphan tasks', () => {
  assert.equal(validateBackup({ schemaVersion: 2, data: { projects: [], tasks: [] } }).valid, false);
  const backup = {
    schemaVersion: 1,
    data: {
      projects: [{ id: 'p1', title: 'Plano', description: '', dueDate: '' }],
      tasks: [{ id: 't1', projectId: 'missing', title: 'Tarefa', priority: 'media', status: 'pendente', dueDate: '' }],
    },
  };
  assert.equal(validateBackup(backup).valid, false);
  backup.data.tasks[0].projectId = 'p1';
  assert.equal(validateBackup(backup).valid, true);
});