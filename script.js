/* ============================================================
   Happy Birthday Marina - script.js (Midnight Garden Theme)
   ============================================================ */

const { useState, useEffect, useRef, createContext, useContext } = React;
const { motion, AnimatePresence, useScroll, useTransform } = window.Motion;

// ---------- بيانات الموقع ----------
const siteData = {
  name: "Marina",
  birthday: "September 23",
  pin: "0807",
  memories: [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80",
      date: "اول عيد لينا سوا",
      caption: "كان يوم مميز بينا و كان تفاصيله تحفه عشان كنت راجع من الشغل تعبان بس مقدرش مشوفكيش في العيد و اديكي العديه 💖"
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80",
      date: "كنت بشوفك دقايق بس كنت مبسوط اوي",
      caption: "و كنت عايز اللحظه دي متخلصش و كنت عايزك تعرفي قد ايه انا بحبك 💖"
    },
    {
      id: "3",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
      date: "تغفيله بس تحفه و حلوه اوي😂😍😍😍",
      caption: "احلي نونو اجيبها من الجامعه 😍"
    },
    {
      id: "4",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80",
      date: "Day With Marina (Nono 🥹)",
      caption: "Crazy day with you"
    },
    {
      id: "5",
      image: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800&q=80",
      date: "Our favorite place",
      caption: "Every memory is a treasure."
    },
    {
      id: "6",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&q=80",
      date: "The Best Day",
      caption: "I Like Sushi with nono"
    },
    {
      id: "7",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80",
      date: "I like watching movies with you",
      caption: "اخر مكان روحناه سوا هوا اول مكان شوفتك فيه"
    },
    {
      id: "8",
      image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&q=80",
      date: "Our favorite Coffee Shop",
      caption: "اول مره ناخد صوره في المرايه عدله😂😍😍"
    },
    {
      id: "9",
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80",
      date: "I likeeee this videoooooooooo 😭😍",
      caption: "Oooooooooohhhhh 🤩"
    }
  ],
  reasons: [
    {
      id: "1",
      title: "عيونك",
      description: "عيونك هي اللي خلتني اشوف العالم بشكل اجمل"
    },
    {
      id: "2",
      title: "ملامحك",
      description: "عشان ملامحك كل ما ببصلها بحس اني مرتاح و اني مش قادر اشيل عيني من عليكي ابدااا🫂🫀"
    },
    {
      id: "3",
      title: "ضحكتككك",
      description: "بحبك اوي يا مارينا ضحكتك بجد حلوهه اويي ربنا ما يحرمني من ضحكتك ولا حنيتك عليا يا نوونووووو"
    }
  ],
  letter: `  حبيت طريقه تقديمي لعيد ميلادك تكون بشكل مختلف المرادي عشان انتي تستاهلي كل الحلو اللي فالدنيا عشان انتي جميله وحلوه وروحك حلوه ربنا يخليكي ليا وتفضلي تكبري قصاد عيني واعيش وأبسطك وتدلعي علي حسي حس يوسف حبيبك وبس ايوا اضحكي وابتسمي وانتي بتقرأي المسدج عشان بحب اشوف ضحكتك  

علي كدا الهديه اللي جبتهالك عجبتك ولا لا بقي ؟`,
  song: {
    title: "A Special Song For Marina",
    src: "https://marina-latif.edgeone.dev/"
  }
};

// ---------- Store (Context) ----------
const StoreContext = createContext(null);

function StoreProvider({ children }) {
  const [state, setState] = useState({
    currentSection: "entry",
    isAudioPlaying: false,
    hasUnlocked: false
  });

  const value = {
    ...state,
    setSection: (s) => setState((p) => ({ ...p, currentSection: s })),
    setAudioPlaying: (v) => setState((p) => ({ ...p, isAudioPlaying: v })),
    unlock: () => setState((p) => ({ ...p, hasUnlocked: true, currentSection: "intro" }))
  };

  return React.createElement(StoreContext.Provider, { value }, children);
}

function useStore() {
  return useContext(StoreContext);
}

// ---------- Icons (SVG) ----------
const HeartIcon = ({ size = 24, className = "", filled = false, ...rest }) =>
  React.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: filled ? "currentColor" : "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: className,
      ...rest
    },
    React.createElement("path", {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
    })
  );

const KeyRound = ({ size = 24, className = "", ...rest }) =>
  React.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `lucide ${className}`,
      ...rest
    },
    React.createElement("path", {
      d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
    }),
    React.createElement("circle", { cx: "16.5", cy: "7.5", r: ".5", fill: "currentColor" })
  );

const Music = ({ size = 24, className = "", ...rest }) =>
  React.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `lucide ${className}`,
      ...rest
    },
    React.createElement("path", { d: "M9 18V5l12-2v13" }),
    React.createElement("circle", { cx: "6", cy: "18", r: "3" }),
    React.createElement("circle", { cx: "18", cy: "16", r: "3" })
  );

const Pause = ({ size = 24, className = "", ...rest }) =>
  React.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `lucide ${className}`,
      ...rest
    },
    React.createElement("rect", { x: "14", y: "4", width: "4", height: "16", rx: "1" }),
    React.createElement("rect", { x: "6", y: "4", width: "4", height: "16", rx: "1" })
  );

const Play = ({ size = 24, className = "", ...rest }) =>
  React.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `lucide ${className}`,
      ...rest
    },
    React.createElement("polygon", { points: "6 3 20 12 6 21 6 3" })
  );

// ---------- Custom Cursor (Heart - FIXED) ----------
function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (isTouch) return;
    let id = 0;
    const onMove = (e) => {
      const { clientX, clientY } = e;
      setPos({ x: clientX, y: clientY });
      id += 1;
      const point = { id, x: clientX, y: clientY };
      setTrail((prev) => {
        const next = [...prev, point];
        return next.length > 6 ? next.slice(next.length - 6) : next;
      });
      setTimeout(() => setTrail((prev) => prev.filter((p) => p.id !== point.id)), 600);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isTouch]);

  if (isTouch) return null;

  return React.createElement(
    "div",
    { className: "pointer-events-none fixed inset-0 z-[9999] overflow-hidden" },
    // Heart cursor
    React.createElement(
      motion.div,
      {
        className: "absolute left-0 top-0 text-pink-400",
        style: {
          x: pos.x - 12,
          y: pos.y - 12,
          filter: "drop-shadow(0 0 10px rgba(236,72,153,0.9))"
        },
        transition: { type: "spring", stiffness: 1500, damping: 60, mass: 0.08 }
      },
      React.createElement(
        "div",
        { className: "animate-heart-beat" },
        React.createElement(HeartIcon, {
          size: 24,
          className: "text-pink-400",
          filled: true
        })
      )
    ),
    // Trail of small hearts
    React.createElement(
      AnimatePresence,
      null,
      trail.map((p) =>
        React.createElement(
          motion.div,
          {
            key: p.id,
            initial: { opacity: 0.9, scale: 1, x: p.x - 7, y: p.y - 7 },
            animate: {
              opacity: 0,
              scale: 0.2,
              x: p.x - 7,
              y: p.y - 7 + 25
            },
            exit: { opacity: 0 },
            transition: { duration: 0.8, ease: "easeOut" },
            className: "absolute left-0 top-0 text-pink-300",
            style: { filter: "drop-shadow(0 0 6px rgba(244,114,182,0.8))" }
          },
          React.createElement(HeartIcon, {
            size: 14,
            className: "text-pink-300",
            filled: true
          })
        )
      )
    )
  );
}

// ---------- Background Hearts (هادية - لون واحد) ----------
function BackgroundHearts() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 40 + 20,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * -30,
      driftX: Math.random() * 60 - 30,
      opacity: Math.random() * 0.15 + 0.08
    }));
    setHearts(generated);
  }, []);

  return React.createElement(
    "div",
    { className: "absolute inset-0 pointer-events-none overflow-hidden z-0" },
    hearts.map((h) =>
      React.createElement(
        motion.div,
        {
          key: h.id,
          className: "absolute",
          style: {
            left: `${h.left}%`,
            top: `${h.top}%`,
            color: "#f9a8d4",
            opacity: h.opacity,
            filter: "drop-shadow(0 0 20px rgba(249,168,212,0.4))"
          },
          animate: {
            y: [0, -40, 0],
            x: [0, h.driftX, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 10, -10, 0]
          },
          transition: {
            duration: h.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: h.delay
          }
        },
        React.createElement(HeartIcon, {
          size: h.size,
          className: "",
          filled: true,
          style: { color: "#f9a8d4" }
        })
      )
    )
  );
}

// ---------- Audio Player ----------
const audio = new Audio(siteData.song.src);
audio.loop = true;

function AudioPlayer() {
  const { isAudioPlaying, setAudioPlaying, hasUnlocked } = useStore();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    if (audio.duration) setDuration(audio.duration);
    setCurrentTime(audio.currentTime);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
    };
  }, []);

  const toggle = () => {
    if (isAudioPlaying) {
      audio.pause();
      setAudioPlaying(false);
    } else {
      audio.play().then(() => setAudioPlaying(true)).catch(() => setAudioPlaying(false));
    }
  };

  const fmt = (s) => {
    if (isNaN(s)) return "00:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  if (!hasUnlocked) return null;

  return React.createElement(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 1, delay: 0.5 },
      className: "fixed bottom-6 left-0 right-0 z-50 safe-bottom flex justify-center w-full pointer-events-none"
    },
    React.createElement(
      "div",
      {
        className: "glass px-4 py-3 rounded-full flex items-center gap-4 cursor-pointer pointer-events-auto border-violet/30",
        onClick: toggle
      },
      React.createElement(
        "div",
        {
          className: "w-8 h-8 flex items-center justify-center rounded-full bg-violet/30 text-gold"
        },
        isAudioPlaying
          ? React.createElement(Pause, { size: 16, className: "fill-current" })
          : React.createElement(Play, { size: 16, className: "fill-current ml-0.5" })
      ),
      React.createElement(
        "div",
        { className: "flex flex-col w-52 md:w-64" },
        React.createElement(
          "div",
          { className: "flex justify-between items-center mb-1" },
          React.createElement(
            "span",
            { className: "text-xs font-medium text-lavender flex items-center gap-1.5" },
            React.createElement(Music, {
              size: 10,
              className: `text-gold ${isAudioPlaying ? "animate-pulse" : ""}`
            }),
            siteData.song.title
          ),
          React.createElement(
            "span",
            { className: "text-xs text-muted font-mono" },
            fmt(currentTime)
          )
        ),
        React.createElement(
          "div",
          { className: "h-1 bg-white/10 rounded-full overflow-hidden w-full relative" },
          React.createElement(motion.div, {
            className: "absolute top-0 left-0 h-full bg-gradient-to-r from-violet to-gold rounded-full",
            style: { width: `${(currentTime / (duration || 1)) * 100}%` }
          })
        )
      )
    )
  );
}

// ---------- Secret Entry (PIN) ----------
function SecretEntry() {
  const { currentSection, unlock, setAudioPlaying } = useStore();
  const [pin, setPin] = useState("");
  const [shake, setShake] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const tryPlay = () => {
    audio.play().catch((e) => console.error("Autoplay prevented:", e));
  };

  const handleDigit = (d) => {
    if (unlocked || pin.length >= 4) return;
    const next = pin + d;
    setPin(next);
    setShake(false);
    if (next.length === 4) {
      if (next === siteData.pin) {
        setUnlocked(true);
        tryPlay();
        setTimeout(() => {
          setAudioPlaying(true);
          unlock();
        }, 2000);
      } else {
        setShake(true);
        setTimeout(() => setPin(""), 500);
      }
    }
  };

  const handleDel = () => {
    if (unlocked) return;
    setPin((p) => p.slice(0, -1));
    setShake(false);
  };

  if (currentSection !== "entry") return null;

  return React.createElement(
    AnimatePresence,
    null,
    React.createElement(
      motion.div,
      {
        key: "secret-entry",
        initial: { opacity: 1 },
        exit: { opacity: 0, scale: 1.05 },
        transition: { duration: 1.5, ease: "easeInOut" },
        className: "fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      },
      React.createElement(
        "div",
        { className: "absolute inset-0 overflow-hidden pointer-events-none" },
        Array.from({ length: 60 }).map((_, i) =>
          React.createElement("div", {
            key: i,
            className: "absolute rounded-full bg-lavender animate-twinkle",
            style: {
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.7 + 0.3
            }
          })
        )
      ),
      React.createElement("div", {
        className: "absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] animate-drift",
        style: { background: "radial-gradient(circle, rgba(124,58,237,0.4), transparent 70%)" }
      }),
      React.createElement("div", {
        className: "absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] animate-drift",
        style: {
          background: "radial-gradient(circle, rgba(236,72,153,0.2), transparent 70%)",
          animationDelay: "5s"
        }
      }),

      React.createElement(
        "div",
        { className: "relative z-10 flex flex-col items-center px-6" },
        React.createElement(
          motion.div,
          {
            initial: { opacity: 0, y: -20 },
            animate: { opacity: 1, y: 0 },
            className: "mb-8 flex flex-col items-center"
          },
          React.createElement(
            "div",
            {
              className: "w-16 h-16 rounded-full glass-gold flex items-center justify-center mb-4 shadow-glow"
            },
            React.createElement(KeyRound, { className: "text-gold", size: 28 })
          ),
          React.createElement(
            "h2",
            { className: "text-3xl font-serif text-lavender mb-2 text-center" },
            unlocked ? "The Gate Opens" : "A Secret Garden Awaits"
          ),
          React.createElement(
            "p",
            { className: "text-xs text-muted tracking-widest uppercase" },
            unlocked ? "Welcome" : `For ${siteData.name}`
          )
        ),
        React.createElement(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.9 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.8, delay: 0.2 },
            className: "glass rounded-3xl p-8 max-w-sm w-full mx-auto relative overflow-hidden"
          },
          React.createElement(
            AnimatePresence,
            null,
            unlocked &&
              React.createElement(
                motion.div,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  className: "absolute inset-0 glass-gold z-20 flex items-center justify-center flex-col"
                },
                React.createElement(
                  motion.div,
                  {
                    initial: { scale: 0 },
                    animate: { scale: [0, 1.2, 1] },
                    transition: { type: "spring", bounce: 0.5 },
                    className: "w-24 h-24 rounded-full bg-gradient-to-br from-pink-400 to-violet flex items-center justify-center shadow-heart"
                  },
                  React.createElement(HeartIcon, {
                    size: 48,
                    className: "text-white",
                    filled: true
                  })
                ),
                React.createElement(
                  motion.p,
                  {
                    initial: { opacity: 0, y: 10 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.5 },
                    className: "mt-6 font-serif text-2xl text-lavender"
                  },
                  "Welcome, my love."
                )
              )
          ),
          React.createElement(
            "div",
            { className: "flex justify-center gap-4 mb-8" },
            [0, 1, 2, 3].map((i) =>
              React.createElement(
                motion.div,
                {
                  key: i,
                  animate: shake ? { x: [-5, 5, -5, 5, 0] } : {},
                  transition: { duration: 0.4 },
                  className: "w-12 h-14 rounded-xl bg-violet/20 border border-violet/30 flex items-center justify-center relative"
                },
                pin.length > i
                  ? React.createElement(
                      motion.span,
                      {
                        initial: { scale: 0 },
                        animate: { scale: 1 },
                        className: "text-2xl font-serif text-gold"
                      },
                      pin[i]
                    )
                  : React.createElement("div", {
                      className: "w-2 h-2 rounded-full bg-lavender/40"
                    })
              )
            )
          ),
          React.createElement(
            "p",
            { className: "text-center text-xs text-muted mb-6 font-medium tracking-wider" },
            "ENTER OUR SPECIAL DATE (DDMM)"
          ),
          React.createElement(
            "div",
            { className: "grid grid-cols-3 gap-y-4 gap-x-4 max-w-[260px] mx-auto" },
            [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) =>
              React.createElement(
                "button",
                {
                  key: n,
                  onClick: () => handleDigit(n.toString()),
                  className: "text-xl font-medium text-lavender hover:bg-violet/30 rounded-xl transition-colors w-16 h-16 flex items-center justify-center mx-auto"
                },
                n
              )
            ),
            React.createElement("div", { key: "empty" }),
            React.createElement(
              "button",
              {
                key: "zero",
                onClick: () => handleDigit("0"),
                className: "text-xl font-medium text-lavender hover:bg-violet/30 rounded-xl transition-colors w-16 h-16 flex items-center justify-center mx-auto"
              },
              "0"
            ),
            React.createElement(
              "button",
              {
                key: "del",
                onClick: handleDel,
                className: "text-sm font-bold text-muted hover:text-gold hover:bg-violet/30 rounded-xl transition-colors w-16 h-16 flex items-center justify-center mx-auto"
              },
              "DEL"
            )
          )
        )
      )
    )
  );
}

// ---------- Intro ----------
function Intro() {
  const { currentSection, setSection } = useStore();

  useEffect(() => {
    if (currentSection === "intro") {
      const t = setTimeout(() => setSection("hero"), 7000);
      return () => clearTimeout(t);
    }
  }, [currentSection, setSection]);

  if (currentSection !== "intro") return null;

  return React.createElement(
    AnimatePresence,
    null,
    React.createElement(
      motion.div,
      {
        key: "intro",
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 2 },
        className: "fixed inset-0 z-40 bg-deep flex items-center justify-center pointer-events-none overflow-hidden"
      },
      React.createElement(
        "div",
        { className: "absolute inset-0 pointer-events-none" },
        Array.from({ length: 80 }).map((_, i) =>
          React.createElement("div", {
            key: i,
            className: "absolute rounded-full bg-lavender animate-twinkle",
            style: {
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 3}s`
            }
          })
        )
      ),
      React.createElement(
        "div",
        { className: "text-center relative z-10 px-6" },
        React.createElement(
          motion.p,
          {
            initial: { opacity: 0, y: 10, filter: "blur(10px)" },
            animate: {
              opacity: [0, 1, 1, 0],
              y: [10, 0, 0, -10],
              filter: ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]
            },
            transition: { duration: 4, times: [0, 0.2, 0.8, 1] },
            className: "text-lg text-lavender mb-4 tracking-widest uppercase font-medium"
          },
          "النهارده مش زي اي يوم عادي"
        ),
        React.createElement(
          motion.p,
          {
            initial: { opacity: 0, y: 10, filter: "blur(10px)" },
            animate: {
              opacity: [0, 1, 1, 0],
              y: [10, 0, 0, -10],
              filter: ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]
            },
            transition: { duration: 4, delay: 2, times: [0, 0.2, 0.8, 1] },
            className: "text-4xl md:text-7xl font-serif text-gold drop-shadow-md"
          },
          "النهارده عيد ميلاد بنتي"
        )
      )
    )
  );
}

// ---------- Floating Hearts (in Hero) ----------
function FloatingHearts() {
  return React.createElement(
    "div",
    { className: "absolute inset-0 pointer-events-none overflow-hidden z-0" },
    Array.from({ length: 40 }).map((_, i) => {
      const size = Math.random() * 20 + 10;
      const left = Math.random() * 100;
      const duration = Math.random() * 15 + 12;
      const delay = Math.random() * -30;
      const colors = ["#f472b6", "#ec4899", "#db2777", "#f9a8d4", "#fbcfe8"];
      const color = colors[Math.floor(Math.random() * colors.length)];
      return React.createElement(
        "div",
        {
          key: i,
          className: "absolute bottom-[-10%] animate-float-up",
          style: {
            left: `${left}%`,
            width: `${size}px`,
            height: `${size}px`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
            color: color,
            opacity: 0.6
          }
        },
        React.createElement(HeartIcon, {
          size: size,
          className: "",
          filled: true,
          style: { color: color, filter: `drop-shadow(0 0 ${size / 2}px ${color})` }
        })
      );
    })
  );
}

// ---------- Hero ----------
function Hero() {
  const { currentSection } = useStore();
  if (currentSection === "entry" || currentSection === "intro") return null;

  return React.createElement(
    "section",
    { className: "relative w-full h-screen overflow-hidden" },
    React.createElement(FloatingHearts, null),
    React.createElement(
      "div",
      {
        className: "relative z-10 flex flex-col items-center justify-start min-h-screen pt-[12vh] md:pt-[15vh] pointer-events-none px-6"
      },
      React.createElement(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.5, delay: 0.5 },
          className: "text-center"
        },
        React.createElement(
          "div",
          { className: "mb-6 flex justify-center" },
          React.createElement(
            motion.div,
            {
              animate: { scale: [1, 1.15, 1] },
              transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
              className: "text-pink-400",
              style: { filter: "drop-shadow(0 0 20px rgba(236,72,153,0.8))" }
            },
            React.createElement(HeartIcon, {
              size: 48,
              className: "text-pink-400",
              filled: true
            })
          )
        ),
        React.createElement(
          "p",
          {
            className: "text-muted tracking-widest uppercase text-xs mb-4"
          },
          "A celebration of you"
        ),
        React.createElement(
          "h1",
          {
            className: "text-5xl md:text-7xl font-serif text-lavender tracking-tight mb-4"
          },
          "Happy Birthday,",
          React.createElement("br"),
          React.createElement("span", { className: "text-gold" }, siteData.name)
        ),
        React.createElement(
          "p",
          {
            className: "text-lavender/70 font-medium tracking-widest uppercase text-xs md:text-sm mt-8 animate-pulse"
          },
          "Scroll to begin the journey"
        )
      )
    )
  );
}

// ---------- Story Section ----------
function StorySection() {
  const sectionRef = useRef(null);

  return React.createElement(
    "section",
    {
      ref: sectionRef,
      className: "py-32 md:py-48 px-6 max-w-7xl mx-auto w-full relative z-10"
    },
    React.createElement(
      "div",
      { className: "mb-24 text-center" },
      React.createElement(
        "p",
        { className: "text-muted tracking-widest uppercase text-xs mb-4" },
        "Chapter One"
      ),
      React.createElement(
        "h2",
        {
          className: "text-5xl md:text-6xl font-serif text-lavender mb-4"
        },
        "Our Story"
      ),
      React.createElement(
        "p",
        {
          className: "text-lg text-lavender/70 max-w-md mx-auto"
        },
        "Every moment we share becomes a memory I'll hold onto forever."
      )
    ),
    React.createElement(
      "div",
      { className: "flex flex-col gap-32 md:gap-48" },
      siteData.memories.map((m, i) =>
        React.createElement(MemoryCard, {
          key: m.id,
          memory: m,
          index: i,
          isEven: i % 2 === 0
        })
      )
    )
  );
}

function MemoryCard({ memory, index, isEven }) {
  const ref = useRef(null);
  const { scrollYProgress: localProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const y = useTransform(localProgress, [0, 1], [100, 0]);
  const opacity = useTransform(localProgress, [0, 1], [0, 1]);
  const scale = useTransform(localProgress, [0, 1], [0.95, 1]);

  const isVideo = memory.image && memory.image.endsWith(".MP4");

  return React.createElement(
    motion.div,
    {
      ref,
      style: { y, opacity, scale },
      className: `flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
        isEven ? "md:flex-row-reverse" : ""
      }`
    },
    React.createElement(
      "div",
      { className: "w-full md:w-1/2 relative group" },
      React.createElement(
        "div",
        {
          className: "img-blur-wrap aspect-[3/4] md:aspect-square w-full shadow-2xl border border-violet/20"
        },
        isVideo
          ? React.createElement("video", {
              src: memory.image,
              autoPlay: true,
              loop: true,
              muted: true,
              playsInline: true
            })
          : React.createElement("img", {
              src: memory.image,
              alt: memory.date
            }),
        React.createElement(
          "div",
          {
            className: "absolute bottom-4 left-4 right-4 z-10 pointer-events-none"
          },
          React.createElement(
            "span",
            {
              className: "text-xs text-gold font-mono tracking-widest uppercase"
            },
            `№ ${String(index + 1).padStart(2, "0")}`
          )
        )
      )
    ),
    React.createElement(
      "div",
      {
        className: `w-full md:w-1/2 flex flex-col ${
          isEven ? "md:items-end md:text-right" : "md:items-start md:text-left"
        } text-center md:text-inherit`
      },
      React.createElement(
        "span",
        {
          className: "text-xs font-bold tracking-widest text-gold uppercase mb-4"
        },
        memory.date
      ),
      React.createElement(
        "h3",
        {
          className: "text-3xl md:text-4xl font-serif text-lavender mb-6 leading-tight max-w-sm"
        },
        memory.caption
      ),
      React.createElement("div", {
        className: "w-16 h-px bg-gradient-to-r from-gold to-violet mt-4"
      })
    )
  );
}

// ---------- Reasons Section ----------
function ReasonsSection() {
  return React.createElement(
    "section",
    {
      className: "py-32 px-6 w-full relative z-10 glass border-t border-b border-violet/20 min-h-screen"
    },
    React.createElement(
      "div",
      { className: "max-w-4xl mx-auto" },
      React.createElement(
        "div",
        { className: "text-center mb-16" },
        React.createElement(
          "p",
          { className: "text-muted tracking-widest uppercase text-xs mb-4" },
          "Chapter Two"
        ),
        React.createElement(
          "h2",
          {
            className: "text-4xl md:text-5xl font-serif text-lavender mb-4"
          },
          "Things I Love About You"
        ),
        React.createElement(
          "p",
          {
            className: "text-gold/80 font-medium tracking-widest uppercase text-xs"
          },
          "✦ Scratch to reveal ✦"
        )
      ),
      React.createElement(
        "div",
        {
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center"
        },
        siteData.reasons.map((r, i) =>
          React.createElement(ScratchCard, { key: r.id, reason: r, index: i })
        )
      )
    )
  );
}

// ---------- ScratchCard (FIXED) ----------
function ScratchCard({ reason, index }) {
  const canvasRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const isDrawing = useRef(false);
  const revealedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    ctx.fillStyle = "#1a0f3d";
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.fillStyle = "#fbbf24";
    for (let i = 0; i < 400; i++) {
      ctx.beginPath();
      ctx.arc(
        Math.random() * rect.width,
        Math.random() * rect.height,
        Math.random() * 1.5,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
    ctx.fillStyle = "#c4b5fd";
    ctx.font = "bold 14px 'Cairo', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("✦ Scratch Here ✦", rect.width / 2, rect.height / 2);
    ctx.globalCompositeOperation = "destination-out";

    const totalPixels = rect.width * rect.height;
    let clearedPixels = 0;
    const scratchRadius = 25;
    const pixelsPerScratch = Math.PI * scratchRadius * scratchRadius * 0.6;

    const getPos = (e) => {
      const r = canvas.getBoundingClientRect();
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      return { x: x - r.left, y: y - r.top };
    };

    const checkReveal = () => {
      if (revealedRef.current) return;
      clearedPixels += pixelsPerScratch;
      if (clearedPixels >= totalPixels * 0.5) {
        revealedRef.current = true;
        setRevealed(true);
      }
    };

    const scratch = (e) => {
      if (!isDrawing.current || revealedRef.current) return;
      e.preventDefault();
      const p = getPos(e);
      ctx.beginPath();
      ctx.arc(p.x, p.y, scratchRadius, 0, Math.PI * 2);
      ctx.fill();
      checkReveal();
    };

    const start = (e) => {
      if (revealedRef.current) return;
      isDrawing.current = true;
      scratch(e);
    };
    const end = () => {
      isDrawing.current = false;
    };

    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mousemove", scratch);
    canvas.addEventListener("mouseup", end);
    canvas.addEventListener("mouseleave", end);
    canvas.addEventListener("touchstart", start, { passive: false });
    canvas.addEventListener("touchmove", scratch, { passive: false });
    canvas.addEventListener("touchend", end);

    return () => {
      canvas.removeEventListener("mousedown", start);
      canvas.removeEventListener("mousemove", scratch);
      canvas.removeEventListener("mouseup", end);
      canvas.removeEventListener("mouseleave", end);
      canvas.removeEventListener("touchstart", start);
      canvas.removeEventListener("touchmove", scratch);
      canvas.removeEventListener("touchend", end);
    };
  }, []);

  return React.createElement(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-100px" },
      transition: { duration: 0.6, delay: index * 0.1 },
      className: "glass rounded-2xl w-full h-64 relative overflow-hidden group hover:shadow-glow transition-all duration-500"
    },
    React.createElement(
      "div",
      {
        className: "absolute inset-0 p-8 flex flex-col justify-center items-center text-center"
      },
      React.createElement(
        "span",
        {
          className: "text-gold/30 font-serif text-5xl absolute top-2 right-4"
        },
        String(index + 1).padStart(2, "0")
      ),
      React.createElement(
        "h3",
        { className: "font-serif text-lavender text-2xl mb-4 leading-tight" },
        reason.title
      ),
      React.createElement(
        "p",
        { className: "text-lavender/70 font-medium text-base" },
        reason.description
      )
    ),
    React.createElement("canvas", {
      ref: canvasRef,
      className: `absolute inset-0 w-full h-full cursor-pointer transition-opacity duration-1000 ${
        revealed ? "opacity-0 pointer-events-none" : "opacity-100"
      }`,
      style: { touchAction: "none" }
    })
  );
}

// ---------- Letter Section ----------
function LetterSection() {
  const [opened, setOpened] = useState(false);
  const ref = useRef(null);

  return React.createElement(
    "section",
    {
      className: "py-32 md:py-48 px-6 w-full relative z-10 flex flex-col items-center justify-center min-h-screen"
    },
    React.createElement(
      "div",
      { className: "text-center mb-16 max-w-lg" },
      React.createElement(
        "p",
        { className: "text-muted tracking-widest uppercase text-xs mb-4" },
        "Chapter Three"
      ),
      React.createElement(
        "h2",
        {
          className: "text-4xl md:text-5xl font-serif text-lavender mb-4"
        },
        "A letter from my heart."
      ),
      React.createElement(
        "p",
        {
          className: "text-gold/80 font-medium tracking-widest uppercase text-xs"
        },
        "Tap the envelope to open"
      )
    ),
    React.createElement(
      "div",
      {
        ref,
        className: "relative w-full max-w-2xl mx-auto flex justify-center"
      },
      opened
        ? React.createElement(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.8, y: 40 },
              animate: { opacity: 1, scale: 1, y: 0 },
              transition: { duration: 1, type: "spring", bounce: 0.3 },
              className: "w-full glass rounded-3xl p-8 md:p-12 relative border border-gold/20"
            },
            React.createElement(
              "div",
              {
                className: "absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-pink-500 to-violet rounded-full flex items-center justify-center shadow-heart"
              },
              React.createElement(HeartIcon, {
                size: 20,
                className: "text-white",
                filled: true
              })
            ),
            React.createElement(
              "div",
              { className: "mt-4" },
              React.createElement(TypewriterText, { text: siteData.letter, speed: 40 })
            ),
            React.createElement(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { delay: 6, duration: 1 },
                className: "mt-12 text-right font-serif text-gold text-2xl font-bold"
              },
              "With all my love."
            )
          )
        : React.createElement(
            motion.div,
            {
              initial: { opacity: 0, y: 50, rotateX: 30 },
              whileInView: { opacity: 1, y: 0, rotateX: 0 },
              viewport: { once: true, margin: "-200px" },
              transition: { duration: 1.5, type: "spring", bounce: 0.4 },
              onClick: () => setOpened(true),
              className: "w-full max-w-md h-64 glass-gold rounded-2xl cursor-pointer shadow-2xl relative group hover:shadow-gold transition-all duration-500 overflow-hidden"
            },
            React.createElement(
              "div",
              { className: "absolute inset-0 flex items-center justify-center" },
              React.createElement(
                "div",
                { className: "text-center" },
                React.createElement(
                  "div",
                  { className: "flex justify-center mb-4" },
                  React.createElement(
                    motion.div,
                    {
                      animate: { scale: [1, 1.15, 1] },
                      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                      className: "text-pink-400",
                      style: { filter: "drop-shadow(0 0 15px rgba(236,72,153,0.8))" }
                    },
                    React.createElement(HeartIcon, {
                      size: 48,
                      className: "text-pink-400",
                      filled: true
                    })
                  )
                ),
                React.createElement(
                  "p",
                  { className: "text-lavender text-sm tracking-widest uppercase" },
                  "Click to open"
                )
              )
            )
          )
    )
  );
}

function TypewriterText({ text, speed = 50 }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    let timer;
    const tick = () => {
      if (i < text.length) {
        setDisplayed((d) => d + text.charAt(i));
        i += 1;
        timer = setTimeout(tick, speed);
      } else {
        setDone(true);
      }
    };
    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, [text, speed]);

  const skip = () => {
    if (done) return;
    setDisplayed(text);
    setDone(true);
  };

  return React.createElement(
    "div",
    {
      onClick: skip,
      className: "cursor-pointer whitespace-pre-wrap font-serif text-lg md:text-xl text-lavender leading-relaxed"
    },
    displayed,
    !done &&
      React.createElement("span", {
        className: "inline-block w-2 h-5 bg-gold ml-1 animate-pulse"
      })
  );
}

// ---------- Candle Section ----------
function CakeSection() {
  const [lit, setLit] = useState(false);
  const { setSection } = useStore();

  const handleClick = () => {
    setLit(true);
    setTimeout(() => setSection("final"), 3000);
  };

  return React.createElement(
    "section",
    {
      className: "min-h-screen w-full relative z-10 flex flex-col items-center justify-center py-32"
    },
    React.createElement(
      AnimatePresence,
      { mode: "wait" },
      lit
        ? React.createElement(
            motion.div,
            {
              key: "candle-lit",
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              className: "absolute inset-0 pointer-events-none z-50 flex items-center justify-center"
            },
            React.createElement(motion.div, {
              initial: { scale: 0, opacity: 0 },
              animate: { scale: [0, 2, 6], opacity: [0, 1, 0] },
              transition: { duration: 3, ease: "easeOut" },
              className: "w-64 h-64 rounded-full blur-[100px]",
              style: { background: "radial-gradient(circle, #f472b6, transparent 70%)" }
            })
          )
        : React.createElement(
            motion.div,
            {
              key: "candle-unlit",
              initial: { opacity: 0, scale: 0.8 },
              whileInView: { opacity: 1, scale: 1 },
              exit: { opacity: 0, scale: 1.2, filter: "blur(20px)" },
              viewport: { once: true },
              transition: { duration: 1.5, type: "spring" },
              className: "flex flex-col items-center text-center px-6"
            },
            React.createElement(
              "div",
              { className: "relative mb-16 mt-8" },
              React.createElement(
                "div",
                { className: "relative w-24 h-48" },
                React.createElement("div", {
                  className: "absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-32 rounded-lg",
                  style: {
                    background: "linear-gradient(180deg, #ede9fe, #c4b5fd, #a78bfa)",
                    boxShadow: "inset -10px 0 20px rgba(0,0,0,0.2)"
                  }
                }),
                React.createElement("div", {
                  className: "absolute bottom-32 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-gray-800"
                }),
                React.createElement(motion.div, {
                  animate: {
                    scale: [1, 1.15, 1, 1.1, 1],
                    rotate: [-2, 2, -1, 1, 0]
                  },
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  className: "w-6 h-12 rounded-full absolute -top-14 left-1/2 -translate-x-1/2 origin-bottom",
                  style: {
                    background: "radial-gradient(ellipse at bottom, #fff 5%, #fcd34d 30%, #f59e0b 70%, transparent 100%)",
                    filter: "blur(1px)",
                    boxShadow: "0 0 40px #fbbf24, 0 0 80px #f59e0b"
                  }
                })
              )
            ),
            React.createElement(
              "h2",
              {
                className: "text-4xl md:text-5xl font-serif text-lavender mb-8"
              },
              "دوسي و شوفي الفاجأه بتاعتك"
            ),
            React.createElement(
              motion.button,
              {
                whileHover: {
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(236,72,153,0.6)"
                },
                whileTap: { scale: 0.95 },
                onClick: handleClick,
                className: "px-10 py-4 rounded-full bg-gradient-to-r from-pink-500 to-violet text-white font-bold text-lg shadow-lg flex items-center gap-3"
              },
              React.createElement(HeartIcon, {
                size: 20,
                className: "text-white",
                filled: true
              }),
              "ايوه دوسي هنا"
            )
          )
    )
  );
}

// ---------- Final Reveal ----------
function FinalReveal() {
  const { currentSection } = useStore();
  return React.createElement(
    AnimatePresence,
    null,
    currentSection === "final" &&
      React.createElement(
        motion.div,
        {
          key: "final-reveal",
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 1 },
          className: "fixed inset-0 z-[100] flex flex-col items-center justify-center text-center overflow-hidden",
          style: { background: "radial-gradient(ellipse at center, #1a0f3d 0%, #0a0616 70%)" }
        },
        React.createElement(
          "div",
          { className: "relative z-10 px-6" },
          React.createElement(
            motion.p,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: [0, 1, 1, 0], y: [10, 0, 0, -10] },
              transition: { duration: 3, times: [0, 0.2, 0.8, 1] },
              className: "text-lg text-lavender mb-4 tracking-widest uppercase font-medium"
            },
            "One last thing..."
          ),
          React.createElement(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.9, filter: "blur(10px)" },
              animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
              transition: { duration: 2, delay: 3 }
            },
            React.createElement(
              motion.div,
              {
                animate: { scale: [1, 1.03, 1] },
                transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              },
              React.createElement(
                "h1",
                {
                  className: "text-5xl md:text-8xl font-serif text-gold tracking-tight mb-6"
                },
                "Happy Birthday,",
                React.createElement("br"),
                React.createElement("span", { className: "text-lavender" }, siteData.name)
              ),
              React.createElement(
                "div",
                { className: "flex justify-center mt-6 mb-8" },
                React.createElement(
                  "div",
                  {
                    className: "img-blur-wrap w-72 h-72 md:w-80 md:h-80 rounded-full border-4 border-gold/40 shadow-gold"
                  },
                  React.createElement("img", {
                    src: siteData.memories[2].image,
                    alt: "Birthday Memory"
                  })
                )
              )
            ),
            React.createElement(
              "p",
              {
                className: "text-2xl md:text-3xl text-lavender/80 font-medium tracking-widest"
              },
              siteData.birthday
            )
          )
        ),
        React.createElement(
          "div",
          { className: "absolute inset-0 pointer-events-none" },
          Array.from({ length: 50 }).map((_, i) => {
            const size = Math.random() * 20 + 10;
            const startX = Math.random() * window.innerWidth;
            const endX = startX + (Math.random() * 200 - 100);
            const colors = ["#f472b6", "#ec4899", "#f9a8d4", "#db2777", "#fbcfe8"];
            const color = colors[i % colors.length];
            return React.createElement(
              motion.div,
              {
                key: i,
                className: "absolute",
                style: {
                  color: color,
                  filter: `drop-shadow(0 0 ${size / 3}px ${color})`
                },
                initial: {
                  x: startX,
                  y: window.innerHeight + 100,
                  opacity: 0,
                  rotate: 0
                },
                animate: {
                  y: -100,
                  opacity: [0, 1, 1, 0],
                  x: endX,
                  rotate: 360
                },
                transition: {
                  duration: Math.random() * 8 + 4,
                  repeat: Infinity,
                  delay: Math.random() * 4 + 3,
                  ease: "linear"
                }
              },
              React.createElement(HeartIcon, {
                size: size,
                className: "",
                filled: true,
                style: { color: color }
              })
            );
          })
        )
      )
  );
}

// ---------- Smooth Scroll (Lenis) ----------
function useLenis(currentSection) {
  useEffect(() => {
    if (!window.Lenis) return;
    const lenis = new window.Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    if (["entry", "intro", "final"].includes(currentSection)) {
      lenis.stop();
    } else {
      lenis.start();
    }

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [currentSection]);
}

// ---------- App Root ----------
function App() {
  const { currentSection } = useStore();
  useLenis(currentSection);

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(CustomCursor, null),
    React.createElement(AudioPlayer, null),
    React.createElement(SecretEntry, null),
    React.createElement(Intro, null),
    React.createElement(FinalReveal, null),
    React.createElement(
      "main",
      {
        className: "relative w-full overflow-hidden text-primary"
      },
      React.createElement(
        "div",
        { className: "absolute inset-0 overflow-hidden pointer-events-none z-0" },
        React.createElement("div", {
          className: "absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full blur-[120px] animate-pulse-slow",
          style: { background: "radial-gradient(circle, rgba(124,58,237,0.3), transparent 70%)" }
        }),
        React.createElement("div", {
          className: "absolute top-[40%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] animate-pulse-slow",
          style: {
            background: "radial-gradient(circle, rgba(236,72,153,0.2), transparent 70%)",
            animationDelay: "2s"
          }
        }),
        React.createElement("div", {
          className: "absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] rounded-full blur-[150px] animate-pulse-slow",
          style: {
            background: "radial-gradient(circle, rgba(167,139,250,0.2), transparent 70%)",
            animationDelay: "4s"
          }
        })
      ),
      React.createElement(BackgroundHearts, null),
      React.createElement(Hero, null),
      currentSection !== "entry" &&
        currentSection !== "intro" &&
        React.createElement(
          "div",
          { className: "relative z-10" },
          React.createElement(StorySection, null),
          React.createElement(ReasonsSection, null),
          React.createElement(LetterSection, null),
          React.createElement(CakeSection, null)
        )
    )
  );
}

// ---------- Mount ----------
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  React.createElement(StoreProvider, null, React.createElement(App, null))
);
