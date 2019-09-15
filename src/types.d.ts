type Piece = {
  id: string;
  name: string;
  image: string;
  size: [number, number];
  charges: Charge[];
  title: string;
  company: string;
  former: string;
  materials: string;
  artist: string;
  artistPrisonID: string;
  artistSentence: string;
  artistContact: string;
  artistContactLink: string;
  artistCharges: Charge[];
};

type Charge = {title: string; description: string};
