"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { useStore } from "./store-provider";
import { DrawerShell } from "./drawer-shell";

type View = "signin" | "register";

// Session key used to pass a one-shot "the user just created their account"
// signal from the sign-up form to the SignedInPanel that mounts right after.
// Cleared on read so returning visits read as "Welcome back".
const JUST_REGISTERED_KEY = "tlv:just-registered";

export function AccountDrawer() {
  const { drawer, closeDrawer, user, signIn, signOut, openDrawer, myOrders } =
    useStore();
  const open = drawer === "account";

  return (
    <DrawerShell
      open={open}
      onClose={closeDrawer}
      title={user ? "My Account" : "Sign In"}
      tone="light"
    >
      {user ? (
        <SignedInPanel
          user={user}
          onSignOut={signOut}
          onOpenWishlist={() => openDrawer("wishlist")}
          onClose={closeDrawer}
          ordersCount={myOrders.length}
        />
      ) : (
        <SignedOutPanel onSubmit={signIn} onClose={closeDrawer} />
      )}
    </DrawerShell>
  );
}

function SignedOutPanel({
  onSubmit,
  onClose
}: {
  onSubmit: (email: string, name?: string) => void;
  onClose: () => void;
}) {
  const [view, setView] = useState<View>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    const trimmedName = name.trim();
    if (view === "register" && !trimmedName) {
      setError("Please enter your name.");
      return;
    }
    if (!trimmed || !trimmed.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter a password.");
      return;
    }
    setError("");
    // Flag the SignedInPanel that this transition came from a brand-new
    // account so it can say "Welcome" instead of "Welcome back". signIn is
    // called in both modes — the store doesn't distinguish — so the drawer
    // re-renders with user truthy and the user is immediately logged in.
    if (view === "register") {
      try {
        sessionStorage.setItem(JUST_REGISTERED_KEY, "1");
      } catch {
        // Ignore — fallback is just the "Welcome back" greeting.
      }
    }
    onSubmit(trimmed, view === "register" ? trimmedName : undefined);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-ink/10 px-6 py-6 md:px-8">
        <div className="flex gap-6">
          <ViewTab
            active={view === "signin"}
            onClick={() => {
              setView("signin");
              setError("");
            }}
          >
            Sign In
          </ViewTab>
          <ViewTab
            active={view === "register"}
            onClick={() => {
              setView("register");
              setError("");
            }}
          >
            Create Account
          </ViewTab>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 space-y-6 px-6 py-8 md:px-8">
        {view === "register" && (
          <Field
            label="Name"
            type="text"
            value={name}
            onChange={setName}
            autoComplete="name"
          />
        )}
        <Field
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          autoComplete="email"
          required
        />
        <Field
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          autoComplete={view === "signin" ? "current-password" : "new-password"}
          required
        />

        {view === "signin" && (
          <button
            type="button"
            className="text-[11px] uppercase tracking-[0.24em] text-ink/70 underline underline-offset-[6px] decoration-ink/30 transition-colors hover:text-ink"
          >
            Forgot password?
          </button>
        )}

        {error && (
          <p className="text-[11px] uppercase tracking-[0.22em] text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-ink py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-chalk transition-opacity hover:opacity-90"
        >
          {view === "signin" ? "Sign In" : "Create Account"}
        </button>

        <div className="pt-6">
          <p className="mb-4 text-[10px] uppercase tracking-[0.32em] text-ink/55">
            Client Services
          </p>
          <ul className="space-y-3">
            {[
              { href: "/studio/appointment", label: "Book an appointment" },
              { href: "/faq", label: "Client Care" }
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={onClose}
                  className="text-[13px] text-ink/80 underline underline-offset-[6px] decoration-ink/30 transition-colors hover:text-ink hover:decoration-ink/70"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
}

function SignedInPanel({
  user,
  onSignOut,
  onOpenWishlist,
  onClose,
  ordersCount
}: {
  user: { email: string; name?: string };
  onSignOut: () => void;
  onOpenWishlist: () => void;
  onClose: () => void;
  ordersCount: number;
}) {
  const greeting = user.name || user.email.split("@")[0];
  // Read the one-shot "just registered" flag on mount so we can greet new
  // accounts with "Welcome" and returning visitors with "Welcome back".
  const [justRegistered, setJustRegistered] = useState(false);
  useEffect(() => {
    try {
      if (sessionStorage.getItem(JUST_REGISTERED_KEY) === "1") {
        setJustRegistered(true);
        sessionStorage.removeItem(JUST_REGISTERED_KEY);
      }
    } catch {
      // Ignore — default greeting is fine.
    }
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-ink/10 px-6 py-8 md:px-8">
        <p className="text-[10px] uppercase tracking-[0.32em] text-ink/55">
          {justRegistered ? "Account created · Welcome" : "Welcome back"}
        </p>
        <p className="mt-3 font-display text-[clamp(1.25rem,2vw,1.6rem)] font-semibold uppercase tracking-[0.02em] text-ink">
          {greeting}
        </p>
        <p className="mt-2 text-[12px] text-ink/60">{user.email}</p>
        {justRegistered && (
          <p className="mt-4 text-[12px] leading-[1.65] text-ink/70">
            You're signed in. Your orders, addresses and wishlist will live
            here.
          </p>
        )}
      </div>

      <nav className="flex-1 px-6 py-6 md:px-8" aria-label="Account">
        <ul className="divide-y divide-ink/10">
          <AccountAnchor
            href="/account#orders"
            label="My Orders"
            hint={
              ordersCount === 0
                ? "No orders yet"
                : `${ordersCount} order${ordersCount === 1 ? "" : "s"}`
            }
            onClose={onClose}
          />
          <AccountAnchor
            href="/account#addresses"
            label="My Addresses"
            hint="Add a shipping address"
            onClose={onClose}
          />
          <li>
            <button
              type="button"
              onClick={() => onOpenWishlist()}
              className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-ink"
            >
              <span className="text-[13px] uppercase tracking-[0.22em] text-ink/80">
                My Wishlist
              </span>
              <span aria-hidden className="text-ink/40">›</span>
            </button>
          </li>
          <AccountAnchor
            href="/account#preferences"
            label="Preferences"
            hint="Language, currency"
            onClose={onClose}
          />
          <li>
            <Link
              href="/faq"
              onClick={onClose}
              className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-ink"
            >
              <span className="text-[13px] uppercase tracking-[0.22em] text-ink/80">
                Client Care
              </span>
              <span aria-hidden className="text-ink/40">›</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="border-t border-ink/10 px-6 py-6 md:px-8">
        <button
          type="button"
          onClick={onSignOut}
          className="w-full border border-ink/30 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-chalk"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

function AccountAnchor({
  href,
  label,
  hint,
  onClose
}: {
  href: string;
  label: string;
  hint?: string;
  onClose: () => void;
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClose}
        className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-ink"
      >
        <div>
          <p className="text-[13px] uppercase tracking-[0.22em] text-ink/80">
            {label}
          </p>
          {hint && <p className="mt-1 text-[11px] text-ink/50">{hint}</p>}
        </div>
        <span aria-hidden className="text-ink/40">›</span>
      </Link>
    </li>
  );
}

function ViewTab({
  active,
  onClick,
  children
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`relative pb-1 text-[11px] font-semibold uppercase tracking-[0.28em] transition-colors ${
        active ? "text-ink" : "text-ink/50 hover:text-ink/80"
      }`}
    >
      {children}
      {active && (
        <span
          aria-hidden
          className="absolute -bottom-px left-0 right-0 h-px bg-ink"
        />
      )}
    </button>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  autoComplete,
  required
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] uppercase tracking-[0.32em] text-ink/55">
        {label}
        {required && <span className="ml-1 text-ink/40">*</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        required={required}
        className="w-full border-b border-ink/25 bg-transparent py-2 text-[14px] text-ink placeholder:text-ink/40 transition-colors focus:border-ink focus:outline-none"
      />
    </label>
  );
}
