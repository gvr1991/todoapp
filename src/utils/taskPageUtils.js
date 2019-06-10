import LIST_ROOT from '../constants/index';

function compareByPos(taskA, taskB) {
  if (taskA.position < taskB.position) {
    return -1;
  }
  if (taskA.position > taskB.position) {
    return 1;
  }
  return 0;
}

export function orderTasks(parentId, tasks, resultList = []) {
  const theseTasks = tasks.filter(task => task.parentId === parentId);

  if (theseTasks.length === 0) {
    return resultList;
  }

  theseTasks.sort(compareByPos);

  theseTasks.forEach((task) => {
    resultList.push(task);
    orderTasks(task.id, tasks, resultList);
  });

  return resultList;
}

export function getPreviousSibling(thisTask, orderedTasks) {
  const siblings = orderedTasks.filter(task => task.parentId === thisTask.parentId);
  const index = siblings.indexOf(thisTask);

  if (index === 0 || index === -1) {
    return null;
  }

  return siblings[index - 1];
}

export function getNextSibling(thisTask, orderedTasks) {
  const siblings = orderedTasks.filter(task => task.parentId === thisTask.parentId);
  const index = siblings.indexOf(thisTask);

  if (index === (orderedTasks.length - 1) || index === -1) {
    return null;
  }

  return siblings[index + 1];
}

export function getGrandParentId(thisTask, orderedTasks) {
  const parent = orderedTasks.find(task => task.id === thisTask.parentId);

  if (!parent) {
    return LIST_ROOT;
  }

  if (parent.parentId === LIST_ROOT) {
    return LIST_ROOT;
  }

  return orderedTasks.find(task => task.id === parent.parentId).id;
}

export function getNewPositionForTask(parentId, tasks) {
  const siblings = tasks.filter(task => task.parentId === parentId);
  siblings.sort(compareByPos);

  if (siblings.length === 0) return 1;
  return siblings[siblings.length - 1].position + 1;
}
