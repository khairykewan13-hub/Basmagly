/**
 * Basmagly Drive Sync Engine
 * Real-time synchronization with Google Drive folder via Google Apps Script Web App.
 */

const SYNC_CONFIG_KEY = "basmagly_drive_sync_url";
const SYNC_CACHE_KEY = "basmagly_drive_cached_data";

const BasmaglySync = {
  getSyncUrl() {
    return localStorage.getItem(SYNC_CONFIG_KEY) || "";
  },

  setSyncUrl(url) {
    localStorage.setItem(SYNC_CONFIG_KEY, url.trim());
  },

  getCachedData() {
    try {
      const cached = localStorage.getItem(SYNC_CACHE_KEY);
      return cached ? JSON.parse(cached) : null;
    } catch (e) {
      return null;
    }
  },

  setCachedData(data) {
    try {
      localStorage.setItem(SYNC_CACHE_KEY, JSON.stringify(data));
    } catch (e) {}
  },

  async fetchLiveData() {
    const url = this.getSyncUrl();
    if (!url) {
      return { success: false, reason: "NO_URL" };
    }

    try {
      this.updateStatusBadge("syncing");
      const res = await fetch(url + (url.includes("?") ? "&" : "?") + "t=" + Date.now());
      if (!res.ok) throw new Error("HTTP error " + res.status);
      const data = await res.json();
      
      if (data && Array.isArray(data.courses)) {
        this.setCachedData(data.courses);
        this.mergeWithActiveCourses(data.courses);
        this.updateStatusBadge("connected");
        return { success: true, count: data.courses.length };
      } else {
        throw new Error("Invalid payload format");
      }
    } catch (err) {
      console.warn("Drive sync failed, continuing with preloaded offline cache", err);
      this.updateStatusBadge("offline");
      return { success: false, error: err.message };
    }
  },

  mergeWithActiveCourses(liveCourses) {
    if (!window.COURSES_DATA) return;
    liveCourses.forEach(liveCourse => {
      const existing = window.COURSES_DATA.find(c => c.id === liveCourse.id || c.nameEn.toLowerCase() === liveCourse.nameEn.toLowerCase());
      if (existing) {
        if (liveCourse.categories) {
          Object.keys(liveCourse.categories).forEach(cat => {
            if (Array.isArray(liveCourse.categories[cat]) && liveCourse.categories[cat].length > 0) {
              existing.categories[cat] = liveCourse.categories[cat];
            }
          });
        }
      }
    });
    window.dispatchEvent(new CustomEvent("basmagly:courses-synced"));
  },

  updateStatusBadge(status) {
    const badge = document.getElementById("sync-status-badge");
    if (!badge) return;

    if (status === "connected") {
      badge.innerHTML = `<span class="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span><span>متزامن مع الدرايف</span>`;
      badge.className = "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
    } else if (status === "syncing") {
      badge.innerHTML = `<span class="inline-block w-2 h-2 rounded-full bg-amber-400 animate-spin"></span><span>جاري المزامنة...</span>`;
      badge.className = "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20";
    } else {
      badge.innerHTML = `<span class="inline-block w-2 h-2 rounded-full bg-blue-400"></span><span>بيانات الدرايف محدثة</span>`;
      badge.className = "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20";
    }
  },

  init() {
    // If we have cached live data, merge it immediately
    const cached = this.getCachedData();
    if (cached) {
      this.mergeWithActiveCourses(cached);
    }

    // Try live sync if configured
    if (this.getSyncUrl()) {
      this.fetchLiveData();
    } else {
      this.updateStatusBadge("offline");
    }

    // Bind sync modal triggers
    const syncBtn = document.getElementById("sync-modal-trigger");
    const modal = document.getElementById("sync-modal");
    const closeBtn = document.getElementById("sync-modal-close");
    const saveBtn = document.getElementById("sync-save-btn");
    const input = document.getElementById("sync-url-input");

    if (syncBtn && modal) {
      syncBtn.addEventListener("click", () => {
        if (input) input.value = this.getSyncUrl();
        modal.classList.remove("hidden");
      });
    }

    if (closeBtn && modal) {
      closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
    }

    if (saveBtn && input) {
      saveBtn.addEventListener("click", async () => {
        const url = input.value.trim();
        this.setSyncUrl(url);
        saveBtn.disabled = true;
        saveBtn.textContent = "جاري التحقق والمزامنة...";
        const result = await this.fetchLiveData();
        saveBtn.disabled = false;
        saveBtn.textContent = "حفظ ومزامنة فورية";

        if (result.success) {
          alert("تم الاتصال بـ Google Apps Script ومزامنة الملفات بنجاح! 🚀");
          if (modal) modal.classList.add("hidden");
        } else {
          alert("تم حفظ الرابط، ولكن تعذر جلب البيانات. تأكد من نشر الرابط كـ Web App بصلاحية Anyone.");
        }
      });
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  BasmaglySync.init();
});
