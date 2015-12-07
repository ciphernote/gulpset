brief('#nav-btn').on('click', function(ev) {
  ev.preventDefault();
  this.classList.toggle('open');
});

$( "#nav-btn" ).click(function() {
  $( ".main-nav" ).toggle( "slow" );
});