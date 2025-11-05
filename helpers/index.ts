export const shadeColor = (hex: string, percent: number) => {
    const p = Math.max(-100, Math.min(100, percent)) / 100;
    const num = parseInt(hex.replace('#',''), 16);
    const r = (num >> 16) & 0xFF;
    const g = (num >> 8) & 0xFF;
    const b = num & 0xFF;
    const t = p < 0 ? 0 : 255;
    const R = Math.round((t - r) * Math.abs(p)) + r;
    const G = Math.round((t - g) * Math.abs(p)) + g;
    const B = Math.round((t - b) * Math.abs(p)) + b;
    const out = (R << 16) + (G << 8) + B;
    return `#${out.toString(16).padStart(6, '0')}`;
}