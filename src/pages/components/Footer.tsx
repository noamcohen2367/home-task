import { socialLinks } from '../data/SocialLinks';

export default function Footer() {
  return (
    <footer className="landing-page__footer">
      <span className="landing-page__content__social-links--title">
        Get in touch with me
      </span>
      <div className="landing-page__content__social-links-container">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            className="landing-page__content__social-links--item"
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
