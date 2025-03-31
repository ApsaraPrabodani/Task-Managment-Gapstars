import Task from "./models/tasks.model";
import TaskDependencies  from "./models/task_dependencies.model";

const dbInit = async () => {
    await Task.sync();
    await TaskDependencies.sync();
};
export default dbInit;