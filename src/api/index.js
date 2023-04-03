import axios from "axios";
const BASE_URL = "https://api.reactdemo.net/api";
const get = async (url, _config= {}) => {
  const config = { ..._config };
  return await axios.get(url, { ...config }).then((res) => res.data);
};
const post = async (url, data = {}, _config = {}) => {
  const config= { ..._config };
  return axios
    .post(url, data, { ...config })
    .then((res) => {
      if (res.status) {
        const { data, status } = res;
        return { data, status };
      } else {
        return {
          status: 200,
          data: res,
        };
      }
    })
    .catch(({ response }) => {
      return response;
    });
};

const put = async (url, data = {}, _config = {}) => {
  const config = { ..._config };
  return axios
    .put(url, data, { ...config })
    .then((res) => {
      if (res.status === 201) {
        const { data, status } = res;
        return { data, status };
      } else {
        return {
          status: 201,
          data: res,
        };
      }
    })
    .catch(({ response }) => {
      if (response.status === 400) {
        return response.data;
      }
      return response;
    });
};

const httpDelete = async (url, token) => {
  const config = {};
  if (token) {
    config.headers = { Authorization: `Bearer ${token}` };
  }
  return await axios.delete(url, { ...config }).then((res) => res.data);
};

const user = {
  addEmployee: async (params) => {
    return await post(`${BASE_URL}/add_employee`, params);
  },
  getAllEmployees: async (pageNo = 1, pageSize) => {
    let queryString;
    if (pageSize) {
      queryString = new URLSearchParams({
        pageNo: pageNo.toString(),
   pageSize:pageSize.toString()
      }).toString();
    } else {
      queryString = new URLSearchParams({
		pageNo:pageNo.toString(),
		pageSize:pageSize.toString()
      }).toString();
    }
	
    return await get(`${BASE_URL}/GetEmployeeList?${queryString}`, null);
  },
  getEmployeeById: async (id) => {
    return await get(`${BASE_URL}/GetEmployee/${id}`, null);
  },
  updateEmployeeById: async (id, params) => {
    return await put(`${BASE_URL}/employee/edit/${id}`, params);
  },
  deleteEmployeeById: async (id) => {
    return await httpDelete(`${BASE_URL}/employee/${id}`, null);
  },
};
export default user;