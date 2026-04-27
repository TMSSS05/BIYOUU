import { useEffect, useState, useCallback } from "react";
import type { CartItem, Reservation } from "@/types";

const CART_KEY = "biyouu.cart";
const RES_KEY = "biyouu.reservations";

type Listener = () => void;
const listeners = new Set<Listener>();
const notify = () => listeners.forEach((l) => l());

const safeRead = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const safeWrite = (key: string, value: unknown) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* noop */
  }
};

export const cartStore = {
  get: (): CartItem[] => safeRead<CartItem[]>(CART_KEY, []),
  set: (items: CartItem[]) => {
    safeWrite(CART_KEY, items);
    notify();
  },
  add: (item: CartItem) => {
    const items = cartStore.get();
    items.push(item);
    cartStore.set(items);
  },
  remove: (id: string) => {
    cartStore.set(cartStore.get().filter((i) => i.id !== id));
  },
  update: (id: string, patch: Partial<CartItem>) => {
    cartStore.set(cartStore.get().map((i) => (i.id === id ? { ...i, ...patch } : i)));
  },
  clear: () => cartStore.set([]),
};

export const reservationsStore = {
  get: (): Reservation[] => safeRead<Reservation[]>(RES_KEY, []),
  add: (r: Reservation) => {
    const list = reservationsStore.get();
    list.unshift(r);
    safeWrite(RES_KEY, list);
    notify();
  },
};

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => cartStore.get());
  useEffect(() => {
    const l = () => setItems(cartStore.get());
    listeners.add(l);
    l();
    return () => {
      listeners.delete(l);
    };
  }, []);
  return items;
}

export function useReservations() {
  const [list, setList] = useState<Reservation[]>(() => reservationsStore.get());
  useEffect(() => {
    const l = () => setList(reservationsStore.get());
    listeners.add(l);
    l();
    return () => {
      listeners.delete(l);
    };
  }, []);
  return list;
}

export const computeItemTotal = (item: CartItem) => {
  const optsTotal = item.options.reduce((sum, o) => sum + o.price, 0);
  return item.unitPrice * Math.max(1, item.quantity) + optsTotal * Math.max(1, item.quantity);
};

export const computeCartTotal = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + computeItemTotal(i), 0);

export const formatMAD = (n: number) =>
  new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(n) + " MAD";

export const generateId = () =>
  (typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2)) as string;

export const generateReference = () => {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `BIY-${new Date().getFullYear()}-${n}`;
};

export { useCallback };
