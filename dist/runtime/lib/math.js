import l from "lodash";
export function stdv(elems) {
  var avg = l.mean(elems);
  return Math.sqrt(l.mean(l.map(elems, (e) => Math.pow(e - avg, 2))));
}
export function remap(v, domain, newDomain) {
  return newDomain[0] + (v - domain[0]) * ((newDomain[1] - newDomain[0]) / (domain[1] - domain[0]));
}
export function lerp(value, target, t) {
  t = l.clamp(t, 0, 1);
  return value + (target - value) * t;
}
export function linspace(start, stop, points, endpoint = true) {
  const div = endpoint ? points - 1 : points;
  const step = (stop - start) / div;
  return Array.from({ length: points }, (_, i) => start + step * i);
}
export function percentDiff(a, b) {
  return Math.abs(a - b) / ((a + b) / 2) * 100;
}
export function intervalRatio(value, domain) {
  value = l.clamp(value, domain[0], domain[1]);
  return (value - domain[0]) / (domain[1] - domain[0]);
}
export function averageTrend(elems) {
  let sum = 0;
  let avg = 0;
  let trend = [];
  let notNan = 0;
  for (let i = 0; i < elems.length; i++) {
    const element = elems[i];
    if (isNaN(element)) {
      trend.push(avg);
      continue;
    }
    notNan++;
    sum += element;
    avg = sum / notNan;
    trend.push(avg);
  }
  return trend;
}
