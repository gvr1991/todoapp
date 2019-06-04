import * as CONSTANTS from '../constants/index';

function compare(taskA, taskB) {
  if (taskA.position < taskB.position) {
    return -1;
  }
  if (taskA.position > taskB.position) {
    return 1;
  }
  return 0;
}

export function orderTasks(parentId, resultList, tasks) {
  const theseTasks = tasks.filter(task => task.parentId === parentId);

  if (theseTasks.length === 0) {
    return resultList;
  }

  theseTasks.sort(compare);

  for (const task of theseTasks) {
    resultList.push(task);
    orderTasks(task.id, resultList, tasks);
  }

  return resultList;
}

export function getPreviousSiblingId(thisTask, orderedTasks) {
  const siblings = orderedTasks.filter(task => task.parentId === thisTask.parentId);
  const index = siblings.indexOf(thisTask);

  if (index === 0 || index === -1) {
    return null;
  }

  const previousSibling = siblings[index - 1];

  return previousSibling.id;
}

export function getGrandParentId(thisTask, orderedTasks) {
  const parent = orderedTasks.find(task => task.id === thisTask.parentId);

  if (!parent) {
    return CONSTANTS.LIST_ROOT;
  }

  if (parent.parentId === CONSTANTS.LIST_ROOT) {
    return CONSTANTS.LIST_ROOT;
  }

  return orderedTasks.find(task => task.id === parent.parentId).id;
}

export function getTaskPosition(taskId, tasks) {
  return tasks.filter(task => task.id === taskId).position;
}

export function getNewPosition(parentId, tasks) {
  return tasks.filter(task => task.parentId === parentId).length + 1;
}
