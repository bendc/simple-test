# Simple Test

Simple Test is a tiny, straightforward testing framework. It provides a single assertion model,
doesn't perform deep comparisons and uses [same-value
equality](http://ecma-international.org/ecma-262/5.1/#sec-9.12) for your tests.

## Getting Started

Set up your HTML document like this:

```html
<!doctype html>
<meta charset=utf-8>
<link rel=stylesheet href=style.css>
<title>Unit tests</title>

<main><h1></h1></main>

<script src=setup.js></script>
<script src=tests.js></script>
```

Write tests in your `tests.js` file:

```javascript
test("My first test", assert => {
  assert("".charAt(0), "", "returns an empty string");
  assert([1, 2].map(n => n + 1), [2, 3], "increments each number in an array");
  assert({ a: "1", b: "2" }, { a: 1, b: 2 }, "values should be numbers");
});
```

Result:
![2 tests passed, 1 failed.](https://cldup.com/6n-53XK5qy.png)
