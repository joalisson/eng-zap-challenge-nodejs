

interface ILocation {
  lon: number;
  lat: number;
}

interface IGeolocation {
  precision: string;
  location: ILocation;
}

interface IAddress {
  city: string,
  neighborhood: string,
  geoLocation: IGeolocation;
}

interface IPricingInfo {
  yearlyIptu: string;
  price: string;
  businessType: string;
  monthlyCondoFee: string;
}

export interface IDataSource {
  usableAreas: number;
  listingType: string;
  createdAt: string;
  listingStatus: string;
  id: string;
  parkingSpaces: number;
  updatedAt: string;
  owner: false;
  images: string[];
  address: IAddress;
  pricingInfos: IPricingInfo;
}