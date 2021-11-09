# HR Dashboard

A simple web app to visualize a table of candidates, allows you to filter and sort the results in order to find the ideal candidate for the position you are looking for. Built using React 16 and Bootstrap.

## Installation

Use the package manager [npm](https://docs.npmjs.com/getting-started) to install the dependencies.

```bash
npm install
```

## Usage

To start the development environment:
```javascript
npm run dev
```

To run the test suite:
```javascript
npm run test
```

## Features
- Displays a table of possible candidates for the position.
- Find the ideal candidate by applying multiple search filters:
  - name
  - status
  - position applied
- Sort the results by:
  - position applied
  - years of experience
  - application date
- Easily share your candidate search using the url

### TO-DO:
- Apply filters dinamically, instead of clicking a button.
- Use [faker](https://marak.github.io/faker.js/) to generate test data.
- Add lazy loading for some components using React Suspence.
- Add ErrorBoundary component to the page.


## License
[ISC](https://www.isc.org/licenses/)
