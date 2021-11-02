export const getApi = (endpoint) => {
  return new Promise((resolve, reject) => {
    fetch(endpoint, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) return res.json();
        else throw new Error("Something went wrong");
      })
      .then((data) => {
        if (data !== false) {
          resolve(data);
        } else {
          reject("No data found");
        }
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};
