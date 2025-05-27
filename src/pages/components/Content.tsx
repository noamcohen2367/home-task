interface ContentProps {
  themePictureSrc: string;
}

export default function Content({ themePictureSrc }: ContentProps) {
  return (
    <main className="landing-page__content">
      <img
        src={themePictureSrc}
        alt="theme picture"
        className="landing-page__content--picture"
      />
    </main>
  );
}
