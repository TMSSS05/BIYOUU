import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "212600000000";

export function WhatsAppFab({ message = "Bonjour BIYOUU, je souhaite organiser mon séjour." }: { message?: string }) {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp BIYOUU"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[oklch(0.7_0.18_150)] text-white shadow-elegant transition-transform hover:scale-105 rtl:right-auto rtl:left-6"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[oklch(0.7_0.18_150)] opacity-30" />
    </a>
  );
}
