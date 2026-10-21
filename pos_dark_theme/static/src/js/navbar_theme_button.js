/** @odoo-module **/
import { Component } from "@odoo/owl";
import { patch } from "@web/core/utils/patch";
import { useService } from "@web/core/utils/hooks";
import { Navbar } from "@point_of_sale/app/components/navbar/navbar";

export const THEME_ICONS = { light: "sun", dark: "moon", system: "contrast" };
export const THEME_TITLES = {
    light: "Theme: Light (click for Dark)",
    dark: "Theme: Dark (click for System)",
    system: "Theme: System (click for Light)",
};

export class ThemeToggleButton extends Component {
    static template = "pos_dark_theme.ThemeToggleButton";
    setup() {
        this.theme = useService("pos_theme");
    }
    get mode() {
        return this.theme.getMode();
    }
    get themeIcon() {
        return THEME_ICONS[this.mode] || "contrast";
    }
    get themeTitle() {
        return THEME_TITLES[this.mode] || THEME_TITLES.system;
    }
    onThemeToggle() {
        this.theme.cycle();
        this.render();
    }
}

patch(Navbar.prototype, {
    setup() {
        super.setup(...arguments);
        this.theme = useService("pos_theme");
    },
});
Navbar.components = { ...Navbar.components, ThemeToggleButton };
