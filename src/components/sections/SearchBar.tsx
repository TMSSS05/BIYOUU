import { useTranslation } from "react-i18next";
import { MapPin, Sparkles, Calendar, Users, Search, ChevronDown, Car, Building2, Compass, Star } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { format, startOfDay } from "date-fns";
import { fr } from "date-fns/locale";
import * as dateLocale from "date-fns/locale";
import { useClickOutside } from "@/hooks/useDropdown";
import { CustomCalendar } from "@/components/ui/custom-calendar";

interface ServiceOption {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function SearchBar() {
  const { t, i18n } = useTranslation();

  // State for dropdowns
  const [serviceOpen, setServiceOpen] = useState(false);
  const [arrivalOpen, setArrivalOpen] = useState(false);
  const [departureOpen, setDepartureOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [arrivalDate, setArrivalDate] = useState<Date | undefined>(undefined);
  const [departureDate, setDepartureDate] = useState<Date | undefined>(undefined);

  // Refs for click outside
  const serviceRef = useRef<HTMLDivElement>(null);
  const arrivalRef = useRef<HTMLDivElement>(null);
  const departureRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useClickOutside(() => setServiceOpen(false), serviceRef);
  useClickOutside(() => setArrivalOpen(false), arrivalRef);
  useClickOutside(() => setDepartureOpen(false), departureRef);

  // Service options
  const services: ServiceOption[] = [
    { value: "", label: t("search.servicePlaceholder"), icon: Star },
    { value: "vehicles", label: t("nav.vehicles"), icon: Car },
    { value: "stays", label: t("nav.stays"), icon: Building2 },
    { value: "activities", label: t("nav.activities"), icon: Compass },
    { value: "services", label: t("nav.services"), icon: Sparkles },
  ];

  // Get current locale for calendar
  const currentLocale = i18n.language === "fr" ? dateLocale.fr : i18n.language === "es" ? dateLocale.es : dateLocale.enUS;
  const dateLocale_ = currentLocale;

  const handleServiceSelect = (value: string) => {
    setSelectedService(value);
    setServiceOpen(false);
  };

  const handleArrivalSelect = (date: Date | undefined) => {
    setArrivalDate(date);
    setArrivalOpen(false);
  };

  const handleDepartureSelect = (date: Date | undefined) => {
    setDepartureDate(date);
    setDepartureOpen(false);
  };

  return (
    <section className="relative z-30 -mt-16 px-5 md:px-8">
      <form
        className="mx-auto grid max-w-6xl gap-3 rounded-3xl border border-border/70 bg-card/95 p-4 shadow-elegant backdrop-blur-xl md:grid-cols-[1.4fr_1.2fr_1fr_1fr_0.9fr_auto] md:gap-2 md:p-3"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Destination */}
        <Field icon={MapPin} label={t("search.destination")}>
          <input
            type="text"
            placeholder={t("search.destinationPlaceholder")}
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </Field>

        {/* Type de service - Custom Dropdown */}
        <div ref={serviceRef} className="relative">
          <CustomDropdown
            open={serviceOpen}
            onOpenChange={(open) => {
              setServiceOpen(open);
              if (open) {
                setArrivalOpen(false);
                setDepartureOpen(false);
              }
            }}
            trigger={
              <Field icon={Sparkles} label={t("search.service")} isActive={serviceOpen}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between bg-transparent text-sm text-foreground"
                  onClick={() => setServiceOpen(!serviceOpen)}
                >
                  <span className={selectedService ? "" : "text-muted-foreground"}>
                    {services.find((s) => s.value === selectedService)?.label || t("search.servicePlaceholder")}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      serviceOpen && "rotate-180"
                    )}
                  />
                </button>
              </Field>
            }
            options={services}
            selectedValue={selectedService}
            onSelect={handleServiceSelect}
            getIcon={(option) => option.icon}
          />
        </div>

        {/* Arrivée - Custom Calendar */}
        <div ref={arrivalRef} className="relative">
          <CustomDatePicker
            open={arrivalOpen}
            onOpenChange={(open) => {
              setArrivalOpen(open);
              if (open) {
                setDepartureOpen(false);
                setServiceOpen(false);
              }
            }}
            trigger={
              <Field icon={Calendar} label={t("search.arrival")} isActive={arrivalOpen}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between bg-transparent text-sm text-foreground"
                  onClick={() => setArrivalOpen(!arrivalOpen)}
                >
                  <span className={arrivalDate ? "" : "text-muted-foreground"}>
                    {arrivalDate ? format(arrivalDate, "dd MMM yyyy", { locale: dateLocale_ }) : t("search.arrival")}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      arrivalOpen && "rotate-180"
                    )}
                  />
                </button>
              </Field>
            }
            selectedDate={arrivalDate}
            onSelect={handleArrivalSelect}
            mode="arrival"
            otherDate={departureDate}
          />
        </div>

        {/* Départ - Custom Calendar */}
        <div ref={departureRef} className="relative">
          <CustomDatePicker
            open={departureOpen}
            onOpenChange={(open) => {
              setDepartureOpen(open);
              if (open) {
                setArrivalOpen(false);
                setServiceOpen(false);
              }
            }}
            trigger={
              <Field icon={Calendar} label={t("search.departure")} isActive={departureOpen}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between bg-transparent text-sm text-foreground"
                  onClick={() => setDepartureOpen(!departureOpen)}
                >
                  <span className={departureDate ? "" : "text-muted-foreground"}>
                    {departureDate ? format(departureDate, "dd MMM yyyy", { locale: dateLocale_ }) : t("search.departure")}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      departureOpen && "rotate-180"
                    )}
                  />
                </button>
              </Field>
            }
            selectedDate={departureDate}
            onSelect={handleDepartureSelect}
            mode="departure"
            otherDate={arrivalDate}
          />
        </div>

        {/* Voyageurs */}
        <Field icon={Users} label={t("search.guests")}>
          <input
            type="number"
            min={1}
            defaultValue={2}
            className="w-full bg-transparent text-sm text-foreground focus:outline-none"
          />
        </Field>

        {/* Search Button */}
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
        >
          <Search className="h-4 w-4" />
          <span>{t("search.search")}</span>
        </button>
      </form>
    </section>
  );
}

/**
 * Custom Dropdown Component for Type de service
 */
function CustomDropdown({
  open,
  onOpenChange,
  trigger,
  options,
  selectedValue,
  onSelect,
  getIcon,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: React.ReactNode;
  options: ServiceOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  getIcon?: (option: ServiceOption) => React.ComponentType<{ className?: string }>;
}) {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation
  useEffect(() => {
    if (!open) {
      setHighlightedIndex(-1);
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onOpenChange(false);
          e.preventDefault();
          break;
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
          break;
        case "Enter":
          e.preventDefault();
          if (highlightedIndex >= 0) {
            onSelect(options[highlightedIndex].value);
            onOpenChange(false);
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, highlightedIndex, options, onSelect, onOpenChange]);

  return (
    <>
      {trigger}
      <div
        ref={dropdownRef}
        className={cn(
          "absolute left-1/2 -translate-x-1/2 top-full z-50 mt-1 w-[calc(100%-8px)] min-w-[240px] max-w-[320px] overflow-hidden rounded-xl border border-border/50 bg-cream/98 shadow-elegant backdrop-blur-xl md:left-0 md:w-full md:max-w-none",
          "transition-all duration-200 ease-out",
          open
            ? "opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 -translate-y-2"
        )}
      >
        <div className="flex flex-col py-1.5">
          {options.map((option, index) => {
            const Icon = option.icon;
            const isSelected = option.value === selectedValue;
            const isHighlighted = index === highlightedIndex;

            return (
              <button
                key={option.value}
                type="button"
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors duration-150",
                  "hover:bg-primary/8 hover:text-foreground",
                  isHighlighted && "bg-primary/12",
                  isSelected && "bg-primary/15 font-medium text-primary"
                )}
                onClick={() => onSelect(option.value)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                <Icon className={cn("h-4 w-4 shrink-0", isSelected ? "text-primary" : "text-muted-foreground")} />
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

/**
 * Custom Date Picker Component - Desktop Premium Version
 */
function CustomDatePicker({
  open,
  onOpenChange,
  trigger,
  selectedDate,
  onSelect,
  mode,
  otherDate,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: React.ReactNode;
  selectedDate: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  mode: "arrival" | "departure";
  otherDate: Date | undefined;
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const pickerRef = useRef<HTMLDivElement>(null);

  // Get locale from i18n context
  const { i18n } = useTranslation();
  const currentLocale = i18n.language === "fr" ? dateLocale.fr : i18n.language === "es" ? dateLocale.es : dateLocale.enUS;

  // Keyboard escape to close
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false);
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  // Reset to selected date month when opening
  useEffect(() => {
    if (open && selectedDate) {
      setCurrentMonth(selectedDate);
    }
  }, [open, selectedDate]);

  const handleToday = () => {
    const today = startOfDay(new Date());
    onSelect(today);
    onOpenChange(false);
  };

  const handleClear = () => {
    onSelect(undefined);
    onOpenChange(false);
  };

  // Disable dates before today for arrival, and before selected arrival for departure
  const minDate = mode === "arrival" ? startOfDay(new Date()) : undefined;
  const disabledDays = mode === "departure" && otherDate ? [{ before: otherDate }] : undefined;

  return (
    <>
      {trigger}
      {/* Desktop: Premium Calendar Popup */}
      <div
        ref={pickerRef}
        className={cn(
          // Mobile: centered modal
          "fixed left-2 right-2 top-1/2 -translate-y-1/2 z-[60] mx-auto max-w-[340px] rounded-2xl border border-border/40 bg-cream/98 p-5 shadow-elegant backdrop-blur-xl",
          // Desktop: positioned below field with proper width
          "md:absolute md:left-0 md:top-[calc(100%+8px)] md:mt-0 md:w-[320px] md:max-w-[320px] md:translate-y-0",
          // Animation
          "transition-all duration-200 ease-out",
          open
            ? "opacity-100 scale-100 md:scale-100"
            : "pointer-events-none opacity-0 scale-95 md:opacity-0 md:scale-95"
        )}
      >
        {/* Calendar Header - Premium */}
        <div className="mb-3 flex items-center justify-between px-1">
          <button
            type="button"
            onClick={handleClear}
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md px-2 py-1 hover:bg-primary/5"
          >
            Effacer
          </button>
          <button
            type="button"
            onClick={handleToday}
            className="rounded-xl bg-primary/12 px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
          >
            Aujourd'hui
          </button>
        </div>

        {/* Custom Calendar - Premium Grid Layout */}
        <CustomCalendar
          selected={selectedDate}
          onSelect={(date) => onSelect(date)}
          month={currentMonth}
          onMonthChange={(date) => setCurrentMonth(date)}
          fromDate={minDate}
          disabledDays={disabledDays}
          locale={currentLocale}
          className="w-full"
        />
      </div>
    </>
  );
}

function Field({
  icon: Icon,
  label,
  children,
  isActive = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
  isActive?: boolean;
}) {
  return (
    <label className={cn(
      "flex items-center gap-3 rounded-2xl border border-transparent bg-cream/60 px-3.5 py-2.5 transition-all duration-200",
      isActive 
        ? "border-primary/40 bg-cream shadow-sm" 
        : "focus-within:border-primary/40 focus-within:bg-cream"
    )}>
      <Icon className="h-4 w-4 shrink-0 text-primary" />
      <div className="min-w-0 flex-1">
        <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </span>
        {children}
      </div>
    </label>
  );
}
