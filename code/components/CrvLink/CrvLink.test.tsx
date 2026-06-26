'use client';

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CrvLink } from './CrvLink';

describe('CrvLink', () => {
  it('renders children', () => {
    render(<CrvLink href="#">ดูรายละเอียด</CrvLink>);
    expect(screen.getByText('ดูรายละเอียด')).toBeInTheDocument();
  });

  it('renders as an anchor by default', () => {
    render(<CrvLink href="/about">About</CrvLink>);
    const link = screen.getByRole('link', { name: 'About' });
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe('A');
  });

  it('passes href to the anchor element', () => {
    render(<CrvLink href="/path">Go</CrvLink>);
    expect(screen.getByRole('link', { name: 'Go' })).toHaveAttribute('href', '/path');
  });

  describe('disabled state', () => {
    it('sets aria-disabled when disabled', () => {
      render(<CrvLink href="#" disabled>Link</CrvLink>);
      expect(screen.getByRole('link', { name: 'Link' })).toHaveAttribute('aria-disabled', 'true');
    });

    it('does not call onClick when disabled', () => {
      const handleClick = vi.fn();
      render(
        <CrvLink href="#" disabled onClick={handleClick}>
          Link
        </CrvLink>,
      );
      fireEvent.click(screen.getByRole('link', { name: 'Link' }));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('sets tabIndex to -1 when disabled', () => {
      render(<CrvLink href="#" disabled>Link</CrvLink>);
      expect(screen.getByRole('link', { name: 'Link' })).toHaveAttribute('tabindex', '-1');
    });

    it('uses link disabled color token', () => {
      render(<CrvLink href="#" disabled>Link</CrvLink>);
      expect(screen.getByRole('link', { name: 'Link' })).toHaveStyle({
        color: 'rgb(71, 85, 105)',
      });
    });
  });

  describe('icons', () => {
    it('renders startIcon when provided', () => {
      render(
        <CrvLink href="#" startIcon={<span data-testid="start-icon" />}>
          Link
        </CrvLink>,
      );
      expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    });

    it('does not render startIcon when not provided', () => {
      render(<CrvLink href="#">Link</CrvLink>);
      expect(screen.queryByTestId('start-icon')).not.toBeInTheDocument();
    });

    it('renders endIcon when provided', () => {
      render(
        <CrvLink href="#" endIcon={<span data-testid="end-icon" />}>
          Link
        </CrvLink>,
      );
      expect(screen.getByTestId('end-icon')).toBeInTheDocument();
    });

    it('does not render endIcon when not provided', () => {
      render(<CrvLink href="#">Link</CrvLink>);
      expect(screen.queryByTestId('end-icon')).not.toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    it.each(['small', 'medium', 'large'] as const)('renders size=%s without error', (size) => {
      render(
        <CrvLink href="#" size={size}>
          Link
        </CrvLink>,
      );
      expect(screen.getByRole('link', { name: 'Link' })).toBeInTheDocument();
    });
  });

  it('forwards ref to the anchor element', () => {
    const ref = React.createRef<HTMLAnchorElement>();
    render(<CrvLink href="#" ref={ref}>Link</CrvLink>);
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  it('passes extra props to MUI Link', () => {
    render(
      <CrvLink href="#" target="_blank" rel="noopener noreferrer">
        External
      </CrvLink>,
    );
    const link = screen.getByRole('link', { name: 'External' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
