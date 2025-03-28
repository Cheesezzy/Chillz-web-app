export type DesktopHeaderProps = {
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type MenuIconsProps = {
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface MobileHeaderProps extends DesktopHeaderProps {
  mobileMenuOpen: boolean;
  isUserSignedIn: boolean;
}

export type NavigationType = {
  name: string;
  href: string;
  id: number;
};

export type HeaderProps = {};
