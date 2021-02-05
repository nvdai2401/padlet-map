export type LatLngBound = {
  north: number
  south: number
  west: number
  east: number
}
export type Restriction = {
  latLngBounds: LatLngBound
  strictBounds: boolean
}


const defaultLatLngBounds = {
  north: 180,
  south: -180,
  west: -180,
  east: 180,
};

const viewportLatLngBounds: LatLngBound = { north: 85, south: -85, west: -180, east: 180 };

const styles = [
  {
    featureType: 'all',
    elementType: 'geometry',
    stylers: [
      {
        color: '#202c3e',
      },
    ],
  },
  {
    featureType: 'all',
    elementType: 'labels.text.fill',
    stylers: [
      {
        gamma: 0.01,
      },
      {
        lightness: 20,
      },
      {
        weight: '1.39',
      },
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'all',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        weight: '0.96',
      },
      {
        saturation: '9',
      },
      {
        visibility: 'on',
      },
      {
        color: '#000000',
      },
    ],
  },
  {
    featureType: 'all',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [
      {
        lightness: 30,
      },
      {
        saturation: '9',
      },
      {
        color: '#29446b',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        saturation: 20,
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        lightness: 20,
      },
      {
        saturation: -20,
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        lightness: 10,
      },
      {
        saturation: -30,
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#193a55',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {
        saturation: 25,
      },
      {
        lightness: 25,
      },
      {
        weight: '0.01',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [
      {
        lightness: -20,
      },
    ],
  },
];

const restriction: Restriction = {
  latLngBounds: viewportLatLngBounds,
  strictBounds: true,
};

const DEFAULT_CENTER = { lat: 20, lng: 20 };
const MIN_ZOOM = 2;
const MAX_ZOOM = 15;

const options = {
  backgroundColor: '#192331',
  zoomControl: false,
  controlSize: 30,
  minZoom: MIN_ZOOM,
  maxZoom: MAX_ZOOM,
  restriction: restriction,
  styles: styles,
  disableDefaultUI: true,
};

export {
  defaultLatLngBounds,
  viewportLatLngBounds,
  styles,
  restriction,
  options,
  DEFAULT_CENTER,
  MIN_ZOOM,
  MAX_ZOOM,
};
