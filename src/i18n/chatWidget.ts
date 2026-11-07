export interface ChatWidgetStrings {
  title: string;
  subtitle: string;
  placeholder: string;
  send: string;
  greeting: string;
  typing: string;
  error: string;
  open: string;
  close: string;
}

const lv: ChatWidgetStrings = {
  title: "AI asistents",
  subtitle: "Atbildām uzreiz",
  placeholder: "Uzrakstiet jautājumu…",
  send: "Sūtīt",
  greeting:
    "Sveiki! Esmu Luxury Chocolate AI asistents. Jautājiet par produktiem, cenām, pasūtīšanu vai apdruku — atbildēšu uzreiz.",
  typing: "Asistents raksta…",
  error: "Neizdevās saņemt atbildi. Lūdzu, mēģiniet vēlreiz.",
  open: "Atvērt čatu",
  close: "Aizvērt čatu",
};

const en: ChatWidgetStrings = {
  title: "AI assistant",
  subtitle: "We reply instantly",
  placeholder: "Type your question…",
  send: "Send",
  greeting:
    "Hello! I'm the Luxury Chocolate AI assistant. Ask about products, prices, ordering or printing — I'll answer right away.",
  typing: "Assistant is typing…",
  error: "Could not get a reply. Please try again.",
  open: "Open chat",
  close: "Close chat",
};

const ru: ChatWidgetStrings = {
  title: "AI-ассистент",
  subtitle: "Отвечаем мгновенно",
  placeholder: "Напишите вопрос…",
  send: "Отправить",
  greeting:
    "Здравствуйте! Я AI-ассистент Luxury Chocolate. Спросите о продуктах, ценах, заказе или печати — отвечу сразу.",
  typing: "Ассистент печатает…",
  error: "Не удалось получить ответ. Попробуйте ещё раз.",
  open: "Открыть чат",
  close: "Закрыть чат",
};

const et: ChatWidgetStrings = {
  title: "AI-assistent",
  subtitle: "Vastame koheselt",
  placeholder: "Kirjutage küsimus…",
  send: "Saada",
  greeting:
    "Tere! Olen Luxury Chocolate AI-assistent. Küsige toodete, hindade, tellimise või trükkimise kohta — vastan kohe.",
  typing: "Assistent kirjutab…",
  error: "Vastust ei saanud. Palun proovige uuesti.",
  open: "Ava vestlus",
  close: "Sulge vestlus",
};

const map: Record<string, ChatWidgetStrings> = { lv, en, ru, et };

export function getChatWidgetStrings(lang: string): ChatWidgetStrings {
  return map[lang] ?? en;
}
