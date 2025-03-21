document.getElementById('minimize').addEventListener('click', () => {
  window.electron.minimize();
});

document.getElementById('close').addEventListener('click', () => {
  window.electron.close();
});
document.getElementById('Max').addEventListener('click', () => {
  window.electron.Max();
});