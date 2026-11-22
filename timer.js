/**
 * Basmagly Pomodoro Focus Timer Engine
 * 25-minute Study Focus + 5-minute Rest Break
 */

class PomodoroTimer {
  constructor() {
    this.focusDuration = 25 * 60; // 25 mins
    this.breakDuration = 5 * 60;  // 5 mins
    this.timeRemaining = this.focusDuration;
    this.isRunning = false;
    this.mode = "focus"; // "focus" or "break"
    this.interval = null;
    this.init();
  }

  init() {
    this.headerDisplayEl = document.getElementById("timer-display");
    this.widgetDisplayEl = document.getElementById("widget-timer-display");
    this.modalDisplayEl = document.getElementById("timer-modal-display");
    this.statusBadges = document.querySelectorAll(".timer-status-text");
    this.progressBarEl = document.getElementById("timer-progress-bar");

    this.toggleBtns = document.querySelectorAll(".timer-toggle-action");
    this.resetBtns = document.querySelectorAll(".timer-reset-action");
    this.breakBtns = document.querySelectorAll(".timer-break-action");
    this.focusBtns = document.querySelectorAll(".timer-focus-action");

    this.updateDisplay();
    this.bindEvents();
  }

  bindEvents() {
    this.toggleBtns.forEach(btn => {
      btn.addEventListener("click", () => this.toggle());
    });

    this.resetBtns.forEach(btn => {
      btn.addEventListener("click", () => this.reset());
    });

    this.breakBtns.forEach(btn => {
      btn.addEventListener("click", () => this.setMode("break"));
    });

    this.focusBtns.forEach(btn => {
      btn.addEventListener("click", () => this.setMode("focus"));
    });

    const trigger = document.getElementById("timer-header-trigger");
    const modal = document.getElementById("timer-modal");
    if (trigger && modal) {
      trigger.addEventListener("click", () => {
        modal.classList.toggle("hidden");
      });
    }

    const closeBtn = document.getElementById("timer-modal-close");
    if (closeBtn && modal) {
      closeBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
      });
    }
  }

  toggle() {
    if (this.isRunning) {
      this.pause();
    } else {
      this.start();
    }
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.updateButtonsUI("running");

    this.interval = setInterval(() => {
      this.timeRemaining--;
      this.updateDisplay();

      if (this.timeRemaining <= 0) {
        this.completeSession();
      }
    }, 1000);
  }

  pause() {
    this.isRunning = false;
    clearInterval(this.interval);
    this.updateButtonsUI("paused");
  }

  reset() {
    this.pause();
    this.timeRemaining = this.mode === "focus" ? this.focusDuration : this.breakDuration;
    this.updateButtonsUI("stopped");
    this.updateDisplay();
  }

  setMode(mode) {
    this.pause();
    this.mode = mode;
    this.timeRemaining = mode === "focus" ? this.focusDuration : this.breakDuration;

    this.statusBadges.forEach(badge => {
      if (mode === "focus") {
        badge.textContent = "جلسة تركيز ومذاكرة 🧠 (25 دقيقة)";
        badge.className = "timer-status-text px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30";
      } else {
        badge.textContent = "استراحة قصيرة ☕ (5 دقائق)";
        badge.className = "timer-status-text px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
      }
    });

    this.updateButtonsUI("stopped");
    this.updateDisplay();
  }

  completeSession() {
    this.pause();
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch (e) {}

    if (this.mode === "focus") {
      alert("عاش يا بطل! 👏 أنهيت 25 دقيقة تركيز كاملة. خذ الآن استراحة 5 دقائق لتجديد طاقتك ☕");
      this.setMode("break");
    } else {
      alert("انتهت الاستراحة! جاهز لجولة تركيز جديدة ومذاكرة ممتعة؟ 🚀");
      this.setMode("focus");
    }
  }

  updateButtonsUI(state) {
    this.toggleBtns.forEach(btn => {
      if (state === "running") {
        btn.innerHTML = `<span>إيقاف مؤقت ⏸️</span>`;
        btn.classList.remove("bg-amber-500", "text-black");
        btn.classList.add("bg-rose-500", "text-white");
      } else if (state === "paused") {
        btn.innerHTML = `<span>استئناف المذاكرة ▶️</span>`;
        btn.classList.remove("bg-rose-500", "text-white");
        btn.classList.add("bg-emerald-500", "text-black");
      } else {
        btn.innerHTML = `<span>ابدأ الجلسة ▶️</span>`;
        btn.classList.remove("bg-rose-500", "bg-emerald-500", "text-white");
        btn.classList.add("bg-amber-500", "text-black");
      }
    });
  }

  updateDisplay() {
    const mins = Math.floor(this.timeRemaining / 60);
    const secs = this.timeRemaining % 60;
    const formatted = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

    if (this.headerDisplayEl) this.headerDisplayEl.textContent = formatted;
    if (this.widgetDisplayEl) this.widgetDisplayEl.textContent = formatted;
    if (this.modalDisplayEl) this.modalDisplayEl.textContent = formatted;

    const total = this.mode === "focus" ? this.focusDuration : this.breakDuration;
    const pct = Math.max(0, Math.min(100, Math.round(((total - this.timeRemaining) / total) * 100)));
    if (this.progressBarEl) this.progressBarEl.style.width = `${pct}%`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.basmaglyTimer = new PomodoroTimer();
});
