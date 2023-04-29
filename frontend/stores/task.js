import { defineStore } from "pinia";

export const useTasks = defineStore({
  id: "tasks",
  state: () => ({
    tasks: [],
    nonFormErrors: [],
    formErrors: [],
  }),
  actions: {
    async fetchTasks() {
      try {
        const response = await $larafetch("/tasks", {
          baseURL: "http://localhost:8000/api/v1",
          response: true,
        });
        const data = await response;
        this.tasks = data;
      } catch (error) {
        console.error(error);
        throw new Error("Error al obtener las tareas");
      }
    },
    async getTaskById(taskId) {
      try {
        const response = await $larafetch(`/tasks/${taskId}`, {
          baseURL: "http://localhost:8000/api/v1",
          response: true,
        });
        return response;
      } catch (error) {
        this.addError(error.response.status, error.response._data.message);
      }
    },
    async updateTask(task, updateList) {
      try {
        const response = await $larafetch(`/tasks/${task.id}`, {
          baseURL: "http://localhost:8000/api/v1",
          method: "PUT",
          body: task,
          response: true,
        });
        
        if (updateList) {
          await this.fetchTasks();
        }
        return true;
      } catch (error) {
        if (
          error.response &&
          error.response._data &&
          error.response._data.errors
        ) {
          this.formErrors = error.response._data.errors;
        } else {
          this.addError(error.response.status, error.response._data.message);
        }
      }
    },
    resetFormErrors() {
      this.formErrors = [];
    },
    resetNonFormErrors() {
      this.nonFormErrors = [];
    },
    resetAllErrors() {
      this.resetFormErrors();
      this.resetNonFormErrors();
    },
    addError(status, message) {
      var error = {
        status: status,
        message: message,
      };
      this.nonFormErrors.push(error);
    },
    async deleteTask(id, updateList= true) {
      try {
        await $larafetch(`/tasks/${id}`, {
          method: "DELETE",
          baseURL: "http://localhost:8000/api/v1",
        });
        if (updateList) {
          this.tasks = this.tasks.filter((task) => task.id !== id);
        }
      } catch (error) {
        console.error(error);
        throw new Error("Error al eliminar la tarea");
      }
    },
  },
});