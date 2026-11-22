/**
 * Basmagly Storage & Backup Engine
 * Handles LocalStorage persistence, progress tracking, scratchpads, and JSON export/import.
 */

const STORAGE_KEYS = {
  STUDIED_ITEMS: "basmagly_studied_items",
  SCRATCHPADS: "basmagly_scratchpads",
  THEME: "basmagly_theme",
  CALCULATOR_DATA: "basmagly_calculator_data",
  SYNC_CONFIG: "basmagly_sync_config",
  TIMER_STATE: "basmagly_timer_state"
};

const BasmaglyStorage = {
  // --- Studied Items Progress ---
  getStudiedItems() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STUDIED_ITEMS);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.error("Failed to load studied items", e);
      return {};
    }
  },

  isItemStudied(itemId) {
    const items = this.getStudiedItems();
    return !!items[itemId];
  },

  toggleItemStudied(itemId) {
    const items = this.getStudiedItems();
    items[itemId] = !items[itemId];
    if (!items[itemId]) {
      delete items[itemId];
    }
    localStorage.setItem(STORAGE_KEYS.STUDIED_ITEMS, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent("basmagly:progress-updated", { detail: { itemId, status: !!items[itemId] } }));
    return !!items[itemId];
  },

  getCourseProgress(course) {
    if (!course || !course.categories) return { completed: 0, total: 0, percentage: 0 };
    const studied = this.getStudiedItems();
    let total = 0;
    let completed = 0;

    Object.keys(course.categories).forEach(catKey => {
      const list = course.categories[catKey];
      if (Array.isArray(list)) {
        list.forEach(item => {
          total++;
          if (studied[item.id]) completed++;
        });
      }
    });

    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, percentage };
  },

  getGlobalProgress(courses) {
    let grandTotal = 0;
    let grandCompleted = 0;
    courses.forEach(c => {
      const p = this.getCourseProgress(c);
      grandTotal += p.total;
      grandCompleted += p.completed;
    });
    const percentage = grandTotal > 0 ? Math.round((grandCompleted / grandTotal) * 100) : 0;
    return { completed: grandCompleted, total: grandTotal, percentage };
  },

  // --- Auto-saved Scratchpad Notes ---
  getNotes(subjectId) {
    try {
      const allNotes = JSON.parse(localStorage.getItem(STORAGE_KEYS.SCRATCHPADS) || "{}");
      return allNotes[subjectId] || "";
    } catch (e) {
      return "";
    }
  },

  saveNotes(subjectId, text) {
    try {
      const allNotes = JSON.parse(localStorage.getItem(STORAGE_KEYS.SCRATCHPADS) || "{}");
      allNotes[subjectId] = text;
      localStorage.setItem(STORAGE_KEYS.SCRATCHPADS, JSON.stringify(allNotes));
      return true;
    } catch (e) {
      console.error("Failed to save scratchpad notes", e);
      return false;
    }
  },

  // --- Calculator Persistence ---
  getCalculatorData() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.CALCULATOR_DATA) || "{}");
    } catch (e) {
      return {};
    }
  },

  saveCalculatorData(data) {
    localStorage.setItem(STORAGE_KEYS.CALCULATOR_DATA, JSON.stringify(data));
  },

  // --- Theme ---
  getTheme() {
    return localStorage.getItem(STORAGE_KEYS.THEME) || "light";
  },

  setTheme(theme) {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    document.documentElement.setAttribute("data-theme", theme);
    window.dispatchEvent(new CustomEvent("basmagly:theme-changed", { detail: theme }));
  },

  // --- Backup & Restore (JSON) ---
  exportBackupJSON() {
    const backup = {
      version: "1.0",
      app: "Basmagly",
      timestamp: new Date().toISOString(),
      studiedItems: this.getStudiedItems(),
      scratchpads: JSON.parse(localStorage.getItem(STORAGE_KEYS.SCRATCHPADS) || "{}"),
      calculatorData: this.getCalculatorData(),
      theme: this.getTheme()
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const dateStr = new Date().toISOString().split("T")[0];
    a.href = url;
    a.download = `Basmagly_Backup_${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  importBackupJSON(jsonFile, onSuccess, onError) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (!data || data.app !== "Basmagly") {
          throw new Error("الملف المحدد ليس نسخة احتياطية صالحة من Basmagly.");
        }

        if (data.studiedItems) localStorage.setItem(STORAGE_KEYS.STUDIED_ITEMS, JSON.stringify(data.studiedItems));
        if (data.scratchpads) localStorage.setItem(STORAGE_KEYS.SCRATCHPADS, JSON.stringify(data.scratchpads));
        if (data.calculatorData) localStorage.setItem(STORAGE_KEYS.CALCULATOR_DATA, JSON.stringify(data.calculatorData));
        if (data.theme) this.setTheme(data.theme);

        if (onSuccess) onSuccess(data);
      } catch (err) {
        if (onError) onError(err);
      }
    };
    reader.onerror = () => {
      if (onError) onError(new Error("حدث خطأ أثناء قراءة الملف."));
    };
    reader.readAsText(jsonFile);
  }
};

if (typeof window !== "undefined") {
  window.BasmaglyStorage = BasmaglyStorage;
}
