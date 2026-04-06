"use client";

import { useState, useEffect, useRef } from "react";
import BreathingChild from "./BreathingChild";
import PandaBaby from "./PandaBaby";
import dynamic from "next/dynamic";
const Panda3D = dynamic(() => import("./Panda3D"), { ssr: false });

/* ─── DESIGN TOKENS ─────────────────────────────────────────── */
const C: Record<string, string> = {
  bg: "#F5F3EF",
  panel: "#FFFFFF",
  sidebar: "#1C3D5A",
  sidebarHover: "#254E73",
  accent: "#D4845A",
  accentLight: "#F0C4A8",
  accentSoft: "#FDF0E8",
  forest: "#2D5A4E",
  forestLight: "#3A7264",
  terracotta: "#C4705A",
  terracottaLight: "#F0CEC6",
  gold: "#B8892C",
  goldLight: "#F5EDD5",
  sage: "#5E9672",
  sageLight: "#DCF0E4",
  lavender: "#7D6FAA",
  lavenderLight: "#EAE7F5",
  ocean: "#4A7FA0",
  oceanLight: "#DFF0F8",
  teal: "#2A7B8C",
  tealLight: "#E8F4F6",
  green: "#3A7D5C",
  greenLight: "#E8F5EE",
  red: "#C0392B",
  redLight: "#FDECEA",
  yellow: "#C49A1A",
  yellowLight: "#FEF9E7",
  border: "#E2DDD8",
  text: "#2A2A2A",
  textLight: "#5A5A6A",
  textMuted: "#8A8A9A",
  white: "#FFFFFF",
};

/* ══════════════════════════════════════════════════════════════
   NAVIGATION STRUCTURE
══════════════════════════════════════════════════════════════ */
const NAV = [
  {
    id: "first-aid", icon: "🆘", label: "עזרה ראשונה", color: C.red, lightColor: C.redLight,
    subs: [
      { id: "immediate", label: "מה לעשות מיד" },
      { id: "talking", label: "איך לדבר עם הילד" },
      { id: "reporting", label: "דיווח חובה" },
      { id: "contacts", label: "גורמי סיוע" },
    ],
  },
  {
    id: "psychoedu", icon: "🧠", label: "פסיכואדוקציה", color: C.teal, lightColor: C.tealLight,
    subs: [
      { id: "reactions", label: "תגובות נורמטיביות" },
      { id: "trauma", label: "השפעות הטראומה" },
      { id: "myths", label: "מיתוסים ועובדות" },
      { id: "healing", label: "שלבי הריפוי" },
    ],
  },
  {
    id: "breathing", icon: "🫧", label: "נשימות מודרכות", color: C.ocean, lightColor: C.oceanLight,
    subs: [
      { id: "balloon", label: "בלון הנשימה" },
      { id: "flower", label: "פרח הנשימה" },
      { id: "wave", label: "גל הים" },
      { id: "box", label: "נשימת קופסה" },
    ],
  },
  {
    id: "stabilization", icon: "💚", label: "ייצוב מצב רוח", color: C.green, lightColor: C.greenLight,
    subs: [
      { id: "grounding", label: "טכניקות גראונדינג" },
      { id: "routine", label: "שגרה ובטחון" },
      { id: "emotional", label: "ויסות רגשי" },
    ],
  },
  {
    id: "parent-art", icon: "🎨", label: "אמנות להורים", color: C.gold, lightColor: C.goldLight,
    subs: [
      { id: "safe-place", label: "ציור מקום בטוח" },
      { id: "emotion-body", label: "מפת רגשות" },
      { id: "strength-box", label: "קופסת חוזקות" },
      { id: "art-journal", label: "יומן ציורים" },
      { id: "worry-dolls", label: "בובות הדאגה" },
      { id: "inner-animal", label: "חיית הגבורה" },
    ],
  },
  {
    id: "therapist-art", icon: "🧩", label: "אמנות למטפלים", color: C.lavender, lightColor: C.lavenderLight,
    subs: [
      { id: "bridge", label: "ציור הגשר" },
      { id: "htp", label: "בית · עץ · אדם" },
      { id: "kfd", label: "משפחה קינטי KFD" },
      { id: "mandala", label: "מנדלה טיפולית" },
      { id: "mask", label: "מסכה" },
      { id: "sandtray", label: "קופסת החול" },
      { id: "narrative", label: "ספר חיים" },
      { id: "clay", label: "עבודה עם חימר" },
    ],
  },
  {
    id: "school", icon: "🏫", label: "מענה חינוכי", color: C.yellow, lightColor: C.yellowLight,
    subs: [
      { id: "protocol", label: "פרוטוקול צוות" },
      { id: "adjustments", label: "התאמות לימודיות" },
      { id: "communication", label: "תקשורת עם משפחה" },
      { id: "boundaries", label: "גבולות תפקיד" },
    ],
  },
];

/* ══════════════════════════════════════════════════════════════
   CONTENT DATA
══════════════════════════════════════════════════════════════ */
const CONTENT: any = {
  "first-aid": {
    immediate: {
      title: "מה לעשות מיד לאחר גילוי",
      blocks: [
        { type: "alert", color: "red", text: "אם הילד נמצא בסכנה מיידית — חייגו 100 (משטרה) עכשיו" },
        {
          type: "section", title: "עקרונות תגובה ראשונית",
          items: [
            { icon: "✅", text: "הישארו רגועים — ילדים קולטים את רגשות המבוגר ותגובת פאניקה עלולה לסגור אותם" },
            { icon: "✅", text: "האמינו לילד — אמרו: 'אני מאמין/ה לך. עשית דבר אמיץ מאוד שסיפרת לי'" },
            { icon: "✅", text: "הכירו שלא אשמתו — 'זה לא קרה בגללך. זה לא אשמתך'" },
            { icon: "✅", text: "הגנו — הבהירו שאתם שם כדי לשמור עליו ולדאוג שהפגיעה תפסיק" },
          ],
        },
        {
          type: "section", title: "מה לא לעשות",
          items: [
            { icon: "❌", text: "אל תחקרו ואל תשאלו שאלות חוזרות — תשאירו זאת לאנשי מקצוע" },
            { icon: "❌", text: "אל תבטיחו סודיות — אתם חייבים לדווח על פי חוק" },
            { icon: "❌", text: "אל תתעמתו עם המתעלל בנוכחות הילד" },
            { icon: "❌", text: "אל תביעו זעזוע — גם 'מה?!' בקול רם עלול לפגוע" },
          ],
        },
        {
          type: "steps", title: "5 הצעדים הראשונים",
          steps: [
            { num: "1", title: "הקשיבו", desc: "תנו לילד לספר בקצב שלו, ללא הפרעות" },
            { num: "2", title: "הגיבו", desc: "הביעו אמון, אהבה והכרה בגבורתו" },
            { num: "3", title: "הרגיעו", desc: "הבהירו שהוא בטוח עכשיו ושאתם שם" },
            { num: "4", title: "דווחו", desc: "פנו לעו\"ס לפי חוק — בתוך 24 שעות" },
            { num: "5", title: "תמכו", desc: "הישארו זמינים, קרובים ועקביים" },
          ],
        },
      ],
    },
    talking: {
      title: "איך לדבר עם הילד",
      blocks: [
        {
          type: "section", title: "עקרונות השיחה",
          items: [
            { icon: "💬", text: "השתמשו בשפה פשוטה ומותאמת לגיל הילד" },
            { icon: "💬", text: "פגשו בסביבה שקטה, בטוחה ופרטית" },
            { icon: "💬", text: "שבו בגובה עיניו — אל תעמדו מעליו" },
            { icon: "💬", text: "אפשרו שתיקות — אל תמלאו כל שתיקה מיד" },
          ],
        },
        {
          type: "phrases", title: "משפטים — כן ולא",
          good: ["אני כאן בשבילך.", "אני מאמין/ה לך.", "עשית דבר אמיץ מאוד.", "זה לא אשמתך — בכלל לא.", "אנחנו נטפל בזה ביחד."],
          bad: ["למה לא סיפרת לי קודם?", "אתה בטוח שזה קרה?", "בטח אתה הגזמת.", "אל תספר לאף אחד.", "איך הרשית לזה לקרות?"],
        },
        { type: "alert", color: "yellow", text: "⚠️ חשוב: תחקור לא מקצועי עלול לפגוע בתהליך המשפטי ובילד. מעל שתי שאלות — הפנו לחוקרי ילדים מוסמכים" },
      ],
    },
    reporting: {
      title: "דיווח חובה — החוק בישראל",
      blocks: [
        { type: "alert", color: "red", text: "על פי חוק הכשרות המשפטית וחוק העונשין — כל אדם המודע לפגיעה בקטין חייב לדווח. אי דיווח הוא עבירה פלילית." },
        {
          type: "section", title: "חובת הדיווח חלה על",
          items: [
            { icon: "👤", text: "כל אדם שמסר לו ילד על פגיעה" },
            { icon: "👤", text: "מורים, יועצים, גננות, פסיכולוגים" },
            { icon: "👤", text: "רופאים, אחיות, רופאי שיניים" },
            { icon: "👤", text: "הורים ובני משפחה" },
          ],
        },
        {
          type: "steps", title: "תהליך הדיווח",
          steps: [
            { num: "1", title: "פנו לעו\"ס", desc: "עובד/ת סוציאלי/ת בשירות לילד ולנוער — תוך 24 שעות" },
            { num: "2", title: "או לרווחה", desc: "מוקד ארצי 118" },
            { num: "3", title: "או למשטרה", desc: "100 — יחידת הסגל לעבירות מין" },
            { num: "4", title: "תעדו", desc: "שמרו תיעוד של מה שנאמר לכם" },
          ],
        },
      ],
    },
    contacts: {
      title: "גורמי סיוע ואנשי קשר",
      blocks: [
        {
          type: "contacts",
          items: [
            { name: "משטרת ישראל", phone: "100", hours: "24/7", color: C.red },
            { name: "מד\"א חירום", phone: "101", hours: "24/7", color: C.red },
            { name: "ער\"ן — עזרה ראשונה נפשית", phone: "1201", hours: "24/7", color: C.teal },
            { name: "מוקד רווחה ארצי", phone: "118", hours: "א'-ה' 8:00-20:00", color: C.green },
            { name: "איתן — סיוע לנפגעי תקיפה מינית", phone: "1202", hours: "24/7", color: C.accent },
          ],
        },
      ],
    },
  },
  "psychoedu": {
    reactions: {
      title: "תגובות נורמטיביות לפי גיל",
      blocks: [
        { type: "info", title: "חשוב לדעת", text: "אין 'תגובה נכונה' לטראומה. ילדים שונים מגיבים בצורות שונות — כולן תקינות. היעדר תגובה חיצונית גם הוא נורמלי." },
        {
          type: "age-groups", title: "תגובות לפי גיל",
          groups: [
            { age: "גיל 0–5", icon: "👶", reactions: ["רגרסיה — חזרה להרטבה, יניקה, דיבור בייביש", "הפרעות שינה וסיוטים", "היצמדות יתר להורים", "פחדים חדשים"] },
            { age: "גיל 6–12", icon: "🧒", reactions: ["ירידה בהישגים הלימודיים", "כאבי בטן וראש ללא רקע רפואי", "שינוי בהתנהגות חברתית", "עיסוק מוגבר בנושאים מיניים"] },
            { age: "גיל 13+", icon: "🧑", reactions: ["דיכאון, חרדה, מצבי רוח קיצוניים", "נסיגה חברתית", "פגיעה עצמית", "פלאשבקים, הימנעות מגירויים"] },
          ],
        },
        { type: "alert", color: "red", text: "⚠️ סימנים לפנייה דחופה: אמירות אובדניות, פגיעה עצמית, נסיגה קיצונית" },
      ],
    },
    trauma: {
      title: "כיצד טראומה משפיעה על המוח",
      blocks: [
        { type: "info", title: "מדוע זה כל כך מורכב?", text: "פגיעה מינית היא אחת הטראומות המורכבות ביותר — במיוחד כשהפוגע הוא אדם מוכר. היא פוגעת בתחושת הבטחון, באמון, ובדימוי העצמי." },
        {
          type: "section", title: "ארבעה ממדי ההשפעה (Finkelhor & Browne)",
          items: [
            { icon: "🔴", text: "סטיגמטיזציה — תחושת בושה, לכלוך, שונות מהאחרים" },
            { icon: "🟠", text: "אובדן אמון — קושי לסמוך על מבוגרים" },
            { icon: "🟡", text: "אובדן חופש — תחושת חוסר שליטה בגוף ובחיים" },
            { icon: "🟢", text: "מיניות טראומטית — בלבול לגבי גוף, גבולות, מין" },
          ],
        },
        {
          type: "section", title: "השפעות ביולוגיות",
          items: [
            { icon: "🧠", text: "האמיגדלה (מרכז האזעקה) הופכת רגישה יתר" },
            { icon: "🧠", text: "הקורטקס הקדם-מצחי עלול להיפגע זמנית" },
            { icon: "🧠", text: "זיכרונות טראומטיים נשמרים אחרת — בקטעים, בחושים" },
          ],
        },
      ],
    },
    myths: {
      title: "מיתוסים ועובדות",
      blocks: [
        {
          type: "myths",
          items: [
            { myth: "ילדים ממציאים סיפורי פגיעה", fact: "ילדים כמעט ולא ממציאים עדויות על פגיעה מינית. ילדים נוטים להמעיט בדיווח, לא להגזים." },
            { myth: "הפוגע הוא זר מסוכן שלא מכירים", fact: "ב-80-90% מהמקרים, הפוגע הוא אדם מוכר לילד — בן משפחה, מכר, מדריך." },
            { myth: "ילד שנפגע ייפגע בהכרח כמבוגר", fact: "עם תמיכה וטיפול מוקדם, ילדים רבים מתאוששים ומתפקדים היטב." },
            { myth: "בנים לא נפגעים מינית", fact: "כ-15-20% מהנפגעים הם בנים. בנים נוטים לדווח פחות בגלל סטיגמה." },
          ],
        },
      ],
    },
    healing: {
      title: "שלבי הריפוי",
      blocks: [
        { type: "info", title: "ריפוי הוא תהליך, לא אירוע", text: "אין לו ציר זמן קבוע. ילדים יכולים להתקדם, לסגת ולהתקדם שוב. כל ילד בקצב שלו." },
        {
          type: "healing-stages",
          stages: [
            { phase: "שלב 1", title: "בטחון וייצוב", desc: "יצירת סביבה בטוחה, שגרה יציבה, הפחתת איומים. זהו הבסיס לכל עבודה טיפולית." },
            { phase: "שלב 2", title: "עיבוד הטראומה", desc: "עם מטפל מוסמך — עיבוד הזיכרונות, הרגשות והמשמעויות." },
            { phase: "שלב 3", title: "אינטגרציה", desc: "שילוב החוויה לתוך נרטיב החיים. בניית זהות שאינה מוגדרת רק על ידי הטראומה." },
          ],
        },
        {
          type: "section", title: "גורמי חוסן שמאיצים ריפוי",
          items: [
            { icon: "💛", text: "מבוגר אחד לפחות שמאמין ותומך ללא תנאי" },
            { icon: "💛", text: "טיפול מקצועי מוקדם ומתאים לגיל" },
            { icon: "💛", text: "הסרת המתעלל מהסביבה" },
            { icon: "💛", text: "שגרה יציבה ובטוחה" },
            { icon: "💛", text: "חיבורים חברתיים חיוביים" },
          ],
        },
      ],
    },
  },
  "stabilization": {
    grounding: {
      title: "טכניקות גראונדינג",
      blocks: [
        { type: "info", title: "מהו גראונדינג?", text: "טכניקות שעוזרות לילד לחזור להווה כאשר הוא מוצף בזיכרונות, חרדה או מנותק. יעילות, מהירות ואפשר ללמד אותן לכל גיל." },
        {
          type: "technique", title: "טכניקת 5-4-3-2-1 (לגיל 6+)",
          steps: [
            { num: "5", sense: "👀 ראיה", text: "מצא 5 דברים שאתה רואה עכשיו" },
            { num: "4", sense: "✋ מגע", text: "מצא 4 דברים שאתה יכול לגעת בהם" },
            { num: "3", sense: "👂 שמיעה", text: "מצא 3 דברים שאתה שומע עכשיו" },
            { num: "2", sense: "👃 ריח", text: "מצא 2 דברים שאתה מריח" },
            { num: "1", sense: "👅 טעם", text: "מצא דבר אחד שאתה טועם" },
          ],
        },
        {
          type: "section", title: "טכניקות נוספות לפי גיל",
          items: [
            { icon: "🧒", text: "גיל 3-6: 'נגע בכל הצבעים הכחולים בחדר'" },
            { icon: "🧒", text: "גיל 6-10: 'קפא-כמו-פסל' — לעצור ולהרגיש את הגוף" },
            { icon: "🧑", text: "גיל 10+: 'שחר בזיכרון' — תאר מקום שאוהב ובו בטוח" },
            { icon: "🧑", text: "כל גיל: החזקת קוביית קרח — מחזיר לגוף ולהווה מיידית" },
          ],
        },
        { type: "alert", color: "teal", text: "💡 טיפ: תרגלו את הטכניקות יחד עם הילד ברגעים רגועים — כך הן יהיו זמינות כשצריך" },
      ],
    },
    routine: {
      title: "שגרה, בטחון ויציבות",
      blocks: [
        { type: "info", title: "מדוע שגרה כל כך חשובה?", text: "לאחר טראומה, המוח מחפש אות ביטחון. שגרה יציבה שולחת מסר: 'העולם ניתן לחיזוי. אתה בטוח.' זהו הבסיס לכל ריפוי." },
        {
          type: "section", title: "מרכיבי שגרה מייצבת",
          items: [
            { icon: "🌅", text: "שעות קבועות של שינה והתעוררות" },
            { icon: "🍽️", text: "ארוחות משפחתיות קבועות" },
            { icon: "📚", text: "שגרת שיעורי בית — מבנה וצפיות" },
            { icon: "🌙", text: "שגרת לילה קבועה — סיפור, שיחה, ברכת לילה" },
            { icon: "🤝", text: "זמן איכות יומי עם הורה — 15 דקות מיוחדות" },
          ],
        },
      ],
    },
    emotional: {
      title: "ויסות רגשי — כלים מעשיים",
      blocks: [
        {
          type: "section", title: "כלים לזיהוי רגשות",
          items: [
            { icon: "🌡️", text: "'מדד רגשות' — סולם 1-10 לעצמה של רגש, ניתן לצייר" },
            { icon: "🗺️", text: "'מפת גוף' — איפה בגוף אתה מרגיש את הרגש?" },
            { icon: "📔", text: "יומן רגשות — 3 משפטים ביום על 'איך הרגשתי'" },
          ],
        },
        {
          type: "section", title: "כלים להפחתת עוצמת רגשות",
          items: [
            { icon: "🎨", text: "ציור, מודלינג, חימר — ביטוי ללא מילים" },
            { icon: "🎵", text: "מוזיקה — ליצור פלייליסט של 'רגשות' שונים" },
            { icon: "🏃", text: "פעילות גופנית — ריצה, קפיצה, ריקוד לשחרור אנרגיה" },
            { icon: "🛁", text: "חושי — מקלחת חמה, שמיכה כבדה, בובה מוכרת" },
          ],
        },
        { type: "alert", color: "green", text: "💡 חשוב: תנו לגיטימציה לכל רגש: 'מובן שאתה מרגיש כך. זה הגיוני.' לא 'אל תבכה.'" },
      ],
    },
  },
  "school": {
    protocol: {
      title: "פרוטוקול לצוות חינוכי",
      blocks: [
        { type: "alert", color: "red", text: "⚠️ אם ילד גילה בפניכם — אתם חייבים לדווח לפי חוק. אל תחקרו ואל תבטיחו סודיות." },
        {
          type: "steps", title: "5 צעדים לצוות חינוכי",
          steps: [
            { num: "1", title: "האמינו", desc: "קבלו את הגילוי ברצינות ובשקט. אל תגיבו בזעזוע" },
            { num: "2", title: "עצרו", desc: "אל תשאלו שאלות — רק 'ספר לי עוד' אחד מרוכך" },
            { num: "3", title: "הפנו", desc: "הפנו מיד ליועץ/ת בית הספר או מנהל/ת" },
            { num: "4", title: "דווחו", desc: "יועץ בית הספר מדווח לעובד/ת סוציאלי/ת — תוך שעות" },
            { num: "5", title: "תמכו", desc: "שמרו על שגרה רגילה בכיתה — ביטחון ועקביות" },
          ],
        },
        {
          type: "section", title: "מה לא לעשות",
          items: [
            { icon: "❌", text: "אל תחקרו — גם שאלה אחת 'נוספת' עלולה לפגוע בהמשך" },
            { icon: "❌", text: "אל תספרו לקולגות — סודיות מוחלטת" },
            { icon: "❌", text: "אל תיצרו קשר עם הורה החשוד בפגיעה" },
            { icon: "❌", text: "אל תחכו — גם ספק מצריך דיווח" },
          ],
        },
      ],
    },
    adjustments: {
      title: "התאמות לימודיות",
      blocks: [
        { type: "info", title: "עיקרון מנחה", text: "הילד מפנה משאבים נפשיים אדירים לעיבוד הטראומה. הציפייה הלימודית צריכה להיות מותאמת בהתאם." },
        {
          type: "section", title: "התאמות מומלצות",
          items: [
            { icon: "📝", text: "דחיית מבחנים ומטלות — בתיאום עם הורים וצוות" },
            { icon: "🪑", text: "הושבה קרובה למורה — תחושת בטחון ומעקב" },
            { icon: "🚪", text: "אפשרות יציאה גמישה מהכיתה — ללא שאלות" },
            { icon: "⏰", text: "הקצאת זמן נוסף לבחינות" },
            { icon: "🤝", text: "קשר שבועי עם יועץ/ת — שחרור רגשי בסביבה בטוחה" },
          ],
        },
      ],
    },
    communication: {
      title: "תקשורת עם המשפחה",
      blocks: [
        {
          type: "section", title: "כיצד לתקשר עם ההורים",
          items: [
            { icon: "📞", text: "פנייה יזומה — ליצור קשר לפני שהבעיה מחמירה" },
            { icon: "🏫", text: "פגישה פנים-אל-פנים — לא בטלפון לנושאים רגישים" },
            { icon: "🎯", text: "מסר ממוקד — 'אנחנו כאן לתמוך. מה הילד/ה צריך/ה מאיתנו?'" },
            { icon: "🔒", text: "שמירה על סודיות — רק מה שנחוץ לעובדים הרלוונטיים" },
          ],
        },
      ],
    },
    boundaries: {
      title: "גבולות תפקיד הצוות",
      blocks: [
        { type: "info", title: "המורה ויועץ אינם מטפלים", text: "תפקיד הצוות החינוכי הוא לתמוך, לזהות ולהפנות — לא לטפל. גבולות ברורים מגנים על הילד ועל הצוות." },
        {
          type: "section", title: "מה כן — תפקיד הצוות",
          items: [
            { icon: "✅", text: "זיהוי סימני מצוקה ודיווח" },
            { icon: "✅", text: "שמירה על שגרה מסודרת ובטוחה" },
            { icon: "✅", text: "הכלה רגשית בסיסית — 'אני רואה שקשה לך'" },
          ],
        },
        {
          type: "section", title: "מה לא — חריגה מהתפקיד",
          items: [
            { icon: "❌", text: "שאיפה לגילוי נוסף / תחקור הילד" },
            { icon: "❌", text: "הבטחת סודיות לילד" },
            { icon: "❌", text: "נסיון 'לטפל' בטראומה ללא הכשרה" },
          ],
        },
        { type: "alert", color: "teal", text: "💡 לצוות חינוכי: גם אתם עלולים לחוות תגובות טראומטיות משניות. חשוב לפנות לסיוע מקצועי." },
      ],
    },
  },
};

/* ══════════════════════════════════════════════════════════════
   BREATHING PATTERNS
══════════════════════════════════════════════════════════════ */
const PATTERNS: any = {
  balloon: {
    name: "בלון הנשימה", emoji: "🎈", age: "גיל 4+",
    color: C.terracotta, glow: "rgba(196,112,90,0.25)", bg: "#FEF4F1",
    desc: "נשמת ותנפח בלון דמיוני. שאף לאט — הבלון גדל. נשוף לאט — הבלון מתרוקן.",
    tip: "עזרו לילד לדמיין בלון בצבע אהוב",
    phases: [
      { label: "שאף...", sub: "הבלון מתנפח 🎈", duration: 4, type: "inhale" },
      { label: "עצור", sub: "הבלון מלא לגמרי", duration: 2, type: "hold-in" },
      { label: "נשוף...", sub: "רוקן לאט לאט 💨", duration: 6, type: "exhale" },
      { label: "נוח", sub: "", duration: 2, type: "hold-out" },
    ],
  },
  flower: {
    name: "פרח הנשימה", emoji: "🌸", age: "גיל 5+",
    color: C.lavender, glow: "rgba(125,111,170,0.25)", bg: "#F5F2FC",
    desc: "דמיין פרח שנפתח ונסגר עם נשימתך. שאף — הפרח פורח. נשוף — הריח עובר.",
    tip: "הכינו פרח אמיתי ריחני לחיזוי",
    phases: [
      { label: "שאף...", sub: "הפרח פורח 🌸", duration: 5, type: "inhale" },
      { label: "הריח", sub: "שאף את הניחוח", duration: 3, type: "hold-in" },
      { label: "נשוף...", sub: "שחרר את הריח 🍃", duration: 5, type: "exhale" },
      { label: "שקט", sub: "", duration: 2, type: "hold-out" },
    ],
  },
  wave: {
    name: "גל הים", emoji: "🌊", age: "גיל 6+",
    color: C.ocean, glow: "rgba(74,127,160,0.25)", bg: "#EEF5FB",
    desc: "הגל עולה עם כל שאיפה ויורד בשקט עם כל נשיפה. אתה רוכב על הגל.",
    tip: "אפשר לשיר 'שׁוּ שׁוּ' עם הנשיפה",
    phases: [
      { label: "הגל עולה...", sub: "שאף עמוק 🌊", duration: 4, type: "inhale" },
      { label: "בפסגה...", sub: "הגל בגובהו", duration: 4, type: "hold-in" },
      { label: "הגל יורד...", sub: "נשוף בשקט 🌿", duration: 6, type: "exhale" },
      { label: "שקט...", sub: "הים שקט", duration: 2, type: "hold-out" },
    ],
  },
  box: {
    name: "נשימת קופסה", emoji: "⬛", age: "גיל 8+",
    color: C.sage, glow: "rgba(94,150,114,0.25)", bg: "#EEF7F2",
    desc: "ארבעה צלעות שווים — שאיפה, עצירה, נשיפה, עצירה. קצב מדויק ומרגיע.",
    tip: "קיימו נשימה משותפת יחד עם הילד",
    phases: [
      { label: "שאף", sub: "1 · 2 · 3 · 4", duration: 4, type: "inhale" },
      { label: "עצור", sub: "1 · 2 · 3 · 4", duration: 4, type: "hold-in" },
      { label: "נשוף", sub: "1 · 2 · 3 · 4", duration: 4, type: "exhale" },
      { label: "עצור", sub: "1 · 2 · 3 · 4", duration: 4, type: "hold-out" },
    ],
  },
};

/* ══════════════════════════════════════════════════════════════
   ART THERAPY DATA
══════════════════════════════════════════════════════════════ */
const PARENT_ART: any = {
  "safe-place": {
    icon: "🏡", title: "ציור מקום בטוח", tag: "ייצוב · כל גיל", color: C.sage, lightColor: C.sageLight,
    materials: ["דף לבן גדול", "צבעי פסטל / קריון", "זמן שקט יחד"],
    goal: "יצירת משאב פנימי של ביטחון ושקט", duration: "20-30 דקות",
    process: ["שבו יחד בסביבה שקטה ונעימה", "אמרו לילד: 'בוא נצייר מקום שאתה בו מרגיש בטוח לגמרי. יכול להיות אמיתי או דמיוני.'", "ציירו יחד — גם אתם — בלי להנחות את התוצאה", "כשסיימו — שאלו: 'מה יש שם? מה גורם לך להרגיש בטוח?'", "הציגו את הציור במקום בולט בחדרו"],
    tips: "אל תשאלו שאלות על הפגיעה. אם הציור מדאיג — שמרו אותו לשיחה עם מטפל.",
    variations: ["לגיל 3-5: פלסטלינה במקום ציור", "לגיל 10+: ציור + 3 מילים שמתארות את המקום"],
  },
  "emotion-body": {
    icon: "🗺️", title: "מפת רגשות בגוף", tag: "מודעות גופנית · גיל 6+", color: C.ocean, lightColor: C.oceanLight,
    materials: ["דף A3", "עפרונות צבעוניים / טושים"],
    goal: "חיבור בין רגשות לתחושות גופניות — בסיס לוויסות", duration: "25-35 דקות",
    process: ["שרטטו יחד קו של דמות אנושית על הדף", "בחרו 5-6 רגשות ותנו לכל אחד צבע", "שאלו: 'כשאתה כועס — איפה בגוף אתה מרגיש את זה? צבע שם.'", "עברו רגש-רגש: שמחה, פחד, עצב, שקט", "תלו את המפה ועשו אחת גם לעצמכם"],
    tips: "שתפו בחוויה שלכם: 'אני מרגישה עצב כאן בחזה.' ההשתתפות שלכם חשובה.",
    variations: ["הדפסו קו גוף מוכן", "לגיל 4-6: רק 3 רגשות — שמחה, עצב, פחד"],
  },
  "strength-box": {
    icon: "📦", title: "קופסת החוזקות", tag: "חוסן · גיל 5+", color: C.gold, lightColor: C.goldLight,
    materials: ["קופסת נעליים", "מגזינים ישנים", "מספריים", "דבק", "צבעים"],
    goal: "בניית דימוי עצמי חיובי ומיקוד במשאבים", duration: "45-60 דקות",
    process: ["קחו קופסת נעליים ביחד", "גזרו מהמגזינים תמונות שמייצגות את החוזקות שלו", "הכניסו גם: אבן שאוהב, צבע אהוב, ציור קטן", "כתבו על פתק: '5 דברים שאני טוב בהם' ושמרו בפנים", "פתחו את הקופסה בזמנים קשים"],
    tips: "מוזמנים להכין גם לכם קופסה! הוסיפו פריטים לאורך זמן.",
    variations: ["לגיל 3-5: קופסה עם תמונות פשוטות", "לגיל 10+: ספר חוזקות במקום קופסה"],
  },
  "art-journal": {
    icon: "📔", title: "יומן ציורים משותף", tag: "עיבוד יומי · כל גיל", color: C.terracotta, lightColor: C.terracottaLight,
    materials: ["מחברת לבנה עבה", "צבעי מים / גואש", "מכחולים"],
    goal: "יצירת שגרה יומית של ביטוי רגשי בטוח", duration: "10-15 דקות ביום",
    process: ["כל ערב — 10 דקות יחד עם המחברת", "ההנחיה: 'ציירו / הדביקו / כתבו כל מה שעולה. אין נכון ולא נכון.'", "אל תפרשו. אל תשאלו. רק שבו לידו.", "אפשר להציע: 'ציירי את הצבע שאתה מרגיש היום'", "לאחר כמה שבועות — עיינו יחד ושוחחו מה השתנה"],
    tips: "הנוכחות שלכם בשקט לצד הילד היא הטיפול. גם אתם יכולים לצייר.",
    variations: ["הדביקו תמונות מהטבע", "ליומן קולאז'"],
  },
  "worry-dolls": {
    icon: "🪆", title: "בובות הדאגה", tag: "שחרור חרדה · גיל 4-10", color: C.lavender, lightColor: C.lavenderLight,
    materials: ["גדילי צמר צבעוניים", "מקלות גפרורים / קיסמים", "דבק"],
    goal: "העברת הדאגות לדמות חיצונית — הפחתת עול רגשי", duration: "30-40 דקות",
    process: ["הסבירו: 'בגואטמלה לפני שינה מספרים לבובה דאגה אחת. היא לוקחת אותה בלילה.'", "צרו יחד 3-7 בובות קטנות מקיסמים וצמר", "כל בובה קיבלה שם ו'תפקיד'", "לפני שינה — ספרו לכל בובה דאגה ושימו אותה מתחת לכרית", "בבוקר — הבובות 'עבדו כל הלילה'"],
    tips: "הטקס חשוב כמו היצירה. לילדים גדולים — כתיבה על פתק ושמירה בקופסה.",
    variations: ["קנו בובות מוכנות", "שימוש בחימר במקום צמר"],
  },
  "inner-animal": {
    icon: "🦁", title: "חיית הגבורה שלי", tag: "חוסן · גיל 6+", color: C.sage, lightColor: C.sageLight,
    materials: ["חימר / בצק מלח", "צבעים", "דף לתיאור"],
    goal: "בניית אלטר-אגו של חוזק וגבורה", duration: "40-60 דקות",
    process: ["שאלו: 'אם הייתה לך חיה שמייצגת את החוזק שלך — מה היא הייתה?'", "ציירו / פסלו יחד את החיה", "שאלו: 'מה כוחותיה? מה היא יודעת לעשות?'", "תנו לחיה שם", "בזמנים קשים — שאלו: 'מה ה[שם] היה עושה עכשיו?'"],
    tips: "שימו את הפסל במקום בולט. גם ארנב הוא חיה גיבורה — אל תתקנו את הבחירה.",
    variations: ["לגיל 3-5: ציור פשוט של חיה", "כתיבת סיפור על החיה"],
  },
};

const THERAPIST_ART: any = {
  bridge: {
    icon: "🌉", title: "ציור הגשר", author: "Hays & Lyons, 1981",
    tag: "הערכה · אינדיקציות טראומה", color: C.terracotta, lightColor: C.terracottaLight,
    goal: "הערכת תחושת מעבר, תקווה ומשאבים פנימיים",
    instructions: "הנחו: 'צייר גשר שמוביל ממקום אחד למקום אחר. הוסף כל מה שתרצה.'",
    observe: ["יציבות הגשר — האם הוא עומד? מה התמיכות שלו?", "מה יש בשני צידי הגשר — עבר ועתיד", "נוכחות דמות על הגשר — האם הילד נמצא?", "מים מתחת — מאיימים / שקטים / לא קיימים"],
    indicators: ["גשר שבור / חסר — תחושת קטיעה, חוסר תקווה", "ים סוער — עיבוד רגשי פעיל", "ילד בצד השני — אוריינטציה לעתיד", "גשר ללא קצה — מחשבות של אין יציאה"],
    integration: "שלבו עם שיחה: 'ספר לי על הגשר. לאן הוא מוביל? מי יכול לעזור לך לעבור?'",
  },
  htp: {
    icon: "🏠", title: "בית · עץ · אדם (HTP)", author: "J.N. Buck, 1948",
    tag: "הערכה קלאסית · גיל 5+", color: C.gold, lightColor: C.goldLight,
    goal: "מיפוי עולם פנימי, גבולות ותחושת עצמי בהקשר משפחתי",
    instructions: "בשלושה דפים נפרדים: 'צייר בית', 'צייר עץ', 'צייר אדם'. בלי הנחיות נוספות.",
    observe: ["בית: חלונות — גישה לעולם; דלת — פתיחות; חומות — גבולות", "עץ: שורשים — יסוד; גזע — תחושת עצמי; ענפים — משאבים", "אדם: גודל, מיקום, ביטוי פנים, ידיים", "בהקשר CSA: ידיים נסתרות, גוף ללא פרטים, ראש גדול מגוף"],
    indicators: ["עצים ללא שורשים — חוסר בסיס ויציבות", "בית ללא חלונות — בידוד / קושי בקשר", "דמות ללא ידיים — תחושת חוסר שליטה", "מחיקות רבות — קונפליקט פנימי גבוה"],
    integration: "שאלו לאחר הציור: 'ספר לי על הבית הזה. מי גר שם? איך הוא מרגיש בו?'",
  },
  kfd: {
    icon: "👨‍👩‍👧", title: "ציור משפחה קינטי (KFD)", author: "Burns & Kaufman, 1970",
    tag: "דינמיקה משפחתית · גיל 5+", color: C.sage, lightColor: C.sageLight,
    goal: "הבנת מבנה הקשרים המשפחתיים מנקודת ראותו של הילד",
    instructions: "'צייר את כל בני המשפחה שלך, כולל אתה, עושים משהו.' (ציור פעיל, לא פסיבי)",
    observe: ["מיקום ומרחקים בין הדמויות", "גובה הדמויות — כוח וסמכות", "מחסומים בין דמויות (שולחן, קיר)", "השמטה של דמויות"],
    indicators: ["הפוגע שצוייר גדול מהיתר — פחד מעוצמה", "הילד בפינה / חוץ לציור — בידוד", "מחסומים בין הילד להורה המגן — חסימת הגנה", "השמטת הפוגע — הדחקה / דיסוציאציה"],
    integration: "שאלו: 'מה המשפחה עושה? איך מרגיש כל אחד?' — שאלו על דמויות, לא על עצמו.",
  },
  mandala: {
    icon: "⭕", title: "מנדלה טיפולית", author: "Jung / Kellogg",
    tag: "ייצוב · כל גיל", color: C.lavender, lightColor: C.lavenderLight,
    goal: "הכלה, ייצוב ויצירת שלמות פנימית",
    instructions: "הדפיסו עיגול ריק. הנחו: 'מלאו את העיגול בצורות, צבעים ודוגמאות. מתחילים מהמרכז.'",
    observe: ["מרכז — ה'עצמי', תחושת מרכז פנימי", "חלוקת הרבעים — איזונים בין חלקי החיים", "צבעים ועוצמתם", "האם המנדלה מלאה / ריקה / מחולקת"],
    indicators: ["מרכז ריק — חוסר תחושת עצמי", "מנדלה מחולקת — תחושת פיצול / דיסוציאציה", "צבעים חיים ומגוונים — ויסות טוב / משאבים", "שחור בלבד — צמצום, עצב, הדחקה"],
    integration: "אחרי הציור: 'ספר לי על המנדלה שלך. יש לה שם?' יעיל במיוחד לסיום פגישה.",
  },
  mask: {
    icon: "🎭", title: "מסכה — פנים ואחורים", author: "טיפול באמצעות אמנות",
    tag: "זהות · גיל 8+", color: C.ocean, lightColor: C.oceanLight,
    goal: "גישה לפער בין הפן החיצוני לחוויה הפנימית — עיבוד בושה",
    instructions: "מסכה מודפסת. קדמי: 'כך אני נראה לאחרים'. אחורי: 'כך אני מרגיש בפנים.'",
    observe: ["עוצמת הפערים בין הצדדים", "ביטויי הפנים בכל צד", "מה הילד בחר לחשוף / להסתיר"],
    indicators: ["חיוך מבחוץ / עצב מבפנים — דיסוציאציה מרגשות", "כעס מבחוץ / פחד מבפנים — קשר לבושה", "ריק מבפנים — ניתוק מעולם הפנימי"],
    integration: "שאלו: 'איזה צד יותר קרוב לאמת? כמה אנשים רואים את הצד הפנימי?' — רק לאחר בניית ברית טיפולית.",
  },
  sandtray: {
    icon: "🏖️", title: "קופסת החול", author: "Dora Kalff / Lowenfeld",
    tag: "פתוחה · גיל 3+", color: C.gold, lightColor: C.goldLight,
    goal: "ביטוי ללא מילים, גישה לתכנים פרה-ורבליים",
    instructions: "ספקו מגש חול ואסופת מיניאטורות. הנחו: 'צור עולם בחול.'",
    observe: ["שימוש במרחב (מלא / ריק / חסום)", "גבולות — האם דמויות עוברות אותם", "נוכחות / היעדרות דמויות מגינות", "נושאים: כלא, קרב, בריחה, גיבורים"],
    indicators: ["קרב חוזר ונשנה — עיבוד פעיל", "בריחה שנכשלת — תחושת מלכוד", "גיבורים שמצילים — עמידות ותקווה", "ריק מוחלט — ניתוק / עצב עמוק"],
    integration: "העד בשקט. שאלו: 'ספר לי על העולם שיצרת.' — זה בדיוק הנכון.",
  },
  narrative: {
    icon: "📖", title: "ספר חיים — נרטיב ויזואלי", author: "טיפול נרטיבי + אמנות",
    tag: "אינטגרציה · גיל 7+", color: C.forest, lightColor: C.sageLight,
    goal: "שילוב הטראומה לתוך נרטיב חיים שלם — החזרת סוכנות",
    instructions: "מחברת ריקה עם עמודים לפרקים. הילד הוא המחבר של סיפור חייו.",
    observe: ["כיצד הילד מציג את עצמו (גיבור? קורבן? שורד?)", "מה הוא בוחר לכלול ולא לכלול", "ציר הזמן — עבר, הווה, עתיד", "הסיום — תקווה / מלכוד"],
    indicators: ["זהות כ'שורד' לא 'קורבן' — אינדיקטור ריפוי", "חזרה כפייתית לאירוע — עיבוד פעיל", "פרק 'העתיד' ריק — חוסר תקווה"],
    integration: "כל פגישה — פרק אחד. הילד מחליט מה לכתוב. ב'סיום' הטיפול — הספר מוגש לילד.",
  },
  clay: {
    icon: "🧱", title: "עבודה עם חימר", author: "Somatic Art Therapy",
    tag: "סומטי · כל גיל", color: C.terracotta, lightColor: C.terracottaLight,
    goal: "גישה לתכנים גופניים ופרה-ורבליים, ויסות מגע",
    instructions: "ספקו חימר רך. הנחו: 'תן לידיים שלך לעשות מה שהן רוצות.' — ללא הנחיית תוצאה.",
    observe: ["איכות המגע — רך / חזק / הימנעות", "צורות שנוצרות — חיות, גוף, כלים, כלא", "לחיצה, כדור, שבירה — רמז לאנרגיה פנימית"],
    indicators: ["לחיצה עזה / הרס — שחרור כעס מוכל", "עיצוב עדין / קטן — הגנה ותשומת לב", "הימנעות ממגע — קושי עם גוף", "כלא / גדר — תחושת מלכוד"],
    integration: "'תשים את הדאגה הזו בחוץ. תסתכל עליה. איך היא נראית?' ואז — אפשרו לשנות, לשבור, לגלגל.",
  },
};

/* ══════════════════════════════════════════════════════════════
   SMALL COMPONENTS
══════════════════════════════════════════════════════════════ */
function Card({ children, style }: { children: React.ReactNode; style?: any }) {
  return (
    <div style={{ background: C.white, borderRadius: 14, padding: "20px 24px", marginBottom: 14, boxShadow: "0 1px 6px rgba(0,0,0,0.06)", border: `1px solid ${C.border}`, ...style }}>
      {children}
    </div>
  );
}
function AlertBox({ color, text }: { color: string; text: string }) {
  const m = ({ red: [C.redLight, C.red], yellow: [C.yellowLight, C.yellow], teal: [C.tealLight, C.teal], green: [C.greenLight, C.green] } as any)[color] || [C.tealLight, C.teal];
  return (
    <div style={{ background: m[0], border: `1.5px solid ${m[1]}`, borderRadius: 10, padding: "13px 18px", marginBottom: 14, color: m[1], fontWeight: 600, fontSize: 14, lineHeight: 1.6 }}>
      {text}
    </div>
  );
}
function InfoBox({ title, text }: { title: string; text: string }) {
  return (
    <div style={{ background: C.tealLight, border: `1px solid ${C.teal}33`, borderRadius: 10, padding: "13px 18px", marginBottom: 14 }}>
      <div style={{ fontWeight: 700, color: C.teal, fontSize: 13, marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 13, color: C.text, lineHeight: 1.7 }}>{text}</div>
    </div>
  );
}

function renderBlock(block: any, i: number) {
  if (block.type === "alert") return <AlertBox key={i} color={block.color} text={block.text} />;
  if (block.type === "info") return <InfoBox key={i} title={block.title} text={block.text} />;
  if (block.type === "section") return (
    <Card key={i}>
      <div style={{ fontWeight: 700, color: C.text, marginBottom: 12 }}>{block.title}</div>
      {block.items.map((item: any, j: number) => (
        <div key={j} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
          <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
          <span style={{ fontSize: 13, color: C.textLight, lineHeight: 1.6 }}>{item.text}</span>
        </div>
      ))}
    </Card>
  );
  if (block.type === "steps") return (
    <Card key={i}>
      <div style={{ fontWeight: 700, color: C.text, marginBottom: 14 }}>{block.title}</div>
      {block.steps.map((s: any, j: number) => (
        <div key={j} style={{ display: "flex", gap: 12, marginBottom: 10, alignItems: "flex-start" }}>
          <div style={{ minWidth: 32, height: 32, borderRadius: "50%", background: C.sidebar, color: C.white, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{s.num}</div>
          <div style={{ paddingTop: 5 }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: C.text }}>{s.title}</div>
            <div style={{ fontSize: 12, color: C.textLight, marginTop: 2 }}>{s.desc}</div>
          </div>
        </div>
      ))}
    </Card>
  );
  if (block.type === "technique") return (
    <Card key={i}>
      <div style={{ fontWeight: 700, color: C.text, marginBottom: 12 }}>{block.title}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {block.steps.map((s: any, j: number) => (
          <div key={j} style={{ background: C.tealLight, borderRadius: 12, padding: "10px 14px", textAlign: "center", flex: "1 1 120px", border: `1px solid ${C.teal}22` }}>
            <div style={{ fontSize: 18, marginBottom: 4 }}>{s.sense}</div>
            <div style={{ fontWeight: 800, color: C.teal, fontSize: 18 }}>{s.num}</div>
            <div style={{ fontSize: 11, color: C.textLight, marginTop: 4 }}>{s.text}</div>
          </div>
        ))}
      </div>
    </Card>
  );
  if (block.type === "phrases") return (
    <Card key={i}>
      <div style={{ fontWeight: 700, color: C.text, marginBottom: 12 }}>{block.title}</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <div style={{ fontWeight: 700, color: C.green, fontSize: 12, marginBottom: 8 }}>✅ כדאי לומר</div>
          {block.good.map((p: string, j: number) => <div key={j} style={{ background: C.greenLight, borderRadius: 8, padding: "7px 10px", fontSize: 13, color: C.text, marginBottom: 5 }}>{p}</div>)}
        </div>
        <div>
          <div style={{ fontWeight: 700, color: C.red, fontSize: 12, marginBottom: 8 }}>❌ הימנעו מ</div>
          {block.bad.map((p: string, j: number) => <div key={j} style={{ background: C.redLight, borderRadius: 8, padding: "7px 10px", fontSize: 13, color: C.text, marginBottom: 5 }}>{p}</div>)}
        </div>
      </div>
    </Card>
  );
  if (block.type === "myths") return (
    <div key={i}>
      {block.items.map((item: any, j: number) => (
        <Card key={j} style={{ padding: "14px 18px" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 6 }}><span style={{ fontSize: 12, fontWeight: 700, color: C.red, background: C.redLight, borderRadius: 6, padding: "2px 8px" }}>מיתוס</span></div>
          <div style={{ fontSize: 13, color: C.text, marginBottom: 8, fontStyle: "italic" }}>&quot;{item.myth}&quot;</div>
          <div style={{ display: "flex", gap: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.green, background: C.greenLight, borderRadius: 6, padding: "2px 8px", flexShrink: 0 }}>עובדה</span>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6 }}>{item.fact}</div>
          </div>
        </Card>
      ))}
    </div>
  );
  if (block.type === "contacts") return (
    <div key={i}>
      {block.items.map((c: any, j: number) => (
        <div key={j} style={{ display: "flex", alignItems: "center", gap: 14, background: C.white, border: `1px solid ${C.border}`, borderRight: `4px solid ${c.color}`, borderRadius: 10, padding: "12px 16px", marginBottom: 10 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{c.name}</div>
            <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{c.hours}</div>
          </div>
          <div style={{ background: c.color + "15", color: c.color, fontWeight: 800, fontSize: 18, padding: "6px 12px", borderRadius: 8, direction: "ltr" }}>{c.phone}</div>
        </div>
      ))}
    </div>
  );
  if (block.type === "age-groups") return (
    <Card key={i}>
      <div style={{ fontWeight: 700, color: C.text, marginBottom: 12 }}>{block.title}</div>
      {block.groups.map((g: any, j: number) => (
        <div key={j} style={{ marginBottom: 14, background: C.bg, borderRadius: 10, padding: "12px 14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 20 }}>{g.icon}</span>
            <span style={{ fontWeight: 800, color: C.sidebar, fontSize: 13 }}>{g.age}</span>
          </div>
          {g.reactions.map((r: string, k: number) => <div key={k} style={{ fontSize: 12, color: C.textLight, marginBottom: 4, display: "flex", gap: 6 }}><span style={{ color: C.accent }}>•</span>{r}</div>)}
        </div>
      ))}
    </Card>
  );
  if (block.type === "healing-stages") return (
    <div key={i}>
      {block.stages.map((s: any, j: number) => (
        <div key={j} style={{ display: "flex", gap: 14, background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 18px", marginBottom: 10 }}>
          <div style={{ background: C.sidebar, color: C.white, borderRadius: 8, padding: "5px 10px", fontWeight: 800, fontSize: 11, alignSelf: "flex-start", flexShrink: 0 }}>{s.phase}</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{s.title}</div>
            <div style={{ fontSize: 13, color: C.textLight, lineHeight: 1.6 }}>{s.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
  return null;
}

/* ══════════════════════════════════════════════════════════════
   BREATHING ORB
══════════════════════════════════════════════════════════════ */
function BreathingOrb({ pattern, phaseType, duration, running }: any) {
  const [scale, setScale] = useState(0.65);
  const [dur, setDur] = useState(4);
  const lastType = useRef<string | null>(null);

  useEffect(() => {
    if (!running) { setScale(0.65); lastType.current = null; return; }
    if (phaseType === lastType.current) return;
    lastType.current = phaseType;
    setDur(duration);
    if (phaseType === "inhale") setScale(1.36);
    else if (phaseType === "exhale") setScale(0.62);
  }, [phaseType, duration, running]);

  return (
    <div style={{ position: "relative", width: 220, height: 220, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "absolute", width: 180, height: 180, borderRadius: "50%", background: pattern.glow, transform: `scale(${scale * 1.18})`, transition: `transform ${dur}s ease-in-out`, filter: "blur(22px)" }} />
      <div style={{ width: 148, height: 148, borderRadius: "50%", background: `radial-gradient(circle at 36% 30%, ${pattern.color}BB, ${pattern.color})`, transform: `scale(${scale})`, transition: `transform ${dur}s ease-in-out`, boxShadow: `0 10px 36px ${pattern.glow}`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 2 }}>
        <span style={{ fontSize: 38 }}>{pattern.emoji}</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   BREATHING VIEW
══════════════════════════════════════════════════════════════ */
function BreathingView({ subId }: { subId: string }) {
  const pattern = PATTERNS[subId] || PATTERNS.balloon;
  const [running, setRunning] = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [cycles, setCycles] = useState(0);
  const phaseRef = useRef(0);
  const secRef = useRef<number | null>(null);

  useEffect(() => {
    setRunning(false); setPhaseIdx(0); setSecondsLeft(null); setCycles(0);
    phaseRef.current = 0; secRef.current = null;
  }, [subId]);

  useEffect(() => {
    if (!running) return;
    if (secRef.current === null) { secRef.current = pattern.phases[0].duration; setSecondsLeft(pattern.phases[0].duration); }
    const iv = setInterval(() => {
      secRef.current = (secRef.current as number) - 1;
      if ((secRef.current as number) <= 0) {
        const next = (phaseRef.current + 1) % pattern.phases.length;
        if (next === 0) setCycles(c => c + 1);
        phaseRef.current = next; secRef.current = pattern.phases[next].duration;
        setPhaseIdx(next);
      }
      setSecondsLeft(secRef.current);
    }, 1000);
    return () => clearInterval(iv);
  }, [running, pattern]);

  const reset = () => { setRunning(false); setPhaseIdx(0); setSecondsLeft(null); setCycles(0); phaseRef.current = 0; secRef.current = null; };
  const phase = pattern.phases[phaseIdx];
  const active = running && secondsLeft !== null;
  const phaseColors: any = { inhale: C.sage, "hold-in": C.gold, exhale: C.ocean, "hold-out": C.terracotta };

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 900, color: C.sidebar, marginBottom: 6, borderBottom: `3px solid ${pattern.color}`, paddingBottom: 10 }}>
        {pattern.emoji} {pattern.name}
      </h1>
      <p style={{ fontSize: 14, color: C.textLight, marginBottom: 20 }}>{pattern.desc}</p>
      <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={{ background: pattern.bg, borderRadius: 24, padding: "20px 24px", border: `2px solid ${pattern.color}33`, boxShadow: `0 8px 28px ${pattern.glow}`, display: "flex", flexDirection: "column", alignItems: "center" }}>
            {subId === "balloon" ? (
              <Panda3D
                phaseType={active ? phase.type : "hold-out"}
                duration={phase.duration}
                running={running}
              />
            ) : (
              <BreathingChild
                phaseType={active ? phase.type : "hold-out"}
                duration={phase.duration}
                running={running}
                color={pattern.color}
                emoji={pattern.emoji}
              />
            )}
            <div style={{ textAlign: "center", marginTop: 8 }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: active ? phaseColors[phase.type] : C.textMuted, minHeight: 30, transition: "color 0.3s" }}>{active ? phase.label : "מוכן?"}</div>
              <div style={{ fontSize: 13, color: C.textLight, minHeight: 20, marginTop: 2 }}>{active ? phase.sub : ""}</div>
              {active && <div style={{ fontSize: 44, fontWeight: 900, color: pattern.color, fontVariantNumeric: "tabular-nums", marginTop: 4 }}>{secondsLeft}</div>}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setRunning(r => !r)} style={{ background: running ? C.terracotta : pattern.color, color: C.white, border: "none", borderRadius: 50, padding: "10px 24px", cursor: "pointer", fontWeight: 800, fontSize: 14, fontFamily: "inherit" }}>
              {running ? "⏸ עצור" : "▶ התחל"}
            </button>
            {secondsLeft !== null && <button onClick={reset} style={{ background: "transparent", color: C.textLight, border: `1.5px solid ${C.border}`, borderRadius: 50, padding: "10px 16px", cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>↺</button>}
          </div>
          {cycles > 0 && <div style={{ fontSize: 13, color: pattern.color, fontWeight: 700 }}>✨ {cycles} מחזורים הושלמו</div>}
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <Card>
            <div style={{ fontWeight: 800, fontSize: 13, color: C.text, marginBottom: 12 }}>שלבי הנשימה</div>
            {pattern.phases.map((ph: any, i: number) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8, padding: "6px 10px", borderRadius: 8, background: active && phaseIdx === i ? pattern.color + "22" : "transparent", transition: "background 0.3s" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: active && phaseIdx === i ? pattern.color : C.border, color: active && phaseIdx === i ? C.white : C.textMuted, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, flexShrink: 0 }}>{ph.duration}</div>
                <span style={{ fontWeight: 700, fontSize: 13 }}>{ph.label}</span>
                <span style={{ fontSize: 12, color: C.textMuted }}>{ph.duration}s</span>
              </div>
            ))}
          </Card>
          <div style={{ background: pattern.color + "14", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: C.textLight }}>
            💡 <strong>גיל {pattern.age.replace("גיל ", "")}:</strong> {pattern.tip}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   ART CARD (collapsible)
══════════════════════════════════════════════════════════════ */
function ArtCard({ item }: { item: any; type?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: C.panel, border: `1.5px solid ${open ? item.color : C.border}`, borderRadius: 14, marginBottom: 10, overflow: "hidden", boxShadow: open ? `0 4px 20px ${item.color}22` : "none", transition: "all 0.18s" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", background: "transparent", border: "none", padding: "16px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, textAlign: "right", fontFamily: "inherit" }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: item.lightColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{item.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 14, color: C.text }}>{item.title}</div>
          {item.author && <div style={{ fontSize: 11, color: C.textMuted, marginTop: 1 }}>{item.author}</div>}
          <div style={{ display: "inline-block", marginTop: 4, background: item.lightColor, color: item.color, borderRadius: 20, padding: "1px 10px", fontSize: 11, fontWeight: 700 }}>{item.tag}</div>
        </div>
        <span style={{ color: C.textMuted, fontSize: 16 }}>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div style={{ padding: "0 18px 18px", borderTop: `1px solid ${C.border}` }}>
          <div style={{ background: item.lightColor, borderRadius: 10, padding: "10px 14px", margin: "12px 0", fontSize: 13 }}>
            <div style={{ fontWeight: 700, color: item.color, fontSize: 12, marginBottom: 3 }}>🎯 מטרה טיפולית</div>
            <div style={{ color: C.text }}>{item.goal}</div>
          </div>

          {item.materials && (
            <>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 12 }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 12, color: C.textLight, marginBottom: 6 }}>🎨 חומרים</div>
                  {item.materials.map((m: string, i: number) => <div key={i} style={{ fontSize: 12, color: C.textLight, marginBottom: 3 }}>· {m}</div>)}
                  <div style={{ fontSize: 11, color: C.textMuted, marginTop: 6 }}>⏱ {item.duration}</div>
                </div>
              </div>
              <div style={{ fontWeight: 800, fontSize: 12, color: C.textLight, marginBottom: 8 }}>📋 תהליך</div>
              {item.process.map((step: string, i: number) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 7 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", flexShrink: 0, background: item.color, color: C.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>{i + 1}</div>
                  <div style={{ fontSize: 13, color: C.textLight, lineHeight: 1.6, paddingTop: 1 }}>{step}</div>
                </div>
              ))}
              <div style={{ background: C.goldLight, borderRadius: 8, padding: "9px 13px", marginTop: 10, fontSize: 13, borderRight: `3px solid ${C.gold}` }}>
                <strong style={{ color: C.gold }}>💡 </strong>{item.tips}
              </div>
              {item.variations && (
                <div style={{ marginTop: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: 12, color: C.textLight, marginBottom: 5 }}>🔄 וריאציות</div>
                  {item.variations.map((v: string, i: number) => <div key={i} style={{ fontSize: 12, color: C.textLight, marginBottom: 3 }}>• {v}</div>)}
                </div>
              )}
            </>
          )}

          {item.instructions && (
            <>
              <div style={{ background: "#F8F4EE", borderRadius: 8, padding: "10px 13px", marginBottom: 12, fontSize: 13, fontStyle: "italic", borderRight: `3px solid ${item.color}`, color: C.text }}>{item.instructions}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 12, color: C.textLight, marginBottom: 7 }}>🔍 מה לצפות</div>
                  {item.observe.map((o: string, i: number) => <div key={i} style={{ fontSize: 12, color: C.textLight, marginBottom: 4 }}>· {o}</div>)}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 12, color: C.textLight, marginBottom: 7 }}>⚠️ אינדיקטורים</div>
                  {item.indicators.map((ind: string, i: number) => <div key={i} style={{ fontSize: 12, color: C.textLight, marginBottom: 4 }}>→ {ind}</div>)}
                </div>
              </div>
              <div style={{ background: item.lightColor, borderRadius: 8, padding: "9px 13px", fontSize: 13 }}>
                <strong style={{ color: item.color }}>🔗 אינטגרציה: </strong>{item.integration}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   AI CHAT
══════════════════════════════════════════════════════════════ */
function AIChat({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState([{ role: "assistant", content: "שלום! אני כאן לסייע עם שאלות מקצועיות — פרוטוקולים, כלי טיפול, מצבים ספציפיים ועוד. שאל/י בחופשיות." }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const txt = input.trim(); setInput("");
    const next = [...messages, { role: "user", content: txt }];
    setMessages(next); setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 1000,
          system: `אתה יועץ מקצועי בתחום הגנת ילדים, טיפול בטראומה ופגיעות מיניות בילדים. מסייע להורים, מטפלים וצוותים חינוכיים בישראל. ענה בעברית, בגישה חמה, מקצועית ומבוססת ראיות. הפנה לחוק ישראלי כשרלוונטי. היה מעשי וספציפי.`,
          messages: next.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      setMessages(m => [...m, { role: "assistant", content: data.content?.[0]?.text || "אירעה שגיאה. נסה שוב." }]);
    } catch {
      setMessages(m => [...m, { role: "assistant", content: "שגיאת תקשורת. נסה שוב." }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ position: "fixed", bottom: 20, left: 20, width: 340, background: C.white, borderRadius: 18, boxShadow: "0 12px 48px rgba(0,0,0,0.18)", border: `1px solid ${C.border}`, zIndex: 200, display: "flex", flexDirection: "column", maxHeight: "70vh" }}>
      <div style={{ background: `linear-gradient(135deg, ${C.sidebar}, ${C.sidebarHover})`, borderRadius: "18px 18px 0 0", padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ color: C.white, fontWeight: 800, fontSize: 14 }}>💬 יועץ AI</div>
          <div style={{ color: C.accentLight, fontSize: 11 }}>שאלות מקצועיות</div>
        </div>
        <button onClick={onClose} style={{ background: "rgba(255,255,255,0.15)", border: "none", color: C.white, borderRadius: 8, width: 28, height: 28, cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10, minHeight: 0 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-start" : "flex-end" }}>
            <div style={{ maxWidth: "82%", background: m.role === "user" ? C.bg : C.sidebar, color: m.role === "user" ? C.text : C.white, borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", padding: "9px 13px", fontSize: 13, lineHeight: 1.65, whiteSpace: "pre-wrap", border: m.role === "user" ? `1px solid ${C.border}` : "none" }}>{m.content}</div>
          </div>
        ))}
        {loading && <div style={{ display: "flex", justifyContent: "flex-end" }}><div style={{ background: C.sidebar, color: C.accentLight, borderRadius: "14px 14px 14px 4px", padding: "10px 18px", fontSize: 20 }}>···</div></div>}
        <div ref={endRef} />
      </div>
      <div style={{ padding: "10px 14px", borderTop: `1px solid ${C.border}`, display: "flex", gap: 8 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()} placeholder="שאל/י שאלה מקצועית..." style={{ flex: 1, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "9px 13px", fontSize: 13, direction: "rtl", outline: "none", background: C.bg, fontFamily: "inherit" }} />
        <button onClick={send} disabled={loading || !input.trim()} style={{ background: loading || !input.trim() ? C.border : C.sidebar, color: C.white, border: "none", borderRadius: 10, padding: "9px 16px", cursor: loading || !input.trim() ? "not-allowed" : "pointer", fontWeight: 700, fontSize: 13, fontFamily: "inherit" }}>שלח</button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════════════════════ */
export default function MagenApp() {
  const [activeModule, setActiveModule] = useState("first-aid");
  const [activeSub, setActiveSub] = useState("immediate");
  const [showChat, setShowChat] = useState(false);

  const mod = NAV.find(n => n.id === activeModule);

  const goTo = (moduleId: string, subId?: string) => {
    setActiveModule(moduleId);
    setActiveSub(subId || NAV.find(n => n.id === moduleId)?.subs[0]?.id || "");
  };

  const renderContent = () => {
    if (activeModule === "breathing") {
      return <BreathingView subId={activeSub} />;
    }
    if (activeModule === "parent-art") {
      const item = PARENT_ART[activeSub];
      if (!item) return null;
      return (
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: C.sidebar, marginBottom: 6, borderBottom: `3px solid ${item.color}`, paddingBottom: 10 }}>
            {item.icon} {item.title}
          </h1>
          <div style={{ display: "inline-block", marginBottom: 16, background: item.lightColor, color: item.color, borderRadius: 20, padding: "3px 12px", fontSize: 12, fontWeight: 700 }}>{item.tag}</div>
          <div style={{ background: C.goldLight, borderRadius: 12, padding: "11px 16px", marginBottom: 16, fontSize: 13, border: `1px solid ${C.gold}33` }}>
            <strong style={{ color: C.gold }}>🌟 עיקרון: </strong>הנוכחות שלכם חשובה יותר מהתוצאה האמנותית. אין &quot;נכון&quot; ו&quot;לא נכון&quot;.
          </div>
          <ArtCard item={item} type="parent" />
        </div>
      );
    }
    if (activeModule === "therapist-art") {
      const item = THERAPIST_ART[activeSub];
      if (!item) return null;
      return (
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: C.sidebar, marginBottom: 6, borderBottom: `3px solid ${item.color}`, paddingBottom: 10 }}>
            {item.icon} {item.title}
          </h1>
          {item.author && <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 12 }}>מקור: {item.author}</div>}
          <div style={{ background: C.terracottaLight, borderRadius: 10, padding: "10px 14px", fontSize: 13, marginBottom: 16, border: `1px solid ${C.terracotta}33` }}>
            <strong style={{ color: C.terracotta }}>⚠️ שימוש מקצועי: </strong>מיועד למטפלים מוסמכים. מומלץ עבודה תחת סופרוויז&apos;ן.
          </div>
          <ArtCard item={item} type="therapist" />
        </div>
      );
    }
    const sectionData = CONTENT[activeModule]?.[activeSub];
    if (!sectionData) return <div style={{ color: C.textMuted, fontSize: 14 }}>בחרו נושא מהתפריט</div>;
    return (
      <div>
        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 14 }}>
          <span style={{ background: mod?.lightColor, color: mod?.color, borderRadius: 20, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>{mod?.icon} {mod?.label}</span>
          <span style={{ color: C.textMuted, fontSize: 12 }}>›</span>
          <span style={{ fontSize: 12, color: C.textLight }}>{sectionData.title}</span>
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 900, color: C.sidebar, marginBottom: 18, borderBottom: `3px solid ${mod?.color}`, paddingBottom: 10 }}>{sectionData.title}</h1>
        {sectionData.blocks.map((b: any, i: number) => renderBlock(b, i))}
      </div>
    );
  };

  return (
    <div style={{ direction: "rtl", fontFamily: "'Heebo', 'Assistant', sans-serif", background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* HEADER */}
      <header style={{ background: `linear-gradient(135deg, ${C.sidebar} 0%, ${C.sidebarHover} 100%)`, padding: "13px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 14px rgba(0,0,0,0.18)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ background: C.accent, borderRadius: 11, width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🛡️</div>
          <div>
            <div style={{ color: C.white, fontWeight: 900, fontSize: 17, letterSpacing: -0.3 }}>מגן — מדריך תמיכה מקצועי</div>
            <div style={{ color: C.accentLight, fontSize: 11 }}>פגיעות מיניות בילדים | להורים · מטפלים · צוות חינוכי</div>
          </div>
        </div>
        <button onClick={() => setShowChat(v => !v)} style={{ background: showChat ? C.accent : "rgba(255,255,255,0.15)", color: C.white, border: "none", borderRadius: 10, padding: "8px 16px", cursor: "pointer", fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit", transition: "background 0.2s" }}>
          💬 יועץ AI
        </button>
      </header>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* SIDEBAR */}
        <aside style={{ width: 232, background: C.white, borderLeft: `1px solid ${C.border}`, overflowY: "auto", flexShrink: 0 }}>
          <div style={{ padding: "14px 14px 6px" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, letterSpacing: 1 }}>תוכן העניינים</div>
          </div>

          {NAV.map(navMod => (
            <div key={navMod.id}>
              <button onClick={() => goTo(navMod.id)} style={{ width: "100%", background: activeModule === navMod.id ? navMod.lightColor : "transparent", borderTop: "none", borderBottom: "none", borderLeft: "none", borderRightWidth: 4, borderRightStyle: "solid", borderRightColor: activeModule === navMod.id ? navMod.color : "transparent", padding: "10px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, transition: "all 0.15s", textAlign: "right", fontFamily: "inherit" }}>
                <span style={{ fontSize: 17 }}>{navMod.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: activeModule === navMod.id ? navMod.color : C.text }}>{navMod.label}</div>
                </div>
              </button>
              {activeModule === navMod.id && (
                <div style={{ paddingRight: 14 }}>
                  {navMod.subs.map(sub => (
                    <button key={sub.id} onClick={() => setActiveSub(sub.id)} style={{ width: "100%", background: activeSub === sub.id ? navMod.color + "18" : "transparent", border: "none", padding: "6px 12px 6px 8px", cursor: "pointer", borderRadius: 7, color: activeSub === sub.id ? navMod.color : C.textLight, fontWeight: activeSub === sub.id ? 700 : 400, fontSize: 12, display: "flex", alignItems: "center", gap: 6, margin: "2px 0", textAlign: "right", fontFamily: "inherit" }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: activeSub === sub.id ? navMod.color : C.border, flexShrink: 0 }} />
                      {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Emergency strip */}
          <div style={{ margin: "14px", background: C.redLight, border: `1px solid ${C.red}33`, borderRadius: 10, padding: "12px 14px" }}>
            <div style={{ fontWeight: 800, color: C.red, fontSize: 12, marginBottom: 8 }}>🆘 חירום</div>
            {([["משטרה", "100"], ["מד\"א", "101"], ["ער\"ן", "1201"], ["רווחה", "118"]] as const).map(([n, p]) => (
              <div key={n} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: C.textLight }}>{n}</span>
                <span style={{ fontSize: 12, fontWeight: 800, color: C.red, direction: "ltr" }}>{p}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>
          <div style={{ maxWidth: 780 }}>
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer style={{ background: C.sidebar, padding: "9px 24px", textAlign: "center", color: C.accentLight, fontSize: 11 }}>
        מגן — מדריך מקצועי | המידע נועד לסיוע ראשוני ואינו מחליף ייעוץ מקצועי | חירום: 100
      </footer>

      {/* Floating AI chat */}
      {showChat && <AIChat onClose={() => setShowChat(false)} />}
    </div>
  );
}
