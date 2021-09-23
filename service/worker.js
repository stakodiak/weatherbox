addEventListener('fetch', event => {
  event.respondWith(handleRequest(event))
})

async function handleRequest(event) {
  let request = event.request;
  let latitude = request.cf ? request.cf.latitude : "37.7749";
  let longitude = request.cf ? request.cf.longitude : "-122.4194";
  let endpoint = `https://forecast.weather.gov/MapClick.php?lat=${latitude}&lon=${longitude}&unit=0&lg=english&FcstType=json`;
  let data =  await fetch(endpoint);

  let payload = JSON.stringify(data, null, 2);
  return new Response(payload, {
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": event.request.headers.get("Origin"),
    },})
}
