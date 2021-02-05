export type Placeholder = {
  bgColor: string;
  height: number;
};

export type Color = {
  color: [number, number, number];
  weight: number;
};

export type PreviewImage = {
  url: string;
  colors: [Color];
  dominant_color: [number, number, number];
  width: number;
  height: number;
};

export type PostInfo = {
  preview_image: PreviewImage;
  attachment: string;
};