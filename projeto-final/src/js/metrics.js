function getProgress(tasks) {
  const completed = tasks.filter((task) => task.status === 'concluida').length;
  return { completed, total: tasks.length, percentage: tasks.length ? Math.round((completed / tasks.length) * 100) : 0 };
}

function getSummary(projects, tasks) {
  const progress = getProgress(tasks);
  return {
    projectCount: projects.length,
    taskCount: tasks.length,
    completedCount: progress.completed,
    percentage: progress.percentage,
  };
}

export { getProgress, getSummary };