// current year
document.getElementById('year').textContent = new Date().getFullYear();

// theme toggle
const themeBtn = document.getElementById('themeToggle');
const htmlEl = document.documentElement;
function syncToggleLabel() {
    const isDark = htmlEl.getAttribute('data-theme') === 'dark';
    themeBtn.setAttribute('aria-pressed', String(isDark));
    themeBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}
syncToggleLabel();
themeBtn.addEventListener('click', () => {
    const isDark = htmlEl.getAttribute('data-theme') === 'dark';
    htmlEl.setAttribute('data-theme', isDark ? 'light' : 'dark');
    syncToggleLabel();
});

// scroll progress bar
const progressBar = document.getElementById('progressBar');
function updateProgress() {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progressBar.style.width = scrolled + '%';
}
document.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

// active nav tab via IntersectionObserver
const section = document.querySelectorAll('main section[id]');
const tabs = document.querySelectorAll('.rail-tabs a');
const tabMap = {};
tabs.forEach(t => tabMap[t.dataset.target] = t);

const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target.id;
        if (!tabMap[id]) return;
        if (entry.isIntersecting) {
            tabs.forEach(t => t.classList.remove('active'));
            tabMap[id].classList.add('active');
        }
    });
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

section.forEach(s => { if (tabMap[s.id]) obs.observe(s); });

// reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealEls.forEach(el => revealObs.observe(el));
} else {
    revealEls.forEach(el => el.classList.add('in'));
}

function scrollProjects(dir) {
    const g = document.getElementById('projectGrid');
    if (g) g.scrollBy({ left: dir * 400, behavior: 'smooth' });
}
document.addEventListener('DOMContentLoaded', () => {
    const pg = document.getElementById('projectGrid');
    if (pg) {
        pg.style.display = 'flex';
        pg.style.overflowX = 'auto';
        pg.style.scrollBehavior = 'smooth';
    }
});
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".rail-tabs a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight) { current = section.getAttribute("id"); }
    }); navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});
const sectionsV3 = document.querySelectorAll('.sheet');
const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('show');
    });
}, { threshold: .15 });
sectionsV3.forEach(s => io.observe(s));

document.documentElement.classList.add('has-js');
const revealItems = document.querySelectorAll('.sheet,.hero-inner > div,.timeline-item,.card,.cert-card,.ach-item');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.15 });
revealItems.forEach(el => observer.observe(el));


// // ANIMATION==============

const frames = [

    "./assets/frames/frame1.png",
    "./assets/frames/frame2.png",
    "./assets/frames/frame3.png",
    "./assets/frames/frame4.png",
    "./assets/frames/frame5.png",
    "./assets/frames/frame6.png",
    "./assets/frames/frame7.png",
    "./assets/frames/frame8.png",
    "./assets/frames/frame9.png"

];

const img = document.getElementById("assistantFrame");

const audio = new Audio("./assets/audio/intro.mp3");
const timeline = [

    { frame: 0, time: 2000 }, // sleep

    { frame: 1, time: 1000 }, // wake

    { frame: 2, time: 1000 }, // wave

    { frame: 3, time: 2500 },

    { frame: 4, time: 2500 },

    { frame: 5, time: 2500 },

    { frame: 6, time: 2500 },

    { frame: 7, time: 2500 },

    { frame: 8, time: 999999 } // idle forever

];
function playIntro() {

    audio.play();

    let i = 0;

    function nextFrame() {

        img.style.opacity = 0;

        setTimeout(() => {

            img.src = frames[timeline[i].frame];

            img.style.opacity = 1;

        }, 200);

        if (i < timeline.length - 1) {

            setTimeout(() => {

                i++;

                nextFrame();

            }, timeline[i].time);

        }

    }

    nextFrame();

} let played = false;

const profile = document.querySelector("#profile");

const observer1 = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting && !played) {

            played = true;

            playIntro();

        }

    });

}, { threshold: .6 });

observer1.observe(profile); const talkingFrames = [

    "./assets/frames/frame4.png",
    "./assets/frames/frame5.png",
    "./assets/frames/frame6.png",
    "./assets/frames/frame7.png"

];

let mouth;

function startTalking() {

    let i = 0;

    mouth = setInterval(() => {

        img.src = talkingFrames[i];

        i = (i + 1) % talkingFrames.length;

    }, 180);

}

function stopTalking() {

    clearInterval(mouth);

    img.src = "./assets/frames/frame9.png";
}
audio.onplay = startTalking;

audio.onended = stopTalking;
img.style.animation =
    "floating 2.8s ease-in-out infinite";
function changeFrame(src) {

    img.style.opacity = 0;

    img.style.transform =
        "translateY(12px) scale(.97)";

    setTimeout(() => {

        img.src = src;

        img.style.opacity = 1;

        img.style.transform =
            "translateY(0px) scale(1)";

    }, 180);

} img.animate([

    {
        transform: "translateY(30px) scale(.92)"
    },

    {
        transform: "translateY(0px) scale(1.05)"
    },

    {
        transform: "translateY(0px) scale(1)"
    }

], {

    duration: 900,
    easing: "ease-out"

}); img.animate([

    { transform: "rotate(0deg)" },

    { transform: "rotate(2deg)" },

    { transform: "rotate(-2deg)" },

    { transform: "rotate(0deg)" }

], {

    duration: 700

});

// cinematic output==
// const letters = document.querySelectorAll("#name span");
// const intro = document.getElementById("intro");

// let i = 0;

// function reveal() {
//     if (i < letters.length) {
//         setTimeout(() => {
//             letters[i].classList.add("active");
//             i++;
//             reveal();
//         }, 300); // slightly faster for “writing feel”
//     } else {
//         setTimeout(() => {
//             intro.classList.add("hide");

//             setTimeout(() => {
//                 intro.style.display = "none";
//             }, 1800);

//         }, 2000);
//     }
// }

// window.onload = () => {
//     document.body.style.overflow = "hidden";
//     setTimeout(reveal, 700);
// };

// quatum effect

const letters = document.querySelectorAll("#name span");
const intro = document.getElementById("intro");

let i = 0;

function createSpark(el) {
    const rect = el.getBoundingClientRect();

    const spark = document.createElement("div");
    spark.classList.add("spark");

    spark.style.left = rect.left + rect.width / 2 + "px";
    spark.style.top = rect.top + rect.height / 2 + "px";

    document.body.appendChild(spark);

    setTimeout(() => spark.remove(), 600);
}

function reveal() {
    if (i < letters.length) {
        setTimeout(() => {
            letters[i].classList.add("active");

            // quantum burst
            createSpark(letters[i]);

            i++;
            reveal();
        }, 280); // fast "writing energy" feel
    } else {
        setTimeout(() => {
            intro.classList.add("hide");

            setTimeout(() => {
                intro.style.display = "none";
                document.body.style.overflow = "auto";
            }, 1800);

        }, 2000);
    }
}

window.onload = () => {
    document.body.style.overflow = "hidden";
    setTimeout(reveal, 800);
};