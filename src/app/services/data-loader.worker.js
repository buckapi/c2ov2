addEventListener('message', ({ data }) => {
    const { consultaUrl } = data;
    fetch(consultaUrl)
      .then(response => response.json())
      .then(data => {
        postMessage({ catalogo: data });
      })
      .catch(error => {
        postMessage({ error });
      });
  });