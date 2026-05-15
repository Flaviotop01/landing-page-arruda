// Tweaks for Arruda Serviços — subtle palette & density controls
/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakColor, TweakRadio, TweakToggle */

const ARRUDA_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentColor": "#1F3A2A",
  "claColor": "#A86844",
  "density": "regular",
  "displayFont": "Newsreader",
  "showCaptions": true
}/*EDITMODE-END*/;

const ACCENT_OPTIONS = [
  "#1F3A2A", // moss (default)
  "#2D5A3F", // brighter moss
  "#143324", // deep moss
  "#3D4A2B", // olive
];
const CLAY_OPTIONS = [
  "#A86844", // terracotta default
  "#8C4F33", // burnt
  "#B8835E", // sand
  "#6A6459", // neutral warm gray
];
const DISPLAY_FONT_OPTIONS = ["Newsreader", "Source Serif Pro", "Cormorant Garamond"];

function ArrudaTweaks() {
  const [t, setTweak] = useTweaks(ARRUDA_TWEAK_DEFAULTS);

  // Apply on every render
  React.useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--moss-2', t.accentColor);
    r.style.setProperty('--moss', shade(t.accentColor, -0.18));
    r.style.setProperty('--moss-deep', shade(t.accentColor, -0.36));
    r.style.setProperty('--clay', t.claColor);
    r.style.setProperty('--clay-soft', shade(t.claColor, 0.18));

    // density
    const map = {
      compact: { pad: '56px', heroPad: '40px' },
      regular: { pad: '110px', heroPad: '72px' },
      comfy:   { pad: '160px', heroPad: '110px' },
    };
    const d = map[t.density] || map.regular;
    document.querySelectorAll('.section-pad').forEach(s => {
      s.style.paddingTop = d.pad;
      s.style.paddingBottom = d.pad;
    });

    // display font
    r.style.setProperty('--serif', `"${t.displayFont}", "Iowan Old Style", Georgia, serif`);

    // captions on bleed photos
    document.querySelectorAll('.bleed .cap, .hero-cap').forEach(el => {
      el.style.display = t.showCaptions ? '' : 'none';
    });
  }, [t]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Tom" />
      <TweakColor
        label="Verde institucional"
        value={t.accentColor}
        options={ACCENT_OPTIONS}
        onChange={(v) => setTweak('accentColor', v)}
      />
      <TweakColor
        label="Acento terra"
        value={t.claColor}
        options={CLAY_OPTIONS}
        onChange={(v) => setTweak('claColor', v)}
      />
      <TweakSection label="Tipografia" />
      <TweakRadio
        label="Serifa de display"
        value={t.displayFont}
        options={DISPLAY_FONT_OPTIONS}
        onChange={(v) => {
          // Load if missing
          const id = `font-${v.replace(/\s+/g,'-')}`;
          if (!document.getElementById(id)) {
            const link = document.createElement('link');
            link.id = id;
            link.rel = 'stylesheet';
            const fam = v.replace(/\s+/g, '+');
            link.href = `https://fonts.googleapis.com/css2?family=${fam}:ital,wght@0,400;0,500;1,400&display=swap`;
            document.head.appendChild(link);
          }
          setTweak('displayFont', v);
        }}
      />
      <TweakSection label="Layout" />
      <TweakRadio
        label="Densidade"
        value={t.density}
        options={["compact","regular","comfy"]}
        onChange={(v) => setTweak('density', v)}
      />
      <TweakToggle
        label="Legendas em fotos"
        value={t.showCaptions}
        onChange={(v) => setTweak('showCaptions', v)}
      />
    </TweaksPanel>
  );
}

// Quick color shader for moss derivatives
function shade(hex, amt) {
  const c = hex.replace('#','');
  const n = parseInt(c.length === 3 ? c.split('').map(x=>x+x).join('') : c, 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  if (amt < 0) { r = Math.round(r * (1 + amt)); g = Math.round(g * (1 + amt)); b = Math.round(b * (1 + amt)); }
  else { r = Math.round(r + (255 - r) * amt); g = Math.round(g + (255 - g) * amt); b = Math.round(b + (255 - b) * amt); }
  return '#' + [r,g,b].map(x => Math.max(0, Math.min(255, x)).toString(16).padStart(2,'0')).join('');
}

// Mount
const tweakRoot = document.createElement('div');
tweakRoot.id = 'arruda-tweaks-root';
document.body.appendChild(tweakRoot);
ReactDOM.createRoot(tweakRoot).render(<ArrudaTweaks />);
