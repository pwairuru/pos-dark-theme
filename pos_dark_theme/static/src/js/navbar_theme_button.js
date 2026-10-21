/** @odoo-module **/
import { Component, onMounted, proxy } from "@odoo/owl";
import { patch } from "@web/core/utils/patch";
import { useService } from "@web/core/utils/hooks";
import { Navbar } from "@point_of_sale/app/components/navbar/navbar";

export const THEME_ICONS = { light: "light_mode", dark: "dark_mode", system: "contrast" };
export const THEME_TITLES = {
    light: "Theme: Light (click for Dark)",
    dark: "Theme: Dark (click for System)",
    system: "Theme: System (click for Light)",
};

export class ThemeToggleButton extends Component {
    static template = "pos_dark_theme.ThemeToggleButton";
    setup() {
        this.theme = useService("pos_theme");
        this.state = proxy({ mode: this.theme.getMode() });
        onMounted(() => {
            this.theme.apply();
        });
    }
    get mode() {
        return this.state.mode;
    }
    get themeIcon() {
        return THEME_ICONS[this.mode] || "contrast";
    }
    get themeTitle() {
        return THEME_TITLES[this.mode] || THEME_TITLES.system;
    }
    onThemeToggle() {
        this.state.mode = this.theme.cycle();
    }
}

patch(Navbar.prototype, {
    setup() {
        super.setup(...arguments);
        this.theme = useService("pos_theme");
    },
});
Navbar.components = { ...Navbar.components, ThemeToggleButton };
