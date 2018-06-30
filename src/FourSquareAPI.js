export const moreInfoAPI = () =>
	fetch("https://api.foursquare.com/v2/venues/search?ll=53.322299,-6.142332&client_id=KDUVRP5FMXE34OLNDSZCBZREKUT4VBNRXMKLZXSDTOGTV5LE&client_secret=EUFKEZEUUIA2XX2AKUJXV3PYPIZFBRWXDJTBIPFDSGQPJSQO&v=20180629").then(res => res.json())
