export interface Event {
  id?: string;
  name: string;
  date: string;
  capacity: number;
  registrationCount: number;
  status: "active" | "cancelled";
  category: string;
}