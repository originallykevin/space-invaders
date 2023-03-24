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

  // move the alien invaders left and right
  function moveInvaders(e) {
    const leftEdge = alienInvaders[0] % width === 1;
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;

    if ((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
      direction = width; // will move down a whole row
    } else if (direction === width) {
      if (leftEdge) direction = 1;
      else direction = -1;
    };

    for (let i = 0; i <= alienInvaders.length - 1; i++) {
      squares[alienInvaders[i]].classList.remove('invader');
    };
    for (let i = 0; i <= alienInvaders.length - 1; i++) {
      alienInvaders[i] += direction;
    };
    for (let i = 0; i <= alienInvaders.length - 1; i++) {
      // if invaders shot then will not be adding back
      if (!alienInvadersTakenDown.includes(i)) {
        squares[alienInvaders[i]].classList.add('invader');
      };
    };

    // GAME OVER
    // alien invaders hit shooter
    if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
      resultDisplayer.textContent = 'Game Over';
      squares[currentShooterIndex].classList.add('boom');
      clearInterval(invaderId);
    };

    // deciding a win
    if (alienInvadersTakenDown.length === alienInvaders.length) {
      resultDisplayer.textContent = 'You win!';
      clearInterval(invaderId);
    }

    // aliens miss shooter but hits the end of the grid
    for (let i = 0; i <= alienInvaders.length - 1; i++) {
      if (alienInvaders[i] > (squares.length - (width - 1))) {
        resultDisplayer.textContent = 'Gamer Over';
        clearInterval(invaderId);
      };
    };
  };
  invaderId = setInterval(moveInvaders, 750);

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

  // laser to shoot alien invaders
  function shoot(e) {
    let laserId;
    let currentLaserIndex = currentShooterIndex;
    // move laser from shooter to alien invaders
    function moveLaser() {
      squares[currentLaserIndex].classList.remove('laser');
      currentLaserIndex -= width; // move up 1 whole row
      squares[currentLaserIndex].classList.add('laser');
      if (squares[currentLaserIndex].classList.contains('invader')) {
        // when laser hits invader
        squares[currentLaserIndex].classList.remove('laser');
        squares[currentLaserIndex].classList.remove('invader');
        squares[currentLaserIndex].classList.add('boom');
        // only want boom to appear for short period
        setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 250);
        clearInterval(laserId);

        const alienTakenDown = alienInvaders.indexOf(currentLaserIndex);
        alienInvadersTakenDown.push(alienTakenDown);
        result++;
        resultDisplayer.textContent = result;
      };
    };

    // laser misses alien and in last row
    if (currentLaserIndex < width) {
      clearInterval(laserId);
      setTimeout(() => squares[currentLaserIndex].classList.remove('laser'), 100);
    };
    // add spacekey to fire laser
    switch (e.keyCode) {
      case 32:
        laserId = setInterval(moveLaser, 100);
        break;
    };
  };

  document.addEventListener('keyup', shoot);
});