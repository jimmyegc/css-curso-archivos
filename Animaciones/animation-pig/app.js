const initialCoins = 10;
let currentCoins = initialCoins;
const piggyBank = document.getElementById("piggy-bank");
const coinsContainer = document.querySelector(".coins")
const coinValue = document.querySelector(".coin-value")
coinValue.textContent = initialCoins;
piggyBank.addEventListener('click', () => {
  if (currentCoins > 0) {
    // Jump
    piggyBank.classList.add("jump")
    setTimeout(() => {
      piggyBank.classList.remove("jump")
    }, 500);

    // Coins
    const coin = document.createElement('div');
    coin.classList.add('coin');
    coinsContainer.appendChild(coin);
    setTimeout(() => {
      coin.remove()
    }, 500);

    // Update coins
    currentCoins -= 1;
    coinValue.textContent = currentCoins;
  } else {
    alert('No tienes más monedas')
  }

})