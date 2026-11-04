const STATE_KEY = "linka_state_v1";
const THEME_KEY = "linka_theme_v1";

export function readStorage(key) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* armazenamento bloqueado ou cheio: o app continua funcionando sem salvar */
  }
}

export function removeStorage(key) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* ignora */
  }
}

export const readState = () => readStorage(STATE_KEY);
export const writeState = (state) => writeStorage(STATE_KEY, state);
export const clearState = () => {
  removeStorage(STATE_KEY);
  removeStorage(THEME_KEY);
};

export const readTheme = () => readStorage(THEME_KEY);
export const writeTheme = (theme) => writeStorage(THEME_KEY, theme);

export function applyTheme(theme) {
  try {
    const root = document.documentElement;
    if (theme === "dark" || theme === "light") {
      root.setAttribute("data-theme", theme);
    } else {
      root.removeAttribute("data-theme");
    }
  } catch {
    /* ignora */
  }
}