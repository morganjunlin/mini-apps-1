document.getElementById('convert_csv').addEventListener('submit', (e) => {
  // built in JS method
  fetch('/upload_json', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(data => console.log(data))
  .catch(err => console.log(err));
})