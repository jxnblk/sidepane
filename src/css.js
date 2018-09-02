export default {
  base: `
.sidepane-root {
  display: flex;
  width: 100%;
}
.sidepane-bar {
  background-color: #f6f6f6;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  transition-property: transform;
  transition-duration: .2s;
  transition-timing-function: ease-out;
}
.sidepane-spacer {
  flex: none;
  display: none;
}
.sidepane-main {
  width: 100%;
  min-width: 0;
  min-height: 100vh;
}
.sidepane-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
`,
  large: `
.sidepane-bar {
  transform: none !important;
}
.sidepane-spacer {
  display: block;
}
.sidepane-overlay {
  display: none !important;
}
`
}
