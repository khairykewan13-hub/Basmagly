/**
 * Basmagly (بصمجلي 🚀) - Google Apps Script Drive Auto-Sync API
 * Folder ID: 1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza
 *
 * Instructions:
 * 1. Open https://script.google.com and create a new project.
 * 2. Paste this code into Code.gs.
 * 3. Click Deploy > New Deployment.
 * 4. Select type: Web App.
 * 5. Set Execute as: "Me" and Who has access: "Anyone".
 * 6. Copy the Web App URL and paste it into Basmagly's Drive Sync modal.
 */

const DRIVE_ROOT_FOLDER_ID = "1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza";

function doGet(e) {
  try {
    const rootFolder = DriveApp.getFolderById(DRIVE_ROOT_FOLDER_ID);
    const data = {
      timestamp: new Date().toISOString(),
      folderName: rootFolder.getName(),
      courses: scanSemesterCourses(rootFolder)
    };

    return ContentService.createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      error: true,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function scanSemesterCourses(rootFolder) {
  const courses = [];
  
  // Find First Semester folder or scan root directly
  let semesterFolder = rootFolder;
  const subFolders = rootFolder.getFolders();
  while (subFolders.hasNext()) {
    const f = subFolders.next();
    if (f.getName().toLowerCase().includes("first") || f.getName().includes("الاول") || f.getName().includes("الأول")) {
      semesterFolder = f;
      break;
    }
  }

  const courseFolders = semesterFolder.getFolders();
  while (courseFolders.hasNext()) {
    const courseFolder = courseFolders.next();
    const courseName = courseFolder.getName();
    const courseId = slugify(courseName);

    const categories = {
      lectures: [],
      sections: [],
      sheets: [],
      basmaga: [],
      videos: [],
      exams: []
    };

    scanCourseContent(courseFolder, categories);

    courses.push({
      id: courseId,
      nameEn: courseName,
      nameAr: courseName,
      driveUrl: courseFolder.getUrl(),
      categories: categories
    });
  }

  return courses;
}

function scanCourseContent(folder, categories) {
  // Scan files directly in course folder
  const files = folder.getFiles();
  while (files.hasNext()) {
    categorizeFile(files.next(), categories);
  }

  // Scan subfolders (Lectures, Sections, etc.)
  const subFolders = folder.getFolders();
  while (subFolders.hasNext()) {
    const sub = subFolders.next();
    const name = sub.getName().toLowerCase();
    
    let targetCat = "lectures";
    if (name.includes("sec") || name.includes("سكشن")) targetCat = "sections";
    else if (name.includes("sheet") || name.includes("assign") || name.includes("شيت")) targetCat = "sheets";
    else if (name.includes("exam") || name.includes("امتحان") || name.includes("mid")) targetCat = "exams";
    else if (name.includes("sum") || name.includes("basmag") || name.includes("ملخص")) targetCat = "basmaga";
    else if (name.includes("yt") || name.includes("video") || name.includes("فيديو")) targetCat = "videos";

    const subFiles = sub.getFiles();
    while (subFiles.hasNext()) {
      const f = subFiles.next();
      categories[targetCat].push(formatFileInfo(f, targetCat === "basmaga"));
    }
  }
}

function categorizeFile(file, categories) {
  const name = file.getName().toLowerCase();
  const isPanic = name.includes("basmag") || name.includes("guide") || name.includes("answer") || name.includes("ملخص") || name.includes("كبسولة");

  if (name.includes("lect") || name.includes("محاضر")) {
    categories.lectures.push(formatFileInfo(file, isPanic));
  } else if (name.includes("sec") || name.includes("سكشن")) {
    categories.sections.push(formatFileInfo(file, isPanic));
  } else if (name.includes("sheet") || name.includes("assign") || name.includes("شيت")) {
    categories.sheets.push(formatFileInfo(file, isPanic));
  } else if (name.includes("exam") || name.includes("امتحان")) {
    categories.exams.push(formatFileInfo(file, isPanic));
  } else if (name.includes("yt") || name.includes("video")) {
    categories.videos.push(formatFileInfo(file, false));
  } else if (isPanic) {
    categories.basmaga.push(formatFileInfo(file, true));
  } else {
    categories.lectures.push(formatFileInfo(file, false));
  }
}

function formatFileInfo(file, isPanic) {
  const mime = file.getMimeType();
  let type = "file";
  if (mime.includes("pdf")) type = "pdf";
  else if (mime.includes("document") || mime.includes("doc")) type = "doc";
  else if (mime.includes("presentation") || mime.includes("powerpoint")) type = "pptx";
  else if (mime.includes("video")) type = "video";

  return {
    id: "f-" + file.getId(),
    title: file.getName(),
    type: type,
    size: formatBytes(file.getSize()),
    isPanic: isPanic,
    isNew: (new Date() - file.getLastUpdated()) < (3 * 24 * 60 * 60 * 1000), // Created/Updated in last 3 days
    link: file.getUrl()
  };
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '') || "course";
}
