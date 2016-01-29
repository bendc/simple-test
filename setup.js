"use strict";

const tests = (() => {
  const results = new Map();
  const main = document.querySelector("main");
  const total = main.querySelector("h1");
  const update = (name, units) => {
    results.set(name, units);

    const items = [];
    units.forEach((passed, title) =>
      items.push(`<li class=${passed ? "passed" : "failed"}>${title}</li>`));
    main.insertAdjacentHTML("beforeend", `<h2>${name}</h2><ul>${items.join("")}</ul>`);

    let passed = 0;
    let failed = 0;
    results.forEach(val => val.forEach(result => result ? passed++ : failed++));
    total.textContent = `${passed} tests passed, ${failed} failed.`;
    total.classList.add(failed ? "failed" : "passed");
  }
  return (name, units) => {
    if (name) update(name, units);
    return results;
  };
})();

const test = (() => {
  const count = obj => Object.keys(obj).length;
  const equal = (actual, expected) =>
    expected === Object(expected)
    ? count(actual) == count(expected) &&
      Object.keys(actual).every(key => Object.is(actual[key], expected[key]))
    : Object.is(actual, expected);
  return (name, assert) => {
    const units = new Map();
    try {
      assert((actual, expected, title) => {
        const passed = equal(actual, expected);
        if (!units.has(title) || !passed) units.set(title, passed);
      });
    }
    catch (e) {
      const source = `${e.fileName.split("/").pop()} line ${e.lineNumber}: ${e.message}`;
      units.set(`died on test #${units.size + 1} of ${name} (${source})`, false);
    }
    tests(name, units);
  };
})();
