import { Order } from '@context/AssignmentFilterContext/AssignmentFilterContext.types';

interface OrderTypeProps {
  orderType: Order;
  onChange: (newOrder: Order) => void;
}
