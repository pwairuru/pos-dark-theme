/** @odoo-module **/
import { registry } from "@web/core/registry";

export const POS_COLOR_SCHEME_KEY = "pos-color-scheme";
export const MODES = ["light", "dark", "system"];

function readStored() {
    try {
        const v = localStorage.getItem(POS_COLOR_SCHEME_KEY);
        return MODES.includes(v) ? v : "system";
    } catch {
        return "system";
    }
}

function systemIsDark() {
    try {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
        return false;
    }
}

function posRoot() {
    return document.querySelector(".pos");
}

export const posThemeService = {
    dependencies: [],
    start() {
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        if (media && media.addEventListener) {
            media.addEventListener("change", () => {
                if (this.getMode() === "system") {
                    this.apply();
                }
            });
        }
        this.apply();
        return {
            MODES,
            getMode: () => this.getMode(),
            getEffective: () => this.getEffective(),
            cycle: () => this.cycle(),
            apply: () => this.apply(),
        };
    },
    getMode() {
        return readStored();
    },
    getEffective() {
        const mode = readStored();
        if (mode === "dark") {
            return "dark";
        }
        if (mode === "light") {
            return "light";
        }
        return systemIsDark() ? "dark" : "light";
    },
    cycle() {
        const next = { light: "dark", dark: "system", system: "light" }[readStored()] || "system";
        try {
            localStorage.setItem(POS_COLOR_SCHEME_KEY, next);
        } catch {}
        this.apply();
        return next;
    },
    apply() {
        const root = posRoot();
        if (!root) {
            return false;
        }
        const dark = this.getEffective() === "dark";
        root.classList.toggle("o_dark_mode", dark);
        try {
            root.style.setProperty("color-scheme", dark ? "dark" : "light");
        } catch {}
        return dark;
    },
};

registry.category("services").add("pos_theme", posThemeService);
