console.log("start");
let currentAudio = new Audio
let songs = [];
let currentSongIndex = 0;
let folder = "albuma";


async function getSongs() {
    let a = await fetch(`${folder}/songs.json`);
    let songsList = await a.json();
    songs = songsList;
    return songs;
}


function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}
const playmusic = (track) => {
    if (currentAudio) {
        currentAudio.pause();
    }
    mid.src = "pic/pause.svg"
    currentAudio = new Audio(track);
    currentAudio.play();
    currentAudio.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentAudio.currentTime)} / ${secondsToMinutesSeconds(currentAudio.duration)}`
        document.querySelector(".circle").style.left = ((currentAudio.currentTime / currentAudio.duration) * 100 + "%")
    }
    )

    const sgname = decodeURIComponent(track.split("/").pop());
    document.querySelector(".songname").innerHTML = sgname;
}

async function main() {
    let songs = await getSongs()

    console.log(songs);

    let songUL = document.querySelector(".slist").getElementsByTagName("ul")[0]
    songUL.innerHTML = "";
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>${song.replaceAll("%20", " ")}<img class="mini" src="pic/miniplay.svg" alt=""></li>`
    }
    Array.from(document.querySelector(".slist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            const songName = e.innerText;
            playmusic(`/Spotify/${folder}/` + songName.trim());    //gpt suggesting 
            // playmusic(`/${folder}/` + songName);
        })
    })
    mid.addEventListener("click", () => {
        if (currentAudio.paused) {
            currentAudio.play()
            mid.src = "pic/pause.svg"
        }
        else {
            mid.src = "pic/playbtn.svg"
            currentAudio.pause()
        }

    })
    document.querySelector(".seekbar").addEventListener("click", e => {
        let seekpercent = (e.offsetX / e.target.getBoundingClientRect().width)
        document.querySelector(".circle").style.left = seekpercent * 100 + "%"
        currentAudio.currentTime = ((currentAudio.duration) * seekpercent)

    }
    )
    document.querySelector(".menu").addEventListener("click", () => {
        document.querySelector(".bar").style.left = "0%";
    });
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".bar").style.left = "-100%";
    });

    // back.addEventListener("click", () => {
    //           folder = "albumb"
    //           main();
              
    // })




    // back.addEventListener("click", () => {
    //     if (currentSongIndex > 0) {
    //         currentSongIndex--;
    //     }
    //     playmusic("http://127.0.0.1:3000/albuma/" + songs[currentSongIndex]);
    // });
    // next.addEventListener("click", () => {
    //     currentSongIndex++;
    //     playmusic("http://127.0.0.1:3000/songs/" + songs[currentSongIndex]);
    // }

    // )
}





main()
