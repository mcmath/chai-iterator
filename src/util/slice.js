export default function(iterable, start=0, stop=Infinity) {
  let result = [];
  let max = stop - 1;
  let it = iterable[Symbol.iterator]();
  let step = it.next();

  for (let i = 0; i < start && !step.done; i++) {
    step = it.next();
  }

  for (let i = start; i <= max && !step.done; i++) {
    result.push(step.value);

    if (i < max) {
      step = it.next();
    }
  }

  return result;
}
