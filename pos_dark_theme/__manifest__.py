{
    'name': 'POS Dark Theme',
    'version': '20.0.1.0.0',
    'category': 'Point of Sale',
    'summary': 'POS-only dark theme with Light/Dark/System toggle',
    'description': 'Navbar sun/moon toggle for POS only. Persists per-browser in localStorage. Backend untouched.',
    'author': 'Hoteli',
    'depends': ['point_of_sale'],
    'data': [],
    'assets': {
        'point_of_sale._assets_pos': [
            'pos_dark_theme/static/src/js/pos_theme_service.js',
            'pos_dark_theme/static/src/js/navbar_theme_button.js',
            'pos_dark_theme/static/src/xml/navbar_theme_button.xml',
            'pos_dark_theme/static/src/scss/pos_dark.scss',
        ],
    },
    'license': 'LGPL-3',
    'installable': True,
    'auto_install': False,
    'application': False,
}
