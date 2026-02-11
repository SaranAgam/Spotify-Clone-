console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio("1.mp3");
audioElement.addEventListener("error", (e) => {
  console.error("Error loading audio file:", audioElement.src, e);
  alert("Error loading audio file. Check console for details.");
});
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  {
    songName: "On & On-Cartoon, Daniel Levi",
    filePath: "1.mp3",
    coverPath: "1.jpg",
  },
  {
    songName: "Invincible-DEAF KEV",
    filePath: "2.mp3",
    coverPath: "2.jpg",
  },
  {
    songName: "Mortals-Warriyo, Laura Brehm",
    filePath: "3.mp3",
    coverPath: "3.jpg",
  },
  {
    songName: "Shine-Spektrem",
    filePath: "4.mp3",
    coverPath: "4.jpg",
  },
  {
    songName: "Why We Lose-Cartoon, Coleman Trapp",
    filePath: "5.mp3",
    coverPath: "5.jpg",
  },
  {
    songName: "Sky High-Elektronomia",
    filePath: "6.mp3",
    coverPath: "6.jpg",
  },
  {
    songName: "Symbolism-Electro-Light",
    filePath: "7.mp3",
    coverPath: "7.jpg",
  },
  {
    songName: "Heroes Tonight-Janji, Johnning",
    filePath: "8.mp3",
    coverPath: "8.jpg",
  },
  {
    songName: "My Heart-Different Heaven, EH!DE",
    filePath: "9.mp3",
    coverPath: "9.jpg",
  },
  {
    songName: "Feel Good-Syn Cole",
    filePath: "10.mp3",
    coverPath: "10.jpg",
  },
];

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle play/pause click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
    updateSongListPlayIcon(songIndex);
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
    makeAllPlays();
  }
});
// Listen to Events
audioElement.addEventListener("timeupdate", () => {
  // Update Seekbar
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100 || 0,
  );
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    },
  );
};

const updateSongListPlayIcon = (index) => {
  makeAllPlays();
  let element = document.getElementById(`songItemPlay${index}`);
  if (element) {
    element.classList.remove("fa-play-circle");
    element.classList.add("fa-pause-circle");
  } else {
    console.error(`Element with id songItemPlay${index} not found`);
  }
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();
      // Extract number from id "songItemPlayX"
      songIndex = parseInt(e.target.id.replace("songItemPlay", ""));
      e.target.classList.remove("fa-play-circle");
      e.target.classList.add("fa-pause-circle");
      audioElement.src = songs[songIndex].filePath;
      masterSongName.innerText = songs[songIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
    });
  },
);

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  updateSongListPlayIcon(songIndex);
});

// Handle Image Errors
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", function () {
    this.src = "logo.png"; // Fallback image
    console.error("Image failed to load:", this.alt);
  });
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  updateSongListPlayIcon(songIndex);
});

audioElement.addEventListener("ended", () => {
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  updateSongListPlayIcon(songIndex);
});
