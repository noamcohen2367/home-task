interface HeaderProps {
  pageTitle: string;
}

export default function Header({ pageTitle }: HeaderProps) {
  return (
    <header>
      <span>{pageTitle}</span>
    </header>
  );
}
