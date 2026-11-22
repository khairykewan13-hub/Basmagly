/**
 * Basmagly (بصمجلي 🚀) - Academic Portal Data Hub
 * Year 2 (2026-2027) - First Semester
 * Synchronized with Google Drive: 1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza
 */

const BASMAGLY_CONFIG = {
  portalName: "Basmagly",
  portalArabicName: "بصمجلي",
  tagline: "المادة في كبسولة — بوابتك الذكية للامتياز",
  academicYear: "الفرقة الثانية (2026 - 2027)",
  semester: "الترم الأول",
  driveRootUrl: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza?usp=drive_link",
  midtermMegaDoc: {
    title: "كبسولة الميدتيرم الشاملة — كل ما يخص MID 1",
    subtitle: "تجميعة شاملة لكل ملخصات، شيتات، وأسئلة الميدتيرم لجميع المواد",
    url: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza?usp=drive_link",
    badge: "VIP طوارئ 🚨"
  }
};

const COURSES_DATA = [
  {
    id: "data-structure",
    code: "CS213",
    nameEn: "Data Structure",
    nameAr: "هياكل البيانات",
    description: "دراسة تراكيب البيانات الأساسية، تحليل تعقيد الخوارزميات (Big-O)، والتعامل المباشر مع الذاكرة و الـ Pointers والـ Linked Lists.",
    accentColor: "amber",
    colorHex: "#f59e0b",
    icon: "code",
    driveUrl: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza?usp=drive_link",
    stats: { lectures: 7, sections: 5, sheets: 3, basmaga: 4 },
    categories: {
      lectures: [
        { id: "ds-l1", title: "Lecture 1: Algorithm Analysis & Big-O", type: "pdf", size: "2.4 MB", isNew: false, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ds-l2", title: "Lecture 2: Array Mechanics & Memory Layout", type: "pdf", size: "1.8 MB", isNew: false, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ds-l3", title: "Lecture 3: Array Searching Techniques (Linear vs Binary)", type: "pdf", size: "2.1 MB", isNew: false, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ds-l4", title: "Lecture 4 & 5: Sorting Techniques (Bubble, Selection, Insertion)", type: "pdf", size: "3.5 MB", isNew: false, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ds-l6", title: "Lecture 6: Singly Linked List Implementation", type: "pdf", size: "2.9 MB", isNew: true, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ds-l7", title: "Lecture 7: Doubly & Circular Linked Lists", type: "pdf", size: "2.7 MB", isNew: true, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ds-l8", title: "Lecture 8: Stacks & Queues Applications", type: "pdf", size: "3.1 MB", isNew: true, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      sections: [
        { id: "ds-s1", title: "Section 1: C++ Pointers & Memory Allocation", type: "code", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ds-s2", title: "Section 2: Implementing Binary Search Recursive & Iterative", type: "code", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ds-s3", title: "Section 3: Sorting Code Walkthrough & Comparisons", type: "code", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ds-s4", title: "Section 4: Linked List Operations (Insert, Delete, Traverse)", type: "code", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ds-s5", title: "Section 5: Stack & Queue using Linked Nodes", type: "code", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      sheets: [
        { id: "ds-sh1", title: "Sheet 1: Algorithm Complexity & Asymptotic Notations", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ds-sh2", title: "Sheet 2: Arrays, Searching & Sorting Problems", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ds-sh3", title: "Assignment 2: DSA Problems & Tracing", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      basmaga: [
        { id: "ds-b1", title: "🔥 Data Structures Midterm Guide (الدليل الشامل للميدتيرم)", type: "pdf", isPanic: true, size: "491 KB", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ds-b2", title: "⚡ DS Midterm Answer Pack (تجميعة الإجابات والحلول النموذجية)", type: "pdf", isPanic: true, size: "3.7 MB", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ds-b3", title: "📝 ملخص مقارنة كل خوارزميات الـ Sorting في ورقة واحدة", type: "pdf", isPanic: true, size: "220 KB", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ds-b4", title: "💡 كبسولة تتبع الـ Pointers والـ Linked Lists بدون أخطاء", type: "pdf", isPanic: true, size: "310 KB", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      videos: [
        { id: "ds-v1", title: "قائمة تشغيل شرح Data Structures بالكامل (Google Doc Links)", type: "doc", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ds-v2", title: "فيديو مراجعة الميدتيرم وحل أهم المسائل المتوقعة", type: "video", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      exams: [
        { id: "ds-e1", title: "امتحانات ميدتيرم سابقة ونماذج الإجابة", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ds-e2", title: "تجميعة أسئلة MCQ مع التفسير البرمجي", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ]
    }
  },
  {
    id: "logic-design",
    code: "CS211",
    nameEn: "Logic Design",
    nameAr: "التصميم المنطقي",
    description: "الأنظمة العددية، البوابات المنطقية، الجبر البولي، خرائط كارنوف (K-Maps)، وتصميم الدوائر التوافقية والمتتابعة.",
    accentColor: "blue",
    colorHex: "#3b82f6",
    icon: "cpu",
    driveUrl: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza?usp=drive_link",
    stats: { lectures: 8, sections: 5, sheets: 3, basmaga: 4 },
    categories: {
      lectures: [
        { id: "ld-l1", title: "Lecture 1: Number Systems (Binary, Octal, Hex, Decimal)", type: "pdf", size: "2.1 MB", isNew: false, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ld-l2", title: "Lecture 2: Operations and Codes (BCD, Excess-3, Gray Code)", type: "pdf", size: "2.5 MB", isNew: false, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ld-l3", title: "Lecture 3: Logic Gates and Integrated Circuits", type: "pdf", size: "3.2 MB", isNew: false, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ld-l4", title: "Lecture 4: Boolean Algebra and DeMorgan's Theorems", type: "pdf", size: "2.8 MB", isNew: false, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ld-l5", title: "Lecture 5: Karnaugh Map (K-Map) Simplification (2, 3, 4 Variables)", type: "pdf", size: "3.9 MB", isNew: false, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ld-l6", title: "Lecture 6: Combinational Logic - Adders & Subtractors", type: "pdf", size: "3.0 MB", isNew: true, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ld-l7", title: "Lecture 7: Magnitude Comparators & Decoders/Encoders", type: "pdf", size: "2.6 MB", isNew: true, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ld-l8", title: "Lecture 8: Multiplexers (MUX) & Demultiplexers (DEMUX)", type: "pdf", size: "3.4 MB", isNew: true, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      sections: [
        { id: "ld-s1", title: "Section 1: Base Conversions & Complements (1's & 2's)", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ld-s2", title: "Section 2: Truth Tables and Logic Diagram Implementation", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ld-s3", title: "Section 3: K-Map Grouping Rules & Don't Care Conditions", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ld-s4", title: "Section 4: Designing Half & Full Adders using NAND only", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ld-s5", title: "Section 5: Practical Lab Experiments & Logic Gates ICs", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      sheets: [
        { id: "ld-sh1", title: "Sheet 1: Number Systems & Conversions (محلول)", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ld-sh2", title: "Sheet 2: Boolean Algebra & Logic Simplification", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ld-sh3", title: "Sheet 3: K-Maps & Canonical Forms (SOP & POS)", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      basmaga: [
        { id: "ld-b1", title: "🔥 كبسولة الـ K-Map: كيف تضمن الدرجة النهائية في دقيقتين", type: "pdf", isPanic: true, size: "350 KB", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ld-b2", title: "⚡ ورقة قوانين الجبر البولي (Boolean Laws & DeMorgan)", type: "pdf", isPanic: true, size: "180 KB", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ld-b3", title: "🎯 ملخص الدوائر التوافقية (Adders, MUX, Decoders) الفروق السريعة", type: "pdf", isPanic: true, size: "420 KB", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      videos: [
        { id: "ld-v1", title: "Logic Design YouTube Links Archive (Google Doc)", type: "doc", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      exams: [
        { id: "ld-e1", title: "تجميعة امتحانات الميدتيرم السابقة مع الحلول", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ]
    }
  },
  {
    id: "differential-equations",
    code: "MATH201",
    nameEn: "Differential Equations",
    nameAr: "المعادلات التفاضلية",
    description: "معادلات الرتبة الأولى والتطبيقات الهندسية، معادلات الرتب العليا الخطية، تحويلات لابلاس (Laplace Transforms).",
    accentColor: "purple",
    colorHex: "#a855f7",
    icon: "variable",
    driveUrl: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza?usp=drive_link",
    stats: { lectures: 5, sections: 4, sheets: 3, basmaga: 3 },
    categories: {
      lectures: [
        { id: "de-l1", title: "Lecture 1: Introduction, Order, Degree & Separable ODEs", type: "pdf", size: "2.3 MB", isNew: false, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "de-l2", title: "Lecture 2: Homogeneous First Order ODEs", type: "pdf", size: "2.1 MB", isNew: false, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "de-l3", title: "Lecture 3: Exact Equations & Integrating Factors", type: "pdf", size: "2.7 MB", isNew: false, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "de-l4", title: "Lecture 4: Linear First-Order ODEs & Bernoulli", type: "pdf", size: "2.5 MB", isNew: false, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "de-l5", title: "Lecture 5: Second Order Linear ODEs with Constant Coefficients", type: "pdf", size: "3.2 MB", isNew: true, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "de-l6", title: "Lecture 6: Method of Undetermined Coefficients & Variation of Parameters", type: "pdf", size: "3.4 MB", isNew: true, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      sections: [
        { id: "de-s1", title: "Section 1: Solved Examples on Separable & Homogeneous ODEs", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "de-s2", title: "Section 2: Finding Integrating Factors Step-by-Step", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "de-s3", title: "Section 3: Higher Order Characteristic Equations Cases", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      sheets: [
        { id: "de-sh1", title: "Sheet 1: First Order ODEs Practice Problems", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "de-sh2", title: "Sheet 2: Exact, Linear & Bernoulli Sheets", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      basmaga: [
        { id: "de-b1", title: "🔥 جدول الـ 6 حالات لمعادلات الرتبة الأولى وطريقة التعرف السريعة", type: "pdf", isPanic: true, size: "320 KB", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "de-b2", title: "⚡ كبسولة حل معادلات الرتبة الثانية والحالات الثلاثة للـ Roots", type: "pdf", isPanic: true, size: "270 KB", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      videos: [
        { id: "de-v1", title: "روابط شروحات الرياضيات والمعادلات التفاضلية (YT Doc)", type: "doc", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      exams: [
        { id: "de-e1", title: "نماذج امتحانات ميدتيرم وفاينال مع الحلول", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ]
    }
  },
  {
    id: "probability-and-statistics",
    code: "STAT201",
    nameEn: "Probability and Statistical Methods",
    nameAr: "الاحتمالات والطرق الإحصائية",
    description: "مبادئ الاحتمالات، المتغيرات العشوائية المنفصلة والمتصلة، دوال التوزيع الاحتمالي (Binomial, Poisson, Normal Distribution).",
    accentColor: "emerald",
    colorHex: "#10b981",
    icon: "pie-chart",
    driveUrl: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza?usp=drive_link",
    stats: { lectures: 5, sections: 4, sheets: 3, basmaga: 3 },
    categories: {
      lectures: [
        { id: "ps-l1", title: "Lecture 1: Sample Space, Events & Probability Rules", type: "pdf", size: "2.0 MB", isNew: false, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ps-l2", title: "Lecture 2: Conditional Probability & Bayes' Theorem", type: "pdf", size: "2.4 MB", isNew: false, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ps-l3", title: "Lecture 3: Discrete Random Variables (PMF & CDF)", type: "pdf", size: "2.6 MB", isNew: false, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ps-l4", title: "Lecture 4: Expectation, Variance & Moments", type: "pdf", size: "2.3 MB", isNew: false, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ps-l5", title: "Lecture 5: Binomial & Poisson Probability Distributions", type: "pdf", size: "3.1 MB", isNew: true, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ps-l6", title: "Lecture 6: Continuous Distributions & Standard Normal (Z-Table)", type: "pdf", size: "3.3 MB", isNew: true, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      sections: [
        { id: "ps-s1", title: "Section 1: Permutations, Combinations & Counting Principles", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ps-s2", title: "Section 2: Solving Bayes' Theorem Tree Diagrams", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ps-s3", title: "Section 3: Calculations of Mean & Variance for Random Variables", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      sheets: [
        { id: "ps-sh1", title: "Sheet 1: Basic Probability & Bayes Law", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ps-sh2", title: "Sheet 2: Discrete Distributions Practice", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      basmaga: [
        { id: "ps-b1", title: "🔥 كبسولة قوانين الاحتمالات وشجرة بايز في صفحة واحدة", type: "pdf", isPanic: true, size: "290 KB", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "ps-b2", title: "⚡ ملخص متى تستخدم Binomial ومتى Poisson وقوانين كل توزيع", type: "pdf", isPanic: true, size: "310 KB", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      videos: [
        { id: "ps-v1", title: "Probability & Stats Lectures Video Archive (Google Doc)", type: "doc", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      exams: [
        { id: "ps-e1", title: "بنك أسئلة امتحانات الميدتيرم مع الإجابات النموذجية", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ]
    }
  },
  {
    id: "statistical-analysis",
    code: "STAT202",
    nameEn: "Statistical Analysis",
    nameAr: "التحليل الإحصائي",
    description: "تحليل وتفسير البيانات، فترات الثقة، اختبارات الفروض (Hypothesis Testing - Z-test & T-test)، والانحدار والارتباط الخطّي.",
    accentColor: "cyan",
    colorHex: "#06b6d4",
    icon: "trending-up",
    driveUrl: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza?usp=drive_link",
    stats: { lectures: 5, sections: 4, sheets: 3, basmaga: 3 },
    categories: {
      lectures: [
        { id: "sa-l1", title: "Lecture 1: Descriptive Statistics & Data Visualization", type: "pdf", size: "2.2 MB", isNew: false, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "sa-l2", title: "Lecture 2: Sampling Distributions & Central Limit Theorem", type: "pdf", size: "2.7 MB", isNew: false, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "sa-l3", title: "Lecture 3: Point Estimation & Confidence Intervals", type: "pdf", size: "3.0 MB", isNew: false, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "sa-l4", title: "Lecture 4: Hypothesis Testing Fundamentals (Null vs Alt)", type: "pdf", size: "2.8 MB", isNew: true, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "sa-l5", title: "Lecture 5: One-sample & Two-sample Tests (Z & T)", type: "pdf", size: "3.2 MB", isNew: true, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      sections: [
        { id: "sa-s1", title: "Section 1: Calculating Confidence Intervals using Tables", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "sa-s2", title: "Section 2: Practical Step-by-Step for P-Value and Critical Regions", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      sheets: [
        { id: "sa-sh1", title: "Sheet 1: Confidence Intervals & Sample Size", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "sa-sh2", title: "Sheet 2: Hypothesis Testing Drills", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      basmaga: [
        { id: "sa-b1", title: "🔥 كبسولة اختبارات الفروض: متى ترفض ومتى تقبل H0 بدون تردد", type: "pdf", isPanic: true, size: "330 KB", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "sa-b2", title: "⚡ مخطط تفاعلي لاختيار الاختبار المناسب (Z أم T أم Chi-Square)", type: "pdf", isPanic: true, size: "280 KB", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      videos: [
        { id: "sa-v1", title: "Statistical Analysis YouTube Explanation Links", type: "doc", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      exams: [
        { id: "sa-e1", title: "امتحانات الميدتيرم والفاينال السابقة المحلولة", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ]
    }
  },
  {
    id: "communication-skills",
    code: "HUM202",
    nameEn: "Communication & Presentation Skills",
    nameAr: "مهارات الاتصال والعرض",
    description: "عناصر الاتصال الفعال، لغة الجسد، التغلب على معوقات التواصل، تصميم وإلقاء العروض التقديمية الاحترافية.",
    accentColor: "pink",
    colorHex: "#ec4899",
    icon: "message-square",
    driveUrl: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza?usp=drive_link",
    stats: { lectures: 3, sections: 2, sheets: 1, basmaga: 2 },
    categories: {
      lectures: [
        { id: "cs-l1", title: "Communication Skills Overview Presentation", type: "pptx", size: "1.3 MB", isNew: false, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "cs-l2", title: "Lecture: Verbal & Non-Verbal Communication Dynamics", type: "pdf", size: "1.9 MB", isNew: false, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "cs-l3", title: "Lecture: Presentation Design & Audience Engagement", type: "pdf", size: "2.4 MB", isNew: false, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      sections: [
        { id: "cs-s1", title: "Section: Body Language & Public Speaking Tips", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      sheets: [
        { id: "cs-sh1", title: "Case Studies & Practical Communication Scenarios", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      basmaga: [
        { id: "cs-b1", title: "🔥 Communication BASMAGA (ملف البصمجة الكامل لميدتيرم المهارات)", type: "pdf", isPanic: true, size: "887 KB", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "cs-b2", title: "⚡ أهم 50 سؤال متكرر في امتحانات الميدتيرم مع الإجابة", type: "pdf", isPanic: true, size: "340 KB", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      videos: [
        { id: "cs-v1", title: "روابط شروحات كورس المهارات (Google Doc)", type: "doc", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      exams: [
        { id: "cs-e1", title: "نماذج امتحانات السنين السابقة", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ]
    }
  },
  {
    id: "technical-report-writing",
    code: "HUM203",
    nameEn: "Technical Report Writing",
    nameAr: "كتابة التقارير الفنية",
    description: "هيكلية التقارير الهندسية والفنية، كتابة الـ Abstract و Introduction، المراجع والاستشهادات الأكاديمية (IEEE).",
    accentColor: "rose",
    colorHex: "#f43f5e",
    icon: "file-text",
    driveUrl: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza?usp=drive_link",
    stats: { lectures: 3, sections: 2, sheets: 1, basmaga: 2 },
    categories: {
      lectures: [
        { id: "tr-l1", title: "Lecture 1: Technical vs Literary Writing Characteristics", type: "pdf", size: "1.7 MB", isNew: false, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "tr-l2", title: "Lecture 2: Report Anatomy (Title, Abstract, Body, Conclusion)", type: "pdf", size: "2.1 MB", isNew: false, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "tr-l4", title: "Lecture 3 & 4: Technical Report Elements & Mechanics", type: "pdf", size: "5.6 MB", isNew: false, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      sections: [
        { id: "tr-s1", title: "Section: IEEE Citation Style & Avoiding Plagiarism", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      sheets: [
        { id: "tr-sh1", title: "Assignments & Writing Practice Prompts", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      basmaga: [
        { id: "tr-b1", title: "🔥 Technical BASMAGA (كبسولة كتابة التقارير ليلة الامتحان)", type: "pdf", isPanic: true, size: "908 KB", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "tr-b2", title: "⚡ ملخص الأجزاء الإلزامية في أي تقرير فني والأسئلة النظرية", type: "pdf", isPanic: true, size: "390 KB", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      videos: [
        { id: "tr-v1", title: "روابط شروحات كتابة التقارير (Google Doc)", type: "doc", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      exams: [
        { id: "tr-e1", title: "امتحانات الأعوام السابقة للميدتيرم", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ]
    }
  },
  {
    id: "human-rights",
    code: "HUM101",
    nameEn: "Human Rights",
    nameAr: "حقوق الإنسان",
    description: "المفاهيم الأساسية لحقوق الإنسان، المواثيق الدولية والدستورية، مكافحة الفساد، وأخلاقيات المهنة.",
    accentColor: "yellow",
    colorHex: "#eab308",
    icon: "shield",
    driveUrl: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza?usp=drive_link",
    stats: { lectures: 3, sections: 2, sheets: 1, basmaga: 2 },
    categories: {
      lectures: [
        { id: "hr-l1", title: "المحاضرة 1: التطور التاريخي لمفهوم حقوق الإنسان", type: "pdf", size: "1.5 MB", isNew: false, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "hr-l2", title: "المحاضرة 2: الإعلان العالمي لحقوق الإنسان والدستور", type: "pdf", size: "2.0 MB", isNew: false, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "hr-l3", title: "المحاضرة 3: قيم النزاهة والشفافية ومكافحة الفساد", type: "pdf", size: "1.8 MB", isNew: false, link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      sections: [
        { id: "hr-s1", title: "سكشن: مناقشات وحالات عملية في حقوق الإنسان", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      sheets: [
        { id: "hr-sh1", title: "أسئلة مراجعة وتطبيقات", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      basmaga: [
        { id: "hr-b1", title: "🔥 كبسولة حقوق الإنسان الشاملة (سؤال وجواب للميدتيرم)", type: "pdf", isPanic: true, size: "450 KB", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" },
        { id: "hr-b2", title: "⚡ أهم 40 سؤال صح وغلط واختياري متوقعة", type: "pdf", isPanic: true, size: "320 KB", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      videos: [
        { id: "hr-v1", title: "روابط شروحات ومراجعات حقوق الإنسان (Doc)", type: "doc", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ],
      exams: [
        { id: "hr-e1", title: "نماذج امتحانات السنوات السابقة", type: "pdf", link: "https://drive.google.com/drive/folders/1ypkhtis6u3RC2S6Ie8C0ER2bPxV-Gzza" }
      ]
    }
  }
];

if (typeof window !== "undefined") {
  window.BASMAGLY_CONFIG = BASMAGLY_CONFIG;
  window.COURSES_DATA = COURSES_DATA;
}
