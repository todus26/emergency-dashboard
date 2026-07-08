const BASE_URL = "";

export const fetchRegionData = () =>
  fetch(`${BASE_URL}/api/region`).then(res => res.json());

export const fetchHourlyData = () =>
  fetch(`${BASE_URL}/api/hourly`).then(res => res.json());

export const fetchTableData = () =>
  fetch(`${BASE_URL}/api/table`).then(res => res.json());

export const fetchDates = () =>
  fetch(`${BASE_URL}/api/dates`).then(res => res.json());

export const fetchHourlyByDate = (date) =>
  fetch(`${BASE_URL}/api/hourly?date=${date}`).then(res => res.json());
