/**
 * Basmagly Main Dashboard Application
 * Handles subject cards, global progress, real-time library search, and backup modals.
 */

document.addEventListener("DOMContentLoaded", () => {
  renderVIPBanner();
  renderCourseCards();
  updateGlobalStats();
  initGlobalSearch();
  initBackupRestoreModal();

  // Listen to progress updates
  window.addEventListener("basmagly:progress-updated", () => {
    updateGlobalStats();
    renderCourseCards();
  });

  window.addEventListener("basmagly:courses-synced", () => {
    renderCourseCards();
    updateGlobalStats();
  });
});

function renderVIPBanner() {
  const container = document.getElementById("vip-midterm-banner");
  if (!container || !window.BASMAGLY_CONFIG) return;
  const cfg = window.BASMAGLY_CONFIG.midtermMegaDoc;

  container.innerHTML = `
    <div class="relative overflow-hidden rounded-2xl p-5 md:p-6 bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-purple-500/15 border border-amber-500/30 backdrop-blur-md shadow-lg transition-all hover:border-amber-500/50">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white text-2xl shadow-md shrink-0">
            🚨
          </div>
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-black shadow-sm">${cfg.badge}</span>
              <span class="text-xs text-amber-300 font-medium">محدث للفرقة الثانية (2026-2027)</span>
            </div>
            <h3 class="text-lg md:text-xl font-bold text-white">${cfg.title}</h3>
            <p class="text-xs md:text-sm text-slate-300 mt-0.5">${cfg.subtitle}</p>
          </div>
        </div>
        <div class="flex items-center gap-3 w-full md:w-auto">
          <a href="${cfg.url}" target="_blank" rel="noopener noreferrer" 
             class="flex-1 md:flex-none text-center px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-lg hover:shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
            <span>فتح كبسولة الميدتيرم في الدرايف</span>
            <svg class="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </a>
        </div>
      </div>
    </div>
  `;
}

function renderCourseCards() {
  const grid = document.getElementById("courses-grid");
  if (!grid || !window.COURSES_DATA) return;

  grid.innerHTML = window.COURSES_DATA.map(course => {
    const progress = window.BasmaglyStorage.getCourseProgress(course);
    const borderAccent = `border-${course.accentColor}-500/30 hover:border-${course.accentColor}-500/60`;
    const bgBadge = `bg-${course.accentColor}-500/10 text-${course.accentColor}-400 border-${course.accentColor}-500/20`;

    // Calculate total materials count
    let totalMaterials = 0;
    if (course.categories) {
      Object.values(course.categories).forEach(arr => {
        if (Array.isArray(arr)) totalMaterials += arr.length;
      });
    }

    return `
      <div class="group relative rounded-2xl bg-slate-900/60 border ${borderAccent} p-5 backdrop-blur-md shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between">
        <div>
          <!-- Header -->
          <div class="flex items-start justify-between gap-3 mb-3">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-xl flex items-center justify-center text-xl font-bold shadow-inner" style="background-color: ${course.colorHex}20; color: ${course.colorHex}; border: 1px solid ${course.colorHex}40;">
                ${getCourseIcon(course.icon)}
              </div>
              <div>
                <span class="text-xs font-semibold px-2 py-0.5 rounded-md border ${bgBadge}">${course.code}</span>
                <h3 class="text-lg font-bold text-white mt-1 group-hover:text-amber-400 transition-colors">${course.nameAr}</h3>
                <p class="text-xs text-slate-400 font-medium">${course.nameEn}</p>
              </div>
            </div>
            
            <a href="${course.driveUrl}" target="_blank" title="فتح فولدر المادة على جوجل درايف" 
               class="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            </a>
          </div>

          <!-- Description -->
          <p class="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">${course.description}</p>
          
          <!-- Badges of content -->
          <div class="flex flex-wrap gap-1.5 mb-4 text-[11px]">
            <span class="badge-lecture">📘 ${course.categories?.lectures?.length || 0} محاضرات</span>
            <span class="badge-section">💻 ${course.categories?.sections?.length || 0} سكاشن</span>
            <span class="badge-summary">🔥 ${course.categories?.basmaga?.length || 0} كبسولات</span>
          </div>
        </div>

        <!-- Progress and Actions -->
        <div>
          <div class="mb-3">
            <div class="flex justify-between items-center text-xs text-slate-400 mb-1">
              <span>نسبة الإنجاز</span>
              <span class="font-bold text-white">${progress.percentage}% (${progress.completed}/${progress.total})</span>
            </div>
            <div class="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div class="h-full rounded-full transition-all duration-500" style="width: ${progress.percentage}%; background-color: ${course.colorHex};"></div>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <a href="subject.html?id=${course.id}" 
               class="btn-enter-study flex-1 text-center py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5">
              <span>ادخل المذاكرة</span>
              <svg class="w-3.5 h-3.5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </a>
            
            <a href="subject.html?id=${course.id}&panic=true" 
               title="كبسولة ليلة الامتحان (بصمجلي السريع)"
               class="btn-panic-badge px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1">
              <span>طوارئ ⚡</span>
            </a>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function updateGlobalStats() {
  if (!window.COURSES_DATA || !window.BasmaglyStorage) return;
  const progress = window.BasmaglyStorage.getGlobalProgress(window.COURSES_DATA);

  const totalEl = document.getElementById("stat-total-materials");
  const completedEl = document.getElementById("stat-completed-materials");
  const percentageEl = document.getElementById("stat-percentage");
  const barEl = document.getElementById("stat-progress-bar");

  if (totalEl) totalEl.textContent = progress.total;
  if (completedEl) completedEl.textContent = progress.completed;
  if (percentageEl) percentageEl.textContent = `${progress.percentage}%`;
  if (barEl) barEl.style.width = `${progress.percentage}%`;
}

function initGlobalSearch() {
  const searchInput = document.getElementById("global-search-input");
  const resultsContainer = document.getElementById("search-results-list");
  const searchSection = document.getElementById("search-results-section");
  const filterChips = document.querySelectorAll("[data-search-filter]");

  let activeFilter = "all";

  // Shortcut key '/'
  window.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput?.focus();
      searchSection?.scrollIntoView({ behavior: "smooth" });
    }
  });

  filterChips.forEach(chip => {
    chip.addEventListener("click", () => {
      filterChips.forEach(c => c.classList.remove("active-chip"));
      chip.classList.add("active-chip");
      activeFilter = chip.getAttribute("data-search-filter") || "all";
      performSearch();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", performSearch);
  }

  function performSearch() {
    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
    if (!resultsContainer) return;

    const allItems = [];
    window.COURSES_DATA.forEach(course => {
      if (!course.categories) return;
      Object.keys(course.categories).forEach(catKey => {
        const items = course.categories[catKey];
        if (Array.isArray(items)) {
          items.forEach(item => {
            allItems.push({
              ...item,
              categoryKey: catKey,
              courseName: course.nameAr,
              courseCode: course.code,
              courseId: course.id,
              courseColor: course.colorHex
            });
          });
        }
      });
    });

    const filtered = allItems.filter(item => {
      const matchFilter = activeFilter === "all" || item.categoryKey === activeFilter;
      const matchQuery = !query || 
        item.title.toLowerCase().includes(query) || 
        item.courseName.toLowerCase().includes(query) ||
        item.courseCode.toLowerCase().includes(query);
      return matchFilter && matchQuery;
    });

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `
        <div class="text-center py-12 text-slate-400">
          <p class="text-3xl mb-2">🔍</p>
          <p class="text-sm font-medium">لم نجد أي ملف يطابق بحثك "${query}"</p>
          <p class="text-xs text-slate-500 mt-1">جرب كلمات أخرى أو اختر تصنيفاً مختلفاً</p>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = filtered.slice(0, 30).map(item => {
      const isStudied = window.BasmaglyStorage.isItemStudied(item.id);
      return `
        <div class="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all backdrop-blur-sm gap-3">
          <div class="flex items-center gap-3 min-w-0">
            <button onclick="toggleItemStatus('${item.id}', this)" 
                    class="w-6 h-6 rounded-md border flex items-center justify-center shrink-0 transition-all ${isStudied ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-slate-700 bg-slate-800 text-transparent hover:border-slate-500'}">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
            </button>
            <div class="min-w-0">
              <div class="flex items-center gap-2 mb-0.5">
                <span class="text-[10px] font-bold px-1.5 py-0.2 rounded" style="background-color: ${item.courseColor}20; color: ${item.courseColor};">${item.courseCode}</span>
                <span class="text-xs text-slate-400">${item.courseName}</span>
                ${item.isPanic ? `<span class="px-1.5 py-0.2 rounded text-[10px] bg-amber-500/20 text-amber-400 font-bold">بصمجة 🔥</span>` : ''}
              </div>
              <p class="text-sm font-medium text-white truncate">${item.title}</p>
            </div>
          </div>
          
          <div class="flex items-center gap-2 shrink-0">
            <a href="subject.html?id=${item.courseId}" class="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 transition-all">
              <span>صفحة المادة</span>
              <svg class="w-3.5 h-3.5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </a>
            <a href="${item.link}" target="_blank" class="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-xs font-semibold flex items-center gap-1 transition-all" title="فتح في جوجل درايف">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            </a>
          </div>
        </div>
      `;
    }).join("");
  }

  performSearch();
}

window.toggleItemStatus = function(itemId, btn) {
  if (!window.BasmaglyStorage) return;
  const isStudied = window.BasmaglyStorage.toggleItemStudied(itemId);
  if (isStudied) {
    btn.className = "w-6 h-6 rounded-md border flex items-center justify-center shrink-0 transition-all bg-emerald-500 border-emerald-400 text-black";
  } else {
    btn.className = "w-6 h-6 rounded-md border flex items-center justify-center shrink-0 transition-all border-slate-700 bg-slate-800 text-transparent hover:border-slate-500";
  }
};

function initBackupRestoreModal() {
  const modal = document.getElementById("backup-modal");
  const trigger = document.getElementById("backup-modal-trigger");
  const closeBtn = document.getElementById("backup-modal-close");
  const exportBtn = document.getElementById("export-backup-btn");
  const importInput = document.getElementById("import-backup-file");

  if (trigger && modal) {
    trigger.addEventListener("click", () => modal.classList.remove("hidden"));
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
  }

  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      window.BasmaglyStorage.exportBackupJSON();
    });
  }

  if (importInput) {
    importInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      window.BasmaglyStorage.importBackupJSON(
        file,
        () => {
          alert("تم استيراد نسختك الاحتياطية بنجاح! سيتم تحديث الصفحة الآن 🚀");
          window.location.reload();
        },
        (err) => {
          alert("فشل استيراد الملف: " + err.message);
        }
      );
    });
  }
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
