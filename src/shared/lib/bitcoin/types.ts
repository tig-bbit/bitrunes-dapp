export interface FeeEstimate {
  fastestFee: number;
  halfHourFee: number;
  hourFee: number;
}

export interface RuneTransactionEstimate {
  totalSize: number;
  totalCost: number;
  costBreakdown: {
    postage: number;
    networkFee: number;
    serviceFee: number;
  };
}

export interface RuneTransactionEstimateError {
  message: string,
  details: {
    errors: Array<{
      field: string,
      message: string
    }>
  }
}

export interface OrderDetails {
  orderId: string;
  fundAddress: string;
  fundAmount: number;
}

export type OrderDetailsError = RuneTransactionEstimateError;

export interface Rune {
  feeRate: number;
  runeName: string;
  destinationAddress: string;
  divisibility?: number;
  symbol?: string;
  premine?: number;
  isMintable: boolean;
  terms?: {
    amount: number;
    cap: number;
  };
}

export interface OrderRune extends Rune {
  refundAddress: string;
}

export interface ExecuteOrderResponse {
  orderId: string;
  fundTransactionId: string;
}
