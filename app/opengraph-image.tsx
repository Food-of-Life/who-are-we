import { ImageResponse } from 'next/og';

export const alt = 'FoL. — Food of Life';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      background: '#171714',
      color: '#f5f2ed',
      fontSize: 230,
      fontWeight: 900,
      fontStyle: 'italic',
      letterSpacing: '-0.1em',
    }}>FoL.</div>,
    size,
  );
}
