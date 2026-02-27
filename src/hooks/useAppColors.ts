import { useTheme } from '@react-navigation/native';
import { lightAppColors, darkAppColors } from '@/config/theme';
import type { AppColors } from '@/config/theme';

/**
 * Returns the semantic colour palette for the current theme.
 *
 * Uses React Navigation's `useTheme` hook to detect whether dark mode is
 * active and returns the corresponding {@link AppColors} object.
 */
export function useAppColors(): AppColors {
  const { dark } = useTheme();
  return dark ? darkAppColors : lightAppColors;
}
