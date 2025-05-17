import { definePreset } from "@primeng/themes";
import Aura from '@primeng/themes/aura';

export const MylsPreset = definePreset(Aura, {
  semantic: {
    primary: {
      500: "#56BB65",
      700: "#56BB65",
      800: "#4DA65A",
      900: "#42884D"
    },
    secondary: {
      500: "#F3F6F9"
    },
    orange: {
      500: "#FD9317",
    }
  },
  components: {
    tooltip: {
      colorScheme: {
        light: {
          root: {
            background: "{surface.900}",
            color: "{surface.50}"
          }
        }
      }
    }
  }
}

);
