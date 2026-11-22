/**
 * Basmagly Target Grade & GPA Calculator
 * Helps students calculate required final exam scores to secure A+, A, B+, etc.
 */

const GRADE_THRESHOLDS = {
  "A+": 0.90,
  "A": 0.85,
  "B+": 0.80,
  "B": 0.75,
  "C+": 0.70,
  "C": 0.65,
  "D": 0.60
};

const BasmaglyCalculator = {
  init() {
    this.modal = document.getElementById("calculator-modal");
    this.closeBtn = document.getElementById("calculator-modal-close");
    this.triggerBtn = document.getElementById("calculator-trigger");

    // Inputs
    this.totalMarksInput = document.getElementById("calc-total-marks");
    this.midtermInput = document.getElementById("calc-midterm-mark");
    this.practicalInput = document.getElementById("calc-practical-mark");
    this.quizzesInput = document.getElementById("calc-quizzes-mark");
    this.finalMaxInput = document.getElementById("calc-final-max");
    this.targetGradeSelect = document.getElementById("calc-target-grade");

    // Outputs
    this.currentTotalEl = document.getElementById("calc-current-total");
    this.neededScoreEl = document.getElementById("calc-needed-score");
    this.neededPercentageEl = document.getElementById("calc-needed-percentage");
    this.statusBadgeEl = document.getElementById("calc-status-badge");
    this.adviceTextEl = document.getElementById("calc-advice-text");

    this.bindEvents();
    this.loadSavedData();
    this.calculate();
  },

  bindEvents() {
    if (this.triggerBtn && this.modal) {
      this.triggerBtn.addEventListener("click", () => {
        this.modal.classList.remove("hidden");
      });
    }

    if (this.closeBtn && this.modal) {
      this.closeBtn.addEventListener("click", () => {
        this.modal.classList.add("hidden");
      });
    }

    const inputs = [
      this.totalMarksInput,
      this.midtermInput,
      this.practicalInput,
      this.quizzesInput,
      this.finalMaxInput,
      this.targetGradeSelect
    ];

    inputs.forEach(input => {
      if (input) {
        input.addEventListener("input", () => this.calculate());
        input.addEventListener("change", () => this.calculate());
      }
    });
  },

  loadSavedData() {
    if (!window.BasmaglyStorage) return;
    const data = window.BasmaglyStorage.getCalculatorData();
    if (data.totalMarks && this.totalMarksInput) this.totalMarksInput.value = data.totalMarks;
    if (data.midterm && this.midtermInput) this.midtermInput.value = data.midterm;
    if (data.practical && this.practicalInput) this.practicalInput.value = data.practical;
    if (data.quizzes && this.quizzesInput) this.quizzesInput.value = data.quizzes;
    if (data.finalMax && this.finalMaxInput) this.finalMaxInput.value = data.finalMax;
    if (data.targetGrade && this.targetGradeSelect) this.targetGradeSelect.value = data.targetGrade;
  },

  saveData() {
    if (!window.BasmaglyStorage) return;
    const data = {
      totalMarks: parseFloat(this.totalMarksInput?.value) || 100,
      midterm: parseFloat(this.midtermInput?.value) || 0,
      practical: parseFloat(this.practicalInput?.value) || 0,
      quizzes: parseFloat(this.quizzesInput?.value) || 0,
      finalMax: parseFloat(this.finalMaxInput?.value) || 60,
      targetGrade: this.targetGradeSelect?.value || "A"
    };
    window.BasmaglyStorage.saveCalculatorData(data);
  },

  calculate() {
    const totalMarks = parseFloat(this.totalMarksInput?.value) || 100;
    const midterm = parseFloat(this.midtermInput?.value) || 0;
    const practical = parseFloat(this.practicalInput?.value) || 0;
    const quizzes = parseFloat(this.quizzesInput?.value) || 0;
    const finalMax = parseFloat(this.finalMaxInput?.value) || 60;
    const targetGrade = this.targetGradeSelect?.value || "A";

    const currentYearWork = midterm + practical + quizzes;
    const requiredTotalPercentage = GRADE_THRESHOLDS[targetGrade] || 0.85;
    const requiredOverallScore = totalMarks * requiredTotalPercentage;
    const neededOnFinal = Math.max(0, requiredOverallScore - currentYearWork);

    if (this.currentTotalEl) {
      this.currentTotalEl.textContent = `${currentYearWork} من ${totalMarks - finalMax}`;
    }

    if (this.neededScoreEl) {
      this.neededScoreEl.textContent = `${Math.ceil(neededOnFinal)} من ${finalMax}`;
    }

    const neededPercentage = finalMax > 0 ? Math.round((neededOnFinal / finalMax) * 100) : 0;
    if (this.neededPercentageEl) {
      this.neededPercentageEl.textContent = `(مطلوب ${neededPercentage}% من ورقة الفاينال)`;
    }

    // Status and Advice
    if (neededOnFinal <= 0) {
      this.updateStatus("مبروك! ضمنت التقدير بالفعل 🎉", "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", "مجموع أعمال سنتك الحالي يكفي لتحقيق هذا التقدير حتى بدون امتحان الفاينال!");
    } else if (neededOnFinal <= finalMax * 0.7) {
      this.updateStatus("فرصة ممتازة جداً وممكنة بسهولة 💪", "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", `تحتاج ${Math.ceil(neededOnFinal)} درجة فقط في الفاينال. مع بصمجة ليلة الامتحان والتركيز، التقدير في جيبك!`);
    } else if (neededOnFinal <= finalMax) {
      this.updateStatus("محتاج تركيز وشغل عالي 🔥", "bg-amber-500/20 text-amber-400 border-amber-500/30", `الهدف متاح لكن الفاينال محتاج مذاكرة قوية. ركز على كبسولات الميدتيرم والشيتات المحلولة.`);
    } else {
      this.updateStatus("غير ممكن حسابياً للأسف ⚠️", "bg-rose-500/20 text-rose-400 border-rose-500/30", `حتى لو قفلت الفاينال (أخذت ${finalMax})، المجموع لن يصل لـ ${targetGrade}. ننصح بتعديل الهدف للتقدير التالي.`);
    }

    this.saveData();
  },

  updateStatus(title, badgeClasses, advice) {
    if (this.statusBadgeEl) {
      this.statusBadgeEl.textContent = title;
      this.statusBadgeEl.className = `px-3 py-1 rounded-full text-xs font-bold border ${badgeClasses}`;
    }
    if (this.adviceTextEl) {
      this.adviceTextEl.textContent = advice;
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  BasmaglyCalculator.init();
});
