'use client';

import { useEffect, useRef, type ReactNode } from 'react';

import { cx } from '@/lib/cx';

export function HeaderChrome({
  home,
  children,
}: {
  home: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let previous = window.scrollY;
    let frame = 0;

    const menuOpen = () =>
      !!el.querySelector('[data-nav-item]:is(:hover, :focus-within, [data-open])');

    const syncExpanded = () => {
      el.querySelectorAll<HTMLButtonElement>('[data-nav-trigger]').forEach((btn) => {
        const item = btn.closest('[data-nav-item]');
        const open = !!item?.matches(':is(:hover, :focus-within, [data-open])');
        const value = open ? 'true' : 'false';
        if (btn.getAttribute('aria-expanded') !== value) {
          btn.setAttribute('aria-expanded', value);
        }
      });
    };

    const paint = () => {
      frame = 0;
      const latest = window.scrollY;
      el.dataset.scrolled = latest > 40 ? 'true' : 'false';
      const hide = latest > 480 && latest > previous && !menuOpen();
      el.dataset.hidden = hide ? 'true' : 'false';
      previous = latest;
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(paint);
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element) || !el.contains(target)) return;
      const btn = target.closest('[data-nav-trigger]');
      if (!btn) return;
      const item = btn.closest('[data-nav-item]');
      if (!item) return;
      const willOpen = !item.hasAttribute('data-open');
      el.querySelectorAll('[data-nav-item][data-open]').forEach((node) => {
        if (node !== item) node.removeAttribute('data-open');
      });
      if (willOpen) item.setAttribute('data-open', '');
      else item.removeAttribute('data-open');
      syncExpanded();
    };

    const onDocClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Node) || el.contains(target)) return;
      el.querySelectorAll('[data-open]').forEach((node) => node.removeAttribute('data-open'));
      syncExpanded();
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      el.querySelectorAll('[data-open]').forEach((node) => node.removeAttribute('data-open'));
      el.dataset.hidden = 'false';
      syncExpanded();
    };

    const show = () => {
      el.dataset.hidden = 'false';
      syncExpanded();
    };

    const onFocusOut = (event: FocusEvent) => {
      const next = event.relatedTarget;
      const from = event.target;
      if (from instanceof Element) {
        const item = from.closest('[data-nav-item]');
        if (item && (!(next instanceof Node) || !item.contains(next))) {
          item.removeAttribute('data-open');
        }
      }
      syncExpanded();
    };

    paint();
    window.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('click', onClick);
    document.addEventListener('click', onDocClick);
    el.addEventListener('focusin', show);
    el.addEventListener('focusout', onFocusOut);
    const onOver = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Element) {
        const item = target.closest('[data-nav-item]');
        if (item && el.contains(item)) {
          el.querySelectorAll('[data-nav-item][data-open]').forEach((node) => {
            if (node !== item) node.removeAttribute('data-open');
          });
        }
      }
      syncExpanded();
    };
    el.addEventListener('pointerover', onOver);
    el.addEventListener('pointerout', syncExpanded);
    document.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('scroll', onScroll);
      el.removeEventListener('click', onClick);
      document.removeEventListener('click', onDocClick);
      el.removeEventListener('focusin', show);
      el.removeEventListener('focusout', onFocusOut);
      el.removeEventListener('pointerover', onOver);
      el.removeEventListener('pointerout', syncExpanded);
      document.removeEventListener('keydown', onKey);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [home]);

  return (
    <header
      ref={ref}
      data-home={home ? 'true' : 'false'}
      className={cx(
        'site-header fixed inset-x-0 top-0 z-50 border-b border-transparent bg-transparent',
        'transition-transform duration-500 ease-out-expo',
        'transition-[background-color,border-color,color] duration-500',
        'header-scrolled:border-border header-scrolled:bg-background/92 header-scrolled:backdrop-blur-md',
        'header-hero:text-white dark:header-hero:text-foreground',
        'header-hidden:-translate-y-full',
      )}
    >
      {children}
    </header>
  );
}
