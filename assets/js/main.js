brief('.menu').on('click', function(ev) {
  ev.preventDefault();
  this.classList.toggle('open');
});