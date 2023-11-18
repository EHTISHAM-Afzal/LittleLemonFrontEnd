import { useParams } from "react-router-dom";
import {
  useGetDishByIdQuery,
  useGetDishesQuery,
} from "../features/Dishes/dishesSlice";
import Spinner from "../components/smallComp/Spinner";
import AbouteProductCard from "../components/cards/AbouteProductCard";
import { ArrowRight } from "lucide-react";
import MenuCardForAboutPRoduct from "../components/cards/MenuCardForAboutProduct";

const AboutProduct = () => {
  let { productId } = useParams();
  const { data, isLoading, isSuccess, isError, error } =
    useGetDishByIdQuery(productId);
  const {
    data: carosualData,
    isLoading: carosualIsloading,
    isSuccess: carosualIsSucces,
    isError: carosualIsError,
    error: carosualError,
  } = useGetDishesQuery();

  let content;
  if (isLoading) {
    content = <Spinner />;
  } else if (isError) {
    content = <p>{error.message}</p>;
  } else if (isSuccess && !isLoading) {
    let dish = data?.entities[data?.ids[0]];
    content = <AbouteProductCard dish={dish} />;
  } else {
    content = <p>No data</p>;
  }

  let carosualContents;
  if (carosualIsloading) {
    carosualContents = <Spinner />;
  } else if (carosualIsError) {
    carosualContents = <p>{carosualError.message}</p>;
  } else if (carosualIsSucces && !carosualIsloading) {
    let { ids, entities } = carosualData;
    carosualContents = ids.map((dish) => (
      <MenuCardForAboutPRoduct dish={entities[dish]} key={dish} />
    ));
  } else {
    carosualContents = <p>No data</p>;
  }

  return (
    <section className="grids space-y-3">
      <div className="grids-section-width px-6 ">{content}</div>
      {/* Header */}
      <div className="flex justify-between items-center px-6 grids-section-width ">
        <h2 className="text-2xl font-karla font-bold my-4 ">Similar Dishes</h2>
        <ArrowRight className=" md:hidden w-6 h-6 text-gray-500 dark:hover:text-gray-400 hover:text-gray-800 cursor-pointer duration-300 my-4 mr-2 hover:mr-0 " />
      </div>
      <div className=" overflow-auto col-span-full  grid grid-flow-col auto-cols-[minmax(90vw,_100vw)] sm:auto-cols-[minmax(20rem,_21rem)]  scroll-smooth p-4 space-x-1 snap-x h-fit w-full ">
        {carosualContents}
      </div>
    </section>
  );
};

export default AboutProduct;
