import { useTranslation } from "react-i18next";
import { assets } from "@/data/assets";
import { SectionHeader } from "./Categories";
import { CardStack, CardStackItem } from "@/components/ui/card-stack";

export function Services() {
  const { t } = useTranslation();
  
  const items: CardStackItem[] = [
    { 
      id: "chef", 
      key: "chef",
      title: t("services.items.chef.title"), 
      description: t("services.items.chef.desc"),
      imageSrc: assets.chef,
      imagePosition: "50% 40%",
      href: "#packs",
      ctaLabel: t("services.items.chef.cta"),
    },
    { 
      id: "housekeeping", 
      key: "housekeeping",
      title: t("services.items.housekeeping.title"), 
      description: t("services.items.housekeeping.desc"),
      imageSrc: assets.housekeeping,
      imagePosition: "50% 30%",
      href: "#packs",
      ctaLabel: t("services.items.housekeeping.cta"),
    },
    { 
      id: "childcare", 
      key: "childcare",
      title: t("services.items.childcare.title"), 
      description: t("services.items.childcare.desc"),
      imageSrc: assets.childcare,
      imagePosition: "50% 35%",
      href: "#packs",
      ctaLabel: t("services.items.childcare.cta"),
    },
    { 
      id: "driver", 
      key: "driver",
      title: t("services.items.driver.title"), 
      description: t("services.items.driver.desc"),
      imageSrc: assets.vehicles,
      imagePosition: "50% 45%",
      href: "#packs",
      ctaLabel: t("services.items.driver.cta"),
    },
    { 
      id: "transfer", 
      key: "transfer",
      title: t("services.items.transfer.title"), 
      description: t("services.items.transfer.desc"),
      imageSrc: assets.vehicles,
      imagePosition: "50% 50%",
      href: "#packs",
      ctaLabel: t("services.items.transfer.cta"),
    },
  ];

  return (
    <section id="services" className="bg-primary w-full max-w-full px-4 py-20 text-ivory sm:px-5 sm:py-24 md:px-8 md:py-32">
      <div className="mx-auto w-full max-w-[430px] sm:max-w-[480px] md:max-w-7xl">
        <SectionHeader 
          eyebrow={t("services.eyebrow")} 
          title={t("services.title")} 
          subtitle={t("services.subtitle")} 
          light 
        />
        
        {/* Mobile: Simple grid - no overflow */}
        <div className="mt-12 grid gap-4 sm:mt-14 sm:gap-5 sm:grid-cols-2 lg:hidden">
          {items.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="group relative flex aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-elegant sm:aspect-[3/4] sm:rounded-[28px]"
            >
              {item.imageSrc && (
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="relative z-10 flex h-full flex-col justify-end p-5 sm:p-6">
                <h3 className="font-display text-[20px] text-ivory sm:text-xl">{item.title}</h3>
                {item.description && (
                  <p className="mt-1 line-clamp-2 text-[12px] text-ivory/80 sm:text-[13px] sm:mt-1.5 sm:text-sm">{item.description}</p>
                )}
              </div>
            </a>
          ))}
        </div>

        {/* Desktop: CardStack animation */}
        <div className="mt-12 hidden lg:block md:mt-16">
          <CardStack
            items={items}
            initialIndex={0}
            autoAdvance
            intervalMs={3500}
            pauseOnHover
            showDots
            cardWidth={320}
            cardHeight={400}
            overlap={0.35}
            spreadDeg={36}
            className="mx-auto max-w-lg"
          />
        </div>
      </div>
    </section>
  );
}