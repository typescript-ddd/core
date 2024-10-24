import { OrderBy } from "./order-by";
import { OrderType, OrderTypes } from "./order-type";

export class Order {
  constructor(
    public readonly orderBy: OrderBy,
    public readonly orderType: OrderType
  ) {}

  public hasOrder(): boolean {
    return !this.orderType.isNone();
  }

  static create(orderBy: OrderBy, orderType: OrderType): Order {
    return new Order(orderBy, orderType);
  }

  static fromValues(orderBy?: string, orderType?: string): Order {
    if (!orderBy) {
      return Order.none();
    }
    const orderByValue = OrderBy.create(orderBy);

    return new Order(
      orderByValue,
      OrderType.parse(orderType || OrderTypes.ASC)
    );
  }

  static none(): Order {
    return new Order(OrderBy.create(""), OrderType.create(OrderTypes.NONE));
  }

  static asc(orderBy: string): Order {
    return new Order(OrderBy.create(orderBy), OrderType.create(OrderTypes.ASC));
  }

  static desc(orderBy: string): Order {
    return new Order(
      OrderBy.create(orderBy),
      OrderType.create(OrderTypes.DESC)
    );
  }
}
