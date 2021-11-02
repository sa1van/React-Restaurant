export const deleteApi = (endpoint) => {
  return new Promise((resolve, reject) => {
    fetch(endpoint, {
      method: "DELETE",
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
          reject("Couldn't delete");
        }
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};
