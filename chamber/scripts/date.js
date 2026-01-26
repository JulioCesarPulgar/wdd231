document.addEventListener('DOMContentLoaded', function () {
  var lm = document.getElementById('lastModified');
  if (lm) lm.textContent = 'Last Modified: ' + document.lastModified;
});
