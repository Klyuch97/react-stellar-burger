export const BASE_URL = 'https://norma.nomoreparties.space/api/';

const checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  };
  
  const checkSuccess = (res) => {
    if (res && res.success) {
      return res;
    }
    return Promise.reject(`Ответ не success: ${res}`);
  };
  
  export const request = (endpoint, options) => {
     return fetch(`${BASE_URL}${endpoint}`, options)
      .then(checkResponse)
      .then(checkSuccess)
     
  };

  export const refreshToken = () => {
    return fetch(`${BASE_URL}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    }).then(checkResponse);
  };

  export const fetchWithRefresh = async (url, options) => {
    try {
      const res = await fetch(url, options);
      return await checkResponse(res);
    } catch (err) {
      if (err.message === "jwt expired") {
        const refreshData = await refreshToken(); //обновляем токен
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
        localStorage.setItem("refreshToken", refreshData.refreshToken);
        localStorage.setItem("accessToken", refreshData.accessToken);
        options.headers.authorization = refreshData.accessToken;
        const res = await fetch(url, options); //повторяем запрос
        return await checkResponse(res);
      } else {
        return Promise.reject(err);
      }
    }
  };