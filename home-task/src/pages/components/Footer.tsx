import { socialLinks } from '../data/SocialLinks';

export default function Footer() {
  return (
    <footer className="landing-page__footer">
      <span className="landing-page__content__social-links--title">
        Get in touch
      </span>
      <div className="landing-page__content__social-links-container">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="landing-page__content__social-links--item"
            aria-label={`Visit ${link.name} profile`}
          >
            <img
              src={link.icon}
              alt={`${link.name} icon`}
              className="landing-page__content__social-links--icon"
            />
          </a>
        ))}
      </div>
    </footer>
  );
}
