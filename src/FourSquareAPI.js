export const moreInfoAPI = () =>
	fetch("https://api.foursquare.com/v2/venues/search?ll=53.322299,-6.142332&categoryId=4bf58dd8d48988d181941735,4bf58dd8d48988d15e941735,4d4b7105d754a06374d81259,4bf58dd8d48988d13a941735,4bf58dd8d48988d1ed931735&client_id=KDUVRP5FMXE34OLNDSZCBZREKUT4VBNRXMKLZXSDTOGTV5LE&client_secret=EUFKEZEUUIA2XX2AKUJXV3PYPIZFBRWXDJTBIPFDSGQPJSQO").then(res => res.json())
