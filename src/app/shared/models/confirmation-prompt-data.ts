import { ThemePalette } from '@angular/material/core';

export interface ConfirmationPromptData {
  heading: string;
  message: string;
  confirmButtonText?: string;
  dismissButtonText?: string;
  confirmButtonColor?: ThemePalette;
}
