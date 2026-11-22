/**
 * Basmagly Subject View Application
 * Handles category tabs, Panic Mode (بصمجلي السريع), In-Site Study Hub, AI Basmaga, and Auto-saved Scratchpad.
 */

let curSubjectCourse = null;
let currentItemsList = [];
let currentStudyIndex = 0;
let activeStudyItem = null;

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get("id") || "data-structure";
  const initialPanic = params.get("panic") === "true";

  const course = window.COURSES_DATA ? window.COURSES_DATA.find(c => c.id === courseId) : null;
  if (!course) {
    document.body.innerHTML = `
      <div class="min-h-screen flex items-center justify-center p-6 text-center bg-slate-100 dark:bg-slate-950">
        <div>
          <h1 class="text-4xl font-bold mb-3">404</h1>
          <p class="text-slate-500 mb-6">المادة المطلوبة غير موجودة.</p>
          <a href="index.html" class="px-5 py-2.5 rounded-xl bg-amber-500 text-black font-bold">العودة للرئيسية</a>
        </div>
      </div>
    `;
    return;
  }

  curSubjectCourse = course;
  setupSubjectPage(course, initialPanic);
});

function setupSubjectPage(course, initialPanic) {
  document.title = `${course.nameAr} (${course.code}) | Basmagly`;

  renderSubjectHeader(course);
  initScratchpad(course.id);
  initSubjectTabs(course, initialPanic);
  initSubjectSearch(course);
  updateSubjectProgress(course);

  window.addEventListener("basmagly:progress-updated", () => {
    updateSubjectProgress(course);
  });
}

function renderSubjectHeader(course) {
  const titleEl = document.getElementById("subj-title-ar");
  const subTitleEl = document.getElementById("subj-title-en");
  const codeEl = document.getElementById("subj-code-badge");
  const iconEl = document.getElementById("subj-icon-box");
  const descEl = document.getElementById("subj-description");
  const driveBtn = document.getElementById("subj-drive-link");

  if (titleEl) titleEl.textContent = course.nameAr;
  if (subTitleEl) subTitleEl.textContent = course.nameEn;
  if (codeEl) {
    codeEl.textContent = course.code;
    codeEl.className = `px-2.5 py-1 rounded-md text-xs font-bold border bg-${course.accentColor}-500/10 text-${course.accentColor}-600 dark:text-${course.accentColor}-400 border-${course.accentColor}-500/20`;
  }
  if (iconEl) {
    iconEl.textContent = getCourseIcon(course.icon);
    iconEl.style.backgroundColor = `${course.colorHex}20`;
    iconEl.style.borderColor = `${course.colorHex}40`;
    iconEl.style.color = course.colorHex;
  }
  if (descEl) descEl.textContent = course.description;
  if (driveBtn) driveBtn.href = course.driveUrl;
}

function initSubjectTabs(course, initialPanic) {
  const tabBtns = document.querySelectorAll("[data-subject-tab]");
  const panicToggle = document.getElementById("panic-mode-toggle");
  const panicBanner = document.getElementById("panic-mode-banner");

  let activeTab = "lectures";
  let isPanicMode = initialPanic;

  if (panicToggle) {
    panicToggle.checked = isPanicMode;
    panicToggle.addEventListener("change", (e) => {
      isPanicMode = e.target.checked;
      togglePanicBanner();
      renderActiveTabContent();
    });
  }

  function togglePanicBanner() {
    if (panicBanner) {
      panicBanner.classList.toggle("hidden", !isPanicMode);
    }
  }

  togglePanicBanner();

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active-subject-tab"));
      btn.classList.add("active-subject-tab");
      activeTab = btn.getAttribute("data-subject-tab") || "lectures";
      renderActiveTabContent();
    });
  });

  window.renderActiveTabContent = function () {
    const container = document.getElementById("subject-tab-content");
    if (!container || !course.categories) return;

    let items = [];

    if (isPanicMode) {
      Object.keys(course.categories).forEach(key => {
        const catItems = course.categories[key];
        if (Array.isArray(catItems)) {
          catItems.forEach(item => {
            if (item.isPanic || key === "basmaga") {
              items.push({ ...item, originCategory: key });
            }
          });
        }
      });
    } else {
      items = course.categories[activeTab] || [];
    }

    currentItemsList = items;

    if (items.length === 0) {
      container.innerHTML = `
        <div class="text-center py-16 text-slate-500 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-300 dark:border-slate-800">
          <p class="text-4xl mb-2">${isPanicMode ? '⚡' : '📂'}</p>
          <p class="text-sm font-semibold">${isPanicMode ? 'لا توجد كبسولات طوارئ هنا حتى الآن.' : 'لا توجد ملفات في هذا القسم حالياً.'}</p>
        </div>
      `;
      return;
    }

    container.innerHTML = items.map(item => {
      const isStudied = window.BasmaglyStorage.isItemStudied(item.id);
      const isLecture = activeTab === "lectures" || item.id.includes("-l");

      return `
        <div class="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-900 border ${item.isPanic ? 'border-amber-500/50 bg-amber-500/5' : 'border-slate-200 dark:border-slate-800 hover:border-slate-400'} transition-all shadow-sm gap-3">
          <div class="flex items-center gap-3.5 min-w-0">
            <button onclick="toggleItemStatus('${item.id}', this)" 
                    class="w-6 h-6 rounded-md border flex items-center justify-center shrink-0 transition-all ${isStudied ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-slate-400 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-transparent hover:border-slate-500'}">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
            </button>
            
            <div class="min-w-0 cursor-pointer" onclick="openStudyHub('${item.id}', '${escapeQuotes(item.title)}', '${escapeQuotes(course.nameAr)}', '${item.link || course.driveUrl}', 'read')">
              <div class="flex items-center gap-2 mb-1 flex-wrap">
                <span class="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">${item.type}</span>
                ${item.size ? `<span class="text-[11px] text-slate-500">${item.size}</span>` : ''}
                ${item.isPanic ? `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">بصمجة ليلة الامتحان 🔥</span>` : ''}
              </div>
              <p class="text-sm font-semibold truncate hover:text-blue-600 transition-colors ${isStudied ? 'line-through text-slate-400' : ''}">${item.title}</p>
            </div>
          </div>

          <div class="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <!-- In-Site Primary Study Button -->
            <button onclick="openStudyHub('${item.id}', '${escapeQuotes(item.title)}', '${escapeQuotes(course.nameAr)}', '${item.link || course.driveUrl}', 'read')" 
                    class="px-3 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow transition-all flex items-center gap-1.5"
                    title="مذاكرة محتوى المحاضرة والشرح مباشرة داخل المنصة">
              <span>📖 ذاكر في الموقع</span>
            </button>

            <!-- AI Lecture Basmaga Button -->
            ${isLecture ? `
              <button onclick="openStudyHub('${item.id}', '${escapeQuotes(item.title)}', '${escapeQuotes(course.nameAr)}', '${item.link || course.driveUrl}', 'ai')" 
                      class="btn-ai-pill px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow" title="كبسولة الذكاء الاصطناعي السريعة">
                <span>✨ بصمجة AI</span>
              </button>
            ` : ''}

            <!-- External Google Drive Link -->
            <a href="${item.link || course.driveUrl}" target="_blank" rel="noopener noreferrer" 
               title="فتح الملف في جوجل درايف"
               class="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center">
              <svg class="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            </a>
          </div>
        </div>
      `;
    }).join("");
  };

  renderActiveTabContent();
}

function escapeQuotes(str) {
  if (!str) return "";
  return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

window.toggleItemStatus = function(itemId, btn) {
  if (!window.BasmaglyStorage) return;
  const isDone = window.BasmaglyStorage.toggleItem(itemId);
  
  if (btn) {
    if (isDone) {
      btn.className = "w-6 h-6 rounded-md border flex items-center justify-center shrink-0 transition-all bg-emerald-500 border-emerald-400 text-black";
    } else {
      btn.className = "w-6 h-6 rounded-md border flex items-center justify-center shrink-0 transition-all border-slate-400 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-transparent hover:border-slate-500";
    }
  }

  if (curSubjectCourse) {
    updateSubjectProgress(curSubjectCourse);
    window.dispatchEvent(new CustomEvent("basmagly:progress-updated"));
  }
};

// ==================== IN-SITE STUDY HUB CONTROLLER ====================
window.openStudyHub = function(itemId, title, courseName, driveUrl, initialTab = 'read') {
  activeStudyItem = { itemId, title, courseName, driveUrl };
  currentStudyIndex = currentItemsList.findIndex(it => (it.id === itemId) || (it.title === title));
  if (currentStudyIndex === -1) currentStudyIndex = 0;

  const aiData = window.getAILectureData ? window.getAILectureData(itemId, title, courseName) : null;
  if (!aiData) return;

  const modal = document.getElementById("study-hub-modal");
  if (!modal) return;

  // Header Details
  const titleEl = document.getElementById("subj-sh-title");
  const courseEl = document.getElementById("subj-sh-course-name");
  const badgeEl = document.getElementById("subj-sh-course-badge");
  const iconEl = document.getElementById("subj-sh-icon");
  const driveBtn = document.getElementById("subj-sh-drive-btn");
  const readDriveLink = document.getElementById("subj-sh-read-drive-link");
  const frameBtn = document.getElementById("subj-sh-frame-btn");
  const frameBtn2 = document.getElementById("subj-sh-frame-btn-2");
  const frameTitle = document.getElementById("subj-sh-frame-title");

  if (titleEl) titleEl.textContent = title;
  if (courseEl) courseEl.textContent = courseName;
  if (badgeEl && curSubjectCourse) {
    badgeEl.textContent = curSubjectCourse.code;
    badgeEl.style.borderColor = curSubjectCourse.colorHex + "50";
    badgeEl.style.color = curSubjectCourse.colorHex;
  }
  if (iconEl && curSubjectCourse) {
    iconEl.textContent = getCourseIcon(curSubjectCourse.icon);
    iconEl.style.backgroundColor = curSubjectCourse.colorHex + "20";
  }

  const finalDriveUrl = driveUrl || (curSubjectCourse ? curSubjectCourse.driveUrl : '#');
  if (driveBtn) driveBtn.href = finalDriveUrl;
  if (readDriveLink) readDriveLink.href = finalDriveUrl;
  if (frameBtn) frameBtn.href = finalDriveUrl;
  if (frameBtn2) frameBtn2.href = finalDriveUrl;
  if (frameTitle) frameTitle.textContent = title;

  // Checkbox State
  const doneCheckbox = document.getElementById("subj-sh-done-checkbox");
  if (doneCheckbox && window.BasmaglyStorage) {
    doneCheckbox.checked = window.BasmaglyStorage.isItemStudied(itemId);
  }

  // Populate Tab 1: Reader Text
  const readTextEl = document.getElementById("subj-sh-read-text");
  if (readTextEl) {
    readTextEl.innerHTML = `
      <div class="prose dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed space-y-3 font-medium">
        ${(aiData.readContent || "").replace(/\n/g, '<br>')}
      </div>
    `;
  }

  // Populate Tab 2: AI Basmaga
  const aiBodyEl = document.getElementById("subj-sh-ai-body");
  if (aiBodyEl) {
    aiBodyEl.innerHTML = `
      <!-- Summary Box -->
      <div class="ai-box-summary p-4 rounded-2xl border space-y-1.5 shadow-sm">
        <div class="box-heading flex items-center gap-2 font-bold text-xs sm:text-sm">
          <span>💡</span>
          <span>الزبدة في سطور (Executive Summary):</span>
        </div>
        <p class="leading-relaxed font-medium">${aiData.summary}</p>
      </div>

      <!-- Key Points -->
      <div class="ai-box-points p-4 rounded-2xl border space-y-2 shadow-sm">
        <div class="box-heading flex items-center gap-2 font-bold text-xs sm:text-sm">
          <span>📌</span>
          <span>أهم 4 نقاط ومفاهيم أساسية للحفظ:</span>
        </div>
        <ul class="list-disc list-inside space-y-1 leading-relaxed font-medium">
          ${(aiData.points || []).map(p => `<li>${p}</li>`).join("")}
        </ul>
      </div>

      <!-- Exam Traps -->
      <div class="ai-box-traps p-4 rounded-2xl border space-y-1.5 shadow-sm">
        <div class="box-heading flex items-center gap-2 font-bold text-xs sm:text-sm">
          <span>⚠️</span>
          <span>توقعات وفخاخ الامتحان (Exam Traps):</span>
        </div>
        <p class="leading-relaxed font-medium">${aiData.trap}</p>
      </div>

      <!-- Terminal Cheat Box -->
      <div class="code-terminal p-4 space-y-1.5" dir="ltr">
        <div class="text-[11px] text-amber-400 font-bold flex items-center justify-between" dir="rtl">
          <span>📝 القانون / الكود المختصر:</span>
          <span class="text-[10px] text-slate-400 font-mono">Reference</span>
        </div>
        <pre class="overflow-x-auto p-1 leading-relaxed text-xs font-mono">${aiData.code}</pre>
      </div>
    `;
  }

  // Populate Tab 3: Quiz
  const quizBodyEl = document.getElementById("subj-sh-quiz-body");
  if (quizBodyEl) {
    const quizQuestions = aiData.quiz || [];
    if (quizQuestions.length > 0) {
      quizBodyEl.innerHTML = quizQuestions.map((qObj, qIdx) => `
        <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <p class="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-purple-500/20 text-purple-600 flex items-center justify-center text-[11px] shrink-0 font-bold">${qIdx + 1}</span>
            <span>${qObj.q}</span>
          </p>
          <div class="space-y-2">
            ${qObj.options.map((opt, optIdx) => `
              <button onclick="checkQuizAnswer(this, ${optIdx === qObj.ans}, '${qObj.explain.replace(/'/g, "\\'")}')" 
                      class="w-full text-right p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-purple-500 hover:bg-purple-50/50 dark:hover:bg-purple-950/20 text-xs font-medium transition-all flex items-center justify-between">
                <span>${opt}</span>
                <span class="quiz-indicator text-sm font-bold opacity-0"></span>
              </button>
            `).join("")}
          </div>
          <div class="quiz-feedback hidden p-3 rounded-xl text-xs font-medium leading-relaxed"></div>
        </div>
      `).join("");
    } else {
      quizBodyEl.innerHTML = `
        <div class="text-center py-8 text-slate-500">
          <p class="text-3xl mb-1">🎯</p>
          <p class="text-xs">راجع الشرح والـ AI أولاً ثم تفقد أسئلة الامتحانات في قسم المادة.</p>
        </div>
      `;
    }
  }

  // Switch to initial tab
  setStudyHubTab(initialTab);

  // Show Modal
  modal.classList.remove("hidden");
};

window.closeStudyHub = function() {
  const modal = document.getElementById("study-hub-modal");
  if (modal) modal.classList.add("hidden");
};

window.setStudyHubTab = function(tab) {
  ["read", "ai", "quiz", "notes"].forEach(t => {
    const btn = document.getElementById("subj-sh-tab-" + t);
    const panel = document.getElementById("subj-sh-panel-" + t);
    if (btn) {
      btn.className = (t === tab)
        ? "px-3.5 py-2 rounded-xl bg-purple-600 text-white font-bold transition-all flex items-center gap-1.5 shadow"
        : "px-3.5 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 font-bold transition-all flex items-center gap-1.5";
    }
    if (panel) panel.classList.toggle("hidden", t !== tab);
  });

  const copyBtn = document.getElementById("subj-sh-copy-notes-btn");
  if (copyBtn) {
    copyBtn.classList.toggle("hidden", tab !== 'ai');
  }
};

window.navigateStudyItem = function(direction) {
  if (!currentItemsList || currentItemsList.length === 0) return;
  currentStudyIndex += direction;
  if (currentStudyIndex < 0) currentStudyIndex = currentItemsList.length - 1;
  if (currentStudyIndex >= currentItemsList.length) currentStudyIndex = 0;

  const nextItem = currentItemsList[currentStudyIndex];
  openStudyHub(nextItem.id, nextItem.title, curSubjectCourse.nameAr, nextItem.link || curSubjectCourse.driveUrl, 'read');
};

window.toggleCurrentItemDone = function() {
  if (!activeStudyItem) return;
  const isDone = window.BasmaglyStorage.toggleItem(activeStudyItem.itemId);
  const doneCheckbox = document.getElementById("subj-sh-done-checkbox");
  if (doneCheckbox) doneCheckbox.checked = isDone;

  if (curSubjectCourse) {
    updateSubjectProgress(curSubjectCourse);
    window.renderActiveTabContent();
    window.dispatchEvent(new CustomEvent("basmagly:progress-updated"));
  }
};

window.checkQuizAnswer = function(btn, isCorrect, explain) {
  const container = btn.closest(".p-4");
  const allBtns = container.querySelectorAll("button");
  allBtns.forEach(b => b.disabled = true);

  const feedback = container.querySelector(".quiz-feedback");
  feedback.classList.remove("hidden");

  if (isCorrect) {
    btn.classList.add("bg-emerald-500/20", "border-emerald-500", "text-emerald-800", "dark:text-emerald-300");
    feedback.className = "quiz-feedback p-3 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-900 dark:text-emerald-200";
    feedback.innerHTML = `<strong>إجابة صحيحة وممتازة! 🎉</strong><br>${explain}`;
  } else {
    btn.classList.add("bg-rose-500/20", "border-rose-500", "text-rose-800", "dark:text-rose-300");
    feedback.className = "quiz-feedback p-3 rounded-xl text-xs font-semibold bg-rose-50 dark:bg-rose-950/40 border border-rose-300 text-rose-900 dark:text-rose-200";
    feedback.innerHTML = `<strong>إجابة غير صحيحة! ⚠️</strong><br>${explain}`;
  }
};

window.copyAIToNotes = function() {
  if (!activeStudyItem) return;
  const aiData = window.getAILectureData(activeStudyItem.itemId, activeStudyItem.title, activeStudyItem.courseName);
  const txt = `\n\n📌 كبسولة ملخص: ${activeStudyItem.title}\n- الزبدة: ${aiData.summary}\n- تنبيه الامتحان: ${aiData.trap}\n`;

  const scratchpad = document.getElementById("scratchpad-textarea");
  const shNotes = document.getElementById("subj-sh-notes-textarea");

  if (scratchpad) {
    scratchpad.value += txt;
    scratchpad.dispatchEvent(new Event("input"));
  }
  if (shNotes) {
    shNotes.value += txt;
  }

  const btn = document.getElementById("subj-sh-copy-notes-btn");
  if (btn) {
    btn.textContent = "تم النسخ إلى كشكول الملاحظات بنجاح! ✓";
    setTimeout(() => { btn.textContent = "نسخ الملخص لكشكول الملاحظات 📝"; }, 2000);
  }
};

// Backward-compatible alias
window.openAILectureSummary = function(itemId, title, courseName) {
  openStudyHub(itemId, title, courseName, curSubjectCourse ? curSubjectCourse.driveUrl : '#', 'ai');
};

function initScratchpad(courseId) {
  const textarea = document.getElementById("scratchpad-textarea");
  const statusIndicator = document.getElementById("scratchpad-save-status");
  if (!textarea || !window.BasmaglyStorage) return;

  textarea.value = window.BasmaglyStorage.getNotes(courseId);

  let debounceTimer;
  textarea.addEventListener("input", () => {
    if (statusIndicator) statusIndicator.textContent = "جاري الحفظ...";
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      window.BasmaglyStorage.saveNotes(courseId, textarea.value);
      if (statusIndicator) statusIndicator.textContent = "محفوظ تلقائياً في المتصفح ✓";
    }, 500);
  });
}

function initSubjectSearch(course) {
  const input = document.getElementById("subject-search-input");
  if (!input) return;

  input.addEventListener("input", (e) => {
    const q = e.target.value.trim().toLowerCase();
    const container = document.getElementById("subject-tab-content");
    if (!container) return;

    if (!q) {
      window.renderActiveTabContent();
      return;
    }

    const allItems = [];
    Object.values(course.categories || {}).forEach(arr => {
      if (Array.isArray(arr)) allItems.push(...arr);
    });

    const matches = allItems.filter(item => item.title.toLowerCase().includes(q));
    if (matches.length === 0) {
      container.innerHTML = `
        <div class="text-center py-10 text-slate-500">
          <p class="text-2xl mb-1">🔍</p>
          <p class="text-xs">لا يوجد ملف يطابق "${q}" في هذه المادة</p>
        </div>
      `;
      return;
    }

    container.innerHTML = matches.map(item => `
      <div class="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 gap-3">
        <div class="min-w-0">
          <p class="text-sm font-semibold truncate">${item.title}</p>
          <span class="text-[10px] text-slate-500 uppercase">${item.type}</span>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="openStudyHub('${item.id}', '${escapeQuotes(item.title)}', '${escapeQuotes(course.nameAr)}', '${item.link || course.driveUrl}', 'read')" 
                  class="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white">ذاكر</button>
          <a href="${item.link}" target="_blank" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">درايف ↗</a>
        </div>
      </div>
    `).join("");
  });
}

function updateSubjectProgress(course) {
  if (!window.BasmaglyStorage) return;
  const progress = window.BasmaglyStorage.getCourseProgress(course);

  const percentageEl = document.getElementById("subj-progress-percentage");
  const countEl = document.getElementById("subj-progress-count");
  const barEl = document.getElementById("subj-progress-bar");

  if (percentageEl) percentageEl.textContent = `${progress.percentage}%`;
  if (countEl) countEl.textContent = `(${progress.completed} من ${progress.total} مكتمل)`;
  if (barEl) barEl.style.width = `${progress.percentage}%`;
}

function getCourseIcon(iconName) {
  switch (iconName) {
    case "code": return "💻";
    case "cpu": return "⚡";
    case "variable": return "📐";
    case "pie-chart": return "📊";
    case "trending-up": return "📈";
    case "message-square": return "💬";
    case "file-text": return "📝";
    case "shield": return "⚖️";
    default: return "📚";
  }
}
