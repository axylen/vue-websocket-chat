<template>
  <div>
    <Nuxt />
  </div>
</template>

<style>
html {
  font-family: "Source Sans Pro",
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  Roboto,
  "Helvetica Neue",
  Arial,
  sans-serif;
  font-size: 16px;

  box-sizing: border-box;

  word-spacing: 1px;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}

input,
button,
textarea {
  font: inherit;
}

.button {
  padding: 14px 20px;

  cursor: pointer;
  transition: box-shadow .12s ease-in, background-color .12s ease-in;

  border: none;
  border-radius: 10px;
  outline: none;
  background-color: #efefef;
}

.button:focus,
.button:hover {
  box-shadow: 0 2px 3px rgba(0, 0, 0, .2);
}

.button:active {
  background-color: #dadada;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
}
</style>
