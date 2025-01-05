export interface Product {
    _id: string;
    name: string;
    description: string;
    startingPrice: number;
    quantity: number;
    startingDate: Date;
    endingDate: Date;
    bidStartTime: Date;
    bidEndTime: Date;
    totalBidAmount: number;
    images: string[];
    status: 'pending' | 'accepted' | 'rejected';
    farmer: {
      _id: string;
      name: string;
      email: string;
    };
    quality?: string;
    rejectionReason?: string;
  }
  
  export interface ProductState {
    products: Product[];
    currentProduct: Product | null;
    loading: boolean;
    error: string | null;
  }
  
  export interface UploadProductData {
    name: string;
    description: string;
    startingPrice: number;
    quantity: number;
    startingDate: string;
    endingDate: string;
    bidStartTime: string;
    bidEndTime: string;
    images: File[];
  }
  
  export interface VerifyProductData {
    action: 'Accept' | 'Reject';
    rejectionReason?: string;
  }