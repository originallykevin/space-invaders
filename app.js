document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div');
  const resultDisplayer = document.querySelector('#result');
  let width = 15;
  let currentShooterIndex = 202;
  let currentInvaderIndex = 0;
  let alienInvadersTakenDown = [];
  let result = 0;
  let direction = 1;
  let invaderId = null;

  // define alien invaders
  const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    16, 17, 18, 19, 20, 21, 22, 23,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
  ];

  // draw the alien invaders
  alienInvaders.forEach(invader => squares[currentInvaderIndex + invader].classList.add('invader'));

  // draw the shooter
  squares[currentShooterIndex].classList.add('shooter');

  // move the shooter left and right
  function moveShooter(e) {
    squares[currentShooterIndex].classList.remove('shooter')
    switch (e.keyCode) {
      // left if divisible by 15
      case 37:
        if (currentShooterIndex % width !== 0) {
          currentShooterIndex -= 1;
        };
        break;
      // right if divible by 15 but less than 14
      case 39:
        if (currentShooterIndex % width < width - 1) {
          currentShooterIndex += 1;
        };
        break;
      };
      squares[currentShooterIndex].classList.add('shooter');
  };

  document.addEventListener('keydown', moveShooter);

});