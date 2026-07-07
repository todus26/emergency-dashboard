const BASE_URL = "http://131.186.18.12";

export const fetchRegionData = () =>
  fetch(`${BASE_URL}/api/region`).then(res => res.json());

export const fetchHourlyData = () =>
  fetch(`${BASE_URL}/api/hourly`).then(res => res.json());

export const fetchTableData = () =>
  fetch(`${BASE_URL}/api/table`).then(res => res.json());
