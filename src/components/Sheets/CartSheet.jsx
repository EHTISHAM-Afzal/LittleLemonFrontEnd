import { useNavigate } from 'react-router-dom';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartItemCard } from "../cards/CartItemCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import OpenCartButton from "../smallComp/OpenCartButton";
import { useSelector } from "react-redux";

const CartSheet = () => {
  const navigate = useNavigate();

  const totalIntemsQuantitiesInCart = useSelector((state) =>
    state.cart.reduce((acc, item) => acc + item.quantity, 0)
  );
  const cartState = useSelector((state) => state.cart);
  const total = useSelector((state) =>
    state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );
  const taxes = total * 0.1;
  const totalPrice = total + taxes;
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <OpenCartButton quantity={totalIntemsQuantitiesInCart} />
          <span className="sr-only ">Open Cart</span>
        </SheetTrigger>
        <SheetContent className="w-full sm:w-[30rem] max-h-screen h-full">
          <SheetHeader className="mb-4">
            <SheetTitle>My Cart</SheetTitle>
          </SheetHeader>
          <Separator />
          {/* Contents */}
          <div className="w-full h-[95%] grid grid-flow-row grid-rows-[1fr,_10rem]">
            <ScrollArea className="h-full w-full">
              { cartState.length > 0 ? cartState.map((item) => (
                <div key={item._id} >
                <CartItemCard  dish={item} />
                <Separator/>
                </div>
              )) : <h1 className="w-full text-center pt-8 text-xl">No items in cart</h1>}
            </ScrollArea>
            {/* Footer */}
            <div className=" w-full h-full space-y-2 flex flex-col right-1">
              <div className="flex justify-between">
                <h2>Taxes</h2>
                <h2>
                  <span>$ </span>
                  {taxes <= 9 ? 0 : null}
                  {taxes.toString().substring(0, 4)}
                </h2>
              </div>
              <Separator />
              <div className="flex justify-between">
                <h2>Shipping</h2>
                <h2>
                  Calculated at checkout
                </h2>
              </div>
              <Separator />
              <div className="flex justify-between">
                <h2>Total</h2>
                <h2>
                  <span>$ </span>
                  {totalPrice <= 9 ? 0 : null}
                  {totalPrice}
                </h2>
              </div>
              <Separator />
              <SheetClose className=" min-h-[2rem] bg-primary text-primary-foreground shadow hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" onClick={()=>navigate(`underconstruction?page=Checkout`)}>
                Proceed to Checkout
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CartSheet;
