export type PhotoCategory = 'All' | 'Architecture' | 'Monochrome' | 'Landscapes' | 'Editorial';

export interface ExifMetadata {
  camera: string;
  lens: string;
  focalLength: string;
  aperture: string;
  shutterSpeed: string;
  iso: number;
  filmStockOrSensor: string;
}

export interface PortfolioItem {
  id: string;
  indexNumber: string;
  title: string;
  series: string;
  category: Exclude<PhotoCategory, 'All'>;
  location: string;
  year: number;
  aspectRatio: '16:9' | '4:3' | '3:4';
  featuredSpan?: boolean;
  imageUrl: string;
  alt: string;
  caption: string;
  clientOrPublication: string;
  editionInfo: string;
  exif: ExifMetadata;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: 'Field Notes' | 'Exhibition' | 'Technical Study' | 'Monograph';
  publishedAt: string;
  readTimeMinutes: number;
  location: string;
  excerpt: string;
  coverImage: string;
  coverAlt: string;
  cameraSetup: string;
  paragraphs: string[];
  keyTakeaways: string[];
}

export interface ContactFormInput {
  name: string;
  email: string;
  projectType: 'Architectural Commission' | 'Editorial Assignment' | 'Archival Fine Art Print' | 'Exhibition & Licensing';
  locationOrTimeline: string;
  message: string;
}

export interface ContactValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactFormInput, string>>;
}

export interface SubmittedInquiry extends ContactFormInput {
  id: string;
  referenceCode: string;
  submittedAt: string;
  selectedWorkTitle?: string;
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'nordic-fjord-pavilion',
    indexNumber: '01',
    title: 'Cantilever over Hardangerfjord',
    series: 'Nordic Silence II',
    category: 'Architecture',
    location: 'Hardanger, Norway',
    year: 2026,
    aspectRatio: '16:9',
    featuredSpan: true,
    imageUrl: '/photos/nordic-fjord-pavilion.svg',
    alt: 'Minimalist board-formed concrete pavilion cantilevered above a dark Norwegian fjord at blue hour with warm gallery light',
    caption:
      'Captured forty minutes before sunrise as coastal fog lifted off the fjord surface, balancing the 3200K recessed gallery illumination against high-latitude twilight.',
    clientOrPublication: 'Arkitektur N / Snøhetta Archive Study',
    editionInfo: 'Archival Pigment Print · Edition of 12 + 2 AP',
    exif: {
      camera: 'Hasselblad X2D 100C',
      lens: 'XCD 2,5/38V',
      focalLength: '38mm',
      aperture: 'f/8.0',
      shutterSpeed: '4.0s',
      iso: 64,
      filmStockOrSensor: '100MP Medium Format CMOS',
    },
  },
  {
    id: 'brutalist-courtyard-study',
    indexNumber: '02',
    title: 'Figure in Chiaroscuro Courtyard',
    series: 'Monolith & Gesture',
    category: 'Editorial',
    location: 'Copenhagen, Denmark',
    year: 2026,
    aspectRatio: '4:3',
    imageUrl: '/photos/brutalist-courtyard-study.svg',
    alt: 'High-contrast monochrome portrait of a solitary figure standing beneath an austere concrete archway cut by diagonal sunlight',
    caption:
      'Commissioned autumn monograph study exploring human scale within raw cast-in-place concrete courtyards during low October solar angles.',
    clientOrPublication: 'Kinfolk Monograph Issue 48',
    editionInfo: 'Silver Gelatin Fiber Print · Edition of 15',
    exif: {
      camera: 'Leica M11 Monochrom',
      lens: 'Summilux-M 50mm f/1.4 ASPH',
      focalLength: '50mm',
      aperture: 'f/5.6',
      shutterSpeed: '1/500s',
      iso: 125,
      filmStockOrSensor: 'BSI Monochrome Full-Frame',
    },
  },
  {
    id: 'reynisfjara-basalt-mist',
    indexNumber: '03',
    title: 'Basalt Sea Stacks in Sea Fog',
    series: 'North Atlantic Littoral',
    category: 'Landscapes',
    location: 'Vík í Mýrdal, Iceland',
    year: 2025,
    aspectRatio: '4:3',
    imageUrl: '/photos/reynisfjara-basalt-mist.svg',
    alt: 'Long-exposure fine art photograph of black volcanic basalt columns rising from silky grey ocean mist',
    caption:
      'Six-stop neutral density filtration smoothed the turbulent North Atlantic swell into a quiet tonal gradient that isolates the volcanic sea stacks.',
    clientOrPublication: 'Nordic Landscape Triennial',
    editionInfo: 'Archival Baryta Print · Edition of 10',
    exif: {
      camera: 'Hasselblad X2D 100C',
      lens: 'XCD 4/45P',
      focalLength: '45mm',
      aperture: 'f/11',
      shutterSpeed: '30.0s',
      iso: 64,
      filmStockOrSensor: '100MP Medium Format + 6-Stop ND',
    },
  },
  {
    id: 'kyoto-cedar-sanctuary',
    indexNumber: '04',
    title: 'Rain on Charred Cedar Pavilion',
    series: 'Timber & Shadow',
    category: 'Architecture',
    location: 'Kyoto, Japan',
    year: 2025,
    aspectRatio: '3:4',
    imageUrl: '/photos/kyoto-cedar-sanctuary.svg',
    alt: 'Vertical architectural study of a traditional cedar and shoji screen pavilion during quiet rainfall with wet stone reflections',
    caption:
      'Documented during the June plum rain season in northern Kyoto, focusing on how wet yakisugi cedar absorbs ambient skylight.',
    clientOrPublication: 'A+U Architecture & Urbanism',
    editionInfo: 'Hahnemühle Photo Rag 308g · Edition of 12',
    exif: {
      camera: 'Leica SL3',
      lens: 'APO-Summicron-SL 35mm f/2 ASPH',
      focalLength: '35mm',
      aperture: 'f/4.0',
      shutterSpeed: '1/60s',
      iso: 200,
      filmStockOrSensor: '60MP Full-Frame',
    },
  },
  {
    id: 'atacama-rammed-earth',
    indexNumber: '05',
    title: 'Rammed-Earth Walls at Dusk',
    series: 'Arid Geometry',
    category: 'Architecture',
    location: 'San Pedro de Atacama, Chile',
    year: 2025,
    aspectRatio: '4:3',
    imageUrl: '/photos/atacama-rammed-earth.svg',
    alt: 'Warm ochre rammed-earth architectural walls casting razor-sharp diagonal shadows across the high desert floor',
    caption:
      'Constructed from compacted local desert clay and volcanic aggregate, these wind-break walls shift from muted terracotta to deep charcoal in the final ten minutes of daylight.',
    clientOrPublication: 'Domus Architectural Dossier',
    editionInfo: 'Archival Pigment Print · Edition of 12',
    exif: {
      camera: 'Hasselblad X2D 100C',
      lens: 'XCD 2,5/55V',
      focalLength: '55mm',
      aperture: 'f/8.0',
      shutterSpeed: '1/125s',
      iso: 100,
      filmStockOrSensor: '100MP Medium Format CMOS',
    },
  },
  {
    id: 'oslo-opera-monochrome',
    indexNumber: '06',
    title: 'Carrara Marble Plane in Winter',
    series: 'Nordic Silence I',
    category: 'Monochrome',
    location: 'Bjørvika, Oslo',
    year: 2026,
    aspectRatio: '4:3',
    imageUrl: '/photos/oslo-opera-monochrome.svg',
    alt: 'Stark black and white architectural study of angular white marble roof planes meeting dark winter water',
    caption:
      'An orthographic study of diagonal marble geometry meeting the freezing Oslofjord water under overcast January skies.',
    clientOrPublication: 'Louisiana Museum Exhibition Catalogue',
    editionInfo: 'Silver Gelatin Print · Edition of 10',
    exif: {
      camera: 'Leica M11 Monochrom',
      lens: 'APO-Summicron-M 35mm f/2 ASPH',
      focalLength: '35mm',
      aperture: 'f/8.0',
      shutterSpeed: '1/250s',
      iso: 125,
      filmStockOrSensor: 'BSI Monochrome Full-Frame',
    },
  },
  {
    id: 'zurich-concrete-stair',
    indexNumber: '07',
    title: 'Cantilevered Stairwell Void',
    series: 'Monolith & Gesture',
    category: 'Monochrome',
    location: 'Zürich, Switzerland',
    year: 2024,
    aspectRatio: '3:4',
    imageUrl: '/photos/zurich-concrete-stair.svg',
    alt: 'Vertical monochrome study of repeating cantilevered concrete steps descending into a skylit architectural atrium',
    caption:
      'Overhead diffused zenith light grades each raw concrete step along a strict logarithmic tonal curve from highlight to deep shadow.',
    clientOrPublication: 'ETH Zürich Architectural Archive',
    editionInfo: 'Silver Gelatin Print · Edition of 15',
    exif: {
      camera: 'Leica M11 Monochrom',
      lens: 'Super-Elmar-M 21mm f/3.4 ASPH',
      focalLength: '21mm',
      aperture: 'f/11',
      shutterSpeed: '1/15s',
      iso: 125,
      filmStockOrSensor: 'BSI Monochrome Full-Frame',
    },
  },
  {
    id: 'alpine-glacier-ridge',
    indexNumber: '08',
    title: 'High-Latitude Firn & Ridge',
    series: 'North Atlantic Littoral',
    category: 'Landscapes',
    location: 'Svalbard, Norway',
    year: 2026,
    aspectRatio: '4:3',
    imageUrl: '/photos/alpine-glacier-ridge.svg',
    alt: 'Minimalist arctic mountain ridge divided sharply between illuminated snow on the west face and deep polar shadow on the east face',
    caption:
      'Photographed from an acoustic research vessel at 78° North as the first low-angle sun returned following the polar night.',
    clientOrPublication: 'Polar Monograph Series',
    editionInfo: 'Archival Baryta Print · Edition of 8',
    exif: {
      camera: 'Hasselblad X2D 100C',
      lens: 'XCD 2,5/90V',
      focalLength: '90mm',
      aperture: 'f/5.6',
      shutterSpeed: '1/400s',
      iso: 100,
      filmStockOrSensor: '100MP Medium Format CMOS',
    },
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'hardangerfjord-winter-dispatch',
    slug: 'acoustic-stillness-hardangerfjord-concrete-pavilions',
    title: 'Acoustic Stillness: Photographing Coastal Concrete Along Hardangerfjord',
    category: 'Field Notes',
    publishedAt: 'October 14, 2026',
    readTimeMinutes: 5,
    location: 'Hardanger, Norway',
    excerpt:
      'Notes on balancing 3200K interior gallery tungsten against sub-zero nautical twilight during a three-week architectural residency in western Norway.',
    coverImage: '/photos/nordic-fjord-pavilion.svg',
    coverAlt: 'Nordic concrete pavilion overlooking Hardangerfjord at dawn',
    cameraSetup: 'Hasselblad X2D 100C · XCD 38V & 55V · Gitzo Systematic Carbon Tripod',
    paragraphs: [
      'Architectural photography at 60 degrees North requires treating twilight not as a brief transition, but as the primary working window of the day. Along the inner reaches of Hardangerfjord, the steep granite valley walls block direct sunlight until mid-morning, creating an extended two-hour atmospheric equilibrium.',
      'For this commission documenting a cantilevered waterfront art pavilion, the primary challenge was balancing the warm 3200K museum-grade wall washers inside the gallery with the deep slate-blue exterior light reflecting off the fjord water.',
      'Rather than blending multiple exposures—which often flattens the natural tension between interior warmth and exterior cold—each plate was exposed as a single 4-second capture at ISO 64 twenty-eight minutes before official sunrise. At that precise moment, the luminance ratio between the board-formed concrete soffit and the interior oak floor falls within 4.5 stops.',
    ],
    keyTakeaways: [
      'Single-exposure dynamic range preservation at ISO 64 avoids artificial HDR haloing on sharp architectural edges.',
      'Measuring ambient sky luminance with a 1-degree spot meter ensures consistent shadow density across a 12-plate monograph series.',
      'Cold-weather condensation prevention using sealed silica sleeves when transitioning between -8°C fjord air and heated interiors.',
    ],
  },
  {
    id: 'monochrome-baryta-darkroom-notes',
    slug: 'silver-gelatin-and-digital-monochrome-calibration',
    title: 'Tonal Separation in Brutalist Courtyards: From Monochrome Sensor to Baryta Paper',
    category: 'Technical Study',
    publishedAt: 'September 28, 2026',
    readTimeMinutes: 6,
    location: 'Copenhagen, Denmark',
    excerpt:
      'How removing the Bayer color filter array transforms micro-contrast on raw board-formed concrete and heavy wool textiles.',
    coverImage: '/photos/brutalist-courtyard-study.svg',
    coverAlt: 'Chiaroscuro monochrome courtyard study in Copenhagen',
    cameraSetup: 'Leica M11 Monochrom · Summilux-M 50mm f/1.4 ASPH · Yellow #12 Filter',
    paragraphs: [
      'When photographing raw mineral surfaces—board-formed concrete, travertine, and weathered basalt—a dedicated monochrome sensor without a color filter array resolves surface micro-texture without demosaicing interpolation.',
      'During the autumn editorial sessions in Copenhagen, we paired a Leica M11 Monochrom with a classic medium-yellow optical glass filter. The filter darkens the high-altitude blue skylight in the courtyard opening by 1.2 stops while keeping warm skin tones and natural undyed wool coats luminous.',
      'In print production on 315gsm baryta fiber paper, our custom piezography curve holds shadow separation down to 4% reflectance while preserving the tactile paper base white in architectural highlights.',
    ],
    keyTakeaways: [
      'Metering strictly for the sunlit concrete highlight (-0.7 EV compensation) prevents clipping on dedicated monochrome sensors.',
      'Using optical yellow and orange filters in-camera alters tonal contrast organically before quantization.',
      'Archival framing behind museum anti-reflective acrylic preserves deep matte shadow blacks in bright gallery spaces.',
    ],
  },
  {
    id: 'svalbard-polar-twilight-monograph',
    slug: 'upcoming-monograph-north-of-seventy-eight-degrees',
    title: 'Forthcoming Monograph & Exhibition: North of Seventy-Eight Degrees',
    category: 'Exhibition',
    publishedAt: 'August 19, 2026',
    readTimeMinutes: 4,
    location: 'Oslo & Zürich',
    excerpt:
      'Previewing 36 large-format plates from Svalbard and Iceland ahead of the winter gallery exhibition in Oslo and linen-bound book release.',
    coverImage: '/photos/alpine-glacier-ridge.svg',
    coverAlt: 'High-latitude arctic ridge photographed in Svalbard',
    cameraSetup: 'Hasselblad X2D 100C · XCD 45P & 90V · Custom Cold-Weather Rig',
    paragraphs: [
      'Over the past twenty-four months, four sea and land expeditions between southern Iceland and the Svalbard archipelago have culminated in a 36-plate body of work titled North of Seventy-Eight Degrees.',
      'The exhibition opens November 18, 2026 at Kunsthall Oslo, accompanied by a 144-page clothbound monograph printed on uncoated Munken Polar rough stock using tritone offset lithography.',
      'Visitors to the exhibition will see twelve 120 × 160 cm archival pigment prints alongside field notebooks, topographic exposure charts, and contact sheets from the voyages.',
    ],
    keyTakeaways: [
      'Solo exhibition runs November 18, 2026 – January 24, 2027 in Oslo.',
      'First edition monograph limited to 750 numbered copies with signed slipcase edition of 50.',
      'Private collector previews and print allocations open via the studio contact desk.',
    ],
  },
];

export function filterPortfolioItems(
  items: PortfolioItem[],
  category: PhotoCategory,
  searchQuery: string = '',
  aspectFilter: 'all' | '16:9' | '4:3' | '3:4' = 'all'
): PortfolioItem[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return items.filter((item) => {
    const matchesCategory = category === 'All' || item.category === category;
    const matchesAspect = aspectFilter === 'all' || item.aspectRatio === aspectFilter;
    const matchesQuery =
      normalizedQuery.length === 0 ||
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.location.toLowerCase().includes(normalizedQuery) ||
      item.series.toLowerCase().includes(normalizedQuery) ||
      item.exif.camera.toLowerCase().includes(normalizedQuery) ||
      item.category.toLowerCase().includes(normalizedQuery);

    return matchesCategory && matchesAspect && matchesQuery;
  });
}

export function getCategoryCounts(items: PortfolioItem[]): Record<PhotoCategory, number> {
  const counts: Record<PhotoCategory, number> = {
    All: items.length,
    Architecture: 0,
    Monochrome: 0,
    Landscapes: 0,
    Editorial: 0,
  };

  for (const item of items) {
    counts[item.category] = (counts[item.category] ?? 0) + 1;
  }

  return counts;
}

export function getAdjacentLightboxIndex(
  currentIndex: number,
  totalItems: number,
  direction: 'next' | 'prev'
): number {
  if (totalItems <= 0) return -1;
  if (direction === 'next') {
    return (currentIndex + 1) % totalItems;
  }
  return (currentIndex - 1 + totalItems) % totalItems;
}

export function filterBlogPosts(
  posts: BlogPost[],
  category: 'All' | BlogPost['category']
): BlogPost[] {
  if (category === 'All') return posts;
  return posts.filter((post) => post.category === category);
}

export function validateContactForm(input: ContactFormInput): ContactValidationResult {
  const errors: Partial<Record<keyof ContactFormInput, string>> = {};

  const trimmedName = input.name.trim();
  const trimmedEmail = input.email.trim();
  const trimmedLocation = input.locationOrTimeline.trim();
  const trimmedMessage = input.message.trim();

  if (!trimmedName) {
    errors.name = 'Please enter your full name or studio name.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail) {
    errors.email = 'Please provide an email address for our reply.';
  } else if (!emailRegex.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address (e.g., name@studio.com).';
  }

  if (!trimmedLocation) {
    errors.locationOrTimeline = 'Please specify a project location, print size, or target timeline.';
  }

  if (!trimmedMessage) {
    errors.message = 'Please include a brief overview of your project or inquiry.';
  } else if (trimmedMessage.length < 20) {
    errors.message = 'Please provide at least 20 characters so we can prepare an accurate response.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function createInquiryReferenceCode(name: string, index: number): string {
  const cleanInitials =
    name
      .trim()
      .split(/\s+/)
      .map((part) => part[0]?.toUpperCase() || 'X')
      .join('')
      .slice(0, 3) || 'SL';
  const paddedNumber = String(104 + index).padStart(4, '0');
  return `SL-2026-${cleanInitials}-${paddedNumber}`;
}
