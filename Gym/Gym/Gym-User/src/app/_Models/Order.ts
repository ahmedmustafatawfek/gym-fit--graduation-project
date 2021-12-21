import { OrderDetail } from "./OrderDetail";

export class Order {
    ID?: number;
    CustomerID?: number;
    OrderStatus?: string;
    PaymentType?: string;
    TotalPrice?: number;
    OrderDetails?: OrderDetail[];
}