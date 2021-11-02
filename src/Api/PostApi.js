export const postApi = (sendObj, endpoint) => {
  return new Promise((resolve, reject) => {
    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendObj),
    })
      .then((res) => {
        if (res.ok) return res.json();
        else throw new Error("Something went wrong");
      })
      .then((data) => {
        if (data !== false) {
          resolve(data);
        } else {
          reject("Couldn't save");
        }
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};
