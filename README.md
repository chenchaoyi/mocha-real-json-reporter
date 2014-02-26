mocha-real-json-reporter
========================

# Intro ##
Right now this customized reporter only adds an additional `err` filed
for all failure cases. More functions to come.

## Usage ##
Add in your project's package.json:

``` js
{
  "devDependencies": {
    "mocha-real-json-reporter": ">=0.0.1"
  }
}
```

Then call mocha with:

`mocha --reporter mocha-real-json-reporter test`
