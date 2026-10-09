import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { KitchenSlideshow } from './kitchen-slideshow';
import { ctaHref, site } from '@/lib/site';
import './kitchen-hero.css';

export function HomeHero() {
  return (
    <section aria-labelledby="hero-heading" className="kitchen-hero">
      <KitchenSlideshow />
      <div className="kitchen-shade" />
      <div className="kitchen-copy gutter">
        <p className="kitchen-eyebrow">
          <span />
          Remodeling & restoration · Greater Houston
        </p>
        <h1 id="hero-heading">
          Houston remodeling.
          <br />
          <em>Beautifully lived in.</em>
        </h1>
        <p className="kitchen-description">
          We remodel kitchens and bathrooms across Greater Houston. When water
          or a storm hits, we restore the house too.
        </p>
        <div className="kitchen-actions">
          <Link className="kitchen-primary" href={ctaHref}>
            Start your project <ArrowUpRight size={18} aria-hidden />
          </Link>
          <Link className="kitchen-secondary" href="/projects">
            Explore our work <ArrowUpRight size={16} aria-hidden />
          </Link>
        </div>
      </div>
      <div className="kitchen-footer gutter">
        <p>
          Family owned <span> / </span> Since {site.founded}
          <br />
          <small>{site.locality}</small>
        </p>
        <p className="kitchen-materials">
          SPACES MADE FOR LIVING
          <br />
          <small>Kitchens, baths, and roofs</small>
        </p>
        <a href="#manifesto" aria-label="Scroll to our approach">
          <ArrowDown size={18} />
        </a>
      </div>
    </section>
  );
}
