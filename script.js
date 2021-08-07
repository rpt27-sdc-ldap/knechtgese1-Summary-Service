import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 350,
      timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
      duration: '30s',
      preAllocatedVUs: 50, // how large the initial pool of VUs would be
      maxVUs: 500, // if the preAllocatedVUs are not enough, we can initialize more
    },
  },
};

export default function () {
  /*
  //GET function
  let i = Math.floor(Math.random() * (1e7 - 2)) + 1;
  http.get(`http://localhost:1220/api/summary/${i}`);
  */
  //PATCH function
  let i = Math.floor(Math.random() * (1e7 - 2)) + 1;
  const url = 'http://localhost:1220/api/summary/update/' + i;
  const rando = Math.floor(Math.random() * 98) + 1;
  const body = {
    employee_id: rando
  };
  const headers = { 'Content-Type': 'application/json' };
  http.patch(url, JSON.stringify(body), { headers: headers });
}