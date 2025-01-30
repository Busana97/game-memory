const startBtn = document.querySelector(".start_btn");
const gameBoard = document.querySelector(".game_board");

// Sample images for cards
const images = [
  "./src/img_1.jpg",
  "./src/img_2.jpg",
 "./src/img_3.jpg",
  "./src/img_4.jpg",
  "./src/img_5.jpg",
  "./src/img_6.jpg",
 "./src/img_7.jpg",
  "./src/img_8.jpg",
  "./src/img_9.jpg",
  "./src/img_10.jpg",
 "./src/img_11.jpg",
  "./src/img_12.jpg",
  "./src/img_13.jpg",
  "./src/img_14.jpg",
 "./src/img_15.jpg",
];

// Double the images and shuffle
const cardImages = [...images, ...images].sort(() => Math.random() - 0.5);

// Create cards
cardImages.forEach((imgSrc, index) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.id = index;

  const front = document.createElement("div");
  front.classList.add("front");

  const back = document.createElement("div");
  back.classList.add("back");
  back.style.backgroundImage = `url(${imgSrc})`;

  card.appendChild(front);
  card.appendChild(back);
  gameBoard.appendChild(card);
});

let flippedCards = [];
let matchedCount = 0;

gameBoard.addEventListener("click", function (event) {
  const clickedCard = event.target.closest(".card");
  if (
    !clickedCard ||
    flippedCards.includes(clickedCard) ||
    clickedCard.classList.contains("matched")
  )
    return;

  // Flip the card
  clickedCard.classList.add("flipped");
  flippedCards.push(clickedCard);

  if (flippedCards.length === 2) {
    const [firstCard, secondCard] = flippedCards;
    const firstImage = firstCard.querySelector(".back").style.backgroundImage;
    const secondImage = secondCard.querySelector(".back").style.backgroundImage;

if (firstImage === secondImage) {
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");
  console.log(firstCard, secondCard)

  anime({
    targets: [firstCard, secondCard],
    scale: [1, 0],
    duration: 1000,
    easing: "easeInOutQuad",
    complete: () => {
      firstCard.querySelector(".back").style.backgroundImage = "none";
      secondCard.querySelector(".back").style.backgroundImage = "none";
      matchedCount += 2;

      if (matchedCount === cardImages.length) {
        setTimeout(() => {
          alert("You won!");
          window.location.reload();
        }, 500);
      }
    },
  });
} else {
      // No match
      setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
      }, 500);
    }

    flippedCards = [];
  }
});

startBtn.addEventListener("click", function () {
  gameBoard.style.display = "grid";
  startBtn.style.display = "none";

  if (window.innerWidth <= 768) {
      document.querySelector("body").style.backgroundImage = "url(/src/back.jpg)";
      document.querySelector("body").style.backgroundSize = 'cover' 
  }

  

//   anime({
//     targets: ".start_btn",
//     translateX: "810px",
//     rotate: 540,
//     duration: 1500,
//     easing: "linear",
//     complete: () => {
//       startBtn.style.display = "none";
//     },
//   });
});

