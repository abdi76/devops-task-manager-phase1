import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

class TaskService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to include token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  async getTasks() {
    try {
      const response = await this.api.get('/api/tasks');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async createTask(taskData) {
    try {
      const response = await this.api.post('/api/tasks', taskData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateTask(taskId, updateData) {
    try {
      const response = await this.api.put(`/api/tasks/${taskId}`, updateData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteTask(taskId) {
    try {
      const response = await this.api.delete(`/api/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const taskService = new TaskService();
