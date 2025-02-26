import { Review } from "./reviewType";

export interface ReviewTableProps {
  columns: any[];
  initialReviewsData: Review[];
  label: string;
  loading: boolean;
  columnNumber: string;
  token: string;
}