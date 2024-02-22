import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://netmetric-service-6fkgzk7ifq-rj.a.run.app'
});
